"use server";

import { updateCreatorUseCase } from "@/use-cases/creators";
import { z } from "zod";
import { createServerAction } from "zsa";

const formSchema = z.object({
    id: z.string().min(1),
    name: z.string().min(1),
    email: z.string().email(),
    phone: z.string().min(1),
    bio: z.string().optional(),
    siretNum: z.string().min(1),
    businessDescription: z.string().min(1),
    companyName: z.string().min(1),
});

export const updateCreatorAction = createServerAction()
    .input(formSchema)
    .handler(async ({ input }) => {
        const isUpdated = await updateCreatorUseCase(input.id, input);
        return isUpdated;
    });
