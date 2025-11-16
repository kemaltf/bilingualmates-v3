"use client"
import * as React from "react"
import Image from "next/image"
import type { VideoItem } from "@/lib/videos/types"
import { cn } from "@/lib/utils"

export interface VideoCardProps {
  video: VideoItem
  onSelect: (video: VideoItem) => void
  className?: string
}

function formatDuration(sec: number) {
  const m = Math.floor(sec / 60)
  const s = sec % 60
  return `${m}:${s.toString().padStart(2, "0")}`
}

export function VideoCard({ video, onSelect, className }: VideoCardProps) {
  return (
    <button
      onClick={() => onSelect(video)}
      className={cn(
        "group w-full text-left rounded-2xl overflow-hidden",
        "border-[3px] border-neutral-300 shadow-[0_3px_0_0_#a3a3a3]",
        "transition-transform hover:-translate-y-1 hover:shadow-lg",
        className
      )}
    >
      <div className="relative w-full aspect-video">
        <Image src={video.thumbnailUrl} alt={video.title} fill className="object-cover" unoptimized />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent" />
        <div className="absolute bottom-2 left-2 right-2 flex items-center gap-2">
          <span className="px-2 py-1 rounded-full text-xs font-semibold bg-black/60 text-white">{formatDuration(video.durationSec)}</span>
          <span className="px-2 py-1 rounded-full text-xs font-semibold bg-emerald-500 text-white">+{video.xpReward} XP</span>
          <span className="ml-auto px-2 py-1 rounded-full text-xs font-semibold bg-white/80 text-neutral-900 capitalize">{video.difficulty}</span>
        </div>
      </div>
      <div className="p-3">
        <div className="text-base font-semibold">{video.title}</div>
      </div>
    </button>
  )
}