import { ArtisanGrid } from "@/app/(application)/admin/artisans/_components/artisan-grid";
import { auth } from "@/lib/auth";
import { Artisan } from "@/types/artisan";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

// Mock data for demonstration
const mockArtisans: Artisan[] = [
    {
        id: "1",
        name: "Jean Dupont",
        email: "jean.dupont@example.com",
        emailVerified: true,
        verificationDate: new Date(),
        role: "Artisan",
        image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Jean",
        bio: "Artisan passionné par la création de meubles sur mesure",
        banned: false,
        banReason: null,
        banExpires: null,
        businessInfoId: "1",
        createdAt: new Date(),
        updatedAt: new Date(),
        businessInfo: {
            id: "1",
            companyName: "Atelier Dupont",
            businessDescription: "Création de meubles artisanaux",
            registrationNumber: "FR123456789",
            phone: "+33 6 12 34 56 78",
            website: "www.atelierdupont.fr",
            createdAt: new Date(),
            updatedAt: new Date(),
        },
    },
    {
        id: "2",
        name: "Marie Martin",
        email: "marie.martin@example.com",
        emailVerified: true,
        verificationDate: new Date(),
        role: "Artisan",
        image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Marie",
        bio: "Céramiste spécialisée dans la poterie traditionnelle",
        banned: false,
        banReason: null,
        banExpires: null,
        businessInfoId: "2",
        createdAt: new Date(),
        updatedAt: new Date(),
        businessInfo: {
            id: "2",
            companyName: "Céramiques Martin",
            businessDescription: "Création de pièces en céramique",
            registrationNumber: "FR987654321",
            phone: "+33 6 98 76 54 32",
            website: "www.ceramiquesmartin.fr",
            createdAt: new Date(),
            updatedAt: new Date(),
        },
    },
    {
        id: "3",
        name: "Pierre Dubois",
        email: "pierre.dubois@example.com",
        emailVerified: true,
        verificationDate: new Date(),
        role: "Artisan",
        image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Pierre",
        bio: "Forgeron d'art créant des pièces uniques",
        banned: false,
        banReason: null,
        banExpires: null,
        businessInfoId: "3",
        createdAt: new Date(),
        updatedAt: new Date(),
        businessInfo: {
            id: "3",
            companyName: "Forge Dubois",
            businessDescription: "Création de pièces en fer forgé",
            registrationNumber: "FR456789123",
            phone: "+33 6 45 67 89 01",
            website: "www.forgedubois.fr",
            createdAt: new Date(),
            updatedAt: new Date(),
        },
    },
];

export default async function AdminArtisansPage() {
    const session = await auth.api.getSession({
        headers: await headers(),
    });

    if (!session) {
        return redirect("/");
    }

    return (
        <div className="space-y-6">
            {/* Page intro */}
            <div className="flex items-center justify-between gap-4">
                <div className="space-y-1">
                    <h1 className="text-2xl font-semibold">
                        Liste des artisans
                    </h1>
                    <p className="text-sm text-muted-foreground">
                        Gérez ou créez de nouveaux artisans avec facilité !
                    </p>
                </div>
            </div>

            {/* Artisan grid */}
            <ArtisanGrid artisans={mockArtisans} />
        </div>
    );
}
