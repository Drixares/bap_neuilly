import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { RequestGrid } from "./_components/request-grid";

export default async function AdminDemandesPage() {
    const session = await auth.api.getSession({
        headers: await headers(),
    });

    if (!session) {
        return redirect("/");
    }

    return (
        <div className="space-y-6">
            {/* Page intro */}
            <div className="flex items-center justify-between gap-4">
                <div className="space-y-1">
                    <h1 className="text-2xl font-semibold">
                        Liste des demandes
                    </h1>
                    <p className="text-sm text-muted-foreground">
                        Gérez les demandes des utilisateurs et suivez leur
                        statut.
                    </p>
                </div>
            </div>
            <RequestGrid />
        </div>
    );
}
