"use client";

import { QuizRunner } from "@/components/shared/quiz/quiz-runner";
import type { QuizQuestion } from "@/lib/quiz/types";

// Trial questions could also be moved to constants or fetched from API/translation
const TRIAL_QUESTIONS: QuizQuestion[] = [
  {
    kind: "mcq",
    id: "trial-1",
    prompt: {
      kind: "text",
      text: "Select the correct translation for 'Hello'",
    },
    options: [
      { id: "a", content: { kind: "text", text: "Hallo" } },
      { id: "b", content: { kind: "text", text: "Tschüss" } },
      { id: "c", content: { kind: "text", text: "Danke" } },
    ],
    correctOptionId: "a",
    textPrompt: "Select the correct option",
  },
  {
    kind: "mcq",
    id: "trial-2",
    prompt: { kind: "text", text: "Which of these is 'Coffee'?" },
    options: [
      { id: "a", content: { kind: "text", text: "Wasser" } },
      { id: "b", content: { kind: "text", text: "Kaffee" } },
      { id: "c", content: { kind: "text", text: "Milch" } },
    ],
    correctOptionId: "b",
    textPrompt: "Select the correct option",
  },
  {
    kind: "cloze",
    id: "trial-3",
    prompt: { kind: "text", text: "Complete the sentence" },
    segments: [
      { kind: "text", text: "Ich " },
      { kind: "blank", blank: { id: "b1", options: ["bin", "bist"] } },
      { kind: "text", text: " gut." },
    ],
    correctAnswers: { b1: "bin" },
  },
];

type Props = {
  onComplete: () => void;
};

export function TrialStep({ onComplete }: Props) {
  return (
    <div className="w-full max-w-2xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
      <QuizRunner
        questions={TRIAL_QUESTIONS}
        footerVariant="sticky"
        onComplete={() => {
          onComplete();
        }}
        onClose={() => {}} // Disable close during onboarding
      />
    </div>
  );
}
