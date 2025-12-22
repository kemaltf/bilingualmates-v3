"use client";
import * as React from "react";
import type { Unit, LessonNode } from "@/lib/learn/types";

import { cn } from "@/lib/utils";
import type { BrandColor } from "@/lib/ui/design-tokens";
import { useIsMobile } from "@/hooks/use-mobile";
import { LessonNodeItem } from "./LessonNodeItem";
import { UnitBadgeItem } from "./UnitBadgeItem";

export interface VerticalPathTrackProps {
  units: Unit[];
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
  units,
  onUnitTest,
  onUnitRefs,
  onDividerRefs,
  className,
  brandColor,
  inlinePlayer,
}: VerticalPathTrackProps) {
  const unitRefs = React.useRef<Record<string, HTMLElement | null>>({});
  const dividerRefs = React.useRef<Record<number, HTMLElement | null>>({});
  const isMobile = useIsMobile();

  const [openNodeId, setOpenNodeId] = React.useState<string | null>(null);
  const [activeNodeId, setActiveNodeId] = React.useState<string | null>(null);
  const [showComplete, setShowComplete] = React.useState(false);

  // Deterministic position generation for 3-column layout
  const nodePositions = React.useMemo(() => {
    const pos: Record<string, number> = {};
    let prevCol = 1; // Start center

    units.forEach((u) => {
      u.nodes.forEach((n) => {
        const options: number[] = [];
        if (prevCol === 0) options.push(0, 1);
        else if (prevCol === 1) options.push(0, 1, 2);
        else options.push(1, 2);

        // Simple hash for deterministic choice
        const hash = n.id
          .split("")
          .reduce((acc, c) => acc + c.charCodeAt(0), 0);
        const nextCol = options[hash % options.length];

        pos[n.id] = nextCol;
        prevCol = nextCol;
      });

      // Position for Badge
      const options: number[] = [];
      if (prevCol === 0) options.push(0, 1);
      else if (prevCol === 1) options.push(0, 1, 2);
      else options.push(1, 2);

      const hash = u.id.split("").reduce((acc, c) => acc + c.charCodeAt(0), 0);
      const nextCol = options[hash % options.length];
      pos[`badge-${u.id}`] = nextCol;
      prevCol = nextCol;
    });

    return pos;
  }, [units]);

  // Find the first in_progress node to mark as "START"
  const currentLessonId = React.useMemo(() => {
    for (const u of units) {
      for (const n of u.nodes) {
        if (n.status === "in_progress") return n.id;
      }
    }
    // If no in_progress, maybe all are locked or all completed.
    // If we want to default to the first locked one (next step), we could.
    // But usually in_progress is the active one.
    return null;
  }, [units]);

  React.useEffect(() => {
    if (!onUnitRefs) return;
    const items = units
      .map((u) => {
        const el = unitRefs.current[u.id];
        if (!el) return null;
        return { id: u.id, title: u.title, el };
      })
      .filter(Boolean) as { id: string; title: string; el: HTMLElement }[];
    onUnitRefs(items);
  }, [units, onUnitRefs]);

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
  }, [units, onDividerRefs]);

  // Auto-scroll to current lesson on mount
  React.useEffect(() => {
    if (currentLessonId) {
      // Small delay to ensure rendering
      setTimeout(() => {
        const el = document.getElementById(`node-${currentLessonId}`);
        if (el) {
          el.scrollIntoView({ behavior: "smooth", block: "center" });
        }
      }, 100);
    }
  }, [currentLessonId]);

  return (
    <div className={cn("relative", className)}>
      <div className="space-y-10">
        {units.map((u, unitIdx) => (
          <section
            key={u.id}
            ref={(el) => {
              unitRefs.current[u.id] = el;
            }}
            data-unit-id={u.id}
            className="scroll-mt-24"
          >
            <div
              className="relative flex items-center justify-center py-4 mb-8"
              ref={(el) => {
                if (unitIdx > 0) dividerRefs.current[unitIdx] = el;
              }}
            >
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t-2 border-border" />
              </div>
              <div className="relative bg-background px-4">
                <span className="text-lg font-bold text-muted-foreground">
                  {u.title}
                </span>
              </div>
            </div>

            <div className="flex flex-col items-center gap-6 max-w-sm mx-auto w-full">
              {u.nodes.map((n, idx) => {
                const isCurrent = n.id === currentLessonId;
                const showJumpHere =
                  idx === 0 &&
                  n.status !== "locked" &&
                  !u.nodes.every((node) => node.status === "completed") &&
                  onUnitTest;

                const colIndex = nodePositions[n.id] ?? 1;

                return (
                  <LessonNodeItem
                    key={n.id}
                    node={n}
                    unit={u}
                    index={idx}
                    colIndex={colIndex}
                    isCurrent={isCurrent}
                    showJumpHere={!!showJumpHere}
                    isActive={activeNodeId === n.id}
                    isOpen={openNodeId === n.id}
                    onOpenToggle={() =>
                      setOpenNodeId(openNodeId === n.id ? null : n.id)
                    }
                    onActivate={() => setActiveNodeId(n.id)}
                    onDeactivate={() => setActiveNodeId(null)}
                    showComplete={showComplete}
                    setShowComplete={setShowComplete}
                    onUnitTest={onUnitTest}
                    inlinePlayer={inlinePlayer}
                    brandColor={brandColor}
                    isMobile={isMobile}
                  />
                );
              })}
              <UnitBadgeItem
                unit={u}
                colIndex={nodePositions[`badge-${u.id}`] ?? 1}
              />
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
