"use client";

import { ADMIN_PAGES } from "@/constants/pages";
import { usePathname } from "next/navigation";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbList,
    BreadcrumbPage,
} from "./ui/breadcrumb";

export default function BreadcrumbComponent() {
    const pathname = usePathname();
    const currentPage = ADMIN_PAGES.find((page) => page.url === pathname);

    return (
        <Breadcrumb>
            <BreadcrumbList>
                <BreadcrumbItem>
                    <BreadcrumbPage>
                        {currentPage?.title || "Administration"}
                    </BreadcrumbPage>
                </BreadcrumbItem>
            </BreadcrumbList>
        </Breadcrumb>
    );
}
