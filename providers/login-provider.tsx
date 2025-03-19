import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export default async function LoginProvider({ children }: { children: React.ReactNode }) {

    const session = await auth.api.getSession({
        headers: await headers(),
    });

    if (session?.user.role === "admin") {
        redirect("/admin");
    }

    if (session?.user.role === "user") {
        redirect("/dashboard");
    }

    return <>{children}</>;
}

