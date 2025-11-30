"use client";
import * as React from "react";
import { cn } from "@/lib/utils";
import type { MediaContent, QuizQuestion } from "@/lib/quiz/types";
import { MediaRenderer } from "@/components/shared/media-renderer";
import { QuestionRenderer } from "@/components/shared/quiz/question-renderer";
import { Button } from "@/components/ui/button";

export type ReadingSection =
  | { kind: "text"; id: string; content: MediaContent }
  | { kind: "quiz"; id: string; question: QuizQuestion };

export interface ReadingRunnerProps {
  sections: ReadingSection[];
  className?: string;
  onComplete?: () => void;
}

export default function ReadingRunner({ sections, className, onComplete }: ReadingRunnerProps) {
  const [index, setIndex] = React.useState(0);
  const [answers, setAnswers] = React.useState<Record<string, unknown>>({});
  const [locked, setLocked] = React.useState(false);
  const [feedback, setFeedback] = React.useState<"idle" | "correct" | "incorrect">("idle");

  const step = sections[index];
  const pct = Math.round(((index + 1) / Math.max(1, sections.length)) * 100);

  const next = () => {
    setFeedback("idle");
    setLocked(false);
    setIndex((i) => {
      const ni = Math.min(sections.length - 1, i + 1);
      if (ni === sections.length - 1 && sections[ni].kind === "text") {
        // noop
      }
      if (ni === sections.length - 1 && i + 1 === sections.length) onComplete?.();
      return ni;
    });
  };

  const check = () => {
    if (step?.kind !== "quiz") return;
    setLocked(true);
    const q = step.question;
    const val = answers[q.id];
    let ok = false;
    if (q.kind === "mcq") {
      ok = val === q.correctOptionId;
    } else if (q.kind === "short_text") {
      const v = typeof val === "string" ? vNormalize(val) : "";
      const keys = (q.correctAnswers ?? []).map(vNormalize);
      ok = keys.includes(v);
    } else if (q.kind === "reorder") {
      const ans = Array.isArray(val) ? (val as string[]).join(" ") : "";
      const normalizedAns = vNormalize(ans);
      const correct = q.correctSentence
        ? vNormalize(q.correctSentence)
        : vNormalize((q.correctOrder ?? []).join(" "));
      ok = normalizedAns === correct;
    } else if (q.kind === "cloze") {
      const user = (val as Record<string, string>) || {};
      const correct = q.correctAnswers || {};
      const keys = Object.keys(correct);
      ok = keys.length > 0 && keys.every((k) => (user[k] ?? "") === correct[k]);
    } else if (q.kind === "match") {
      const pairs = Array.isArray(val)
        ? (val as { leftId: string; rightId: string }[])
        : [];
      const correct = q.correctPairs ?? [];
      if (pairs.length !== correct.length) ok = false;
      else {
        const set = new Set(correct.map((p) => `${p.leftId}:${p.rightId}`));
        ok = pairs.every((p) => set.has(`${p.leftId}:${p.rightId}`));
      }
    }
    setFeedback(ok ? "correct" : "incorrect");
  };

  const vNormalize = (s: string) => s.trim().toLowerCase().replace(/\s+/g, " ");

  return (
    <div className={cn("w-full space-y-4", className)}>
      <div className="px-4">
        <div className="flex items-center justify-between">
          <div className="text-sm font-semibold">Reading {index + 1} of {sections.length}</div>
          <div className="w-56 h-2 bg-neutral-200 rounded-full overflow-hidden">
            <div className="h-2 bg-sky-500" style={{ width: `${pct}%` }} />
          </div>
        </div>
      </div>

      <div className="max-w-[760px] mx-auto px-4">
        {step?.kind === "text" ? (
          <div className="rounded-2xl border p-4">
            <MediaRenderer content={step.content} role="question" />
          </div>
        ) : (
          <div className="rounded-2xl">
            <QuestionRenderer
              question={step.question}
              locked={locked}
              value={answers[step.question.id]}
              onAnswerChange={(val) => setAnswers((prev) => ({ ...prev, [step.question.id]: val }))}
            />
          </div>
        )}
      </div>

      <div className="flex items-center justify-end gap-3 px-4">
        {step?.kind === "text" ? (
          <Button variant="green" size="md" label={index === sections.length - 1 ? "Finish" : "Next"} onClick={next} />
        ) : feedback === "idle" ? (
          <Button variant="blue" size="md" label="Check" onClick={check} />
        ) : (
          <Button variant="green" size="md" label={index === sections.length - 1 ? "Finish" : "Next"} onClick={next} />
        )}
      </div>
    </div>
  );
}
