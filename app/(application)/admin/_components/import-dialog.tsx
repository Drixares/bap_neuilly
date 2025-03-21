import { importFileAction } from "@/actions/import";
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
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { File as FileIcon, Upload, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { useServerAction } from "zsa-react";

const uploadFormSchema = z.object({
    file: z.custom<File>((v) => v instanceof File, {
        message: "Un fichier est requis",
    }),
});

type UploadFormValues = z.infer<typeof uploadFormSchema>;

interface ImportDialogProps {
    isOpen: boolean;
    onClose: () => void;
    maxSize?: number;
    acceptedFileTypes?: string[];
}

export function ImportDialog({
    isOpen,
    onClose,
    maxSize = 5 * 1024 * 1024,
    acceptedFileTypes = [
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        "application/vnd.ms-excel",
    ],
}: ImportDialogProps) {
    const [isUploading, setIsUploading] = useState(false);
    const router = useRouter();

    const form = useForm<UploadFormValues>({
        resolver: zodResolver(uploadFormSchema),
    });

    const { execute } = useServerAction(importFileAction, {
        onSuccess: () => {
            toast.success("Fichier importé avec succès");
            router.refresh();
        },
        onError: (error) => {
            toast.error("Une erreur s'est produite lors de l'importation", {
                position: "top-center",
            });
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

            const formData = new FormData();
            formData.append("file", values.file);
            execute({ file: values.file });

            handleClose();
        } catch (error) {
            toast.error(
                error instanceof Error
                    ? error.message
                    : "Une erreur s'est produite lors de l'importation",
                {
                    position: "top-center",
                }
            );
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
                                {isUploading ? "Envoi en cours..." : "Envoyer"}
                            </Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
}
