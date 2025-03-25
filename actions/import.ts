"use server";

import { ExcelRowSchema, ProcessedBusinessSchema } from "@/app/schema";
import { db } from "@/db"; // Import de la connexion à la DB
import { businessInfo } from "@/db/schema/auth-schema"; // Table Drizzle
import { auth } from "@/lib/auth";
import { authClient } from "@/lib/auth-client";
import { findColumn } from "@/lib/utils";
import {
    ExcelRow,
    ProcessedBusinessData,
    ProcessedUserData,
} from "@/types/excel-import";
import { UserWithRole } from "better-auth/plugins";
import crypto from "crypto";
import { headers } from "next/headers";
import { read, utils } from "xlsx";
import { z } from "zod";
import { createServerAction } from "zsa";

// Types and Schemas
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

export type ReturnType = z.infer<typeof ImportOutputSchema>;

// Column mapping configuration
const COLUMN_MAPPINGS = {
    name: ["name", "nom", "username", "utilisateur"] as string[],
    email: ["email", "mail", "courriel"] as string[],
    bio: ["bio", "biographie", "description"] as string[],
    companyName: ["entreprise", "companyName", "company"] as string[],
    businessDescription: ["businessDescription", "description", "descriptionEntreprise"] as string[],
    phone: ["phone", "telephone", "téléphone"] as string[],
    website: ["website", "site", "siteWeb"] as string[],
    siretNum: ["siretNum", "Numéro de Siret", "Siret Number"] as string[],
    productTypes: ["productType", "type du produit", "Product Type"] as string[],
} as const;

// Utility functions
const validateFile = (file: File) => {
    if (!file) {
        throw new Error("Aucun fichier reçu.");
    }

    if (!file.name.match(/\.(xlsx|xls)$/i)) {
        throw new Error("Le fichier doit être au format Excel (.xlsx ou .xls)");
    }
};

const parseExcelFile = async (file: File) => {
    const buffer = await file.arrayBuffer();
    const workbook = read(buffer, { type: "buffer" });
    const worksheet = workbook.Sheets[workbook.SheetNames[0]];
    const rawData = utils.sheet_to_json<ExcelRow>(worksheet);

    if (rawData.length === 0) {
        throw new Error("Le fichier ne contient aucune donnée.");
    }

    return rawData; 
};

const getColumnMap = (firstRow: ExcelRow) => {    
    const columnMap = Object.entries(COLUMN_MAPPINGS).reduce((acc, [key, values]) => {
        const column = findColumn(firstRow, values);
        acc[key as keyof typeof COLUMN_MAPPINGS] = column || undefined;
        return acc;
    }, {} as Record<keyof typeof COLUMN_MAPPINGS, string | undefined>);

    const requiredColumns = ["name", "email", "companyName", "phone"];
    const missingColumns = requiredColumns.filter(key => !columnMap[key as keyof typeof columnMap]);

    if (missingColumns.length > 0) {
        throw new Error(
            `Format de fichier invalide. Les colonnes suivantes sont manquantes : ${missingColumns.join(", ")}.`
        );
    }

    return columnMap;
};

type ProcessUserDataInput = {
    row: ExcelRow;
    columnMap: Record<keyof typeof COLUMN_MAPPINGS, string | undefined>;
    index: number;
}

const processUserData = (input: ProcessUserDataInput): ProcessedUserData => {
    const { row, columnMap, index } = input;
    const userData = {
        name: row[columnMap.name!],
        email: row[columnMap.email!],
        bio: columnMap.bio ? row[columnMap.bio] : undefined,
    };

    const validatedUser = ExcelRowSchema.safeParse(userData);
    if (!validatedUser.success) {
        throw new Error(`Ligne ${index + 2}: ${validatedUser.error.message}`);
    }

    return {
        id: crypto.randomUUID(),
        role: "user",
        emailVerified: false,
        ...validatedUser.data,
    };
};

