"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import {
  CheckCircle2,
  XCircle,
  Flag,
  MessageSquare,
  ChevronUp,
} from "lucide-react";
import { QuizQuestion } from "@/lib/quiz/types";
import { getIncorrectFeedback, praise } from "./quiz-helpers";
import { useQuizSound } from "@/hooks/use-quiz-sound";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { TheoryQuestionCard } from "./theory-question-card";

interface QuizFooterProps {
  variant: "inline" | "sticky";
  status: "idle" | "correct" | "incorrect";
  question: QuizQuestion;
  userAnswer: unknown;
  explanation?: string;
  isLocked: boolean;
  isLast: boolean;
  canCheck: boolean;
  isTheory: boolean;
  onCheck: () => void;
  onNext: () => void;
}

export function QuizFooter({
  variant,
  status,
  question,
  userAnswer,
  explanation,
  isLocked,
  isLast,
  canCheck,
  isTheory,
  onCheck,
  onNext,
}: QuizFooterProps) {
  const sounds = useQuizSound();
  const [isExpanded, setIsExpanded] = React.useState(false);

  const handleCheck = () => {
    sounds.playTap();
    onCheck();
  };

  const handleNext = () => {
    sounds.playTap();
    setIsExpanded(false);
    onNext();
  };

  const hasExplanation = !!explanation;

  const feedbackText = getIncorrectFeedback(question, userAnswer);
  const isDefaultFeedback = feedbackText.startsWith("Correct answer: ");
  const displayLabel = isDefaultFeedback ? "Correct solution:" : "Feedback:";
  const displayText = isDefaultFeedback
    ? feedbackText.replace("Correct answer: ", "")
    : feedbackText;

  // Inline Variant (unchanged mostly, but we focus on sticky)
  if (variant === "inline") {
    return (
      <div className="flex items-center justify-end gap-3 px-4">
        {status === "idle" ? (
          <Button
            variant={isTheory ? "green" : "blue"}
            size="md"
            disabled={!canCheck || isLocked}
            onClick={handleCheck}
            label={
              isTheory
                ? question.kind === "theory" && question.buttonLabel
                  ? question.buttonLabel
                  : "Lanjutkan"
                : "Check"
            }
          />
        ) : (
          <Button
            variant="green"
            size="md"
            onClick={handleNext}
            label={isLast ? "Finish" : "Next"}
          />
        )}
      </div>
    );
  }

  // Sticky Variant
  return (
    <>
      <div className="fixed bottom-0 inset-x-0 z-50">
        <div
          className={cn(
            "border-t transition-colors duration-300",
            status === "correct" &&
              "bg-emerald-100 border-emerald-200 dark:bg-emerald-900/90 dark:border-emerald-800",
            status === "incorrect" &&
              "bg-rose-100 border-rose-200 dark:bg-rose-900/90 dark:border-rose-800",
            status === "idle" &&
              "bg-background border-border dark:bg-neutral-900 dark:border-neutral-800"
          )}
        >
          <div className="max-w-[980px] mx-auto px-4 sm:px-6 h-auto min-h-[5rem] py-4 flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-6">
            <div className="flex items-center gap-4 w-full sm:w-auto">
              {/* Correct Feedback */}
              {status === "correct" && (
                <div className="flex items-center gap-3 animate-in fade-in slide-in-from-bottom-2">
                  <div className="bg-white dark:bg-emerald-950 rounded-full p-1">
                    <CheckCircle2 className="size-8 text-emerald-600 dark:text-emerald-400" />
                  </div>
                  <div className="flex flex-col">
                    <div className="text-xl font-bold text-emerald-800 dark:text-emerald-200">
                      {praise(question.id)}
                    </div>
                    {hasExplanation && (
                      <button
                        onClick={() => setIsExpanded(true)}
                        className="text-sm font-bold text-emerald-700 dark:text-emerald-300 hover:brightness-110 text-left uppercase tracking-wide flex items-center gap-1 mt-1"
                      >
                        <MessageSquare className="size-4" /> Explain{" "}
                        <ChevronUp className="size-4" />
                      </button>
                    )}
                  </div>
                </div>
              )}

              {/* Incorrect Feedback */}
              {status === "incorrect" && (
                <div className="flex items-center gap-3 animate-in fade-in slide-in-from-bottom-2 w-full">
                  <div className="bg-white dark:bg-rose-950 rounded-full p-1 shrink-0">
                    <XCircle className="size-8 text-rose-600 dark:text-rose-400" />
                  </div>
                  <div className="flex flex-col min-w-0 flex-1">
                    <span className="text-xl font-bold text-rose-800 dark:text-rose-200">
                      {displayLabel}
                    </span>
                    <span className="text-base text-rose-700 dark:text-rose-300 truncate sm:whitespace-normal">
                      {displayText}
                    </span>
                    {hasExplanation && (
                      <button
                        onClick={() => setIsExpanded(true)}
                        className="text-sm font-bold text-rose-700 dark:text-rose-300 hover:brightness-110 text-left mt-1 flex items-center gap-1 uppercase tracking-wide"
                      >
                        <MessageSquare className="size-4" /> Explain{" "}
                        <ChevronUp className="size-4" />
                      </button>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-3 ml-auto w-full sm:w-auto">
              {status === "incorrect" && (
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-rose-700 dark:text-rose-300 hover:bg-rose-200 dark:hover:bg-rose-800 hidden sm:flex"
                >
                  <Flag className="size-5" />
                </Button>
              )}

              {status === "idle" ? (
                <Button
                  variant={isTheory ? "green" : "blue"}
                  size="lg"
                  className="w-full sm:w-auto min-w-[150px]"
                  disabled={!canCheck || isLocked}
                  onClick={handleCheck}
                  label={
                    isTheory
                      ? question.kind === "theory" && question.buttonLabel
                        ? question.buttonLabel
                        : "Lanjutkan"
                      : "Check"
                  }
                />
              ) : (
                <Button
                  variant={status === "incorrect" ? "red" : "green"}
                  size="lg"
                  className="w-full sm:w-auto min-w-[150px]"
                  onClick={handleNext}
                  label={isLast ? "Finish" : "Continue"}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Expanded Sheet */}
      <AnimatePresence>
        {isExpanded && explanation && (
          <motion.div
            initial={{ opacity: 0, y: "100%" }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-[60] bg-background flex flex-col"
          >
            <div className="relative flex items-center justify-center p-4 border-b">
              <h3 className="text-lg font-bold text-center">Explanation</h3>
              <div className="absolute right-4 top-1/2 -translate-y-1/2">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsExpanded(false)}
                >
                  <XCircle className="size-6" />
                </Button>
              </div>
            </div>
            <div className="flex-1 overflow-y-auto p-4 sm:p-6">
              <div className="max-w-2xl mx-auto">
                <TheoryQuestionCard
                  question={{
                    id: "explanation",
                    content: "", // Required by type, but unused with blocks
                    title: "Why is this correct?",
                    blocks: [{ kind: "text", html: explanation }],
                  }}
                />
              </div>
            </div>
            <div className="p-4 border-t flex justify-center sm:justify-end">
              <Button
                className="w-full sm:w-auto sm:px-10"
                size="lg"
                onClick={() => setIsExpanded(false)}
              >
                Got it
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
