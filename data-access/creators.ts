import "server-only";

import { db } from "@/db";
import { BusinessInfo, businessInfo, User, user } from "@/db/schema";
import { desc, eq, inArray } from "drizzle-orm";

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
        .orderBy(desc(user.createdAt))
        .leftJoin(businessInfo, eq(user.id, businessInfo.userId))
        .where(eq(user.role, "user"));

    return creators;
}

export const getCreatorById = async (id: string) => {
    const creator = await db
        .select()
        .from(user)
        .where(eq(user.id, id))
        .limit(1);
    return creator[0];
};

export const getCreatorIdByEmail = async (email: string) => {
    const creator = await db.select().from(user).where(eq(user.email, email));
    return creator[0].id;
};

export const getCreatorByEmail = async (email: string) => {
    const creator = await db.select().from(user).where(eq(user.email, email));
    return creator;
};

export const updateCreator = async (id: string, data: Partial<User>) => {
    await db.update(user).set(data).where(eq(user.id, id));
};

export const updateBusinessInfo = async (
    id: string,
    data: Partial<BusinessInfo>
) => {
    await db.update(businessInfo).set(data).where(eq(businessInfo.userId, id));
};

export const updateCreatorAndBusinessInfo = async (
    id: string,
    data: Partial<User & BusinessInfo>
) => {
    const { companyName, businessDescription, siretNum, phone, ...rest } = data;

    try {
        await db.update(user).set(rest).where(eq(user.id, id));
        await db
            .update(businessInfo)
            .set({ companyName, businessDescription, siretNum, phone })
            .where(eq(businessInfo.userId, id));

        return true;
    } catch (error) {
        console.error("Error updating creator", error);
        return false;
    }
};

export const verifyCreator = async (id: string) => {
    await db.update(user).set({ emailVerified: true }).where(eq(user.id, id));
};

export const deleteCreators = async (ids: string[]) => {
    await db.delete(user).where(inArray(user.id, ids));
};