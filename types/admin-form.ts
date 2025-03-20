import { FirstAdminFormSchema, LoginAdminFormSchema } from "@/app/schema";
import { z, ZodIssue } from "zod";

export type FirstAdminSchemaType = z.infer<typeof FirstAdminFormSchema>;
export type FirstAdminFormResponse = {
    success: boolean;
    errors?: ZodIssue[];
    message?: string;
};

export type LoginAdminFormResponse = {
    success: boolean;
    message?: string;
};

export type LoginAdminFormSchemaType = z.infer<typeof LoginAdminFormSchema>;
