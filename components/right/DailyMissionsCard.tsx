"use client"
import * as React from "react"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import type { DailyMission } from "@/lib/right/types"
import { cn } from "@/lib/utils"

export interface DailyMissionsCardProps {
  missions: DailyMission[]
  className?: string
}

function ProgressBar({ value, max }: { value: number; max: number }) {
  const pct = Math.min(100, Math.round((value / Math.max(1, max)) * 100))
  return (
    <div className="h-2 bg-neutral-200 rounded-full overflow-hidden">
      <div className="h-full bg-emerald-500" style={{ width: `${pct}%` }} />
    </div>
  )
}

export function DailyMissionsCard({ missions, className }: DailyMissionsCardProps) {
  return (
    <Card className={cn(className)}>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Misi Harian</CardTitle>
          <span className="text-xs font-bold text-sky-600">LIHAT SEMUA</span>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {missions.map((m) => (
          <div key={m.id} className="space-y-2">
            <div className="text-sm font-bold">{m.title}</div>
            <ProgressBar value={m.progress} max={m.target} />
            <div className="text-[11px] text-neutral-600">
              {m.progress} / {m.target} • +{m.rewardXp} XP
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}