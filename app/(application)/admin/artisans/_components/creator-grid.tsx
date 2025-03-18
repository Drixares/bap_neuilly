import { Creator } from "@/types/creator";
import { CreatorCard } from "./creator-card";

interface CreatorGridProps {
    creators: Creator[];
}

export function CreatorGrid({ creators }: CreatorGridProps) {
    if (creators.length === 0) {
        return (
            <div className="text-center py-8 text-muted-foreground">
                Aucun artisan trouvé
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {creators.map((creator) => (
                <CreatorCard key={creator.id} creator={creator} />
            ))}
        </div>
    );
}
