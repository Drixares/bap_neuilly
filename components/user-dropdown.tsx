import { signOut } from "@/actions/sign-out";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { RiLogoutBoxLine, RiSettingsLine } from "@remixicon/react";

interface UserDropdownProps {
    image: string | null | undefined;
    name: string;
    email: string;
}

export default async function UserDropdown({
    image,
    name,
    email,
}: UserDropdownProps) {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button
                    variant="ghost"
                    className="h-auto p-0 hover:bg-transparent"
                >
                    <Avatar className="size-8">
                        <AvatarImage
                            src={
                                image ||
                                "https://res.cloudinary.com/dlzlfasou/image/upload/v1741345506/user_sam4wh.png"
                            }
                            width={32}
                            height={32}
                            alt="Profile image"
                        />
                        <AvatarFallback>KK</AvatarFallback>
                    </Avatar>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="max-w-64" align="end">
                <DropdownMenuLabel className="flex min-w-0 flex-col">
                    <span className="truncate text-sm font-medium text-foreground">
                        {name}
                    </span>
                    <span className="truncate text-xs font-normal text-muted-foreground">
                        {email}
                    </span>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                    <DropdownMenuItem>
                        <RiSettingsLine
                            size={16}
                            className="opacity-60"
                            aria-hidden="true"
                        />
                        <span>Account settings</span>
                    </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                    <button
                        type="submit"
                        className="w-full flex items-center gap-2"
                        onClick={signOut}
                    >
                        <RiLogoutBoxLine
                            size={16}
                            className="opacity-60"
                            aria-hidden="true"
                        />
                        <span>Sign out</span>
                    </button>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
