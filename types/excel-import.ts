import { ProcessedUserSchema, ProcessedBusinessSchema } from "@/app/schema";
import { z } from "zod";

export type ProcessedUserData = z.infer<typeof ProcessedUserSchema>;
export type ProcessedBusinessData= z.infer<typeof ProcessedBusinessSchema>;
export type ExcelRow = Record<string, unknown>;
