"use client";

import {
    RiFileTextFill,
    RiLeafLine,
    RiQuestionnaireFill,
    RiScanLine,
    RiSettings3Line,
    RiUserFill,
} from "@remixicon/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { SidebarMenuButton, SidebarMenuItem } from "./ui/sidebar";

interface NavItemProps {
    url: string;
    title: string;
}

const icons = {
    "Tableau de bord": RiScanLine,
    Artisans: RiUserFill,
    Documents: RiFileTextFill,
    Demandes: RiQuestionnaireFill,
    Paramètres: RiSettings3Line,
    "Centre d'aide": RiLeafLine,
};

export default function SidebarNavItem({ url, title }: NavItemProps) {
    const pathname = usePathname();
    const Icon = icons[title as keyof typeof icons];

    return (
        <SidebarMenuItem key={title}>
            <SidebarMenuButton
                asChild
                className="group/menu-button font-medium gap-3 h-9 rounded-md bg-linear-to-r hover:bg-transparent hover:from-sidebar-accent hover:to-sidebar-accent/40 data-[active=true]:from-primary/20 data-[active=true]:to-primary/5 [&>svg]:size-auto"
                isActive={pathname === url}
            >
                <Link href={url}>
                    <Icon
                        className="text-muted-foreground/60 group-data-[active=true]/menu-button:text-primary"
                        size={22}
                        aria-hidden="true"
                    />
                    <span>{title}</span>
                </Link>
            </SidebarMenuButton>
        </SidebarMenuItem>
    );
}
