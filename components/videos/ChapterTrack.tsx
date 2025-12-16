"use client";
import * as React from "react";
import type { ChapterItem } from "@/lib/videos/types";
import { Button } from "@/components/ui/button";
import { Lock, Check } from "lucide-react";
import { cn } from "@/lib/utils";

export interface ChapterTrackProps {
  chapters: ChapterItem[];
  onSelect: (chapter: ChapterItem) => void;
  className?: string;
}

export function ChapterTrack({
  chapters,
  onSelect,
  className,
}: ChapterTrackProps) {
  return (
    <div className={cn("relative", className)}>
      <div className="absolute inset-x-0 top-1/2 h-[2px] bg-border" />
      <div className="relative w-full overflow-x-auto">
        <div className="flex gap-4 py-3">
          {chapters.map((c) => (
            <div key={c.id} className="min-w-[220px]">
              <button
                onClick={() => onSelect(c)}
                className={cn(
                  "w-full bg-card rounded-2xl shadow border-[3px] border-border",
                  "transition-transform hover:-translate-y-0.5 hover:shadow-md"
                )}
              >
                <div className="h-28 rounded-t-xl bg-muted" />
                <div className="p-3">
                  <div className="text-sm font-bold truncate">{c.title}</div>
                  <div className="mt-2 h-2 bg-muted rounded-full overflow-hidden">
                    <div
                      className="h-full bg-emerald-500"
                      style={{
                        width: `${Math.min(100, Math.max(0, c.progressPercent ?? 0))}%`,
                      }}
                    />
                  </div>
                </div>
              </button>
              <div className="absolute -mt-24 ml-2">
                {c.status === "completed" && (
                  <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-bold bg-emerald-500 text-white">
                    <Check className="size-3" />
                    Completed
                  </span>
                )}
                {c.status === "in_progress" && (
                  <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-bold bg-sky-500 text-white">
                    Resume
                  </span>
                )}
                {c.status === "locked" && (
                  <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-bold bg-slate-300 text-slate-700">
                    <Lock className="size-3" />
                    Locked
                  </span>
                )}
              </div>
              <div className="mt-2 flex items-center justify-between">
                <span className="text-xs font-bold text-slate-600">
                  {c.sequence}
                </span>
                {c.status !== "locked" && (
                  <Button
                    variant="blue"
                    size="sm"
                    onClick={() => onSelect(c)}
                    label={c.status === "in_progress" ? "RESUME" : "START"}
                  />
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
