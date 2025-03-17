"use server";

import { auth } from "@/lib/auth";

export async function createUser(formData: FormData) {
    const { user } = await auth.api.signUpEmail({
        body: {
            email: "matteo@example.com",
            password: "test#1234",
            name: "Mattéo",
        },
    });

    console.log(user);
    return;
}
