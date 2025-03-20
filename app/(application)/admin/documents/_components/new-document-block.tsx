"use client";

import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useState } from "react";
import { z } from "zod";
import { UploadDialog } from "./upload-dialog";

const uploadFormSchema = z.object({
    file: z.custom<File>((v) => v instanceof File, {
        message: "Un fichier est requis",
    }),
    title: z
        .string()
        .min(1, "Le titre est requis")
        .max(100, "Le titre ne peut pas dépasser 100 caractères"),
    description: z
        .string()
        .max(500, "La description ne peut pas dépasser 500 caractères")
        .optional(),
});

type UploadFormValues = z.infer<typeof uploadFormSchema>;

export default function NewDocumentBlock() {
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    const handleUpload = async (data: UploadFormValues) => {
        // TODO: Implement the actual upload logic here
        // This is where you would:
        // 1. Upload the file to MinIO
        // 2. Create a new document record in your database
        console.log("Uploading document:", data);
    };

    return (
        <>
            <Button onClick={() => setIsDialogOpen(true)}>
                <Plus className="mr-2 size-4" />
                Nouveau document
            </Button>

            <UploadDialog
                isOpen={isDialogOpen}
                onClose={() => setIsDialogOpen(false)}
                onUpload={handleUpload}
                maxSize={10 * 1024 * 1024} // 10MB
                acceptedFileTypes={[
                    "application/pdf",
                    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
                    "application/msword",
                    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
                ]}
            />
        </>
    );
}
