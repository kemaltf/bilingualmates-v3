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
}

export function VerticalPathTrack({
  path,
  onUnitTest,
  onUnitRefs,
  onDividerRefs,
  className,
  brandColor,
}: VerticalPathTrackProps) {
  const router = useRouter();
  const unitRefs = React.useRef<Record<string, HTMLElement | null>>({});
  const dividerRefs = React.useRef<Record<number, HTMLElement | null>>({});
  const isMobile = useIsMobile();

  const [openNodeId, setOpenNodeId] = React.useState<string | null>(null);

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
                      "relative w-full max-w-[220px]",
                      idx % 2 === 0 ? "self-start" : "self-end"
                    )}
                  >
                    <Tooltip open={openNodeId === n.id} onOpenChange={() => {}}>
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
                          isMobile ? "bottom" : idx % 2 === 0 ? "right" : "left"
                        }
                        className="min-w-[240px]"
                      >
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
                              label={`PRACTICE +${n.xpReward} XP`}
                              onClick={() => {
                                if (onUnitTest) onUnitTest(u);
                                if (typeof window !== "undefined") {
                                  router.push(`/learn/${n.id}`);
                                }
                              }}
                            />
                          )}
                        </div>
                      </TooltipContent>
                    </Tooltip>
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