type ProcessedBusinessDataInput = {
    row: ExcelRow;
    columnMap: Record<keyof typeof COLUMN_MAPPINGS, string | undefined>;
    userId: string;
    index: number;
}

const processBusinessData = (input: ProcessedBusinessDataInput): ProcessedBusinessData | null => {
    const { row, columnMap, userId, index } = input;

    if (!columnMap.companyName || !row[columnMap.companyName]) {
        throw new Error(`Ligne ${index + 2} (entreprise): Le nom de l'entreprise est obligatoire`);
    }

    if (!columnMap.phone || !row[columnMap.phone]) {
        throw new Error(`Ligne ${index + 2} (entreprise): Le numéro de téléphone est obligatoire`);
    }

    const businessData = {
        userId,
        companyName: row[columnMap.companyName],
        businessDescription: columnMap.businessDescription ? row[columnMap.businessDescription] : undefined,
        phone: String(row[columnMap.phone]),
        website: columnMap.website ? row[columnMap.website] : undefined,
        siretNum: columnMap.siretNum ? String(row[columnMap.siretNum]) : undefined,
        productTypes: columnMap.productTypes ? row[columnMap.productTypes] : undefined,
    };

    const validatedBusiness = ProcessedBusinessSchema.safeParse(businessData);
    if (!validatedBusiness.success) {
        throw new Error(`Ligne ${index + 2} (entreprise): ${validatedBusiness.error.message}`);
    }

    return validatedBusiness.data;
};

const createUser = async (user: ProcessedUserData): Promise<UserWithRole> => {
    const tempPassword = crypto.randomBytes(16).toString("hex");
    try {
        const createdUser = await auth.api.createUser({
            body: {
                email: user.email,
                name: user.name,
                password: tempPassword,
                role: user.role,
                data: {
                    id: user.id,
                    bio: user.bio,
                },
            },
            headers: await headers(),
        });

        return createdUser.user;
    } catch (error) {
        throw new Error(
            `Failed to create user ${user.email}: ${error instanceof Error ? error.message : "Unknown error"}`
        );
    }
};

const sendWelcomeEmail = async (user: ProcessedUserData) => {
    const { data, error } = await authClient.signIn.magicLink({
        name: user.name,
        email: user.email,
        callbackURL: "/login",
    });

    if (error) {
        throw new Error(error.message);
    }

    console.log("Mail envoyé à :", user.email, "avec le status :", data.status)
    return data;
};

export const importFileAction = createServerAction()
    .input(ImportSchema)
    .handler(async ({ input: { file } }): Promise<ReturnType> => {
        
        const session = await auth.api.getSession({
            headers: await headers(),
        });

        if (!session?.user || session.user.role !== "admin") {
            throw new Error("Non autorisé.");
        }

        validateFile(file);

        const rawData = await parseExcelFile(file);
        const columnMap = getColumnMap(rawData[0]);

        const processedUserData: ProcessedUserData[] = [];
        const processedBusinessData: ProcessedBusinessData[] = [];

        // First, process all the data
        for (const [index, row] of rawData.entries()) {
            const user = processUserData({ row, columnMap, index });
            processedUserData.push(user);

            const business = processBusinessData({ row, columnMap, userId: user.id, index });
            if (business) {
                processedBusinessData.push(business);
            }
        }

        try {
            // Create users first
            await Promise.all(processedUserData.map(createUser));

            // Insert business data only after users are created
            if (processedBusinessData.length > 0) {
                await db.transaction(async (tx) => {
                    await tx.insert(businessInfo).values(processedBusinessData);
                });
            }

            // Send welcome emails
            await Promise.all(processedUserData.map(sendWelcomeEmail));

            return {
                success: true,
                message: `${processedUserData.length} utilisateurs et ${processedBusinessData.length} entreprises importés avec succès.`,
            };
        } catch (error) {
            console.error("Import error:", error);
            return {
                success: false,
                message: "Une erreur est survenue lors de l'import.",
                errors: [error instanceof Error ? error.message : "Erreur inconnue"],
            };
        }
    });
