"use server";

import SendEmail from "@/app/api/send";
import { ExcelRowSchema, ProcessedBusinessSchema } from "@/app/schema";
import { db } from "@/db"; // Import de la connexion à la DB
import { businessInfo, user } from "@/db/schema/auth-schema"; // Table Drizzle
import { createToken } from "@/lib/email-token";
import { findColumn } from "@/lib/utils";
import {
    ExcelRow,
    ProcessedBusinessData,
    ProcessedUserData,
} from "@/types/excel-import";
import { read, utils } from "xlsx";
import { z } from "zod";
import { createServerAction } from "zsa";

const ImportSchema = z.object({
    file: z.instanceof(File, {
        message: "Le fichier est requis",
    }),
});

const ImportOutputSchema = z.object({
    success: z.boolean(),
    message: z.string(),
    errors: z.array(z.string()).optional(),
});

export type InputType = z.infer<typeof ImportSchema>;
export type ReturnType = z.infer<typeof ImportOutputSchema>;

async function handler({ input }: { input: InputType }): Promise<ReturnType> {
    const { file } = input;

    if (!file) {
        return {
            success: false,
            message: "Aucun fichier reçu.",
        };
    }

    if (!file.name.match(/\.(xlsx|xls)$/i)) {
        return {
            success: false,
            message: "Le fichier doit être au format Excel (.xlsx ou .xls)",
        };
    }

    try {
        const buffer = await file.arrayBuffer();
        const workbook = read(buffer, { type: "buffer" });
        const worksheet = workbook.Sheets[workbook.SheetNames[0]];
        const rawData = utils.sheet_to_json<ExcelRow>(worksheet);

        if (rawData.length === 0) {
            return {
                success: false,
                message: "Le fichier ne contient aucune donnée.",
            };
        }

        // Map Excel columns to our schema
        const firstRow = rawData[0];
        const columnMap = {
            name: findColumn(firstRow, [
                "name",
                "nom",
                "username",
                "utilisateur",
            ]),
            email: findColumn(firstRow, ["email", "mail", "courriel"]),
            bio: findColumn(firstRow, ["bio", "biographie", "description"]),
            companyName: findColumn(firstRow, [
                "companyName",
                "company",
                "entreprise",
            ]),
            businessDescription: findColumn(firstRow, [
                "businessDescription",
                "description",
                "descriptionEntreprise",
            ]),
            phone: findColumn(firstRow, ["phone", "telephone", "téléphone"]),
            website: findColumn(firstRow, ["website", "site", "siteWeb"]),
            siretNum: findColumn(firstRow, [
                "siretNum",
                "Numéro de Siret",
                "Siret Number",
            ]),
            productTypes: findColumn(firstRow, [
                "productType",
                "type du produit",
                "Product Type",
            ]),
        };

        const requiredColumns = ["name", "email"];
        let missingColumns: string[] = [];

        for (const key of requiredColumns) {
            if (!columnMap[key as keyof typeof columnMap]) {
                missingColumns.push(key);
            }
        }

        if (missingColumns.length > 0) {
            return {
                success: false,
                message: `Format de fichier invalide. Les colonnes suivantes sont manquantes : ${missingColumns.join(", ")}.`,
            };
        }

        // Process and validate each row
        const processedUserData: ProcessedUserData[] = [];
        const processedBusinessData: ProcessedBusinessData[] = [];

        const errors: string[] = [];

        for (const [index, row] of rawData.entries()) {
            try {
                // Extract data according to column mapping
                const userData = {
                    name: row[columnMap.name!],
                    email: row[columnMap.email!],
                    bio: columnMap.bio ? row[columnMap.bio] : undefined,
                };

                // Validate row data
                const validatedUser = ExcelRowSchema.safeParse(userData);

                if (!validatedUser.success) {
                    errors.push(
                        `Ligne ${index + 2}: ${validatedUser.error.message}`
                    );
                    continue;
                }

                const userId = crypto.randomUUID();
                // Create user data
                const processedUser: ProcessedUserData = {
                    id: userId,
                    role: "user",
                    emailVerified: false,
                    ...validatedUser.data,
                };

                // Validate final user data
                processedUserData.push(processedUser);

                const hasBusinessData =
                    columnMap.companyName && row[columnMap.companyName];

                if (hasBusinessData) {
                    console.log(`Business data reçues : ${hasBusinessData}`);
                    if (!columnMap.phone || !row[columnMap.phone]) {
                        errors.push(
                            `Ligne ${index + 2} (entreprise): Le numéro de téléphone est obligatoire`
                        );
                        continue;
                    }
                    const businessData = {
                        id: crypto.randomUUID(),
                        userId: userId, // Associer l'entreprise à l'utilisateur
                        companyName: row[columnMap.companyName!],
                        businessDescription: columnMap.businessDescription
                            ? row[columnMap.businessDescription]
                            : undefined,
                        phone: columnMap.phone
                            ? String(row[columnMap.phone])
                            : undefined,
                        website: columnMap.website
                            ? row[columnMap.website]
                            : undefined,
                        siretNum: columnMap.siretNum
                            ? String(row[columnMap.siretNum])
                            : undefined,
                        productTypes: row[columnMap.productTypes!],
                    };

                    // Valider les données business
                    const validatedBusiness =
                        ProcessedBusinessSchema.safeParse(businessData);

                    if (!validatedBusiness.success) {
                        errors.push(
                            `Ligne ${index + 2} (entreprise): ${validatedBusiness.error.message}`
                        );
                        continue;
                    }

                    processedBusinessData.push(validatedBusiness.data);
                }
            } catch (error) {
                if (error instanceof z.ZodError) {
                    errors.push(
                        `Ligne ${index + 2}: ${error.errors[0].message}`
                    );
                } else {
                    errors.push(
                        `Ligne ${index + 2}: Erreur de validation inattendue`
                    );
                }
            }
        }

        if (errors.length > 0) {
            const errorDetails = errors.join("\n• ");
            return {
                success: false,
                message: `Erreurs de validation : ${errorDetails}`,
                errors,
            };
        }

        await Promise.all(
            processedUserData.map(async (user) => {
                const token = createToken(user.email);
                return await SendEmail({ email: user.email, name: user.name, token });
            })
        );

        // Insert users into the database
        await db.transaction(async (tx) => {
            // Insérer les utilisateurs
            await tx.insert(user).values(processedUserData);

            // Insérer les données business si présentes
            if (processedBusinessData.length > 0) {
                await tx.insert(businessInfo).values(processedBusinessData);
            }
        });

        return {
            success: true,
            message: `${processedUserData.length} utilisateurs et ${processedBusinessData.length} entreprises importés avec succès.`,
        };
    } catch (error) {
        console.error("Erreur lors de l'import :", error);

        return {
            success: false,
            message:
                error instanceof Error
                    ? error.message
                    : "Erreur lors de l'insertion des données.",
        };
    }
}

// Create and export the safe action
export const importFileAction = createServerAction()
    .input(ImportSchema)
    .handler(handler);
