"use server";

import {
    createDocumentUseCase,
    deleteDocumentUseCase,
} from "@/use-cases/documents";
import { z } from "zod";
import { createServerAction } from "zsa";

const createDocumentSchema = z.object({
    title: z.string().min(1),
    file: z.instanceof(File),
    description: z.string().optional(),
});

const deleteDocumentSchema = z.object({
    id: z.string(),
});

export const createDocumentAction = createServerAction()
    .input(createDocumentSchema)
    .handler(async ({ input }) => {
        const document = await createDocumentUseCase(
            input.title,
            input.file,
            input.description
        );
        return document;
    });

export const deleteDocumentAction = createServerAction()
    .input(deleteDocumentSchema)
    .handler(async ({ input }) => {
        await deleteDocumentUseCase(input.id);
    });
