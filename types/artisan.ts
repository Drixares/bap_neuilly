import { BusinessInfo, User } from "@/db/schema/auth-schema";

export type Artisan = User & {
    businessInfo: BusinessInfo | null;
};

export type ArtisanCardProps = {
    artisan: Artisan;
}; 