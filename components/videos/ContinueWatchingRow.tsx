"use client"
import * as React from "react"
import Image from "next/image"
import type { ContinueWatchingItem } from "@/lib/videos/types"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export interface ContinueWatchingRowProps {
  items: ContinueWatchingItem[]
  onResume: (video: ContinueWatchingItem) => void
  className?: string
}

export function ContinueWatchingRow({ items, onResume, className }: ContinueWatchingRowProps) {
  return (
    <div className={cn("w-full overflow-x-auto", className)}>
      <div className="flex gap-4 py-2">
        {items.map((v) => (
          <div
            key={v.id}
            className={cn(
              "min-w-[280px] rounded-2xl overflow-hidden",
              "border-[3px] border-neutral-300 shadow-[0_3px_0_0_#a3a3a3]"
            )}
          >
            <div className="relative w-[280px] aspect-video">
              <Image src={v.thumbnailUrl} alt={v.title} fill className="object-cover" unoptimized />
              <div className="absolute inset-x-0 bottom-0 h-1.5 bg-neutral-200">
                <div className="h-full bg-emerald-500" style={{ width: `${Math.min(100, Math.max(0, v.progressPercent))}%` }} />
              </div>
            </div>
            <div className="p-3 flex items-center gap-2">
              <div className="text-sm font-semibold truncate">{v.title}</div>
              <div className="ml-auto">
                <Button variant="blue" size="sm" onClick={() => onResume(v)} label="Resume" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}