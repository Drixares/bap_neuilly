"use client";

import { ADMIN_PAGES } from "@/constants/pages";
import { RiScanLine } from "@remixicon/react";
import { usePathname } from "next/navigation";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "./ui/breadcrumb";

export default function BreadcrumbComponent() {
    const pathname = usePathname();
    const currentPage = ADMIN_PAGES.find((page) => page.url === pathname);

    return (
        <Breadcrumb>
            <BreadcrumbList>
                <BreadcrumbItem className="hidden md:block">
                    <BreadcrumbLink href="#">
                        <RiScanLine size={22} aria-hidden="true" />
                        <span className="sr-only">
                            {currentPage?.title || "Administration"}
                        </span>
                    </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="hidden md:block" />
                <BreadcrumbItem>
                    <BreadcrumbPage>
                        {currentPage?.title || "Administration"}
                    </BreadcrumbPage>
                </BreadcrumbItem>
            </BreadcrumbList>
        </Breadcrumb>
    );
}
