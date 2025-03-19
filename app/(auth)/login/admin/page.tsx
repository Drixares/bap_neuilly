import LoginProvider from "@/providers/login-provider";
import LoginAdminForm from "./_components/login-admin-form";

export default function LoginAdminPage() {
    return (
        <LoginProvider>
            <div className="flex min-h-svh flex-col items-center justify-center gap-6 bg-background p-6 md:p-10">
                <div className="w-full max-w-sm">
                    <LoginAdminForm />
                </div>
            </div>
        </LoginProvider>
    );
}
