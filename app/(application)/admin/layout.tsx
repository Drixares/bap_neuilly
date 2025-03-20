import { SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";

import UserDropdown from "@/app/(application)/admin/_components/user-dropdown";
import { AppSidebar } from "@/components/app-sidebar";
import BreadcrumbComponent from "@/components/breadcrumb";
import { Separator } from "@/components/ui/separator";
import { SidebarProvider } from "@/components/ui/sidebar";
import { auth } from "@/lib/auth";
import AdminProvider from "@/providers/admin-provider";
import { headers } from "next/headers";

export default async function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {        
    const session = await auth.api.getSession({
        headers: await headers(),
    });

    return (
        <AdminProvider>
            <SidebarProvider>
                <AppSidebar />
                <SidebarInset className="overflow-hidden px-4 md:px-6 lg:px-8">
                    <header className="flex h-16 shrink-0 items-center gap-2 border-b">
                        <div className="flex flex-1 items-center gap-2 px-3">
                            <SidebarTrigger className="-ms-4" />
                            <Separator
                                orientation="vertical"
                                className="mr-2 data-[orientation=vertical]:h-4"
                            />
                            <BreadcrumbComponent />
                        </div>
                        <div className="flex gap-3 ml-auto">
                            {/* <FeedbackDialog /> */}
                            <UserDropdown
                                image={session?.user.image}
                                name={session?.user.name!}
                                email={session?.user.email!}
                            />
                        </div>
                    </header>
                    <div className="flex flex-1 flex-col gap-4 lg:gap-6 py-4 lg:py-6">
                        {children}
                    </div>
                </SidebarInset>
            </SidebarProvider>
        </AdminProvider>
    );
}
