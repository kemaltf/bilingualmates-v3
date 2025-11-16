"use client"
import * as React from "react"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import type { FollowsData } from "@/lib/right/types"
import { cn } from "@/lib/utils"

export interface FollowsTabsCardProps {
  data: FollowsData
  className?: string
}

export function FollowsTabsCard({ data, className }: FollowsTabsCardProps) {
  const [tab, setTab] = React.useState<"following" | "followers">("following")
  const list = tab === "following" ? data.following : data.followers

  return (
    <Card className={cn(className)}>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Mengikuti</CardTitle>
          <div className="flex items-center gap-3 text-sm">
            <button className={cn("font-bold", tab === "following" ? "text-sky-700" : "text-neutral-600")} onClick={() => setTab("following")}>Mengikuti</button>
            <button className={cn("font-bold", tab === "followers" ? "text-sky-700" : "text-neutral-600")} onClick={() => setTab("followers")}>Pengikut</button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-2">
        {list.map((u) => (
          <div key={u.id} className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="size-6 rounded-full bg-neutral-300" />
              <div className="text-sm font-bold">{u.name}</div>
            </div>
            <div className="text-xs text-neutral-600">{u.xp} XP</div>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}