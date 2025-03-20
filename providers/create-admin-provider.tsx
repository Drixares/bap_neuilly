import { adminUserExists } from "@/data-access/admin";
import { redirect } from "next/navigation";

export default async function CreateAdminProvider({
    children,
}: {
    children: React.ReactNode;
}) {
    const isAdminUserExists = await adminUserExists();

    if (isAdminUserExists) {
        return redirect("/");
    }

    return <>{children}</>;
}
