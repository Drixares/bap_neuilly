import { CreatorGrid } from "@/app/(application)/admin/artisans/_components/creator-grid";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export default async function AdminArtisansPage() {
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
                        Liste des créateurs
                    </h1>
                    <p className="text-sm text-muted-foreground">
                        Gérez ou créez de nouveaux créateurs avec facilité !
                    </p>
                </div>
            </div>

            {/* Creator grid */}
            <CreatorGrid />
        </div>
    );
}
