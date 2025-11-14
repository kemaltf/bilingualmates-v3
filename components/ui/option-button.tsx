"use client";
import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const optionButtonVariants = cva(
  "w-full p-4 text-left rounded-2xl transition-all duration-150 ease-in-out focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 border-[3px]",
  {
    variants: {
      variant: {
        "option-default":
          "bg-white border-neutral-300 text-neutral-800 shadow-[0_3px_0_0_#a3a3a3] active:translate-y-1 active:shadow-none hover:bg-neutral-50 cursor-pointer focus-visible:ring-sky-500",
        "option-selected":
          "bg-sky-100 border-sky-300 text-sky-800 shadow-[0_1px_0_0_#7dd3fc] translate-y-1 cursor-pointer focus-visible:ring-sky-500",
        "option-correct":
          "bg-emerald-100 border-emerald-400 text-emerald-900 shadow-none cursor-default focus-visible:ring-emerald-500",
        "option-incorrect":
          "bg-rose-100 border-rose-400 text-rose-900 shadow-none cursor-default focus-visible:ring-rose-500",
        "option-disabled":
          "bg-neutral-100 border-neutral-200 text-neutral-400 opacity-80 cursor-not-allowed",
      },
    },
    defaultVariants: {
      variant: "option-default",
    },
  }
);

function OptionButton({ className, variant, disabled, children, ...props }: React.ComponentProps<"button"> & VariantProps<typeof optionButtonVariants>) {
  return (
    <button
      type="button"
      aria-disabled={disabled}
      disabled={disabled}
      className={cn(optionButtonVariants({ variant, className }))}
      {...props}
    >
      {children}
    </button>
  );
}

export { OptionButton, optionButtonVariants };