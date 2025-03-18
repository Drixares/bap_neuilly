import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArtisanCardProps } from "@/types/artisan";
import { Building2, Mail, Phone } from "lucide-react";

export function ArtisanCard({ artisan }: ArtisanCardProps) {
    const initials = artisan.name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase();

    return (
        <Card className="overflow-hidden hover:shadow-lg transition-shadow">
            <CardHeader className="pb-2">
                <div className="flex items-center gap-4">
                    <Avatar className="h-12 w-12">
                        <AvatarImage src={artisan.image || undefined} />
                        <AvatarFallback>{initials}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                        <CardTitle className="text-lg">{artisan.name}</CardTitle>
                        {artisan.businessInfo && (
                            <div className="flex items-center gap-1 text-sm text-muted-foreground">
                                <Building2 className="h-4 w-4" />
                                <span>{artisan.businessInfo.companyName}</span>
                            </div>
                        )}
                    </div>
                </div>
            </CardHeader>
            <CardContent className="space-y-2">
                <div className="flex items-center gap-2 text-sm">
                    <Mail className="h-4 w-4 text-muted-foreground" />
                    <span>{artisan.email}</span>
                </div>
                {artisan.businessInfo?.phone && (
                    <div className="flex items-center gap-2 text-sm">
                        <Phone className="h-4 w-4 text-muted-foreground" />
                        <span>{artisan.businessInfo.phone}</span>
                    </div>
                )}
                {artisan.bio && (
                    <p className="text-sm text-muted-foreground line-clamp-2">
                        {artisan.bio}
                    </p>
                )}
            </CardContent>
        </Card>
    );
} 