import { db } from "@/db";
import { request } from "@/db/schema/auth-schema";
import { requests } from "./datas";

export async function seedRequests() {
    await db.insert(request).values(requests);
    return requests;
}
