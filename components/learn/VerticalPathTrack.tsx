"use client";
import * as React from "react";
import type { CurriculumPath, Unit, LessonNode } from "@/lib/learn/types";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@/components/ui/tooltip";
import { Trophy } from "lucide-react";
import { cn } from "@/lib/utils";
import type { BrandColor } from "@/lib/ui/design-tokens";
import { brandColorToButtonVariant } from "@/lib/ui/design-tokens";
import { useRouter } from "next/navigation";
import { useIsMobile } from "@/hooks/use-mobile";
import { ArrowLeft } from "lucide-react";
import { QuizRunner } from "@/components/shared/quiz/quiz-runner";
import type { QuizQuestion } from "@/lib/quiz/types";

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

export interface VerticalPathTrackProps {
  path: CurriculumPath;
  onSelectNode?: (node: LessonNode) => void;
  onUnitTest?: (unit: Unit) => void;
  onUnitRefs?: (
    items: { id: string; title: string; el: HTMLElement }[]
  ) => void;
  onDividerRefs?: (items: { index: number; el: HTMLElement }[]) => void;
  className?: string;
  brandColor?: BrandColor;
  inlinePlayer?: boolean;
}

export function VerticalPathTrack({
  path,
  onUnitTest,
  onUnitRefs,
  onDividerRefs,
  className,
  brandColor,
  inlinePlayer,
}: VerticalPathTrackProps) {
  const router = useRouter();
  const unitRefs = React.useRef<Record<string, HTMLElement | null>>({});
  const dividerRefs = React.useRef<Record<number, HTMLElement | null>>({});
  const isMobile = useIsMobile();

  const [openNodeId, setOpenNodeId] = React.useState<string | null>(null);
  const [activeNodeId, setActiveNodeId] = React.useState<string | null>(null);
  const [showComplete, setShowComplete] = React.useState(false);

  React.useEffect(() => {
    if (!onUnitRefs) return;
    const items = path.units
      .map((u) => {
        const el = unitRefs.current[u.id];
        if (!el) return null;
        return { id: u.id, title: u.title, el };
      })
      .filter(Boolean) as { id: string; title: string; el: HTMLElement }[];
    onUnitRefs(items);
  }, [path, onUnitRefs]);

  React.useEffect(() => {
    if (!onDividerRefs) return;
    const items = Object.keys(dividerRefs.current)
      .map((k) => {
        const idx = Number(k);
        const el = dividerRefs.current[idx];
        if (!el) return null;
        return { index: idx, el };
      })
      .filter(Boolean) as { index: number; el: HTMLElement }[];
    onDividerRefs(items);
  }, [path, onDividerRefs]);

  return (
    <div className={cn("relative", className)}>
      <div className="space-y-10">
        {path.units.map((u, unitIdx) => (
          <React.Fragment key={u.id}>
            {unitIdx > 0 && (
              <div className="my-6">
                <div
                  className="h-[2px] bg-border"
                  ref={(el) => {
                    dividerRefs.current[unitIdx] = el;
                  }}
                />
              </div>
            )}
            <section
              key={u.id}
              ref={(el) => {
                unitRefs.current[u.id] = el;
              }}
              data-unit-id={u.id}
              className="scroll-mt-24"
            >
              <div className="flex items-center justify-between mb-2">
                <div className="text-lg font-bold">{u.title}</div>
                <Button
                  variant="text"
                  size="md"
                  label="Jump Here"
                  onClick={() => onUnitTest && onUnitTest(u)}
                />
              </div>
              <div className="flex flex-col items-center gap-6">
                {u.nodes.map((n, idx) => (
                  <div
                    key={n.id}
                    className={cn(
                      "relative w-full",
                      activeNodeId === n.id
                        ? "max-w-full z-10"
                        : "max-w-[220px]",
                      idx % 2 === 0 ? "self-start" : "self-end",
                      activeNodeId === n.id && "self-center"
                    )}
                  >
                    {activeNodeId === n.id ? (
                      <div className="w-full bg-black rounded-2xl overflow-hidden shadow-2xl animate-in zoom-in-95 duration-200">
                        <div className="flex items-center gap-2 p-2 bg-neutral-900 text-white">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => {
                              setActiveNodeId(null);
                              setShowComplete(false);
                            }}
                            className="text-white hover:text-white/80"
                          >
                            <ArrowLeft className="w-4 h-4 mr-1" />
                            Back
                          </Button>
                          <span className="text-sm font-bold truncate">
                            {n.title}
                          </span>
                        </div>
                        <div className="w-full bg-white dark:bg-neutral-900 p-4 min-h-[300px]">
                          {showComplete ? (
                            <div className="flex flex-col items-center justify-center h-full py-8 text-center space-y-4">
                              <div className="text-4xl">🎉</div>
                              <div className="text-xl font-bold">
                                Lesson Complete!
                              </div>
                              <p className="text-slate-600 dark:text-slate-400">
                                This was just a preview. Enroll now to access
                                the full course!
                              </p>
                              <Button
                                variant="green"
                                size="md"
                                onClick={() => {
                                  setActiveNodeId(null);
                                  setShowComplete(false);
                                  // Scroll to enroll button? Or just close.
                                  const enrollEl =
                                    document.getElementById("enroll-button");
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
                              onClose={() => setActiveNodeId(null)}
                              onComplete={() => setShowComplete(true)}
                              className="max-w-none"
                            />
                          )}
                        </div>
                      </div>
                    ) : (
                      <Tooltip
                        open={openNodeId === n.id}
                        onOpenChange={() => {}}
                      >
                        <TooltipTrigger asChild>
                          <Button
                            variant={
                              n.status === "locked"
                                ? "disabled"
                                : brandColorToButtonVariant[
                                    u.brandColor ?? brandColor ?? "violet"
                                  ]
                            }
                            size="md"
                            onClick={() => {
                              setOpenNodeId(openNodeId === n.id ? null : n.id);
                            }}
                            aria-disabled={n.status === "locked"}
                            className={cn(
                              "w-full justify-start text-left rounded-full border-[3px]",
                              n.status === "locked" && "cursor-not-allowed"
                            )}
                          >
                            <div className="flex items-center justify-between w-full">
                              <div className="text-sm font-bold truncate">
                                {n.title}
                              </div>
                            </div>
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent
                          side={
                            isMobile
                              ? "bottom"
                              : idx % 2 === 0
                                ? "right"
                                : "left"
                          }
                          className="min-w-[240px]"
                        >
                          <div className="text-sm font-bold">{n.title}</div>
                          {n.description && (
                            <div className="mt-1 text-xs text-slate-600 dark:text-slate-300">
                              {n.description}
                            </div>
                          )}
                          {n.kind === "ad" && (
                            <div className="mt-2 text-xs text-muted-foreground">
                              {`Ads help BilingualMates' mission to provide free English education.`}
                            </div>
                          )}
                          <div className="mt-1 text-xs text-slate-500">
                            ⏱ {Math.max(1, Math.round(n.durationSec / 60))}m
                          </div>
                          <div className="mt-2 flex justify-end">
                            {n.status === "locked" ? (
                              <Button
                                variant="amber"
                                size="md"
                                label="Unlock for 50💎"
                              />
                            ) : (
                              <Button
                                variant={
                                  brandColorToButtonVariant[
                                    u.brandColor ?? brandColor ?? "violet"
                                  ]
                                }
                                size="md"
                                label={
                                  n.kind === "ad"
                                    ? "WATCH AD"
                                    : `PRACTICE +${n.xpReward} XP`
                                }
                                onClick={() => {
                                  if (onUnitTest) onUnitTest(u);
                                  if (inlinePlayer) {
                                    setOpenNodeId(null);
                                    setActiveNodeId(n.id);
                                  } else {
                                    if (typeof window !== "undefined") {
                                      router.push(`/learn/${n.id}`);
                                    }
                                  }
                                }}
                              />
                            )}
                          </div>
                        </TooltipContent>
                      </Tooltip>
                    )}
                  </div>
                ))}
                {(() => {
                  const badgeStatus = u.badge?.status ?? "locked";
                  return (
                    <Button
                      variant="disabled"
                      size="md"
                      className={cn(
                        "w-full max-w-[320px] rounded-full p-4",
                        "flex items-center gap-2",
                        u.nodes.length % 2 === 0 ? "self-start" : "self-end"
                      )}
                      aria-label="Unit Badge"
                    >
                      <Trophy
                        className={cn(
                          "size-5",
                          badgeStatus === "locked"
                            ? "text-muted-foreground"
                            : badgeStatus === "in_progress"
                              ? "text-amber-500"
                              : "text-emerald-600"
                        )}
                      />
                      <div className="text-sm font-bold">
                        {u.badge?.title ?? "Unit Badge"}
                      </div>
                    </Button>
                  );
                })()}
              </div>
            </section>
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}
