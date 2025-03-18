import { Artisan } from "@/types/artisan";
import { ArtisanCard } from "./artisan-card";

interface ArtisanGridProps {
    artisans: Artisan[];
}

export function ArtisanGrid({ artisans }: ArtisanGridProps) {
    if (artisans.length === 0) {
        return (
            <div className="text-center py-8 text-muted-foreground">
                Aucun artisan trouvé
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {artisans.map((artisan) => (
                <ArtisanCard key={artisan.id} artisan={artisan} />
            ))}
        </div>
    );
} 