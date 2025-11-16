"use client"
import * as React from "react"
import Image from "next/image"
import type { VideoItem } from "@/lib/videos/types"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export interface FeaturedMissionCardProps {
  video: VideoItem | null
  progressPercent?: number
  onStart: () => void
  className?: string
}

function formatDuration(sec: number) {
  const m = Math.floor(sec / 60)
  const s = sec % 60
  return `${m}:${s.toString().padStart(2, "0")}`
}

export function FeaturedMissionCard({ video, progressPercent = 0, onStart, className }: FeaturedMissionCardProps) {
  return (
    <div className={cn("bg-white rounded-2xl shadow p-4 border-[3px] border-slate-300", className)}>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="md:col-span-2">
          <div className="relative w-full aspect-video rounded-2xl bg-slate-200 overflow-hidden">
            {video && <Image src={video.thumbnailUrl} alt={video.title} fill className="object-cover transition-transform group-hover:scale-[1.02]" unoptimized />}
            {video && (
              <div className="absolute bottom-2 left-2 flex items-center gap-2">
                <span className="px-2 py-1 rounded-full text-xs font-bold bg-black/80 text-white">{formatDuration(video.durationSec)}</span>
                <span className="px-2 py-1 rounded-full text-xs font-bold bg-emerald-500 text-white">+{video.xpReward} XP</span>
              </div>
            )}
          </div>
          {video && (
            <div className="mt-3 flex items-center gap-2">
              <span className="px-2 py-1 rounded-full text-xs font-bold bg-slate-200 text-slate-900 capitalize">{video.difficulty}</span>
              <div className="ml-auto w-40 h-2 rounded-full bg-slate-200 overflow-hidden">
                <div className="h-full bg-emerald-500" style={{ width: `${Math.min(100, Math.max(0, progressPercent))}%` }} />
              </div>
            </div>
          )}
        </div>
        <div className="flex flex-col justify-between">
          <div>
            <div className="text-xl font-bold">{video ? video.title : "Select a world"}</div>
          </div>
          <div className="flex justify-end mt-3">
            <Button variant="green" size="md" onClick={onStart} label={progressPercent > 0 ? "RESUME" : "START"} />
          </div>
        </div>
      </div>
    </div>
  )
}