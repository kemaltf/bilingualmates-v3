"use client"
import * as React from "react"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"

export interface FindFriendsCardProps {
  className?: string
}

export function FindFriendsCard({ className }: FindFriendsCardProps) {
  const suggestions = [
    { id: "s1", name: "alex", xp: 120 },
    { id: "s2", name: "nina", xp: 210 },
    { id: "s3", name: "rico", xp: 95 },
  ]
  const avatarUrl = "https://images.unsplash.com/photo-1728577740843-5f29c7586afe?q=80&w=880&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"

  return (
    <Card className={cn(className)}>
      <CardHeader>
        <div className="flex items-center gap-2">
          <CardTitle>Temukan Teman</CardTitle>
          <span className="px-2 py-0.5 rounded-full bg-sky-100 text-sky-700 text-[11px] font-bold">TAMBAH</span>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        {suggestions.map((u) => (
          <div key={u.id} className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <img src={avatarUrl} alt="avatar" className="size-10 rounded-full object-cover border-[3px] border-sky-600" />
              <div className="text-sm font-bold">{u.name}</div>
            </div>
            <button className="text-xs font-bold text-sky-700">IKUTI</button>
          </div>
        ))}
        <div className="pt-2 flex justify-end">
          <button className="text-xs font-bold text-sky-700">CARI TEMAN</button>
        </div>
      </CardContent>
    </Card>
  )
}