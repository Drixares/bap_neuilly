"use client";

import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { z } from "zod";
import { useServerAction } from "zsa-react";
import { createDocumentAction } from "../actions";
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
    fileUrl: z.string().optional(),
    fileType: z.string().optional(),
    fileSize: z.string().optional(),
});

type UploadFormValues = z.infer<typeof uploadFormSchema>;

export default function NewDocumentBlock() {
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const router = useRouter();

    const { execute } = useServerAction(createDocumentAction, {
        onSuccess: () => {
            toast.success("Document créé avec succès");
            setIsDialogOpen(false);
            router.refresh();
        },
        onError: (error) => {
            toast.error(error.err.message);
        },
    });

    const handleUpload = async (data: UploadFormValues) => {
        try {
            // 1. Upload the file
            const formData = new FormData();
            formData.append("file", data.file);

            const uploadResponse = await fetch("/api/upload", {
                method: "POST",
                body: formData,
            });

            if (!uploadResponse.ok) {
                throw new Error("Erreur lors de l'upload du fichier");
            }

            await uploadResponse.json();

            // 2. Create document record
            await execute(data);
        } catch (error) {
            console.error("Upload error:", error);
            toast.error("Erreur lors de l'upload du fichier");
        }
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
