"use server";

import { db } from "@/db";
import { businessInfo } from "@/db/schema/auth-schema";
import { eq } from "drizzle-orm";

export async function getBusinessInfoByArtisanId(artisanId: string) {
    try {
        const businessInfos = await db.select()
            .from(businessInfo)
            .where(eq(businessInfo.userId, artisanId))
            .limit(1);
        
        return businessInfos.length > 0 ? businessInfos[0] : null;
    } catch (error) {
        console.error("Erreur lors de la récupération des informations d'entreprise:", error);
        throw error;
    }
}