import * as React from "react";

import { signOut } from "@/actions/sign-out";
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
import { ADMIN_PAGES_WITH_TITLE, TEAM } from "@/constants/pages";
import { RiLogoutBoxLine } from "@remixicon/react";
import Image from "next/image";
import SidebarNavItem from "./sidebar-nav-item";

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
                            src={TEAM.logo}
                            width={36}
                            height={36}
                            alt={TEAM.name}
                        />
                    </div>
                    <div className="grid flex-1 text-left text-base leading-tight">
                        <span className="truncate font-medium">
                            {TEAM.name}
                        </span>
                    </div>
                </div>
                <hr className="border-t border-border mx-2 -mt-px" />
                <SearchForm className="mt-3" />
            </SidebarHeader>
            <SidebarContent>
                {/* We create a SidebarGroup for each parent. */}
                {ADMIN_PAGES_WITH_TITLE.map((item) => (
                    <SidebarGroup key={item.title}>
                        <SidebarGroupLabel className="uppercase text-muted-foreground/60">
                            {item.title}
                        </SidebarGroupLabel>
                        <SidebarGroupContent className="px-2">
                            <SidebarMenu>
                                {item.pages.map(({ title, url }) => (
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
                        <SidebarMenuButton
                            className="font-medium gap-3 h-9 rounded-md bg-linear-to-r hover:bg-transparent 
                            hover:from-sidebar-accent hover:to-sidebar-accent/40 data-[active=true]:from-primary/20 
                            data-[active=true]:to-primary/5 [&>svg]:size-auto cursor-pointer"
                            onClick={signOut}
                        >
                            <RiLogoutBoxLine
                                size={16}
                                className="opacity-60"
                                aria-hidden="true"
                            />
                            <span>Sign out</span>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarFooter>
            <SidebarRail />
        </Sidebar>
    );
}
