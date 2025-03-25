"use client";

import { getBusinessInfoByArtisanIdAction } from "@/actions/fetch-business-data";
import { UpdateBusinessAction } from "@/app/(application)/admin/actions";
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
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { useServerAction } from "zsa-react";

const formSchema = z.object({
    companyName: z.string().min(1, "Le nom de l'entreprise est requis"),
    siretNum: z.string().optional(),
    productTypes: z.string().min(1, "Le type de produit est requis"),
    businessDescription: z.string().optional(),
    phone: z.string().min(1, "Le numéro de téléphone est requis"),
    website: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

interface BusinessInfo {
    id: string;
    userId: string;
    companyName: string;
    siretNum: string | null;
    productTypes: string;
    businessDescription?: string | null;
    registrationNumber?: string | null;
    phone: string;
    website?: string | null;
    createdAt: Date;
    updatedAt: Date;
}

export default function FormUpdateArtisans({
    artisanId,
}: {
    artisanId: string;
}) {
    const { execute: updateBusiness, isPending: isUpdating } = useServerAction(UpdateBusinessAction, {
        onSuccess: () => {
            toast.success("Informations mises à jour avec succès", {
                position: "top-center",
            });
        },
        onError: (error) => {
            toast.error("Une erreur est survenue lors de la mise à jour", {
                position: "top-center",
            });
        },
    });

    const { execute: fetchBusiness, data: businessInfo } = useServerAction(getBusinessInfoByArtisanIdAction);

    const form = useForm<FormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            companyName: "",
            siretNum: "",
            productTypes: "",
            businessDescription: "",
            phone: "",
            website: "",
        },
    });

    useEffect(() => {
        const loadBusinessInfo = async () => {
            if (!artisanId) return;
            
            try {
                await fetchBusiness({ artisanId });
            } catch (error) {
                toast.error("Erreur lors de la récupération des données", {
                    position: "top-center",
                });
            }
        };

        loadBusinessInfo();
    }, [artisanId, fetchBusiness]);

    useEffect(() => {
        if (businessInfo) {
            form.reset({
                companyName: businessInfo.companyName || "",
                siretNum: businessInfo.siretNum || "",
                productTypes: businessInfo.productTypes || "",
                businessDescription: businessInfo.businessDescription || "",
                phone: businessInfo.phone || "",
                website: businessInfo.website || "",
            });
        }
    }, [businessInfo, form]);

    const onSubmit = async (values: FormValues) => {
        if (!businessInfo?.id) {
            toast.error("ID de l'entreprise manquant", {
                position: "top-center",
            });
            return;
        }

        await updateBusiness({
            businessInfoId: businessInfo.id,
            ...values,
            siretNum: values.siretNum || "",
        });
    };

    if (!businessInfo) {
        return (
            <div className="flex justify-center items-center p-8">
                <Loader2 className="h-6 w-6 animate-spin" />
            </div>
        );
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                    control={form.control}
                    name="companyName"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Nom d'entreprise</FormLabel>
                            <FormControl>
                                <Input placeholder="Nom de l'entreprise" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="siretNum"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Numéro de Siret</FormLabel>
                            <FormControl>
                                <Input placeholder="Numéro de SIRET" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="productTypes"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Type de Produit</FormLabel>
                            <FormControl>
                                <Input placeholder="Types de produits" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="businessDescription"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Description de l'entreprise</FormLabel>
                            <FormControl>
                                <Textarea 
                                    placeholder="Description de l'entreprise"
                                    className="resize-none"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Numéro de téléphone</FormLabel>
                            <FormControl>
                                <Input placeholder="Numéro de téléphone" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="website"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Site Internet</FormLabel>
                            <FormControl>
                                <Input placeholder="Site internet de l'entreprise" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <div className="flex justify-end">
                    <Button
                        type="submit"
                        className="bg-primary/90 hover:bg-primary"
                        disabled={isUpdating}
                    >
                        {isUpdating ? (
                            <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Sauvegarde en cours...
                            </>
                        ) : (
                            "Sauvegarder"
                        )}
                    </Button>
                </div>
            </form>
        </Form>
    );
}
