import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { DocumentGrid } from "./_components/document-grid";
import NewDocumentBlock from "./_components/new-document-block";

export const revalidate = 0; // Disable caching for this page

export default async function DocumentsPage() {
    const session = await auth.api.getSession({
        headers: await headers(),
    });

    if (!session) {
        return redirect("/");
    }

    return (
        <>
            <div className="flex items-center justify-between gap-4">
                <div className="space-y-1">
                    <h1 className="text-2xl font-semibold">
                        Liste des documents
                    </h1>
                    <p className="text-sm text-muted-foreground">
                        Voici un récapitulatif de vos documents. Gérez ou créez
                        de nouveaux documents avec facilité !
                    </p>
                </div>
                <NewDocumentBlock />
            </div>
            <DocumentGrid />
        </>
    );
}
