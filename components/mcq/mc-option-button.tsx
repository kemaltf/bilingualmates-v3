"use client";
import { cn } from "@/lib/utils";
import type { MCOption } from "@/lib/quiz/types";
import { MediaRenderer } from "@/components/mcq/media-renderer";
import { OptionButton } from "@/components/ui/option-button";
import { useState } from "react";

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
  const isAudio = option.content.kind === "audio";
  const [playTrigger, setPlayTrigger] = useState(0);
  const playSound = (url?: string) => {
    if (!url) return;
    try {
      const a = new Audio(url);
      a.play();
    } catch {}
  };

  const handleClick = () => {
    onSelect();
    const soundUrl = option.clickSoundUrl ?? option.content.pronunciationUrl;
    if (soundUrl) {
      playSound(soundUrl);
      return;
    }
    if (isAudio) setPlayTrigger((n) => n + 1);
  };

  return (
    <OptionButton
      variant={variant}
      disabled={disabled}
      onClick={handleClick}
      label={label}
      showLabel={showLabel}
      className={cn(
        "w-full h-auto justify-start text-left rounded-2xl px-4 py-3",
        className
      )}
    >
      <div className="flex items-center gap-3 w-full">
        <MediaRenderer
          content={option.content}
          role="option"
          autoPlayTrigger={playTrigger}
        />
      </div>
    </OptionButton>
  );
}
