"use client";
import * as React from "react";
import type { CurriculumPath, Unit, LessonNode } from "@/lib/learn/types";
import { Button } from "@/components/ui/button";
import { Trophy } from "lucide-react";
import { cn } from "@/lib/utils";
import type { BrandColor } from "@/lib/ui/design-tokens";
import {
  brandColorToBorder,
  brandColorToButtonVariant,
} from "@/lib/ui/design-tokens";

export interface VerticalPathTrackProps {
  path: CurriculumPath;
  onSelectNode?: (node: LessonNode) => void;
  onUnitTest?: (unit: Unit) => void;
  onUnitRefs?: (
    items: { id: string; title: string; el: HTMLElement }[]
  ) => void;
  className?: string;
  brandColor?: BrandColor;
}

export function VerticalPathTrack({
  path,
  onSelectNode,
  onUnitTest,
  onUnitRefs,
  className,
  brandColor,
}: VerticalPathTrackProps) {
  const unitRefs = React.useRef<Record<string, HTMLElement | null>>({});
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

  return (
    <div className={cn("relative", className)}>
      <div className="space-y-10">
        {path.units.map((u) => (
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
                variant="blue"
                size="sm"
                label="Unit Test"
                onClick={() => onUnitTest && onUnitTest(u)}
              />
            </div>
            <div className="flex flex-col items-center gap-6">
              {u.nodes.map((n, idx) => (
                <div
                  key={n.id}
                  className={cn(
                    "relative group w-full max-w-[260px]",
                    idx % 2 === 0 ? "self-start" : "self-end"
                  )}
                >
                  <Button
                    variant={n.status === "locked" ? "disabled" : "text"}
                    size="sm"
                    onClick={() => {
                      if (n.status === "locked") return;
                      onSelectNode && onSelectNode(n);
                    }}
                    aria-disabled={n.status === "locked"}
                    className={cn(
                      "w-full justify-start text-left rounded-full border-[3px] p-2.5",
                      n.status === "locked"
                        ? "bg-slate-100 border-slate-300 text-slate-500 cursor-not-allowed"
                        : cn(
                            "bg-white shadow transition-transform hover:-translate-y-0.5 hover:shadow-md",
                            brandColor
                              ? brandColorToBorder[brandColor]
                              : "border-slate-300",
                            n.status === "in_progress" && "ring-2 ring-offset-2 ring-slate-400"
                          )
                    )}
                  >
                    <div className="flex items-center justify-between w-full">
                      <div className="text-sm font-bold truncate">{n.title}</div>
                    </div>
                  </Button>
                  <div
                    className={cn(
                      "absolute top-1/2 -translate-y-1/2 hidden group-hover:block z-30",
                      idx % 2 === 0 ? "left-full ml-3" : "right-full mr-3"
                    )}
                  >
                    <div className="min-w-[240px] rounded-xl border-[3px] border-slate-300 bg-white shadow p-3">
                      <div className="text-sm font-bold">{n.title}</div>
                      {n.description && (
                        <div className="mt-1 text-xs text-slate-600">
                          {n.description}
                        </div>
                      )}
                      <div className="mt-1 text-xs text-slate-500">
                        ⏱ {Math.max(1, Math.round(n.durationSec / 60))}m
                      </div>
                      <div className="mt-2 flex justify-end">
                        {n.status === "locked" ? (
                          <Button
                            variant="amber"
                            size="sm"
                            label="Unlock for 50💎"
                          />
                        ) : (
                          <Button
                            variant={
                              brandColor
                                ? brandColorToButtonVariant[brandColor]
                                : "purple"
                            }
                            size="sm"
                            label={`PRACTICE +${n.xpReward} XP`}
                          />
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              {(() => {
                const total = u.nodes.length;
                const completed = u.nodes.filter(
                  (n) => n.status === "completed"
                ).length;
                const badgeStatus =
                  completed === total
                    ? "completed"
                    : completed > 0
                    ? "in_progress"
                    : "locked";
                return (
                  <div
                    className={cn(
                      "w-full max-w-[360px] bg-white rounded-full border-[3px] border-slate-300 shadow p-4",
                      "flex items-center gap-2",
                      total % 2 === 0 ? "self-start" : "self-end"
                    )}
                    aria-label="Unit Badge"
                  >
                    <Trophy
                      className={cn(
                        "size-5",
                        badgeStatus === "locked"
                          ? "text-slate-500"
                          : badgeStatus === "in_progress"
                          ? "text-amber-500"
                          : "text-emerald-600"
                      )}
                    />
                    <div className="text-sm font-bold">Unit Badge</div>
                  </div>
                );
              })()}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
