"use client";
import * as React from "react";
import { cn } from "@/lib/utils";
import type { STQuestion } from "@/lib/quiz/types";
import { Input } from "@/components/ui/input";
import { MediaRenderer } from "../media-renderer";

export interface ShortTextQuestionCardProps {
  question: STQuestion;
  value: string;
  onChange: (value: string) => void;
  onSubmit?: () => void;
  className?: string;
  questionClassName?: string;
  inputClassName?: string;
  placeholder?: string;
  status?: "idle" | "correct" | "incorrect";
  locked?: boolean;
}

export function ShortTextQuestionCard({
  question,
  value,
  onChange,
  onSubmit,
  className,
  questionClassName,
  inputClassName,
  placeholder,
  status = "idle",
  locked,
}: ShortTextQuestionCardProps) {
  return (
    <div className={cn("flex flex-col gap-6", className)}>
      <div className={cn("w-full", questionClassName)}>
        <MediaRenderer content={question.prompt} role="question" />
        {question.textPrompt && (
          <p className="mt-2 text-base">{question.textPrompt}</p>
        )}
      </div>
      <div className="flex items-center gap-3">
        <Input
          value={value}
          onChange={onChange}
          placeholder={placeholder ?? question.placeholder}
          status={status}
          className={cn("w-full", inputClassName)}
          onEnter={onSubmit}
          disabled={!!locked}
        />
      </div>
    </div>
  );
}
