import * as React from "react";

import { SearchForm } from "@/components/search-form";
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarRail,
} from "@/components/ui/sidebar";
import {
    RiFileTextLine,
    RiLeafLine,
    RiLogoutBoxLine,
    RiQuestionnaireFill,
    RiScanLine,
    RiSettings3Line,
    RiUser3Fill,
} from "@remixicon/react";
import Image from "next/image";
import SidebarNavItem from "./sidebar-nav-item";

// This is sample data.
export const data = {
    teams: [
        {
            name: "Made In Neuilly",
            logo: "https://res.cloudinary.com/dlzlfasou/image/upload/v1741345507/logo-01_kp2j8x.png",
        },
    ],
    navMain: [
        {
            title: "Principales",
            items: [
                {
                    title: "Tableau de bord",
                    url: "/admin",
                    icon: RiScanLine,
                    isActive: true,
                },
                {
                    title: "Artisans",
                    url: "/admin/artisans",
                    icon: RiUser3Fill,
                    isActive: false,
                },
                {
                    title: "Documents",
                    url: "/admin/documents",
                    icon: RiFileTextLine,
                    isActive: false,
                },
                {
                    title: "Demandes",
                    url: "/admin/demandes",
                    icon: RiQuestionnaireFill,
                    isActive: false,
                },
            ],
        },
        {
            title: "Autres",
            items: [
                {
                    title: "Paramètres",
                    url: "/admin/settings",
                    icon: RiSettings3Line,
                    isActive: false,
                },
                {
                    title: "Centre d'aide",
                    url: "/admin/help",
                    icon: RiLeafLine,
                    isActive: false,
                },
            ],
        },
    ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
    return (
        <Sidebar {...props}>
            <SidebarHeader>
                <div
                    className="flex w-full items-center gap-2 overflow-hidden rounded-md p-2 
                    text-left text-sm outline-hidden transition-[width,height,padding]"
                >
                    <div
                        className="flex aspect-square size-8 items-center justify-center rounded-md
                      overflow-hidden bg-sidebar-primary text-sidebar-primary-foreground"
                    >
                        <Image
                            src={data.teams[0].logo}
                            width={36}
                            height={36}
                            alt={data.teams[0].name}
                        />
                    </div>
                    <div className="grid flex-1 text-left text-base leading-tight">
                        <span className="truncate font-medium">
                            {data.teams[0].name}
                        </span>
                    </div>
                </div>
                <hr className="border-t border-border mx-2 -mt-px" />
                <SearchForm className="mt-3" />
            </SidebarHeader>
            <SidebarContent>
                {/* We create a SidebarGroup for each parent. */}
                {data.navMain.map((item) => (
                    <SidebarGroup key={item.title}>
                        <SidebarGroupLabel className="uppercase text-muted-foreground/60">
                            {item.title}
                        </SidebarGroupLabel>
                        <SidebarGroupContent className="px-2">
                            <SidebarMenu>
                                {item.items.map(({ title, url }) => (
                                    <SidebarNavItem
                                        key={title}
                                        url={url}
                                        title={title}
                                    />
                                ))}
                            </SidebarMenu>
                        </SidebarGroupContent>
                    </SidebarGroup>
                ))}
            </SidebarContent>
            <SidebarFooter>
                <hr className="border-t border-border mx-2 -mt-px" />
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton className="font-medium gap-3 h-9 rounded-md bg-linear-to-r hover:bg-transparent hover:from-sidebar-accent hover:to-sidebar-accent/40 data-[active=true]:from-primary/20 data-[active=true]:to-primary/5 [&>svg]:size-auto">
                            <RiLogoutBoxLine
                                className="text-muted-foreground/60 group-data-[active=true]/menu-button:text-primary"
                                size={22}
                                aria-hidden="true"
                            />
                            <span>Sign Out</span>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarFooter>
            <SidebarRail />
        </Sidebar>
    );
}
