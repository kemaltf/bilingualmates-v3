"use client";
import * as React from "react";
import type { QuizQuestion, SubmitAttemptPayload } from "@/lib/quiz/types";
import {
  PraiseCard,
  type PraiseType,
} from "@/components/shared/quiz/praise-card";
import { useQuizSound } from "@/hooks/use-quiz-sound";
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

  // Sound & Praise State
  const sounds = useQuizSound();
  const [praiseType, setPraiseType] = React.useState<PraiseType | null>(null);
  const [consecutiveCorrect, setConsecutiveCorrect] = React.useState(0);
  const [consecutiveWrong, setConsecutiveWrong] = React.useState(0);

  const { isLocked, checkAnswer, nextQuestion } = controller;
  const isTheory = q.kind === "theory";

  // Handle Next Question with Praise Logic
  const handleNext = () => {
    // 1. Check for Lesson Complete (Celebration)
    if (controller.isLast) {
      setPraiseType("celebration");
      sounds.playCelebration();
      return;
    }

    // 2. Check for Intermediate Praise
    if (consecutiveCorrect >= 3) {
      setPraiseType("encouragement");
      sounds.playTransition();
      setConsecutiveCorrect(0); // Reset after triggering
      return;
    }

    if (consecutiveWrong >= 2) {
      setPraiseType("recovery");
      sounds.playTransition();
      setConsecutiveWrong(0); // Reset after triggering
      return;
    }

    // 3. Normal flow
    nextQuestion();
  };

  const handlePraiseContinue = () => {
    setPraiseType(null);
    nextQuestion();
  };

  React.useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Enter") {
        if (praiseType) {
          handlePraiseContinue();
          return;
        }

        if (!isLocked) checkAnswer();
        else handleNext();
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [
    isLocked,
    checkAnswer,
    nextQuestion,
    praiseType,
    consecutiveCorrect,
    consecutiveWrong,
  ]);

  React.useEffect(() => {
    if (controller.feedback === "correct") {
      sounds.playCorrect();
      setConsecutiveCorrect((prev) => prev + 1);
      setConsecutiveWrong(0);
      setShowConfetti(true);
      const t = setTimeout(() => setShowConfetti(false), 1500);
      return () => clearTimeout(t);
    } else if (controller.feedback === "incorrect") {
      sounds.playIncorrect();
      setConsecutiveWrong((prev) => prev + 1);
      setConsecutiveCorrect(0);
    } else {
      setShowConfetti(false);
    }
  }, [controller.feedback]);

  const progress = Math.round(
    ((controller.index + 1) / questions.length) * 100
  );

  if (praiseType) {
    return <PraiseCard type={praiseType} onContinue={handlePraiseContinue} />;
  }

  return (
    <div className={cn("w-full space-y-4", className)}>
      {showConfetti && (
        <div className="fixed inset-0 z-50 pointer-events-none flex items-end justify-center">
          <LottiePlayer
            src="/confetti big.json"
            className="w-full h-full object-cover"
            fitWidth
            loop={false}
          />
        </div>
      )}
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
        {praiseType ? (
          <PraiseCard type={praiseType} onContinue={handlePraiseContinue} />
        ) : (
          <QuestionRenderer
            question={q}
            locked={controller.isLocked}
            value={value}
            onAnswerChange={(val) => controller.setAnswer(q.id, val)}
          />
        )}
      </div>

      {controller.feedback !== "idle" && q.explanation && !praiseType && (
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
            loop={false}
          />
        </div>
      )}

      {!praiseType &&
        (footerVariant === "inline" ? (
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
                onClick={handleNext}
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
                    <div className="flex items-center gap-3">
                      <LottiePlayer
                        src="/confetti.json"
                        className="h-16 w-16"
                        loop={false}
                      />
                      <div className="text-xl font-bold text-emerald-600 dark:text-emerald-400">
                        {praise(q.id)}
                      </div>
                    </div>
                  )}
                  {controller.feedback === "incorrect" && !isTheory && (
                    <div className="flex items-center gap-3">
                      <div className="bg-white rounded-full p-2 shadow-sm">
                        <AlertOctagon className="h-8 w-8 text-rose-500" />
                      </div>
                      <div className="flex flex-col">
                        <span className="text-xl font-bold text-rose-600 dark:text-rose-400">
                          Incorrect
                        </span>
                        <span className="text-sm text-rose-600/80 dark:text-rose-400/80">
                          {getIncorrectFeedback(q, controller.answers[q.id])}
                        </span>
                      </div>
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
                      onClick={handleNext}
                      label={controller.isLast ? "SELESAI" : "LANJUTKAN"}
                    />
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
    </div>
  );
}

function getCorrectAnswerText(q: QuizQuestion): string {
  if (q.kind === "mcq") {
    const correctOpt = q.options.find((o) => o.id === q.correctOptionId);
    if (correctOpt?.content.kind === "text")
      return correctOpt.content.text ?? "";
    return "See above";
  }
  if (q.kind === "cloze") {
    // Join answers
    if (q.correctAnswers) {
      return Object.values(q.correctAnswers).join(", ");
    }
    return "See above";
  }
  if (q.kind === "short_text") {
    return Array.isArray(q.correctAnswers)
      ? (q.correctAnswers[0] ?? "")
      : (q.correctAnswers ?? "");
  }
  // For match/reorder, usually just showing the solution state is enough or complex to stringify
  return "Solution shown above";
}

function getIncorrectFeedback(q: QuizQuestion, answer: unknown): string {
  if (q.kind === "mcq" && typeof answer === "string") {
    const selectedOption = q.options.find((o) => o.id === answer);
    if (selectedOption?.feedback) {
      return selectedOption.feedback;
    }
  }
  return `Correct answer: ${getCorrectAnswerText(q)}`;
}
