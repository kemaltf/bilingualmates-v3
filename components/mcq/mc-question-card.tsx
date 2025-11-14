"use client";
import { cn } from "@/lib/utils";
import type { MCQuestion } from "@/lib/quiz/types";
import { MediaRenderer } from "@/components/mcq/media-renderer";
import { MCOptionButton } from "@/components/mcq/mc-option-button";

export interface MCQuestionCardProps {
  question: MCQuestion;
  selectedOptionId: string | null;
  onSelectOption: (id: string) => void;
  className?: string;
  showOptionLabel?: boolean;
}

export function MCQuestionCard({
  question,
  selectedOptionId,
  onSelectOption,
  className,
  showOptionLabel = true,
}: MCQuestionCardProps) {
  return (
    <div className={cn("flex flex-col gap-6", className)}>
      <MediaRenderer content={question.prompt} role="question" />
      <div className="grid gap-3 md:grid-cols-2">
        {question.options.map((opt) => (
          <MCOptionButton
            key={opt.id}
            option={opt}
            isSelected={selectedOptionId === opt.id}
            onSelect={() => onSelectOption(opt.id)}
            label={String.fromCharCode(65 + question.options.indexOf(opt))}
            showLabel={showOptionLabel}
          />
        ))}
      </div>
    </div>
  );
}
