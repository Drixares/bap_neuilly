import { ProcessedUserSchema } from "@/app/schema";
import { z } from "zod";

export type ProcessedUserData = z.infer<typeof ProcessedUserSchema>;
export type ExcelRow = Record<string, unknown>;
