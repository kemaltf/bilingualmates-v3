"use client"
import * as React from "react"
import type { RightSection } from "@/lib/right/types"
import { LanguageStatsCard } from "@/components/right/LanguageStatsCard"
import { DailyMissionsCard } from "@/components/right/DailyMissionsCard"
import { AdCard } from "@/components/right/AdCard"
import { NotificationsCard } from "@/components/right/NotificationsCard"
import { FollowsTabsCard } from "@/components/right/FollowsTabsCard"
import { FindFriendsCard } from "@/components/right/FindFriendsCard"
import { cn } from "@/lib/utils"

export interface RightPanelRendererProps {
  sections: RightSection[]
  className?: string
}

export function RightPanelRenderer({ sections, className }: RightPanelRendererProps) {
  return (
    <div className={cn("flex flex-col gap-4", className)}>
      {sections.map((s, idx) => {
        if (s.kind === "language_stats") return <LanguageStatsCard key={idx} stats={s.data} />
        if (s.kind === "missions") return <DailyMissionsCard key={idx} missions={s.data} />
        if (s.kind === "ad") return <AdCard key={idx} ad={s.data} />
        if (s.kind === "notifications") return <NotificationsCard key={idx} items={s.data} />
        if (s.kind === "follows") return <FollowsTabsCard key={idx} data={s.data} />
        if (s.kind === "find_friends") return <FindFriendsCard key={idx} />
        return null
      })}
    </div>
  )
}