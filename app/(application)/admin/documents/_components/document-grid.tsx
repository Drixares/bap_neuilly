import { Document } from "@/db/schema/auth-schema";
import { DocumentCard } from "./document-card";

interface DocumentGridProps {
    documents: Document[];
}

export function DocumentGrid({ documents }: DocumentGridProps) {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {documents.map((document) => (
                <DocumentCard key={document.id} document={document} />
            ))}
        </div>
    );
} 