"use client"
import * as React from "react"
import type { CurriculumPath, Unit } from "@/lib/learn/types"
import { Button } from "@/components/ui/button"
import { Lock, Check } from "lucide-react"
import { cn } from "@/lib/utils"

export interface PathChaptersCarouselProps {
  path: CurriculumPath
  onSelectUnit?: (unit: Unit) => void
  className?: string
}

export function PathChaptersCarousel({ path, onSelectUnit, className }: PathChaptersCarouselProps) {
  const ref = React.useRef<HTMLDivElement>(null)
  const scrollBy = (dx: number) => {
    const el = ref.current
    if (!el) return
    el.scrollBy({ left: dx, behavior: "smooth" })
  }

  return (
    <div className={cn("relative", className)}>
      <div className="flex justify-between mb-2">
        <Button variant="blue" size="sm" onClick={() => scrollBy(-300)} label="←" />
        <Button variant="blue" size="sm" onClick={() => scrollBy(300)} label="→" />
      </div>
      <div ref={ref} className="w-full overflow-x-auto">
        <div className="flex gap-4 py-3">
          {path.units.map((u) => {
            const completed = u.nodes.every((n) => n.status === "completed")
            const inProgress = u.nodes.some((n) => n.status === "in_progress") && !completed
            return (
              <button
                key={u.id}
                onClick={() => onSelectUnit && onSelectUnit(u)}
                className={cn(
                  "min-w-[240px] bg-white rounded-2xl shadow border-[3px] border-slate-300 p-3 text-left",
                  "transition-transform hover:-translate-y-0.5 hover:shadow-md"
                )}
              >
                <div className="h-28 rounded-xl bg-slate-200" />
                <div className="mt-3 text-sm font-bold">{u.title}</div>
                <div className="mt-2 h-2 bg-slate-200 rounded-full overflow-hidden">
                  <div className="h-full bg-emerald-500" style={{ width: `${Math.floor((u.nodes.filter((n) => n.status === "completed").length / u.nodes.length) * 100)}%` }} />
                </div>
                <div className="mt-2">
                  {completed && <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-bold bg-emerald-500 text-white"><Check className="size-3" />Completed</span>}
                  {!completed && inProgress && <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-bold bg-sky-500 text-white">Resume</span>}
                  {!completed && !inProgress && <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-bold bg-slate-300 text-slate-700"><Lock className="size-3" />Locked</span>}
                </div>
                {!completed && !inProgress && (
                  <div className="mt-3">
                    <Button variant="green" size="sm" label="Unlock for 50💎" />
                  </div>
                )}
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )
}