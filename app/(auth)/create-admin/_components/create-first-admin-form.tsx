"use client";

import { createFirstAdminUser } from "@/actions/user";
import { FirstAdminFormSchema } from "@/app/schema";
import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { FirstAdminSchemaType } from "@/types/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { GalleryVerticalEnd, Loader2, TriangleAlert } from "lucide-react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { useServerAction } from "zsa-react";

export default function CreateFirstAdminForm({
    className,
    ...props
}: React.ComponentPropsWithoutRef<"div">) {
    const router = useRouter();
    const { execute } = useServerAction(createFirstAdminUser);

    const form = useForm<FirstAdminSchemaType>({
        resolver: zodResolver(FirstAdminFormSchema),
        defaultValues: {
            name: "",
            email: "",
            password: "",
        },
    });

    const onSubmit = async (data: FirstAdminSchemaType) => {
        try {
            const [res, error] = await execute(data);

            if (res?.success) {
                router.push("/admin");
            } else {
                throw new Error(
                    error?.message ||
                        "Les informations renseignées sont invalides"
                );
            }
        } catch (error) {
            const message =
                error instanceof Error
                    ? error.message
                    : "Une erreur est survenue";
            toast.error(message, {
                position: "top-center",
                icon: <TriangleAlert className="size-4" />,
                duration: 3000,
            });
        }
    };

    return (
        <div className={cn("flex flex-col gap-6", className)} {...props}>
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="flex flex-col gap-6"
                >
                    <div className="flex flex-col items-center gap-2">
                        <div className="flex h-8 w-8 items-center justify-center rounded-md">
                            <GalleryVerticalEnd className="size-6" />
                        </div>
                        <h1 className="text-center text-xl font-bold">
                            Made In Neuilly
                        </h1>
                        <div className="text-center text-sm">
                            Créer le premier compte admininistrateur
                        </div>
                    </div>
                    <div className="flex flex-col gap-6">
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Nom</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="John Doe"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Email</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="email"
                                            placeholder="john.doe@example.com"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="password"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Mot de passe</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="password"
                                            placeholder="********"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button
                            type="submit"
                            className={cn(
                                "w-full",
                                form.formState.isSubmitting && "opacity-50"
                            )}
                            disabled={form.formState.isSubmitting}
                        >
                            {form.formState.isSubmitting ? (
                                <>
                                    <Loader2 className="size-4 mr-2 animate-spin" />
                                    Création en cours...
                                </>
                            ) : (
                                "Créer le compte"
                            )}
                        </Button>
                    </div>
                </form>
            </Form>
            <div className="text-balance text-center text-xs text-muted-foreground [&_a]:underline [&_a]:underline-offset-4 hover:[&_a]:text-primary">
                Attention, n'importe qui peut accéder à cette page tant que vous
                n'avez pas créé le premier compte administrateur.
            </div>
        </div>
    );
}
