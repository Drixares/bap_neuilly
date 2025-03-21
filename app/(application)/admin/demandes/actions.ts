"use server"

import { requestStatusEnum } from "@/db/schema/auth-schema";
import { deleteRequestUseCase, updateRequestStatusUseCase } from "@/use-cases/requests";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { createServerAction } from "zsa";

const deleteRequestSchema = z.object({
    requestId: z.string(),
});

const updateRequestStatusSchema = z.object({
    requestId: z.string(),
    status: z.enum(requestStatusEnum.enumValues),
});

export const deleteRequestAction = createServerAction()
    .input(deleteRequestSchema)
    .handler(async ({ input }) => {
        await deleteRequestUseCase(input.requestId);
        revalidatePath("/admin/demandes");
    });

export const updateRequestStatusAction = createServerAction()
    .input(updateRequestStatusSchema)
    .handler(async ({ input }) => {
        await updateRequestStatusUseCase(input.requestId, input.status);
        revalidatePath("/admin/demandes");
    });
