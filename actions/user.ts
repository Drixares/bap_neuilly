"use server";

import { FirstAdminFormSchema } from "@/app/schema";
import { auth } from "@/lib/auth";
import {
    FirstAdminFormResponse,
    FirstAdminSchemaType,
} from "@/types/admin-form";

export async function createFirstAdminUser(
    data: FirstAdminSchemaType
): Promise<FirstAdminFormResponse> {
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

    return { success: true, message: "User created successfully" };
}
