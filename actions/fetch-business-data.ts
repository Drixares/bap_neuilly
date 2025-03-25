// actions/fetch-business-data.ts
"use server";

import { getBusinessInfoByArtisanIdUseCase } from "@/use-cases/business-info";
import { z } from "zod";
import { createServerAction } from "zsa";

const GetBusinessInfoByArtisanIdSchema = z.object({
    artisanId: z.string(),
});

export const getBusinessInfoByArtisanIdAction = createServerAction()
    .input(GetBusinessInfoByArtisanIdSchema)
    .handler(async ({ input }) => {
        const { artisanId } = input;
        const businessInfo = await getBusinessInfoByArtisanIdUseCase(artisanId);
        return businessInfo;
    });


