"use client";
import * as React from "react";
import type { Unit, LessonNode } from "@/lib/learn/types";
import { Button } from "@/components/ui/button";
import { FastForward } from "lucide-react";
import { cn } from "@/lib/utils";
import type { BrandColor } from "@/lib/ui/design-tokens";
import { brandColorToButtonVariant } from "@/lib/ui/design-tokens";
import { ArrowLeft } from "lucide-react";
import { QuizRunner } from "@/components/shared/quiz/quiz-runner";
import type { QuizQuestion } from "@/lib/quiz/types";
import { LessonTooltip } from "./LessonTooltipContent";

// Mock quiz data for preview
const PREVIEW_QUESTIONS: QuizQuestion[] = [
  {
    kind: "mcq",
    id: "preview-q1",
    prompt: {
      kind: "text",
      text: "Which greeting is most appropriate for the morning?",
    },
    options: [
      { id: "a", content: { kind: "text", text: "Good morning" } },
      { id: "b", content: { kind: "text", text: "Good night" } },
      { id: "c", content: { kind: "text", text: "See you later" } },
    ],
    correctOptionId: "a",
    explanation: "'Good morning' is used from sunrise until noon.",
  },
  {
    kind: "mcq",
    id: "preview-q2",
    prompt: {
      kind: "text",
      text: "Translate: 'Thank you'",
    },
    options: [
      { id: "a", content: { kind: "text", text: "Maaf" } },
      { id: "b", content: { kind: "text", text: "Terima kasih" } },
      { id: "c", content: { kind: "text", text: "Sama-sama" } },
    ],
    correctOptionId: "b",
    explanation: "'Thank you' means 'Terima kasih' in Indonesian.",
  },
];

interface LessonNodeItemProps {
  node: LessonNode;
  unit: Unit;
  index: number;
  colIndex: number;
  isCurrent: boolean;
  showJumpHere: boolean;
  isActive: boolean;
  isOpen: boolean;
  onOpenToggle: () => void;
  onActivate: () => void;
  onDeactivate: () => void;
  showComplete: boolean;
  setShowComplete: (show: boolean) => void;
  onUnitTest?: (unit: Unit) => void;
  inlinePlayer?: boolean;
  brandColor?: BrandColor;
  isMobile: boolean;
}

