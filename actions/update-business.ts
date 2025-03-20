"use server";
import { db } from "@/db";
import { businessInfo } from "@/db/schema/auth-schema";
import { eq } from "drizzle-orm";

export async function UpdateBusinessAction(
    businessInfoId: string,
    companyName: string,
    siretNum: string,
    productTypes: string,
    phone: string,
    businessDescription?: string,
    website?: string
) {
    const result = await db.update(businessInfo)
        .set({
            companyName,
            siretNum,
            productTypes,
            businessDescription,
            phone,
            website,
        })
        .where(eq(businessInfo.id, businessInfoId))
        .returning();

    return result[0];
}
