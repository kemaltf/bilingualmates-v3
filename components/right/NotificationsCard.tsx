"use client"
import * as React from "react"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import type { NotificationItem } from "@/lib/right/types"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export interface NotificationsCardProps {
  items: NotificationItem[]
  className?: string
}

export function NotificationsCard({ items, className }: NotificationsCardProps) {
  return (
    <Card className={cn(className)}>
      <CardHeader>
        <CardTitle>Notifikasi</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {items.map((n) => (
          <div key={n.id} className="space-y-2">
            <div className="text-sm font-bold">{n.userName}</div>
            <div className="text-xs text-neutral-600">{n.timeAgo}</div>
            <div className="text-sm">{n.message}</div>
            <div className="flex items-center justify-between">
              <Button variant="blue" size="sm" label="RAYAKAN" />
              {n.reactions && n.reactions.length > 0 && (
                <div className="flex items-center gap-2 text-xs">
                  {n.reactions.map((r, idx) => (
                    <span key={idx} className="inline-flex items-center gap-1">
                      <span>{r.emoji}</span>
                      <span className="font-bold">{r.count}</span>
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}