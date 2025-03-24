"use server";

import { db } from "@/db";
import { businessInfo } from "@/db/schema";
import { auth } from "@/lib/auth";
import { eq } from "drizzle-orm";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { z } from "zod";
import { createServerAction } from "zsa";

const UpdateBusinessSchema = z.object({
    businessInfoId: z.string(),
    companyName: z.string(),
    siretNum: z.string(),
    productTypes: z.string(),
    phone: z.string(),
    businessDescription: z.string().optional(),
    website: z.string().optional(),
});

// sign out action using zsa and better-auth
export async function signOut() {
    await auth.api.signOut({
        headers: await headers(),
    });

    redirect("/login");
}

export const UpdateBusinessAction = createServerAction()
    .input(UpdateBusinessSchema)
    .handler(async ({ input }) => {
        const { businessInfoId, companyName, siretNum, productTypes, phone, businessDescription, website } = input;

        const result = await db
            .update(businessInfo)
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
});