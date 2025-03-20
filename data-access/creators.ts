import "server-only";

import { db } from "@/db";
import { businessInfo, user } from "@/db/schema";
import { and, eq } from "drizzle-orm";

export async function getCreators() {
    const creators = await db.select().from(user).where(eq(user.role, "user"));
    return creators;
}

export async function getCreatorsWithBusinessInfo() {
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

export const getCreatorById = async (id: string) => {
    const creator = await db.select().from(user).where(eq(user.id, id));
    return creator; 
};

export const getCreatorByEmail = async (email: string) => {
    const creator = await db.select().from(user).where(eq(user.email, email));
    return creator;
};