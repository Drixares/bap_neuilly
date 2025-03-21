"use server"

import { db } from "@/db";
import { user, emailVerification } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function getUserId(email : string)
{
    const getUser = await db.select().from(user).where(eq(user.email, email)).limit(1);
    return getUser[0].id;
}

export async function postEmailVerification(userId : string)
{
    const now = new Date();
    const expires = new Date(now.getTime() + 3600000); // +1 heure en millisecondes
    await db.insert(emailVerification).values({
        id: crypto.randomUUID(),
        userId: userId,
        expiresAt: expires,
    })
}

export async function updateVerification(userId : string){
    const date = new Date();
    await db.update(user).set({emailVerified: true, verificationDate:date}).where(eq(user.id, userId));
}