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

export type OptionButtonVariant = VariantProps<typeof optionButtonVariants>["variant"];

function labelClassesByVariant(variant: OptionButtonVariant) {
  const base = "flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center font-bold text-base";
  switch (variant) {
    case "option-selected":
      return `${base} bg-sky-200 text-sky-700`;
    case "option-correct":
      return `${base} bg-emerald-200 text-emerald-700`;
    case "option-incorrect":
      return `${base} bg-rose-200 text-rose-700`;
    case "option-disabled":
      return `${base} bg-neutral-200 text-neutral-500`;
    default:
      return `${base} bg-neutral-200 text-neutral-600`;
  }
}

export function getOptionButtonVariant(params: {
  optionId: string;
  selectedId?: string | null;
  locked?: boolean;
  feedback?: "idle" | "correct" | "incorrect" | undefined;
  answerKey?: string | null;
}): OptionButtonVariant {
  const { optionId, selectedId, locked, feedback, answerKey } = params;
  const isSelected = selectedId === optionId;

  if (locked) {
    if (feedback === "correct") {
      return isSelected ? "option-correct" : "option-disabled";
    }
    if (feedback === "incorrect") {
      if (isSelected) return "option-incorrect";
      if (answerKey && optionId === answerKey) return "option-correct";
      return "option-disabled";
    }
    return "option-disabled";
  }

  return isSelected ? "option-selected" : "option-default";
}

type OptionButtonProps = React.ComponentProps<"button"> &
  VariantProps<typeof optionButtonVariants> & {
    label?: string;
    showLabel?: boolean;
    pressed?: boolean;
  };

function OptionButton({ className, variant, disabled, children, label, showLabel = true, pressed = false, ...props }: OptionButtonProps) {
  return (
    <button
      type="button"
      aria-disabled={disabled}
      disabled={disabled}
      className={cn(optionButtonVariants({ variant, className }), pressed && "translate-y-1 shadow-none")}
      {...props}
    >
      <div className="flex items-center gap-4">
        {showLabel && label && <span className={labelClassesByVariant(variant as OptionButtonVariant)}>{label}</span>}
        <div className="flex-1 space-y-2">{children}</div>
      </div>
    </button>
  );
}

export { OptionButton, optionButtonVariants };