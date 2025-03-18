import { DocumentGrid } from "./_components/document-grid";

// Mock data based on our schema
const mockDocuments = [
    {
        id: "1",
        title: "Company Guidelines 2024",
        description: "Official company guidelines and policies for the year 2024.",
        fileUrl: "https://storage.minio.com/documents/guidelines-2024.pdf",
        fileKey: "guidelines-2024.pdf",
        fileSize: "2097152", // 2MB
        fileType: "application/pdf",
        uploadedById: "admin-1",
        createdAt: new Date("2024-01-15"),
        updatedAt: new Date("2024-01-15"),
    },
    {
        id: "2",
        title: "Q4 Financial Report",
        description: "Detailed financial analysis and metrics for Q4 2023.",
        fileUrl: "https://storage.minio.com/documents/q4-report.xlsx",
        fileKey: "q4-report.xlsx",
        fileSize: "1048576", // 1MB
        fileType: "application/xlsx",
        uploadedById: "admin-1",
        createdAt: new Date("2024-01-10"),
        updatedAt: new Date("2024-01-10"),
    },
];

export default function DocumentsPage() {
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
            </div>
            <DocumentGrid documents={mockDocuments} />
        </>
    );
} 