"use client";

import { Button } from "@/components/ui/button";
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";
import { NAV_LINKS, SOCIAL_LINKS } from "@/constants/marketing";
import { Menu, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export function MobileMenu() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden text-[var(--marronf)] hover:text-[var(--marronc)] hover:bg-transparent"
        >
          <Menu className="size-8" />
          <span className="sr-only">Toggle menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-[300px] bg-[var(--beige)] border-none p-0">
        <div className="flex flex-col h-full">
          <SheetHeader className="p-6 border-b border-[var(--marronf)] border-opacity-20 relative">
            <SheetClose className="absolute right-6 top-6 rounded-sm opacity-70 ring-offset-white transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-[var(--marronf)] focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-slate-100">
                <X className="size-4 text-[var(--marronf)]" />
                <span className="sr-only">Close</span>
            </SheetClose>
            <SheetTitle className="text-[var(--marronf)] text-2xl font-bold">MENU</SheetTitle>
          </SheetHeader>
          
          <div className="flex flex-col justify-between h-full p-6">
            {/* Navigation Links */}
            <nav className="mt-4">
              <ul className="flex flex-col gap-8">
                {NAV_LINKS.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-[var(--marronf)] hover:text-[var(--marronc)] transition-colors duration-300 text-xl font-medium"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            {/* Social Links */}
            <div className="mt-auto pt-8">
              <ul className="flex gap-8">
                {SOCIAL_LINKS.map((link) => (
                  <li key={link.alt}>
                    <Link
                      href={link.href}
                      className="text-[var(--marronf)] hover:text-[var(--marronc)] transition-colors duration-300"
                    >
                      <Image
                        src={link.icon}
                        alt={link.alt}
                        width={30}
                        height={30}
                        className="h-[30px] w-auto"
                      />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
} 