"use client";

import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useServerAction } from "zsa-react";
import { deleteRequestAction } from "../actions";

export function DeleteRequestButton({ requestId }: { requestId: string }) {
    const router = useRouter();

    const { execute } = useServerAction(deleteRequestAction, {
        onSuccess: () => {
            console.log("Demande supprimée avec succès");
            toast.success("Demande supprimée avec succès");
            router.refresh();
        },
        onError: () => {
            toast.error(
                "Une erreur est survenue lors de la suppression de la demande"
            );
        },
    });

    const handleDelete = () => {
        execute({ requestId });
    };

    return (
        <DropdownMenuItem
            className="text-red-600 cursor-pointer"
            onClick={handleDelete}
        >
            <Trash2 className="mr-2 size-4" />
            Supprimer
        </DropdownMenuItem>
    );
}
