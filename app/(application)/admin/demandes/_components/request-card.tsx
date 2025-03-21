import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Request } from "@/db/schema/auth-schema";
import { formatPhoneNumber } from "@/lib/utils";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { CheckCircle2, MoreHorizontal, Trash2, XCircle } from "lucide-react";

interface RequestCardProps {
    request: Request & {
        user: {
            name: string;
            email: string;
            businessInfo?: {
                phone: string;
            } | null;
        };
    };
}

export function RequestCard({ request }: RequestCardProps) {
    return (
        <Card className="flex flex-col">
            <CardHeader className="flex flex-row justify-between space-y-0 pb-2">
                <div className="space-y-1">
                    <div className="flex items-center justify-between gap-x-4">
                        <CardTitle className="text-lg font-medium">
                            {request.user.name}
                        </CardTitle>
                        <Badge
                            variant={
                                request.status === "validée"
                                    ? "default"
                                    : request.status === "rejetée"
                                    ? "destructive"
                                    : "secondary"
                            }
                        >
                            {request.status}
                        </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground">
                        {request.user.email}
                    </p>
                    <div className="mt-2 space-y-1">
                        {request.user.businessInfo?.phone && (
                            <p className="text-xs text-muted-foreground">
                                Tél: {formatPhoneNumber("0" + request.user.businessInfo.phone)}
                            </p>
                        )}
                    </div>
                </div>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                            <MoreHorizontal className="h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        {request.status === "en cours" && (
                            <>
                                <DropdownMenuItem
                                    className="text-green-600"
                                >
                                    <CheckCircle2 className="mr-2 h-4 w-4" />
                                    Valider
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                    className="text-red-600"
                                >
                                    <XCircle className="mr-2 h-4 w-4" />
                                    Rejeter
                                </DropdownMenuItem>
                            </>
                        )}
                        <DropdownMenuItem
                            className="text-red-600"
                        >
                            <Trash2 className="mr-2 h-4 w-4" />
                            Supprimer
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </CardHeader>
            <CardContent className="flex-1">
                <p className="text-sm text-foreground line-clamp-3">
                    {request.content}
                </p>
            </CardContent>
            <CardFooter>
                <p className="text-xs text-muted-foreground">
                    Créée le{" "}
                    {format(new Date(request.createdAt), "PPP", {
                        locale: fr,
                    })}
                </p>
            </CardFooter>
        </Card>
    );
}
