"use client"

import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { CheckCircle2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useServerAction } from "zsa-react";
import { updateRequestStatusAction } from "../actions";

export function AcceptRequestButton({ requestId }: { requestId: string }) {
    const router = useRouter();

    const { execute } = useServerAction(updateRequestStatusAction, {
        onSuccess: () => {
            toast.success("Demande validée avec succès");
            router.refresh();
        },
        onError: () => {
            toast.error("Une erreur est survenue lors de la validation de la demande");
        },
    });

    const handleAccept = () => {
        execute({ requestId, status: "validée" });
    };

    return (
        <DropdownMenuItem onClick={handleAccept}>
            <CheckCircle2 className="mr-2 size-4" />
            Valider
        </DropdownMenuItem>
    )
}