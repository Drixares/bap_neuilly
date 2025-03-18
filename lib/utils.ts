import { ExcelRow } from "@/types/excel-import";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

// Helper function to find column names in Excel data
export function findColumn(
    row: ExcelRow,
    possibleNames: string[]
): string | null {
    return (
        Object.keys(row).find((key) =>
            possibleNames.some(
                (name) => key.toLowerCase() === name.toLowerCase()
            )
        ) ?? null
    );
}
