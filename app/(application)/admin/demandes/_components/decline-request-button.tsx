"use client"

import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { XCircle } from "lucide-react";
import { toast } from "sonner";
import { useServerAction } from "zsa-react";
import { updateRequestStatusAction } from "../actions";

export function DeclineRequestButton({ requestId }: { requestId: string }) {
    const { execute } = useServerAction(updateRequestStatusAction, {
        onSuccess: () => {
            toast.success("Demande rejetée avec succès.");
        },
        onError: () => {
            toast.error("Une erreur est survenue lors du rejet de la demande.");
        },
    });

    const handleDecline = () => {
        execute({ requestId, status: "rejetée" });
    };

    return (
        <DropdownMenuItem onClick={handleDecline} className="cursor-pointer">
            <XCircle className="mr-2 size-4" />
            Rejeter
        </DropdownMenuItem>
    )
}
