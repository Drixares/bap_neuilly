"use server";

import { FirstAdminFormSchema } from "@/app/schema";
import { db } from "@/db";
import { user } from "@/db/schema";
import { auth } from "@/lib/auth";
import {
    FirstAdminFormResponse,
    FirstAdminSchemaType,
} from "@/types/admin-form";
import { eq, inArray } from "drizzle-orm";

export async function createFirstAdminUser(
    data: FirstAdminSchemaType
): Promise<FirstAdminFormResponse> {
    try {
        const bodyParsed = FirstAdminFormSchema.safeParse(data);

        if (!bodyParsed.success) {
            return { success: false, errors: bodyParsed.error.issues };
        }

        await auth.api.signUpEmail({
            body: {
                email: bodyParsed.data.email,
                password: bodyParsed.data.password,
                name: bodyParsed.data.name,
            },
        });

        await db
            .update(user)
            .set({
                role: "admin",
            })
            .where(eq(user.email, bodyParsed.data.email));

        return { success: true, message: "User created successfully" };
    } catch (error) {
        console.error(error);
        return { success: false, message: "User creation failed" };
    }
}

export async function deleteUsers(ids: string[]) {

    try {
        await db.delete(user).where(inArray(user.id, ids));

        return {
            success: true,
            message: "Users deleted successfully",
        };
        
    } catch (error) {
        console.error(error);
        return {
            success: false,
            message: "Users deletion failed",
        };
    }
}
