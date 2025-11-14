"use client";
import { cn } from "@/lib/utils";
import type { MCOption } from "@/lib/quiz/types";
import { MediaRenderer } from "@/components/mcq/media-renderer";
import { OptionButton } from "@/components/ui/option-button";

export interface MCOptionButtonProps {
  option: MCOption;
  isSelected: boolean;
  isCorrect?: boolean;
  disabled?: boolean;
  onSelect: () => void;
  className?: string;
  label?: string;
  showLabel?: boolean;
}

export function MCOptionButton({
  option,
  isSelected,
  disabled,
  onSelect,
  className,
  label,
  showLabel = true,
}: MCOptionButtonProps) {
  const variant = isSelected ? "option-selected" : "option-default";

  return (
    <OptionButton
      variant={variant}
      disabled={disabled}
      onClick={onSelect}
      label={label}
      showLabel={showLabel}
      className={cn(
        "w-full h-auto justify-start text-left rounded-2xl px-4 py-3",
        className
      )}
    >
      <div className="flex items-center gap-3 w-full">
        <MediaRenderer content={option.content} role="option" />
      </div>
    </OptionButton>
  );
}
