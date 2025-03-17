import CreateAdminProvider from "@/providers/create-admin-provider";
import CreateFirstAdminForm from "./_components/create-first-admin-form";

export default function CreateAdminPage() {
    return (
        <CreateAdminProvider>
            <div className="flex min-h-svh flex-col items-center justify-center gap-6 bg-background p-6 md:p-10">
                <div className="w-full max-w-sm">
                    <CreateFirstAdminForm />
                </div>
            </div>
        </CreateAdminProvider>
    );
}
