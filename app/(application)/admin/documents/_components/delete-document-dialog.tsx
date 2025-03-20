"use client";

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Document } from "@/db/schema";
import { Trash } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useServerAction } from "zsa-react";
import { deleteDocumentAction } from "../actions";

interface DeleteDocumentDialogProps {
    document: Document;
}

export const DeleteDocumentDialog = ({
    document,
}: DeleteDocumentDialogProps) => {
    const router = useRouter();

    const { execute } = useServerAction(deleteDocumentAction, {
        onSuccess: () => {
            toast.success("Document supprimé avec succès");
            router.refresh();
        },
        onError: (error) => {
            toast.error(
                "Une erreur est survenue lors de la suppression du document"
            );
            console.error(error);
        },
    });

    const handleDelete = () => {
        execute({ id: document.id });
    };

    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <Button
                    variant="outline"
                    size="sm"
                    className="hover:bg-red-500/10 hover:border-red-500/20"
                >
                    <Trash className="size-4" />
                </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Êtes-vous sûr ?</AlertDialogTitle>
                    <AlertDialogDescription>
                        Cette action est irréversible. Le document sera
                        définitivement supprimé.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Annuler</AlertDialogCancel>
                    <AlertDialogAction
                        className="bg-red-500 hover:bg-red-600"
                        onClick={handleDelete}
                    >
                        Supprimer
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
};
