"use client";
import * as React from "react";
import { cn } from "@/lib/utils";
import type { MediaContent, QuizQuestion } from "@/lib/quiz/types";
import { MediaRenderer } from "@/components/shared/media-renderer";
import { QuestionRenderer } from "@/components/shared/quiz/question-renderer";
import { Button } from "@/components/ui/button";
import { Volume2, AlertOctagon } from "lucide-react";
import LottiePlayer from "@/components/shared/LottiePlayer";

export type ReadingSection =
  | { kind: "text"; id: string; content: MediaContent }
  | { kind: "quiz"; id: string; question: QuizQuestion };

export interface ReadingRunnerProps {
  sections: ReadingSection[];
  className?: string;
  onComplete?: () => void;
}

export default function ReadingRunner({
  sections,
  className,
  onComplete,
}: ReadingRunnerProps) {
  const [index, setIndex] = React.useState(0);
  const [answers, setAnswers] = React.useState<Record<string, unknown>>({});
  const [locked, setLocked] = React.useState(false);
  const [feedback, setFeedback] = React.useState<
    "idle" | "correct" | "incorrect"
  >("idle");
  const [showConfetti, setShowConfetti] = React.useState(false);
  const bottomRef = React.useRef<HTMLDivElement>(null);
  const audioRef = React.useRef<HTMLAudioElement | null>(null);

  const currentStep = sections[index];
  const pct = Math.round(((index + 1) / Math.max(1, sections.length)) * 100);
  const isLast = index === sections.length - 1;

  React.useEffect(() => {
    // Scroll to bottom when index changes (new bubble added)
    if (bottomRef.current) {
      setTimeout(() => {
        bottomRef.current?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    }
  }, [index]);

  React.useEffect(() => {
    if (showConfetti) {
      const t = setTimeout(() => setShowConfetti(false), 2000);
      return () => clearTimeout(t);
    }
  }, [showConfetti]);

  const playAudio = (url?: string) => {
    if (!url) return;
    if (!audioRef.current) audioRef.current = new Audio(url);
    else audioRef.current.src = url;

    try {
      audioRef.current.currentTime = 0;
      audioRef.current.play();
    } catch {}
  };

  const next = () => {
    setFeedback("idle");
    setLocked(false);
    setIndex((i) => {
      const ni = Math.min(sections.length - 1, i + 1);
      if (i === sections.length - 1) onComplete?.();
      return ni;
    });
  };

  const check = () => {
    if (currentStep?.kind !== "quiz") {
      // Should not happen if button logic is correct
      next();
      return;
    }

    setLocked(true);
    const q = currentStep.question;
    const val = answers[q.id];
    let ok = false;

    // Validation logic
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
    if (ok) setShowConfetti(true);
  };

  const vNormalize = (s: string) => s.trim().toLowerCase().replace(/\s+/g, " ");

  // Render list up to current index
  const visibleSections = sections.slice(0, index + 1);

  return (
    <div
      className={cn(
        "w-full min-h-screen bg-neutral-50 dark:bg-neutral-950",
        className
      )}
    >
      {/* Sticky Header */}
      <div className="sticky top-0 z-40 bg-white/80 dark:bg-neutral-900/80 backdrop-blur-md border-b border-neutral-200 dark:border-neutral-800">
        <div className="max-w-[760px] mx-auto h-14 flex items-center justify-between">
          <Button
            variant="text"
            size="icon-sm"
            aria-label="Close"
            onClick={() => {
              if (typeof window !== "undefined") window.history.back();
            }}
          >
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
            <div className="text-sm font-bold text-neutral-600 dark:text-neutral-300 hidden md:block">
              Reading {index + 1} of {sections.length}
            </div>
            <div className="w-32 sm:w-56 h-2.5 bg-neutral-200 dark:bg-neutral-800 rounded-full overflow-hidden">
              <div
                className="h-full bg-sky-500 transition-all duration-500 ease-out"
                style={{ width: `${pct}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Scrollable Content anchored to bottom like chat */}
      <div className="max-w-[760px] mx-auto pt-6 pb-32 space-y-6 flex flex-col justify-end min-h-[calc(100vh-3.5rem-4rem)]">
        {visibleSections.map((step, i) => (
          <div
            key={step.id}
            className={cn(
              "animate-in fade-in slide-in-from-bottom-4 duration-700 fill-mode-both",
              // Optional: slight delay for the newest item if we want strict sequencing
              i === index ? "opacity-100" : "opacity-100"
            )}
          >
            {step.kind === "text" ? (
              <div className="relative group">
                <div className="rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 p-5 sm:p-6 shadow-sm">
                  <div className="prose dark:prose-invert max-w-none">
                    <MediaRenderer content={step.content} role="question" />
                  </div>

                  {/* Audio Button */}
                  {(step.content.pronunciationUrl || step.content.url) && (
                    <div className="mt-4 flex justify-end">
                      <Button
                        variant="primary"
                        size="sm" // Smaller button for inline audio
                        className="rounded-full"
                        onClick={() =>
                          playAudio(
                            step.content.pronunciationUrl ?? step.content.url
                          )
                        }
                        aria-label="Play audio"
                      >
                        <Volume2 className="size-4 mr-2" />
                        Listen
                      </Button>
                    </div>
                  )}
                </div>
                {/* Speech bubble tail effect (optional visual flair) */}
                <div className="absolute top-6 -left-2 w-4 h-4 bg-white dark:bg-neutral-900 border-l border-b border-neutral-200 dark:border-neutral-800 transform rotate-45" />
              </div>
            ) : (
              <div className="rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 p-1 shadow-sm overflow-hidden">
                <div className="p-4 sm:p-6">
                  <QuestionRenderer
                    question={step.question}
                    locked={i < index ? true : locked} // Lock previous questions
                    value={answers[step.question.id]}
                    onAnswerChange={(val) =>
                      setAnswers((prev) => ({
                        ...prev,
                        [step.question.id]: val,
                      }))
                    }
                  />
                </div>
              </div>
            )}
          </div>
        ))}
        <div ref={bottomRef} />
      </div>

      {/* Confetti */}
      {showConfetti && (
        <div className="fixed inset-x-0 bottom-0 z-40 pointer-events-none translate-y-6">
          <LottiePlayer
            src="/confetti big.json"
            className="w-screen"
            fitWidth
          />
        </div>
      )}

      {/* Fixed Footer */}
      <div className="fixed bottom-0 inset-x-0 z-50 bg-white dark:bg-neutral-900 border-t border-neutral-200 dark:border-neutral-800">
        <div className="max-w-[980px] mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
          {/* Feedback Area */}
          <div className="flex items-center gap-3">
            {feedback === "correct" && (
              <div className="hidden sm:block">
                <LottiePlayer src="/confetti.json" className="h-14 w-14" />
              </div>
            )}
            {feedback !== "idle" && (
              <div className="flex flex-col animate-in fade-in slide-in-from-bottom-2">
                <div
                  className={cn(
                    "text-lg font-extrabold",
                    feedback === "correct" ? "text-green-600" : "text-rose-600"
                  )}
                >
                  {feedback === "correct" ? "Benar!" : "Kurang tepat"}
                </div>
                {feedback === "incorrect" && (
                  <div className="text-sm text-rose-500">Coba lagi ya</div>
                )}
              </div>
            )}
            {/* Show REPORT button only on error or always? QuizRunner shows it on feedback */}
            {feedback !== "idle" && (
              <Button
                variant="text"
                size="sm"
                className="text-neutral-400 hover:text-neutral-600 hidden xs:flex"
              >
                <AlertOctagon className="size-4 mr-2" /> LAPOR
              </Button>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-3 ml-auto">
            {currentStep.kind === "text" ? (
              <Button
                variant="green"
                size="md"
                className="w-full sm:w-auto min-w-[140px]"
                onClick={next}
                label={isLast ? "SELESAI" : "LANJUTKAN"}
              />
            ) : feedback === "idle" ? (
              <Button
                variant="blue"
                size="md"
                className="w-full sm:w-auto min-w-[140px]"
                onClick={check}
                label="PERIKSA"
                disabled={!answers[currentStep.question.id]} // Simple disable if empty, though complex validation exists
              />
            ) : (
              <Button
                variant="green"
                size="md"
                className="w-full sm:w-auto min-w-[140px]"
                onClick={next}
                label={isLast ? "SELESAI" : "LANJUTKAN"}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
