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
import { LoginAdminFormSchemaType } from "@/types/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CheckCircle, GalleryVerticalEnd, Loader2, TriangleAlert } from "lucide-react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

export default function LoginForm({
    className,
    ...props
}: React.ComponentPropsWithoutRef<"div">) {
    const router = useRouter();

    const form = useForm<LoginAdminFormSchemaType>({
        resolver: zodResolver(LoginAdminFormSchema),
        defaultValues: {
            email: "",
        },
    });

    const onSubmit = async (values: LoginAdminFormSchemaType) => {
        try {
            const { data, error } = await authClient.signIn.magicLink({
                email: values.email,
                callbackURL: "/login",
            });

            if (error) {
                throw new Error(error.message);
            }

            if (data.status) {
                toast.success("Un email vous a été envoyé pour vous connecter", {
                    position: "top-center",
                    icon: <CheckCircle className="size-4" />,
                    duration: 3000,
                });
            }

        } catch (error) {
            toast.error("Une erreur est survenue lors de l'envoi de l'email de connexion", {
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
                                    Envoi de l'email en cours...
                                </>
                            ) : (
                                "Envoyer l'email de connexion"
                            )}
                        </Button>
                    </div>
                </form>
            </Form>
        </div>
    );
}
