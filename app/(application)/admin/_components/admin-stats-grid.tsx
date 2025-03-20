import { StatsGrid } from "@/components/stats-grid";
import { getStats } from "@/use-cases/stats";
import {
    RiFileTextLine,
    RiQuestionnaireFill,
    RiUser3Fill,
    RiUserFollowFill,
} from "@remixicon/react";

export default async function AdminStatsGrid() {
    const stats = await getStats();

    return (
        <StatsGrid
            stats={[
                {
                    title: "Artisans inscrits",
                    value: stats.numberCreators.toString(),
                    href: "/admin/artisans",
                    icon: RiUser3Fill,
                },
                {
                    title: "Artisans validés",
                    value: stats.numberVerifiedCreators.toString(),
                    href: "/admin/artisans",
                    icon: RiUserFollowFill,
                },
                {
                    title: "Documents",
                    value: stats.numberDocuments.toString(),
                    href: "/admin/documents",
                    icon: RiFileTextLine,
                },
                {
                    title: "Demandes en attente",
                    value: stats.numberRequests.toString(),
                    href: "/admin/demandes",
                    icon: RiQuestionnaireFill,
                },
            ]}
        />
    );
}
