import "server-only";

import { db } from "@/db";
import { Document, document } from "@/db/schema";
import { count, eq } from "drizzle-orm";

export async function getDocuments() {
    const allDocuments = await db.select().from(document);
    return allDocuments;
}

export async function getDocumentById(id: string) {
    const doc = await db.select().from(document).where(eq(document.id, id));
    return doc;
}

export async function getNumberOfDocuments() {
    const numberOfDocuments = await db
        .select({
            count: count(),
        })
        .from(document);
    return numberOfDocuments[0].count;
}

export async function updateDocument(id: string, data: Partial<Document>) {
    await db.update(document).set(data).where(eq(document.id, id));
}

export async function deleteDocument(id: string) {
    await db.delete(document).where(eq(document.id, id));
}

export async function createDocument(
    title: string,
    file: File,
    uploadedById: string,
    description?: string
) {
    const fileKey = `${Date.now()}-${file.name}`;
    const fileUrl =
        process.env.NODE_ENV === "development"
            ? `http://localhost:3000/uploads/${file.name}`
            : `https://${process.env.NEXT_PUBLIC_BUCKET_NAME}.s3.amazonaws.com/${fileKey}`;

    await db.insert(document).values({
        title,
        description,
        fileUrl,
        fileKey,
        fileSize: file.size.toString(),
        fileType: file.type,
        uploadedById,
    });
}
