"use client";

import { VerifyFormSchema } from "@/app/schema";
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
import { VerifyFormSchemaType } from "@/types/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, TriangleAlert } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { useServerAction } from "zsa-react";
import { verifyCreatorAction } from "../actions";

export default function VerifyForm({
    className,
    ...props
}: React.ComponentPropsWithoutRef<"div">) {
    const router = useRouter();
    const searchParams = useSearchParams();

    const { execute: verifyCreator } = useServerAction(verifyCreatorAction, {
        onSuccess: () => {
            router.push("/login");
        },
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

    const form = useForm<VerifyFormSchemaType>({
        resolver: zodResolver(VerifyFormSchema),
        defaultValues: {
            password: "",
            confirmPassword: "",
        },
    });

    const onSubmit = async (values: VerifyFormSchemaType) => {
        await verifyCreator({
            token: searchParams.get("token") as string,
            password: values.password,
            confirmPassword: values.confirmPassword,
        });
    };

    return (
        <div className={cn("flex flex-col gap-6", className)} {...props}>
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="flex flex-col gap-6"
                >
                    <h1 className="text-center text-xl font-semibold">
                        Créez votre mot de passe
                    </h1>
                    <div className="flex flex-col gap-6">
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
                        <FormField
                            control={form.control}
                            name="confirmPassword"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>
                                        Confirmation du mot de passe
                                    </FormLabel>
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
                                form.formState.isSubmitting &&
                                    !form.formState.isValid &&
                                    "opacity-50"
                            )}
                            disabled={
                                form.formState.isSubmitting ||
                                !form.formState.isValid
                            }
                        >
                            {form.formState.isSubmitting ? (
                                <>
                                    <Loader2 className="size-4 mr-2 animate-spin" />
                                    Vérification du compte...
                                </>
                            ) : (
                                "Valider mon compte"
                            )}
                        </Button>
                    </div>
                </form>
            </Form>
        </div>
    );
}
