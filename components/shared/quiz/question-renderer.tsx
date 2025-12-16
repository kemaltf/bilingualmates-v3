"use client";
import * as React from "react";
import type { QuizQuestion } from "@/lib/quiz/types";
import { MCQuestionCard } from "./mcq/mc-question-card";
import { ShortTextQuestionCard } from "./short-text-question-card";
import ClozeQuestionCard from "./cloze-question-card";
import { MatchQuestionCard } from "./match-question-card";
import QuestionReorder from "./question-reorder";

export interface QuestionRendererProps {
  question: QuizQuestion;
  locked: boolean;
  value: unknown;
  onAnswerChange: (value: unknown) => void;
}

export function QuestionRenderer({
  question,
  locked,
  value,
  onAnswerChange,
}: QuestionRendererProps) {
  if (question.kind === "mcq") {
    return (
      <MCQuestionCard
        question={question}
        selectedOptionId={(value as string) ?? null}
        onSelectOption={(id) => onAnswerChange(id)}
        locked={locked}
      />
    );
  }
  if (question.kind === "short_text") {
    return (
      <ShortTextQuestionCard
        question={question}
        value={(value as string) ?? ""}
        onChange={(v) => onAnswerChange(v)}
        status={"idle"}
        locked={locked}
      />
    );
  }
  if (question.kind === "match") {
    const matches = Array.isArray(value)
      ? (value as { leftId: string; rightId: string }[])
      : [];
    return (
      <MatchQuestionCard
        question={question}
        matches={matches}
        onCreateMatch={(l, r) => {
          const next = [...matches, { leftId: l, rightId: r }];
          onAnswerChange(next);
        }}
        locked={locked}
      />
    );
  }
  if (question.kind === "reorder") {
    return (
      <QuestionReorder
        tokens={question.tokens}
        value={(value as string[]) ?? []}
        onChange={(updated) => onAnswerChange(updated)}
        prompt={question.prompt.text}
        disabled={locked}
      />
    );
  }
  return (
    <ClozeQuestionCard
      prompt={question.prompt}
      segments={question.segments}
      value={(value as Record<string, string>) ?? {}}
      onChange={(next) => onAnswerChange(next)}
      locked={locked}
    />
  );
}
