"use client";

import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";
import { popupEvents } from "@/components/ui/popup-excel";  
import { cn } from "@/lib/utils";

const buttonVariantsExcel = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-[color,box-shadow] disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 [&_svg]:shrink-0 outline-hidden focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
  {
    variants: {
      variant: {
        default:
          "bg-primary/75 border border-primary-foreground/25 text-primary-foreground shadow-xs shadow-black/5 hover:bg-primary/90",
        destructive:
          "bg-destructive text-white shadow-2xs hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40",
        outline:
          "border border-input bg-background shadow-2xs hover:bg-accent hover:text-accent-foreground",
        secondary:
          "bg-secondary text-secondary-foreground shadow-2xs hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-9 px-4 py-2",
        sm: "h-8 rounded-md px-3 text-xs",
        lg: "h-10 rounded-md px-8",
        icon: "size-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

interface ButtonExcelProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: VariantProps<typeof buttonVariantsExcel>["variant"];
    size?: VariantProps<typeof buttonVariantsExcel>["size"];
    asChild?: boolean;
    onImportSuccess?: (message: string) => void;
    onImportError?: (message: string) => void;    
    label?: string;
  }

function ButtonExcel({
  className,
  variant,
  size,
  asChild = false,
  onImportSuccess,
  onImportError,
  label = "Importer Excel",
  children,
  ...props
}: ButtonExcelProps) {
  const Comp = asChild ? Slot : "button";

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    popupEvents.open();
  };

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariantsExcel({ variant, size, className }))}
      onClick={handleClick}
      {...props}
    >
      {children || label}
    </Comp>
  );
}

export { ButtonExcel, buttonVariantsExcel };