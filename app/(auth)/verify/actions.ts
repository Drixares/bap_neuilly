"use server";

import {
    loginCreatorUseCase,
    verifyCreatorUseCase,
    verifyTokenUseCase,
} from "@/use-cases/auth";
import {
    getCreatorIdByEmailUseCase,
    updateCreatorUseCase,
} from "@/use-cases/creators";
import { z } from "zod";
import { createServerAction } from "zsa";

const verifyTokenSchema = z.object({
    token: z.string().min(1),
});

const verifyCreatorSchema = z
    .object({
        token: z.string().min(1),
        password: z.string().min(8),
        confirmPassword: z.string().min(8),
    })
    .superRefine(({ password, confirmPassword }, ctx) => {
        if (password !== confirmPassword) {
            ctx.addIssue({
                code: z.ZodIssueCode.custom,
                message: "Les mots de passe ne correspondent pas.",
            });
        }
    });

export const verifyTokenAction = createServerAction()
    .input(verifyTokenSchema)
    .handler(async ({ input: { token } }) => {
        const { success, email: emailFromToken } =
            await verifyTokenUseCase(token);

        if (!success || !emailFromToken) {
            throw new Error("Token invalide.");
        }

        const creatorId = await getCreatorIdByEmailUseCase(emailFromToken);

        if (!creatorId) {
            throw new Error("Token invalide.");
        }

        return;
    });

export const verifyCreatorAction = createServerAction()
    .input(verifyCreatorSchema)
    .handler(async ({ input: { token, password } }) => {
        const { success, email: emailFromToken } =
            await verifyTokenUseCase(token);

        if (!success || !emailFromToken) {
            throw new Error("Token invalide.");
        }

        const creatorId = await getCreatorIdByEmailUseCase(emailFromToken);

        if (!creatorId) {
            throw new Error("Token invalide.");
        }

        try {
            await updateCreatorUseCase(creatorId, { password });
            const isVerified = await verifyCreatorUseCase(creatorId);

            if (!isVerified) {
                await updateCreatorUseCase(creatorId, { password: undefined });
                throw new Error("La vérification a échoué.");
            }

            await loginCreatorUseCase(emailFromToken, password);
        } catch (error) {
            await updateCreatorUseCase(creatorId, { password: undefined });
            throw error;
        }
    });
