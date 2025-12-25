"use client";
import * as React from "react";
import type { QuizQuestion, SubmitAttemptPayload } from "@/lib/quiz/types";
import { useQuizController } from "@/hooks/use-quiz-controller";
import { QuestionRenderer } from "./question-renderer";
import { FeedbackCard } from "@/components/shared/feedback-card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import LottiePlayer from "@/components/shared/LottiePlayer";
import { AlertOctagon } from "lucide-react";

export interface QuizRunnerProps {
  questions: QuizQuestion[];
  onComplete?: (payload: SubmitAttemptPayload) => void;
  onSubmitAnswer?: (payload: SubmitAttemptPayload["answers"][number]) => void;
  onClose?: () => void;
  attemptId?: string;
  lessonId?: string;
  userId?: string;
  className?: string;
  footerVariant?: "inline" | "sticky";
  hideHeader?: boolean;
}

function feedbackToCardStatus(
  fb: "idle" | "correct" | "incorrect"
): "correct" | "incorrect" | "info" {
  if (fb === "correct") return "correct";
  if (fb === "incorrect") return "incorrect";
  return "info";
}

function praise(id: string) {
  const variants = ["Great job!", "Nice work!", "Well done!", "Awesome!"];
  const sum = Array.from(id).reduce((acc, ch) => acc + ch.charCodeAt(0), 0);
  return variants[sum % variants.length];
}

export function QuizRunner({
  questions,
  onComplete,
  onSubmitAnswer,
  onClose,
  attemptId,
  lessonId,
  userId,
  className,
  footerVariant = "inline",
  hideHeader,
}: QuizRunnerProps) {
  const controller = useQuizController(
    questions,
    onComplete,
    {
      attemptId: attemptId ?? `attempt-${lessonId ?? "lesson-demo"}`,
      lessonId: lessonId ?? "lesson-demo",
      userId,
    },
    onSubmitAnswer
  );
  const q = controller.question;
  const value = controller.answers[q.id];
  const [showConfetti, setShowConfetti] = React.useState(false);

  const { isLocked, checkAnswer, nextQuestion } = controller;
  const isTheory = q.kind === "theory";

  React.useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Enter") {
        if (!isLocked) checkAnswer();
        else nextQuestion();
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [isLocked, checkAnswer, nextQuestion]);

  React.useEffect(() => {
    if (controller.feedback === "correct") {
      setShowConfetti(true);
      const t = setTimeout(() => setShowConfetti(false), 1500);
      return () => clearTimeout(t);
    }
  }, [controller.feedback]);

  const progress = Math.round(
    ((controller.index + 1) / questions.length) * 100
  );

  return (
    <div className={cn("w-full space-y-4", className)}>
      {!hideHeader && (
        <div className="flex items-center justify-between">
          <Button
            variant="text"
            size="icon-sm"
            aria-label="Close"
            onClick={() => {
              if (onClose) {
                onClose();
              } else if (typeof window !== "undefined") {
                window.history.back();
              }
            }}
          >
            {/* icon */}
            <svg viewBox="0 0 24 24" className="size-5" aria-hidden="true">
              <path
                d="M18 6L6 18"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
              <path
                d="M6 6L18 18"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </Button>
          <div className="flex items-center gap-3">
            <div className="text-sm font-semibold hidden md:block">
              Question {controller.index + 1} of {questions.length}
            </div>
            <div className="w-56 h-2 bg-neutral-200 rounded-full overflow-hidden">
              <div
                className="h-2 bg-sky-500"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        </div>
      )}

      <div className="max-w-[720px] mx-auto">
        <QuestionRenderer
          question={q}
          locked={controller.isLocked}
          value={value}
          onAnswerChange={(val) => controller.setAnswer(q.id, val)}
        />
      </div>

      {controller.feedback !== "idle" && q.explanation && (
        <FeedbackCard
          status={feedbackToCardStatus(controller.feedback)}
          explanation={q.explanation}
        />
      )}

      {showConfetti && (
        <div className="fixed inset-x-0 bottom-0 z-40 pointer-events-none translate-y-6">
          <LottiePlayer
            src="/confetti big.json"
            className="w-screen"
            fitWidth
          />
        </div>
      )}

      {footerVariant === "inline" ? (
        <div className="flex items-center justify-end gap-3 px-4">
          {controller.feedback === "idle" ? (
            <Button
              variant={isTheory ? "green" : "blue"}
              size="md"
              disabled={!controller.canCheck || controller.isLocked}
              onClick={controller.checkAnswer}
              label={
                isTheory
                  ? q.kind === "theory" && q.buttonLabel
                    ? q.buttonLabel
                    : "Lanjutkan"
                  : "Check"
              }
            />
          ) : (
            <Button
              variant="green"
              size="md"
              onClick={controller.nextQuestion}
              label={controller.isLast ? "Finish" : "Next"}
            />
          )}
        </div>
      ) : (
        <div className="fixed bottom-0 inset-x-0 z-50">
          <div className="bg-white border-t dark:bg-neutral-900 dark:border-neutral-800">
            <div className="max-w-[980px] mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-6">
              <div className="flex items-center gap-3">
                {controller.feedback === "correct" && !isTheory && (
                  <LottiePlayer src="/confetti.json" className="h-16 w-16" />
                )}
                {controller.feedback !== "idle" && !isTheory && (
                  <div className="flex flex-col items-start gap-1">
                    <div className="text-sm font-extrabold">
                      {controller.feedback === "correct"
                        ? praise(q.id)
                        : "Coba lagi"}
                    </div>
                    <Button variant="text" size="sm">
                      <AlertOctagon className="size-4" /> LAPORKAN
                    </Button>
                  </div>
                )}
              </div>
              <div className="flex items-center gap-3 ml-auto">
                {controller.feedback !== "idle" && <></>}
                {controller.feedback === "idle" ? (
                  <Button
                    variant={isTheory ? "green" : "blue"}
                    size="md"
                    disabled={!controller.canCheck || controller.isLocked}
                    onClick={controller.checkAnswer}
                    label={
                      isTheory
                        ? q.kind === "theory" && q.buttonLabel
                          ? q.buttonLabel
                          : "LANJUTKAN"
                        : "PERIKSA"
                    }
                  />
                ) : (
                  <Button
                    variant="green"
                    size="md"
                    onClick={controller.nextQuestion}
                    label={controller.isLast ? "SELESAI" : "LANJUTKAN"}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
