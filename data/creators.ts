import "server-only";

import { db } from "@/db";
import { businessInfo, user } from "@/db/schema";
import { and, eq } from "drizzle-orm";

export async function getCreators() {
    const creators = await db
        .select({
            id: user.id,
            name: user.name,
            email: user.email,
            image: user.image,
            bio: user.bio,
            businessInfoId: user.businessInfoId,
            businessInfo: {
                id: businessInfo.id,
                companyName: businessInfo.companyName,
                businessDescription: businessInfo.businessDescription,
                phone: businessInfo.phone,
                website: businessInfo.website,
            },
        })
        .from(user)
        .where(and(eq(user.role, "user"), eq(user.emailVerified, true)))
        .leftJoin(businessInfo, eq(user.businessInfoId, businessInfo.id));

    return creators;
}
