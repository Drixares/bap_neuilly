import { adminUserExistsUseCase } from "@/use-cases/admin";
import { redirect } from "next/navigation";

export default async function CreateAdminProvider({
    children,
}: {
    children: React.ReactNode;
}) {
    const isAdminUserExists = await adminUserExistsUseCase();

    if (isAdminUserExists) {
        return redirect("/");
    }

    return <>{children}</>;
}
