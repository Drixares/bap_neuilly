"use server";

import * as XLSX from "xlsx";
import { db } from "@/db"; // Import de la connexion à la DB
import { user } from "@/db/schema/auth-schema"; // Table Drizzle

interface ExcelUserData {
    [key: string]: any; // Type flexible pour accepter différents noms de colonnes
}
  
interface ProcessedUserData {
    id: string;
    name: string;
    email: string;
    emailVerified: boolean;
    role: string;
    bio?: string;
}

type ValidRole = "user" | "artisan" | "admin";

function findColumn(row: ExcelUserData, possibleNames: string[]): string | null {
    const keys = Object.keys(row);
    for (const key of keys) {
      if (possibleNames.some(name => key.toLowerCase() === name.toLowerCase())) {
        return key;
      }
    }
    return null;
}

function isValidRole(role: string): role is ValidRole {
    return ["user", "artisan", "admin"].includes(role.toLowerCase());
}

export async function importFileAction(formData: FormData) {
    const file = formData.get("file") as File;
    
    if (!file) {
      return { success: false, message: "Aucun fichier reçu." };
    }
  
    if (!file.name.endsWith('.xlsx') && !file.name.endsWith('.xls')) {
      return { success: false, message: "Le fichier doit être au format Excel (.xlsx ou .xls)" };
    }
  
    try {
      // Lire le fichier en buffer
      const buffer = await file.arrayBuffer();
      const workbook = XLSX.read(buffer, { type: "buffer" });
  
      // Convertir la première feuille en JSON
      const worksheet = workbook.Sheets[workbook.SheetNames[0]];
      const rawData = XLSX.utils.sheet_to_json<ExcelUserData>(worksheet);
  
      if (rawData.length === 0) {
        return { success: false, message: "Le fichier ne contient aucune donnée." };
      }
  
      // Identifier les colonnes dans le fichier Excel
      const firstRow = rawData[0];
      const columnMap = {
        name: findColumn(firstRow, ["name", "nom", "username", "utilisateur"]),
        email: findColumn(firstRow, ["email", "mail", "courriel"]),
        role: findColumn(firstRow, ["role", "rôle", "fonction"]),
        bio: findColumn(firstRow, ["bio", "biographie", "description"])
      };
  
      // Vérifier que les colonnes requises sont présentes
      if (!columnMap.name || !columnMap.email || !columnMap.role) {
        return { 
          success: false, 
          message: "Format de fichier invalide. Les colonnes requises (nom, email, role) n'ont pas été trouvées." 
        };
      }
  
      // Traiter les données selon le mapping de colonnes
      const processedData = rawData.map((row, index) => {
        // Extraire les données selon les noms de colonnes identifiés
        const userData: ProcessedUserData = {
          id: crypto.randomUUID(),
          name: row[columnMap.name!],
          email: row[columnMap.email!],
          emailVerified: false,
          role: row[columnMap.role!],
          bio: columnMap.bio ? row[columnMap.bio] : undefined
        };
        
        // Validation des champs obligatoires
        if (!userData.name) {
          throw new Error(`Ligne ${index + 2}: Le champ "Nom" est requis.`);
        }
        if (!userData.email) {
          throw new Error(`Ligne ${index + 2}: Le champ "Email" est requis.`);
        }
        if (!userData.role) {
          throw new Error(`Ligne ${index + 2}: Le champ "Role" est requis.`);
        }
  
        return userData;
      });

      const insertData = processedData.map(userData => {
        let role: ValidRole;
        if (isValidRole(userData.role)) {
            role = userData.role.toLowerCase() as ValidRole;
          } else {
            // Default to "user" or throw an error, depending on your requirements
            role = "user"; 
            // Alternatively: throw new Error(`Invalid role "${userData.role}" for user ${userData.email}`);
          }
        return {
            id: userData.id,
            name: userData.name,
            email: userData.email,
            role: role,
            bio: userData.bio,
            emailVerified: false,
        };
      });
  
      // Insérer dans la base de données
      await db.insert(user).values(insertData);
  
      return { success: true, message: `${insertData.length} utilisateurs importés avec succès.` };
    } catch (error) {
      console.error("Erreur lors de l'import :", error);
      return { 
        success: false, 
        message: error instanceof Error ? error.message : "Erreur lors de l'insertion des données." 
      };
    }
  }