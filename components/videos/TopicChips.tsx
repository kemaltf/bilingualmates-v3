"use client"
import * as React from "react"
import type { Topic } from "@/lib/videos/types"
import { cn } from "@/lib/utils"

export interface TopicChipsProps {
  topics: Topic[]
  selectedId: string | null
  onSelect: (id: string) => void
  className?: string
}

export function TopicChips({ topics, selectedId, onSelect, className }: TopicChipsProps) {
  return (
    <div className={cn("w-full overflow-x-auto", className)}>
      <div className="flex gap-3 py-2 min-w-full">
        {topics.map((t) => {
          const active = selectedId === t.id
          return (
            <button
              key={t.id}
              onClick={() => onSelect(t.id)}
              className={cn(
                "rounded-full border-[3px] px-4 py-2 text-sm font-semibold select-none",
                "transition-all hover:scale-[1.02]",
                active
                  ? "bg-emerald-500 text-white border-emerald-600 shadow-[0_4px_0_0_#047857]"
                  : "bg-white text-neutral-800 border-neutral-300 shadow-[0_3px_0_0_#a3a3a3]"
              )}
            >
              <span className="mr-1">{t.icon}</span>
              {t.name}
            </button>
          )
        })}
      </div>
    </div>
  )
}