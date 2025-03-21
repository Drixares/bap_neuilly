import { db } from "@/db";
import { document } from "@/db/schema/auth-schema";
import crypto from "crypto";

export async function seedDocuments(users: { id: string }[]) {
    const documents = [
        {
            id: crypto.randomUUID(),
            title: "Guide des bonnes pratiques artisanales",
            description: "Document de référence pour les artisans",
            fileUrl: "https://storage.example.com/documents/guide.pdf",
            fileKey: "guide.pdf",
            fileSize: "2097152", // 2MB
            fileType: "application/pdf",
            uploadedById: users[0].id,
        },
        {
            id: crypto.randomUUID(),
            title: "Catalogue des produits 2025",
            description: "Catalogue complet des produits disponibles",
            fileUrl: "https://storage.example.com/documents/catalogue.pdf",
            fileKey: "catalogue.pdf",
            fileSize: "5242880", // 5MB
            fileType: "application/pdf",
            uploadedById: users[0].id,
        },
    ];

    await db.insert(document).values(documents);
    return documents;
} 