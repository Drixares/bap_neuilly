import { z } from "zod";

export const FirstAdminFormSchema = z.object({
    name: z.string().min(1),
    email: z.string().email(),
    password: z.string().min(8),
});

export const LoginAdminFormSchema = z.object({
    email: z.string().email(),
    password: z.string().min(8),
});

// Zod schema for Excel row data
export const ExcelRowSchema = z
    .object({
        name: z.string().min(1, "Le nom est requis"),
        email: z.string().email("Email invalide"),
        bio: z.string().optional(),
    })
    .passthrough(); // Allow other fields to pass through

// Zod schema for the processed user data
export const ProcessedUserSchema = z.object({
    id: z.string().uuid(),
    name: z.string().min(1),
    email: z.string().email(),
    emailVerified: z.boolean().default(false),
    role: z.enum(["user", "artisan", "admin"]),
    bio: z.string().optional(),
});


export const ProcessedBusinessSchema = z.object({
    id: z.string().uuid(),
    userId: z.string().uuid(),
    companyName: z.string().min(1),
    siretNum: z.string().min(1).optional(),
    productTypes: z.string().min(1),
    businessDescription: z.string().optional(),
    phone: z.string().min(1),
    website: z.string().optional(),
});