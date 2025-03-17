import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Made In Neuilly - Administration",
};

import ContactsTable from "@/components/contacts-table";
import { StatsGrid } from "@/components/stats-grid";
import { Button } from "@/components/ui/button";
import {
    RiFileTextLine,
    RiQuestionnaireFill,
    RiUser3Fill,
    RiUserFollowFill,
} from "@remixicon/react";

export default function AdminPage() {
    return (
        <>
            {/* Page intro */}
            <div className="flex items-center justify-between gap-4">
                <div className="space-y-1">
                    <h1 className="text-2xl font-semibold">Bonjour, Larry!</h1>
                    <p className="text-sm text-muted-foreground">
                        Voici un récapitulatif de vos artisans. Gérez ou créez
                        de nouveaux artisans avec facilité !
                    </p>
                </div>
                <Button className="px-3">Importer des artisans</Button>
            </div>
            {/* Numbers */}
            <StatsGrid
                stats={[
                    {
                        title: "Artisans inscrits",
                        value: "30",
                        href: "/admin/artisans",
                        icon: RiUser3Fill,
                    },
                    {
                        title: "Artisans validés",
                        value: "24",
                        href: "/admin/artisans",
                        icon: RiUserFollowFill,
                    },
                    {
                        title: "Documents",
                        value: "12",
                        href: "/admin/documents",
                        icon: RiFileTextLine,
                    },
                    {
                        title: "Demandes en attente",
                        value: "5",
                        href: "/admin/demandes",
                        icon: RiQuestionnaireFill,
                    },
                ]}
            />
            {/* Table */}
            <div className="min-h-[100vh] flex-1 md:min-h-min">
                <ContactsTable />
            </div>
        </>
    );
}
