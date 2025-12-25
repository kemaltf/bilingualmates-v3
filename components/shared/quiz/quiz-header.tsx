"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { useQuizSound } from "@/hooks/use-quiz-sound";

interface QuizHeaderProps {
  currentIndex: number;
  totalQuestions: number;
  progress: number;
  onClose: () => void;
}

export function QuizHeader({
  currentIndex,
  totalQuestions,
  progress,
  onClose,
}: QuizHeaderProps) {
  const sounds = useQuizSound();

  const handleClose = () => {
    sounds.playAlert();
    onClose();
  };

  return (
    <div className="flex items-center justify-between">
      <Button
        variant="text"
        size="icon-sm"
        aria-label="Close"
        onClick={handleClose}
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
      <div className="flex items-center gap-3 w-full max-w-[calc(100%-48px)] justify-end sm:justify-start sm:w-auto sm:max-w-none">
        <div className="text-sm font-semibold hidden md:block whitespace-nowrap">
          Question {currentIndex + 1} of {totalQuestions}
        </div>
        <div className="w-full sm:w-56 h-2 bg-neutral-200 rounded-full overflow-hidden shrink-0">
          <div
            className="h-2 bg-sky-500 transition-all duration-500 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </div>
  );
}
