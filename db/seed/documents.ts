import { db } from "@/db";
import { document } from "@/db/schema/auth-schema";
import { documents } from "./datas";

export async function seedDocuments() {
    await db.insert(document).values(documents);
    return documents;
}
