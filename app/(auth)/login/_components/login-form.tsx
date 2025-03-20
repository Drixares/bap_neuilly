"use client";

import { LoginAdminFormSchema } from "@/app/schema";
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
import { authClient } from "@/lib/auth-client";
import { cn } from "@/lib/utils";
import { LoginAdminFormSchemaType } from "@/types/admin-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { GalleryVerticalEnd, Loader2, TriangleAlert } from "lucide-react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

const ERROR_MESSAGES = {
    INVALID_EMAIL_OR_PASSWORD:
        "Email ou mot de passe incorrect. Veuillez réessayer.",
};

const LOGIN_REDIRECT_PATH = {
    admin: "/admin",
    user: "/dashboard",
};

export default function LoginForm({
    className,
    ...props
}: React.ComponentPropsWithoutRef<"div">) {
    const router = useRouter();

    const form = useForm<LoginAdminFormSchemaType>({
        resolver: zodResolver(LoginAdminFormSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    });

    const onSubmit = async (values: LoginAdminFormSchemaType) => {
        try {
            const res = await authClient.signIn.email({
                email: values.email,
                password: values.password,
            });

            if (res?.error) {
                toast.error(
                    ERROR_MESSAGES[
                        res.error.code as keyof typeof ERROR_MESSAGES
                    ],
                    {
                        position: "top-center",
                        icon: <TriangleAlert className="size-4" />,
                        duration: 3000,
                    }
                );
            }
            router.refresh();
        } catch (error) {
            toast.error("Une erreur est survenue lors de la connexion", {
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
                            Vous êtes un administrateur ou un artisan ?
                            Connectez vous pour accéder à votre espace.
                        </div>
                    </div>
                    <div className="flex flex-col gap-6">
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
                                    Connexion en cours...
                                </>
                            ) : (
                                "Se connecter"
                            )}
                        </Button>
                    </div>
                </form>
            </Form>
        </div>
    );
}
