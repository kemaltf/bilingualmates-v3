"use client";
import * as React from "react";
import { cn } from "@/lib/utils";
import type { MCQuestion } from "@/lib/quiz/types";
import { MediaRenderer } from "../../media-renderer";
import { MCOptionButton } from "./mc-option-button";

export interface MCQuestionCardProps {
  question: MCQuestion;
  selectedOptionId: string | null;
  onSelectOption: (id: string) => void;
  className?: string;
  showOptionLabel?: boolean;
  questionClassName?: string;
  containerOptionClassName?: string;
  locked?: boolean;
  labelStyle?: "numeric" | "alpha";
}

export function MCQuestionCard({
  question,
  selectedOptionId,
  onSelectOption,
  className,
  showOptionLabel = true,
  questionClassName,
  containerOptionClassName = "md:grid-cols-2",
  locked,
  labelStyle = "numeric",
}: MCQuestionCardProps) {
  usePronunciationOnCorrect(question, selectedOptionId);
  return (
    <div className={cn("flex flex-col gap-6", className)}>
      <div className={cn("w-full", questionClassName)}>
        <MediaRenderer content={question.prompt} role="question" />
        {question.textPrompt && (
          <p className="mt-2 text-base">{question.textPrompt}</p>
        )}
      </div>
      <div className={cn("grid gap-3", containerOptionClassName)}>
        {question.options.map((opt, idx) => (
          <MCOptionButton
            key={opt.id}
            option={opt}
            isSelected={selectedOptionId === opt.id}
            disabled={!!locked}
            onSelect={() => onSelectOption(opt.id)}
            label={
              labelStyle === "numeric" ? 1 + idx : String.fromCharCode(65 + idx)
            }
            hotkey={
              labelStyle === "numeric" ? 1 + idx : String.fromCharCode(97 + idx)
            }
            showLabel={showOptionLabel}
          />
        ))}
      </div>
    </div>
  );
}

export function usePronunciationOnCorrect(
  question: MCQuestion,
  selectedOptionId: string | null
) {
  React.useEffect(() => {
    if (!selectedOptionId || selectedOptionId !== question.correctOptionId)
      return;
    const url = question.prompt.pronunciationUrl;
    if (!url) return;
    try {
      const a = new Audio(url);
      a.play();
    } catch {}
  }, [question, selectedOptionId]);
}
