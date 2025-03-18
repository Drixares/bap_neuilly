import { z } from "zod";

export const FirstAdminFormSchema = z.object({
    name: z.string().min(1),
    email: z.string().email(),
    password: z.string().min(8),
});


// Zod schema for Excel row data
export const ExcelRowSchema = z.object({
    name: z.string().min(1, "Le nom est requis"),
    email: z.string().email("Email invalide"),
    bio: z.string().optional(),
  }).passthrough(); // Allow other fields to pass through
  
  // Zod schema for the processed user data
  export const ProcessedUserSchema = z.object({
    id: z.string().uuid(),
    name: z.string().min(1),
    email: z.string().email(),
    emailVerified: z.boolean().default(false),
    role: z.enum(["user", "artisan", "admin"]),
    bio: z.string().optional(),
  });