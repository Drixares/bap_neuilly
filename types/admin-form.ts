import { FirstAdminFormSchema } from "@/app/schema";
import { z, ZodIssue } from "zod";

export type FirstAdminSchemaType = z.infer<typeof FirstAdminFormSchema>;
export type FirstAdminFormResponse = {
    success: boolean;
    errors?: ZodIssue[];
    message?: string;
};
