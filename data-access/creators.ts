import "server-only";

import { db } from "@/db";
import { businessInfo, user } from "@/db/schema";
import { eq } from "drizzle-orm";

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
            emailVerified: user.emailVerified,
            verificationDate: user.verificationDate,
            role: user.role,
            image: user.image,
            bio: user.bio,
            banned: user.banned,
            banReason: user.banReason,
            banExpires: user.banExpires,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt,
            businessInfo: businessInfo,
        })
        .from(user)
        .leftJoin(businessInfo, eq(user.id, businessInfo.userId))
        .where(eq(user.role, "user"));

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
