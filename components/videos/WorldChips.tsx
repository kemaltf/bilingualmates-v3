"use client";
import * as React from "react";
import type { Topic } from "@/lib/videos/types";
import { cn } from "@/lib/utils";

export interface WorldChipsProps {
  topics: Topic[];
  selectedId: string | null;
  onSelect: (id: string) => void;
  className?: string;
}

export function WorldChips({
  topics,
  selectedId,
  onSelect,
  className,
}: WorldChipsProps) {
  return (
    <div className={cn("w-full overflow-x-auto", className)}>
      <div className="flex gap-3 py-3">
        {topics.map((t) => {
          const active = selectedId === t.id;
          return (
            <button
              key={t.id}
              onClick={() => onSelect(t.id)}
              className={cn(
                "rounded-full px-4 py-2 text-sm font-bold select-none",
                "bg-card border-[3px] border-border shadow",
                "transition-transform hover:-translate-y-0.5 hover:shadow-md",
                active &&
                  "bg-emerald-600 text-white outline outline-2 outline-emerald-700"
              )}
            >
              <span className="mr-1">{t.icon}</span>
              {t.name}
            </button>
          );
        })}
      </div>
    </div>
  );
}
