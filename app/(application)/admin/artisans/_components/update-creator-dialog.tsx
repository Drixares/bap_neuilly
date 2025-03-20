"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { formatPhoneNumber } from "@/lib/utils";
import { Creator } from "@/types/creator";
import { zodResolver } from "@hookform/resolvers/zod";
import {
    Building2,
    Link as LinkIcon,
    Mail,
    Pencil,
    Phone,
    User,
} from "lucide-react";
import Link from "next/link";
import { UseFormReturn, useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = z.object({
    name: z.string().min(1),
    companyName: z.string().min(1),
    phone: z.string().min(1),
    website: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

// Composant pour les informations personnelles
function PersonalInfoTab({ form }: { form: UseFormReturn<FormValues> }) {
    return (
        <TabsContent value="personal" className="space-y-4 mt-4">
            <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Nom</FormLabel>
                        <FormControl>
                            <Input {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />
        </TabsContent>
    );
}

// Composant pour les informations de l'entreprise
function BusinessInfoTab({ form }: { form: UseFormReturn<FormValues> }) {
    return (
        <TabsContent value="business" className="space-y-4 mt-4">
            <FormField
                control={form.control}
                name="companyName"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Nom de l'entreprise</FormLabel>
                        <FormControl>
                            <Input {...field} />
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
                        <FormLabel>Téléphone</FormLabel>
                        <FormControl>
                            <Input {...field} />
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
                        <FormLabel>Site web</FormLabel>
                        <FormControl>
                            <Input {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />
        </TabsContent>
    );
}

// Composant pour l'en-tête de la prévisualisation
function PreviewHeader({
    form,
    creator,
    initials,
}: {
    form: UseFormReturn<FormValues>;
    creator: Creator;
    initials: string;
}) {
    return (
        <div className="flex items-center gap-4">
            <Avatar className="size-14">
                <AvatarImage src={creator.image || undefined} />
                <AvatarFallback>{initials}</AvatarFallback>
            </Avatar>
            <div className="space-y-1">
                <h3 className="text-xl font-semibold leading-none">
                    {form.watch("name") || creator.name}
                </h3>
                {form.watch("companyName") && (
                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        <Building2 className="h-4 w-4" />
                        <span>{form.watch("companyName")}</span>
                    </div>
                )}
            </div>
        </div>
    );
}

// Composant pour les informations de contact
function ContactInfo({
    form,
    creator,
}: {
    form: UseFormReturn<FormValues>;
    creator: Creator;
}) {
    return (
        <div className="space-y-4">
            <div className="flex items-center gap-2 text-sm">
                <Mail className="h-4 w-4 text-muted-foreground shrink-0" />
                <span className="truncate">{creator.email}</span>
            </div>

            {form.watch("phone") && (
                <div className="flex items-center gap-2 text-sm">
                    <Phone className="h-4 w-4 text-muted-foreground shrink-0" />
                    <span>{formatPhoneNumber("0" + form.watch("phone"))}</span>
                </div>
            )}

            {form.watch("website") && (
                <div className="flex items-center gap-2 text-sm">
                    <LinkIcon className="size-4 text-muted-foreground shrink-0" />
                    <Link
                        href={form.watch("website") || ""}
                        target="_blank"
                        className="text-primary hover:underline truncate"
                    >
                        {form.watch("website")}
                    </Link>
                </div>
            )}
        </div>
    );
}

// Composant pour le formulaire complet
function UpdateForm({
    form,
    onSubmit,
}: {
    form: UseFormReturn<FormValues>;
    onSubmit: (values: FormValues) => void;
}) {
    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-3 md:space-y-4"
            >
                <Tabs defaultValue="personal" className="w-full">
                    <TabsList className="grid w-full grid-cols-2">
                        <TabsTrigger
                            value="personal"
                            className="flex items-center gap-2"
                        >
                            <User className="h-4 w-4" />
                            Personnel
                        </TabsTrigger>
                        <TabsTrigger
                            value="business"
                            className="flex items-center gap-2"
                        >
                            <Building2 className="h-4 w-4" />
                            Entreprise
                        </TabsTrigger>
                    </TabsList>
                    <PersonalInfoTab form={form} />
                    <BusinessInfoTab form={form} />
                </Tabs>
                <Button type="submit" className="w-full">
                    Sauvegarder
                </Button>
            </form>
        </Form>
    );
}

// Composant pour la prévisualisation
function Preview({
    form,
    creator,
    initials,
}: {
    form: UseFormReturn<FormValues>;
    creator: Creator;
    initials: string;
}) {
    return (
        <div className="rounded-lg border bg-card text-card-foreground shadow">
            <div className="p-6 space-y-6">
                <PreviewHeader
                    form={form}
                    creator={creator}
                    initials={initials}
                />
                <Separator />
                <ContactInfo form={form} creator={creator} />
            </div>
        </div>
    );
}

// Composant principal
export function UpdateCreatorDialog({ creator }: { creator: Creator }) {
    const form = useForm<FormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: creator.name,
            companyName: creator.businessInfo?.companyName,
            phone: creator.businessInfo?.phone,
            website: creator.businessInfo?.website || "",
        },
    });

    const onSubmit = (values: FormValues) => {
        console.log(values);
    };

    const initials = creator.name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase();

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="ghost" size="icon" className="cursor-pointer">
                    <Pencil className="size-4" />
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px] md:max-w-[700px] lg:max-w-[900px] w-[90vw]">
                <DialogHeader>
                    <DialogTitle>Modifier les informations</DialogTitle>
                    <DialogDescription>
                        Modifiez les informations de l'artisan ici.
                    </DialogDescription>
                </DialogHeader>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                    <div className="space-y-3 md:space-y-4">
                        <UpdateForm form={form} onSubmit={onSubmit} />
                    </div>
                    <Preview
                        form={form}
                        creator={creator}
                        initials={initials}
                    />
                </div>
            </DialogContent>
        </Dialog>
    );
}
