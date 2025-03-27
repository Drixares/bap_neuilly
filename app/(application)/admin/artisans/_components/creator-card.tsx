import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardAction,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { formatPhoneNumber } from "@/lib/utils";
import { CreatorCardProps } from "@/types/creator";
import { Building2, Link as LinkIcon, Mail, Phone } from "lucide-react";
import Link from "next/link";
import { UpdateCreatorDialog } from "./update-creator-dialog";

export function CreatorCard({ creator }: CreatorCardProps) {
    const initials = creator.name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase();

    return (
        <Card className="overflow-hidden hover:shadow-lg transition-shadow">
            <CardHeader className="flex items-center justify-between pb-2">
                <div className="flex items-center gap-4">
                    <Avatar className="h-12 w-12">
                        <AvatarImage src={creator.image || undefined} />
                        <AvatarFallback>{initials}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                        <CardTitle className="text-lg">
                            {creator.name}
                        </CardTitle>
                        {creator.businessInfo && (
                            <div className="flex items-center gap-1 text-sm text-muted-foreground">
                                <Building2 className="h-4 w-4" />
                                <span>{creator.businessInfo.companyName}</span>
                            </div>
                        )}
                    </div>
                </div>
                <div className="flex items-center">
                    <UpdateCreatorDialog creator={creator} />
                    <CardAction>
                        {creator.businessInfo?.website && (
                            <Button
                                variant="ghost"
                                size="icon"
                                className="cursor-pointer"
                                asChild
                            >
                                <Link
                                    href={creator.businessInfo.website}
                                    target="_blank"
                                >
                                    <LinkIcon className="size-4" />
                                </Link>
                            </Button>
                        )}
                    </CardAction>
                </div>
            </CardHeader>
            <CardContent className="space-y-2">
                <div className="flex items-center gap-2 text-sm">
                    <Mail className="h-4 w-4 text-muted-foreground" />
                    <span>{creator.email}</span>
                </div>
                {creator.businessInfo?.phone && (
                    <div className="flex items-center gap-2 text-sm">
                        <Phone className="h-4 w-4 text-muted-foreground" />
                        <span>
                            {formatPhoneNumber(creator.businessInfo.phone)}
                        </span>
                    </div>
                )}
                {creator.bio && (
                    <p className="text-sm text-muted-foreground line-clamp-2">
                        {creator.bio}
                    </p>
                )}
            </CardContent>
        </Card>
    );
}