export function LessonNodeItem({
  node: n,
  unit: u,
  index: idx,
  colIndex,
  isCurrent,
  showJumpHere,
  isActive,
  isOpen,
  onOpenToggle,
  onActivate,
  onDeactivate,
  showComplete,
  setShowComplete,
  onUnitTest,
  inlinePlayer,
  brandColor,
  isMobile,
}: LessonNodeItemProps) {
  return (
    <div
      id={`node-${n.id}`}
      className={cn(
        "relative",
        isActive ? "w-full z-10" : "w-auto",
        // 3-Column positioning
        !isActive &&
          (colIndex === 0
            ? "self-start ml-8"
            : colIndex === 1
              ? "self-center"
              : "self-end mr-8")
      )}
    >
      {/* Jump Button (Floating next to first node) */}
      {showJumpHere && (
        <div
          className={cn(
            "absolute top-1/2 -translate-y-1/2 z-20",
            colIndex === 0
              ? "-right-24"
              : colIndex === 2
                ? "-left-24"
                : // If center, alternate based on id hash or just pick right
                  n.id.charCodeAt(0) % 2 === 0
                  ? "-right-24"
                  : "-left-24"
          )}
        >
          <div className="relative">
            <div className="absolute -top-12 left-1/2 -translate-x-1/2 z-20 animate-bounce whitespace-nowrap">
              <div className="bg-slate-900 text-green-400 font-bold px-3 py-1.5 rounded-xl shadow-xl border border-slate-700 mb-1 tracking-widest uppercase text-xs">
                JUMP HERE?
              </div>
              <div className="w-2.5 h-2.5 bg-slate-900 rotate-45 border-b border-r border-slate-700 mx-auto -mt-2"></div>
            </div>
            <Button
              variant="outline"
              size="icon"
              className="rounded-full h-12 w-12 border-2 border-slate-200 dark:border-slate-700 bg-background hover:bg-slate-100 dark:hover:bg-slate-800 shadow-sm"
              onClick={() => onUnitTest && onUnitTest(u)}
            >
              <FastForward className="h-5 w-5 text-slate-400" />
            </Button>
          </div>
        </div>
      )}

      {isActive ? (
        <div className="w-full bg-black rounded-2xl overflow-hidden shadow-2xl animate-in zoom-in-95 duration-200">
          <div className="flex items-center gap-2 p-2 bg-neutral-900 text-white">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                onDeactivate();
                setShowComplete(false);
              }}
              className="text-white hover:text-white/80"
            >
              <ArrowLeft className="w-4 h-4 mr-1" />
              Back
            </Button>
            <span className="text-sm font-bold truncate">{n.title}</span>
          </div>
          <div className="w-full bg-white dark:bg-neutral-900 p-4 min-h-[300px]">
            {showComplete ? (
              <div className="flex flex-col items-center justify-center h-full py-8 text-center space-y-4">
                <div className="text-4xl">🎉</div>
                <div className="text-xl font-bold">Lesson Complete!</div>
                <p className="text-slate-600 dark:text-slate-400">
                  This was just a preview. Enroll now to access the full course!
                </p>
                <Button
                  variant="green"
                  size="md"
                  onClick={() => {
                    onDeactivate();
                    setShowComplete(false);
                    const enrollEl = document.getElementById("enroll-button");
                    if (enrollEl)
                      enrollEl.scrollIntoView({
                        behavior: "smooth",
                      });
                  }}
                  label="Got it"
                />
              </div>
            ) : (
              <QuizRunner
                questions={PREVIEW_QUESTIONS}
                onClose={() => onDeactivate()}
                onComplete={() => setShowComplete(true)}
                className="max-w-none"
              />
            )}
          </div>
        </div>
      ) : (
        <LessonTooltip
          node={n}
          unit={u}
          isOpen={isOpen}
          onOpenToggle={onOpenToggle}
          onUnitTest={onUnitTest}
          inlinePlayer={inlinePlayer}
          onActivate={onActivate}
          brandColor={brandColor}
        >
          <LessonButton
            node={n}
            unit={u}
            isCurrent={isCurrent}
            isActive={isActive}
            brandColor={brandColor}
          />
        </LessonTooltip>
      )}
    </div>
  );
}

interface LessonButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  node: LessonNode;
  unit: Unit;
  isCurrent: boolean;
  isActive: boolean;
  brandColor?: BrandColor;
}

const LessonButton = React.forwardRef<HTMLButtonElement, LessonButtonProps>(
  (
    { node: n, unit: u, isCurrent, isActive, brandColor, className, ...props },
    ref
  ) => {
    return (
      <Button
        ref={ref}
        variant={
          n.status === "locked"
            ? "disabled"
            : brandColorToButtonVariant[u.brandColor ?? brandColor ?? "violet"]
        }
        size="md"
        aria-disabled={n.status === "locked"}
        className={cn(
          "h-16 w-auto px-8 rounded-full border-b-4 active:border-b-0 overflow-visible", // Shrink to text
          n.status === "locked" && "cursor-not-allowed",
          className
        )}
        {...props}
      >
        <div className="flex items-center justify-center w-full relative">
          {isCurrent && !isActive && (
            <div className="absolute bottom-full left-1/2 -translate-x-1/2 z-20 animate-bounce mb-2">
              <div className="bg-slate-900 text-purple-400 font-bold px-3 py-2 rounded-xl shadow-xl border border-slate-700 mb-1 whitespace-nowrap tracking-widest uppercase">
                START
              </div>
              <div className="w-3 h-3 bg-slate-900 rotate-45 border-b border-r border-slate-700 mx-auto -mt-2.5"></div>
            </div>
          )}
          <div className="text-base font-bold truncate">{n.title}</div>
        </div>
      </Button>
    );
  }
);
LessonButton.displayName = "LessonButton";
