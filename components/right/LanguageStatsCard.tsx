"use client"
import * as React from "react"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import type { LanguageStats } from "@/lib/right/types"
import { cn } from "@/lib/utils"

export interface LanguageStatsCardProps {
  stats: LanguageStats
  className?: string
}

export function LanguageStatsCard({ stats, className }: LanguageStatsCardProps) {
  return (
    <Card className={cn(className)}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <span className="text-xl">{stats.languageCode.toUpperCase()}</span>
          <span className="text-sm font-bold text-neutral-600">{stats.languageName}</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-4 gap-3 text-center">
          <div>
            <div className="text-lg font-extrabold">{stats.level}</div>
            <div className="text-xs text-neutral-600">Level</div>
          </div>
          <div>
            <div className="text-lg font-extrabold">{stats.streakDays}</div>
            <div className="text-xs text-neutral-600">Streak</div>
          </div>
          <div>
            <div className="text-lg font-extrabold">{stats.diamonds}</div>
            <div className="text-xs text-neutral-600">Diamond</div>
          </div>
          <div>
            <div className="text-lg font-extrabold">{stats.xp}</div>
            <div className="text-xs text-neutral-600">XP</div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}