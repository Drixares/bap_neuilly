import { getDocumentsUseCase } from "@/use-cases/documents";
import { DocumentCard } from "./document-card";

export async function DocumentGrid() {
    const documents = await getDocumentsUseCase();

    if (documents.length === 0) {
        return (
            <div className="text-center py-8 text-muted-foreground">
                Aucun document trouvé
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {documents.map((document) => (
                <DocumentCard key={document.id} document={document} />
            ))}
        </div>
    );
}
