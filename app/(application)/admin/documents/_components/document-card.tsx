import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Document } from "@/db/schema/auth-schema";
import { cn } from "@/lib/utils";
import {
    RemixiconComponentType,
    RiFile2Fill,
    RiFileExcel2Fill,
    RiFilePdf2Fill,
    RiFileWord2Fill,
} from "@remixicon/react";
import { formatDistanceToNow } from "date-fns";
import { fr } from "date-fns/locale";
import { DownloadIcon } from "lucide-react";
import Link from "next/link";
import { useCallback } from "react";
import { DeleteDocumentDialog } from "./delete-document-dialog";

interface DocumentCardProps {
    document: Document;
}

type DocumentCardIcon = {
    icon: RemixiconComponentType;
    color: string;
};

const icons: Record<string, DocumentCardIcon> = {
    "application/pdf": {
        icon: RiFilePdf2Fill,
        color: "text-red-400/60",
    },
    "application/xlsx": {
        icon: RiFileExcel2Fill,
        color: "text-green-400/60",
    },
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": {
        icon: RiFileExcel2Fill,
        color: "text-green-400/60",
    },
    "application/docx": {
        icon: RiFileWord2Fill,
        color: "text-blue-400/60",
    },
    "application/doc": {
        icon: RiFileWord2Fill,
        color: "text-blue-400/60",
    },
    "application/pptx": {
        icon: RiFile2Fill,
        color: "text-purple-400/60",
    },
    "application/xls": {
        icon: RiFileExcel2Fill,
        color: "text-green-400/60",
    },
    "application/msword": {
        icon: RiFileWord2Fill,
        color: "text-blue-400/60",
    },
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document": {
        icon: RiFileWord2Fill,
        color: "text-blue-400/60",
    },
};

export function DocumentCard({ document }: DocumentCardProps) {
    const Icon =
        icons[document.fileType as keyof typeof icons].icon || RiFile2Fill;
    const color =
        icons[document.fileType as keyof typeof icons].color ||
        "text-muted-foreground";

    const formatFileSize = useCallback((size: string) => {
        const sizeNum = parseInt(size);
        if (sizeNum < 1024) return `${sizeNum} B`;
        if (sizeNum < 1024 * 1024) return `${(sizeNum / 1024).toFixed(1)} KB`;
        return `${(sizeNum / (1024 * 1024)).toFixed(1)} MB`;
    }, []);

    return (
        <Card className="flex flex-col h-full relative">
            <CardHeader>
                <div className="flex items-start justify-between gap-1">
                    <div className="flex-1">
                        <CardTitle className="text-lg font-semibold">
                            {document.title}
                        </CardTitle>
                        <CardDescription className="text-sm text-muted-foreground break-all">
                            {formatFileSize(document.fileSize)} •{" "}
                            {document.fileType}
                        </CardDescription>
                    </div>
                    <Icon
                        className={cn(
                            "size-5 text-muted-foreground flex-shrink-0",
                            color
                        )}
                    />
                </div>
            </CardHeader>
            <CardContent>
                <p className="text-sm text-muted-foreground line-clamp-2">
                    {document.description}
                </p>
            </CardContent>
            <CardFooter className="mt-auto">
                <div className="flex items-center justify-between w-full gap-2">
                    <span className="text-xs text-muted-foreground text-balance">
                        Ajouté il y a{" "}
                        {formatDistanceToNow(new Date(document.createdAt), {
                            locale: fr,
                        })}
                    </span>
                    <div className="flex items-center gap-2">
                        <Button variant="outline" size="sm" asChild>
                            <Link href={document.fileUrl} target="_blank">
                                <DownloadIcon className="size-4" />
                                Télécharger
                            </Link>
                        </Button>
                        <DeleteDocumentDialog document={document} />
                    </div>
                </div>
            </CardFooter>
        </Card>
    );
}
