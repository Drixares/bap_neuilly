"use client";

import { GalleryVerticalEnd } from "lucide-react";

import { createFirstAdminUser } from "@/actions/user";
import { FirstAdminFormSchema } from "@/app/schema";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { FirstAdminSchemaType } from "@/types/admin-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { redirect } from "next/navigation";
import { useForm } from "react-hook-form";

export default function CreateFirstAdminForm({
    className,
    ...props
}: React.ComponentPropsWithoutRef<"div">) {
    const { register, handleSubmit, formState } = useForm<FirstAdminSchemaType>(
        {
            resolver: zodResolver(FirstAdminFormSchema),
            defaultValues: {
                name: "",
                email: "",
                password: "",
            },
        }
    );

    const onSubmit = async (data: FirstAdminSchemaType) => {
        const res = await createFirstAdminUser(data);
        if (res.success) {
            redirect("/admin");
        } else {
            console.error(res.errors || res.message);
        }
    };

    return (
        <div className={cn("flex flex-col gap-6", className)} {...props}>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="flex flex-col gap-6">
                    <div className="flex flex-col items-center gap-2">
                        <Link
                            href="#"
                            className="flex flex-col items-center gap-2 font-medium"
                        >
                            <div className="flex h-8 w-8 items-center justify-center rounded-md">
                                <GalleryVerticalEnd className="size-6" />
                            </div>
                            <span className="sr-only">Acme Inc.</span>
                        </Link>
                        <h1 className="text-center text-xl font-bold">
                            Made In Neuilly
                        </h1>
                        <div className="text-center text-sm">
                            Crée le premier compte admininistrateur
                        </div>
                    </div>
                    <div className="flex flex-col gap-6">
                        <div className="grid gap-2">
                            <Label htmlFor="name">Nom</Label>
                            <Input
                                id="name"
                                type="text"
                                placeholder="John Doe"
                                required
                                {...register("name")}
                            />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="email">Email</Label>
                            <Input
                                id="email"
                                type="email"
                                placeholder="john.doe@example.com"
                                required
                                {...register("email")}
                            />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="password">Mot de passe</Label>
                            <Input
                                id="password"
                                type="password"
                                placeholder="********"
                                required
                                {...register("password")}
                            />
                        </div>
                        <Button
                            type="submit"
                            className={cn(
                                "w-full",
                                formState.isSubmitting ||
                                    formState.isLoading ||
                                    (!formState.isValid && "opacity-50")
                            )}
                            disabled={
                                formState.isSubmitting ||
                                formState.isLoading ||
                                !formState.isValid
                            }
                        >
                            Créer le compte
                        </Button>
                    </div>
                </div>
            </form>
            <div className="text-balance text-center text-xs text-muted-foreground [&_a]:underline [&_a]:underline-offset-4 hover:[&_a]:text-primary  ">
                Attention, n'importe qui peut accéder à ce formulaire tant que
                vous n'avez pas créé le premier compte administrateur.
            </div>
        </div>
    );
}
