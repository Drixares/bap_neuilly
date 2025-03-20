import { auth } from "@/lib/auth";
import type { Metadata } from "next";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import AdminStatsGrid from "./_components/admin-stats-grid";
import { CreatorsTable } from "./_components/creators-table";
import ImportExcelBlock from "./_components/import-excel-block";

export const metadata: Metadata = {
    title: "Made In Neuilly - Administration",
};

export default async function AdminPage() {

    const session = await auth.api.getSession({
        headers: await headers(),
    });

    if (!session) {
        return redirect("/");
    }

    return (
        <>
            {/* Page intro */}
            <div className="flex items-center justify-between gap-4">
                <div className="space-y-1">
                    <h1 className="text-2xl font-semibold">
                        Bonjour, {session.user.name}!
                    </h1>
                    <p className="text-sm text-muted-foreground">
                        Voici un récapitulatif de vos artisans. Gérez ou créez
                        de nouveaux artisans avec facilité !
                    </p>
                </div>
                <ImportExcelBlock />
            </div>
            {/* Numbers */}
            <AdminStatsGrid />
            {/* Table */}
            <div className="min-h-[100vh] flex-1 md:min-h-min">
                <CreatorsTable />
            </div>
        </>
    );
}
