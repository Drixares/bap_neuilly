"use server";

import { FirstAdminFormSchema } from "@/app/schema";
import { db } from "@/db";
import { user } from "@/db/schema";
import { auth } from "@/lib/auth";
import { eq, inArray } from "drizzle-orm";
import { createServerAction } from "zsa";

export const createFirstAdminUser = createServerAction()
    .input(FirstAdminFormSchema)
    .handler(async ({ input }) => {
        try {
            await auth.api.signUpEmail({
                body: {
                    email: input.email,
                    password: input.password,
                    name: input.name,
                },
            });

            await db
                .update(user)
                .set({
                    role: "admin",
                })
                .where(eq(user.email, input.email));

            return { success: true, message: "User created successfully" };
        } catch (error) {
            console.error(error);
            return { success: false, message: "User creation failed" };
        }
    });

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
