import { Inter } from "next/font/google";

import { Toaster } from "@/components/ui/sonner";
import { Metadata } from "next";
import "./globals.css";

const fontSans = Inter({
    subsets: ["latin"],
    variable: "--font-sans",
});

export const metadata: Metadata = {
    title: "Made In Neuilly",
    description: "Le salon qui regroupe tous les artisans entrepreneurs pour mettre en avant leur travail.",
}

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" className="dark scheme-only-dark">
            <body className={`${fontSans.variable} font-sans antialiased`}>
                <main>{children}</main>
                <Toaster richColors />
            </body>
        </html>
    );
}
