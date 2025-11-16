"use client"
import * as React from "react"
import type { CurriculumPath } from "@/lib/learn/types"
import { cn } from "@/lib/utils"

export interface PathChipsProps {
  paths: CurriculumPath[]
  selectedId: string | null
  onSelect: (id: string) => void
  className?: string
}

export function PathChips({ paths, selectedId, onSelect, className }: PathChipsProps) {
  return (
    <div className={cn("w-full overflow-x-auto", className)}>
      <div className="flex gap-3 py-3">
        {paths.map((p) => {
          const active = selectedId === p.id
          return (
            <button
              key={p.id}
              onClick={() => onSelect(p.id)}
              className={cn(
                "rounded-full px-4 py-2 text-sm font-bold select-none",
                "bg-white border-[3px] border-slate-300 shadow",
                "transition-transform hover:-translate-y-0.5 hover:shadow-md",
                active && "bg-emerald-600 text-white outline outline-2 outline-emerald-700"
              )}
            >
              <span className="mr-1">{p.emoji}</span>
              {p.name}
            </button>
          )
        })}
      </div>
    </div>
  )
}