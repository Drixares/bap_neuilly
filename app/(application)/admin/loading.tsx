import { Loader2 } from "lucide-react";

export default function Loading() {
    return (
        <div className="flex min-h-svh flex-col items-center justify-center gap-6 bg-background p-6 md:p-10">
            <div className="w-full max-w-sm">
                <div className="flex items-center justify-center gap-2">
                    <Loader2 className="size-10 animate-spin" />
                    <p className="text-xl font-medium text-muted-foreground">
                        Chargement des données...
                    </p>
                </div>
            </div>
        </div>
    );
}
