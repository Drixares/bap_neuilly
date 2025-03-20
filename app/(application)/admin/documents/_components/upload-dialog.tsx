import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { File as FileIcon, Loader2, Upload, X } from "lucide-react";
import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { useForm } from "react-hook-form";
import { z } from "zod";

const uploadFormSchema = z.object({
    file: z.custom<File>((v) => v instanceof File, {
        message: "Un fichier est requis",
    }),
    title: z
        .string()
        .min(1, "Le titre est requis")
        .max(100, "Le titre ne peut pas dépasser 100 caractères"),
    description: z
        .string()
        .max(500, "La description ne peut pas dépasser 500 caractères")
        .optional(),
});

type UploadFormValues = z.infer<typeof uploadFormSchema>;

interface UploadDialogProps {
    isOpen: boolean;
    onClose: () => void;
    onUpload: (data: UploadFormValues) => Promise<void>;
    maxSize?: number;
    acceptedFileTypes?: string[];
}

export function UploadDialog({
    isOpen,
    onClose,
    onUpload,
    maxSize = 5 * 1024 * 1024,
    acceptedFileTypes = [
        "application/pdf",
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        "application/msword",
    ],
}: UploadDialogProps) {
    const [isUploading, setIsUploading] = useState(false);

    const form = useForm<UploadFormValues>({
        resolver: zodResolver(uploadFormSchema),
        defaultValues: {
            title: "",
            description: "",
        },
    });

    const onDrop = useCallback(
        (acceptedFiles: File[]) => {
            if (acceptedFiles?.[0]) {
                form.setValue("file", acceptedFiles[0], {
                    shouldValidate: true,
                });
            }
        },
        [form]
    );

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        maxSize,
        accept: acceptedFileTypes.reduce(
            (acc, type) => ({ ...acc, [type]: [] }),
            {}
        ),
        multiple: false,
    });

    const onSubmit = async (values: UploadFormValues) => {
        try {
            setIsUploading(true);
            await onUpload(values);
            handleClose();
        } catch (error) {
            console.error("Upload failed:", error);
        } finally {
            setIsUploading(false);
        }
    };

    const handleClose = () => {
        form.reset();
        onClose();
    };

    const currentFile = form.watch("file");

    return (
        <Dialog open={isOpen} onOpenChange={handleClose}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Ajouter un document</DialogTitle>
                    <DialogDescription>
                        Déposez votre fichier ici ou cliquez pour le
                        sélectionner.
                    </DialogDescription>
                </DialogHeader>

                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="space-y-4"
                    >
                        <FormField
                            control={form.control}
                            name="file"
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <div
                                            {...getRootProps()}
                                            className={cn(
                                                "border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors",
                                                isDragActive
                                                    ? "border-primary bg-primary/5"
                                                    : "border-muted-foreground/25",
                                                currentFile &&
                                                    "border-primary/50 bg-primary/5"
                                            )}
                                        >
                                            <Input {...getInputProps()} />
                                            {currentFile ? (
                                                <div className="flex items-center justify-center gap-2">
                                                    <FileIcon className="size-6 text-primary" />
                                                    <span className="text-sm font-medium">
                                                        {currentFile.name}
                                                    </span>
                                                    <Button
                                                        type="button"
                                                        variant="ghost"
                                                        size="icon"
                                                        className="h-8 w-8"
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            form.setValue(
                                                                "file",
                                                                undefined as any,
                                                                {
                                                                    shouldValidate:
                                                                        true,
                                                                }
                                                            );
                                                        }}
                                                    >
                                                        <X className="size-4" />
                                                    </Button>
                                                </div>
                                            ) : (
                                                <div className="space-y-2">
                                                    <Upload className="size-8 mx-auto text-muted-foreground" />
                                                    <p className="text-sm text-muted-foreground">
                                                        {isDragActive
                                                            ? "Déposez le fichier ici"
                                                            : "Glissez-déposez ou cliquez pour sélectionner"}
                                                    </p>
                                                    <p className="text-xs text-muted-foreground">
                                                        Taille maximum:{" "}
                                                        {(
                                                            maxSize /
                                                            (1024 * 1024)
                                                        ).toFixed(0)}
                                                        MB
                                                    </p>
                                                </div>
                                            )}
                                        </div>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="title"
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <Input
                                            placeholder="Titre du document"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="description"
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <Textarea
                                            placeholder="Description (optionnelle)"
                                            rows={3}
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <DialogFooter>
                            <Button
                                type="button"
                                variant="outline"
                                onClick={handleClose}
                            >
                                Annuler
                            </Button>
                            <Button
                                type="submit"
                                disabled={
                                    !form.formState.isValid || isUploading
                                }
                            >
                                {isUploading ? (
                                    <>
                                        <Loader2 className="size-4 animate-spin" />
                                        Envoi en cours...
                                    </>
                                ) : (
                                    "Envoyer"
                                )}
                            </Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
}
