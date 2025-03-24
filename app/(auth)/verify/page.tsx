"use client";

import { verifyTokenAction } from "@/app/(auth)/verify/actions";
import { TriangleAlert } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { toast } from "sonner";
import { useServerAction } from "zsa-react";
import VerifyForm from "./_components/verify-form";

export default function Home() {
    const router = useRouter();
    const searchUser = useSearchParams();
    const { execute: verifyTokenExecute } = useServerAction(verifyTokenAction, {
        onError: ({ err }) => {
            if (err.message === "Token invalide.") {
                router.push("/");
            }

            toast.error(err.message, {
                position: "top-center",
                icon: <TriangleAlert className="size-4" />,
                duration: 3000,
            });
        },
    });

    useEffect(() => {
        const processVerification = async () => {
            const tokenFromUrl = searchUser.get("token");
            if (tokenFromUrl) {
                await verifyTokenExecute({ token: tokenFromUrl });
            } else {
                router.push("/");
            }
        };

        processVerification();
    }, [searchUser]);

    return (
        <div className="flex min-h-svh flex-col items-center justify-center gap-6 bg-background p-6 md:p-10">
            <div className="w-full max-w-sm">
                <VerifyForm />
            </div>
        </div>
    );
}
