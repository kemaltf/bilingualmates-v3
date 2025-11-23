"use client"
import * as React from "react"
import Link from "next/link"
import { Search, ChevronRight } from "lucide-react"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"

export interface FindFriendsCardProps {
  className?: string
}

export function FindFriendsCard({ className }: FindFriendsCardProps) {
  return (
    <Card className={cn(className)}>
      <CardHeader>
        <CardTitle>Add Friends</CardTitle>
      </CardHeader>
      <CardContent>
        <Link href="/user-search" className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="size-8 rounded-full bg-neutral-300 flex items-center justify-center">
              <Search className="size-4 text-sky-700" />
            </div>
            <div className="text-sm font-bold">Find friends</div>
          </div>
          <ChevronRight className="size-4 text-neutral-500" />
        </Link>
      </CardContent>
    </Card>
  )
}