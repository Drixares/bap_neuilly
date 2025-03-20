// actions/fetch-business-data.ts
"use server";

import { db } from "@/db";
import { businessInfo } from "@/db/schema/auth-schema";
import { eq } from "drizzle-orm";

export async function getBusinessInfoByArtisanId(artisanId: string) {
    console.log("Recherche des infos business pour artisanId:", artisanId);
    
    if (!artisanId) {
        console.error("artisanId est vide");
        return null;
    }

    try {
        const businessInfos = await db.select()
            .from(businessInfo)
            .where(eq(businessInfo.userId, artisanId))
            .limit(1);
        
        console.log("Résultats trouvés:", businessInfos.length);
        return businessInfos.length > 0 ? businessInfos[0] : null;
    } catch (error) {
        console.error("Erreur DB lors de la récupération:", error);
        throw error;
    }
}