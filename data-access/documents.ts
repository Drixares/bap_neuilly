import "server-only";

import { db } from "@/db";
import { document } from "@/db/schema";
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
    const numberOfDocuments = await db.select({
        count: count(),
    }).from(document);
    return numberOfDocuments[0].count;
}


