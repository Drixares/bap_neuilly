import { db } from "@/db";
import { businessInfo as businessInfoSchema } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function getBusinessInfoByArtisanId(artisanId: string) {
    const businessInfo = await db.select().from(businessInfoSchema).where(eq(businessInfoSchema.userId, artisanId));
    return businessInfo.length > 0 ? businessInfo[0] : null;
}