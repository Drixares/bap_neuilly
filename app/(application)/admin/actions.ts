"use server";

import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

// sign out action using zsa and better-auth
export async function signOut() {
    await auth.api.signOut({
        headers: await headers(),
    });

    redirect("/login");
}