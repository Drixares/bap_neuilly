"use server";

import SendEmail, { resend } from "@/app/api/send";
import { ExcelRowSchema } from "@/app/schema";
import { db } from "@/db"; // Import de la connexion à la DB
import { user } from "@/db/schema/auth-schema"; // Table Drizzle
import { EmailTemplate } from "@/email/template-email";
import { findColumn } from "@/lib/utils";
import { ExcelRow, ProcessedUserData } from "@/types/excel-import";
import { read, utils } from "xlsx";
import { z } from "zod";


export async function importFileAction(formData: FormData) {
    const file = formData.get("file") as File;
    
    if (!file) {
      return { success: false, message: "Aucun fichier reçu." };
    }
  
    if (!file.name.match(/\.(xlsx|xls)$/i)) {
      return { success: false, message: "Le fichier doit être au format Excel (.xlsx ou .xls)" };
    }
  
    try {
      const buffer = await file.arrayBuffer();
      const workbook = read(buffer, { type: "buffer" });
      const worksheet = workbook.Sheets[workbook.SheetNames[0]];
      const rawData = utils.sheet_to_json<ExcelRow>(worksheet);
  
      if (rawData.length === 0) {
        return { success: false, message: "Le fichier ne contient aucune donnée." };
      }
  
      // Map Excel columns to our schema
      const firstRow = rawData[0];
      const columnMap = {
        name: findColumn(firstRow, ["name", "nom", "username", "utilisateur"]),
        email: findColumn(firstRow, ["email", "mail", "courriel"]),
        bio: findColumn(firstRow, ["bio", "biographie", "description"]),
      };
  
      let missingColumns: string[] = [];

      for (const key in columnMap) {
        if (!columnMap[key as keyof typeof columnMap]) {
          missingColumns.push(key);
        }
      }

      if (missingColumns.length > 0) {
        return { 
          success: false, 
          message: `Format de fichier invalide. Les colonnes suivantes sont manquantes : ${missingColumns.join(", ")}.` 
        };
      }
  
      // Process and validate each row
      const processedData: ProcessedUserData[] = [];
      const errors: string[] = [];
  
      for (const [index, row] of rawData.entries()) {
        try {
          // Extract data according to column mapping
          const rowData = {
            name: row[columnMap.name!],
            email: row[columnMap.email!],
            bio: columnMap.bio ? row[columnMap.bio] : undefined,
          };
  
          // Validate row data
          const validatedRow = ExcelRowSchema.safeParse(rowData);
  
          if (!validatedRow.success) {
            errors.push(`Ligne ${index + 2}: ${validatedRow.error.message}`);
            return {
              success: false,
              message: "Erreurs de validation :",
              errors
            };
          }

          // Create user data
          const userData: ProcessedUserData = {
            id: crypto.randomUUID(),
            role: "user",
            emailVerified: false,
            ...validatedRow.data,
          };
  
          // Validate final user data
          processedData.push(userData);

        } catch (error) {

          if (error instanceof z.ZodError) {
            errors.push(`Ligne ${index + 2}: ${error.errors[0].message}`);
          } else {
            errors.push(`Ligne ${index + 2}: Erreur de validation inattendue`);
          }
        }
      }
  
      if (errors.length > 0) {
        return { 
          success: false, 
          message: "Erreurs de validation :", 
          errors 
        };
      }

      await Promise.all(
        processedData.map(async (user) => {
          return await SendEmail({ email: user.email, name: user.name });
        })
      );

  
      // Insert users into the database
      await db.insert(user).values(processedData);

      return { 
        success: true, 
        message: `${processedData.length} utilisateurs importés avec succès.` 
      };

    } catch (error) {
      console.error("Erreur lors de l'import :", error);
      
      return { 
        success: false, 
        message: error instanceof Error ? error.message : "Erreur lors de l'insertion des données." 
      };
    }
  }