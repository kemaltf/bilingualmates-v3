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
import { cn } from "@/lib/utils";
import LottiePlayer from "@/components/shared/LottiePlayer";
import { QuizExitModal } from "./quiz-exit-modal";
import { QuizHeader } from "./quiz-header";
import { QuizFooter } from "./quiz-footer";
import { useAudioPrefetch } from "@/hooks/use-audio-prefetch";

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
  const [showExitModal, setShowExitModal] = React.useState(false);

  // Sound & Praise State
  const sounds = useQuizSound();
  const [praiseType, setPraiseType] = React.useState<PraiseType | null>(null);
  const [consecutiveCorrect, setConsecutiveCorrect] = React.useState(0);
  const [consecutiveWrong, setConsecutiveWrong] = React.useState(0);

  const { isLocked, checkAnswer, nextQuestion } = controller;
  const isTheory = q.kind === "theory";

  // Prefetch audio content
  useAudioPrefetch(questions);

  // Handle Next Question with Praise Logic
  const handleNext = () => {
    // 1. Check for Intermediate Praise
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

    // 2. Normal flow
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

  React.useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      e.preventDefault();
      e.returnValue = ""; // Chrome requires returnValue to be set
    };
    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, []);

  const progress = Math.round(
    ((controller.index + 1) / questions.length) * 100
  );

  const handleExitConfirm = () => {
    setShowExitModal(false);
    if (onClose) {
      onClose();
    } else if (typeof window !== "undefined") {
      window.history.back();
    }
  };

  if (praiseType) {
    return <PraiseCard type={praiseType} onContinue={handlePraiseContinue} />;
  }

  return (
    <div className={cn("w-full space-y-4", className)}>
      <QuizExitModal
        open={showExitModal}
        onOpenChange={setShowExitModal}
        onConfirm={handleExitConfirm}
        onCancel={() => setShowExitModal(false)}
      />

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
        <QuizHeader
          currentIndex={controller.index}
          totalQuestions={questions.length}
          progress={progress}
          onClose={() => setShowExitModal(true)}
        />
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

      <div className="h-32 sm:h-40" />

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

      {!praiseType && (
        <QuizFooter
          variant={footerVariant}
          status={controller.feedback}
          question={q}
          userAnswer={value}
          explanation={q.explanation}
          isLocked={controller.isLocked}
          isLast={controller.isLast}
          canCheck={controller.canCheck}
          isTheory={isTheory}
          onCheck={controller.checkAnswer}
          onNext={handleNext}
        />
      )}
    </div>
  );
}
