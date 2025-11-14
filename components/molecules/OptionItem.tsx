"use client";
import * as React from "react";
import {
  OptionButton,
  optionButtonVariants,
} from "@/components/ui/option-button";
import type { VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

export type FeedbackState = "idle" | "correct" | "incorrect" | undefined;
export type OptionButtonVariant = VariantProps<
  typeof optionButtonVariants
>["variant"];

export function getOptionButtonVariant(params: {
  optionId: string;
  selectedId?: string | null;
  locked?: boolean;
  feedback?: FeedbackState;
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

type OptionItemProps = {
  label: string;
  variant: OptionButtonVariant;
  disabled?: boolean;
  pressed?: boolean;
  onClick?: () => void;
  className?: string;
  children?: React.ReactNode;
  showLabel?: boolean;
};

function labelClassesByVariant(variant: OptionButtonVariant) {
  const base =
    "flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center font-bold text-base";
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

export const OptionItem: React.FC<OptionItemProps> = ({
  label,
  variant,
  disabled = false,
  pressed = false,
  onClick,
  className = "",
  children,
  showLabel = true,
}) => {
  return (
    <OptionButton
      variant={variant}
      disabled={disabled}
      onClick={onClick}
      className={cn(className, pressed && "translate-y-1 shadow-none")}
    >
      <div className="flex items-center gap-4">
        {showLabel && (
          <span className={labelClassesByVariant(variant)}>{label}</span>
        )}
        <div className="flex-1 space-y-2">{children}</div>
      </div>
    </OptionButton>
  );
};

export default OptionItem;
