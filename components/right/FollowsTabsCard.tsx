"use client";
import * as React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import Link from "next/link";
import type { FollowsData } from "@/lib/right/types";
import { cn } from "@/lib/utils";

export interface FollowsTabsCardProps {
  data: FollowsData;
  className?: string;
}

export function FollowsTabsCard({ data, className }: FollowsTabsCardProps) {
  const [tab, setTab] = React.useState<"following" | "followers">("following");
  const list = (tab === "following" ? data.following : data.followers).slice(
    0,
    5
  );
  const total = (tab === "following" ? data.following : data.followers).length;
  const remaining = Math.max(0, total - list.length);

  return (
    <Card className={cn(className)}>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <CardTitle>Following</CardTitle>
          </div>
          <div className="flex items-center gap-3 text-sm">
            <button
              className={cn(
                "font-bold",
                tab === "following" ? "text-sky-700" : "text-neutral-600"
              )}
              onClick={() => setTab("following")}
            >
              Following
            </button>
            <button
              className={cn(
                "font-bold",
                tab === "followers" ? "text-sky-700" : "text-neutral-600"
              )}
              onClick={() => setTab("followers")}
            >
              Followers
            </button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-2">
        {list.map((u) => (
          <div key={u.id} className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="size-10 rounded-full bg-neutral-300 border-[3px] border-sky-600" />
              <div className="text-sm font-bold">{u.name}</div>
            </div>
            <div className="text-xs text-neutral-600">{u.xp} XP</div>
          </div>
        ))}
        {remaining > 0 && (
          <div className="pt-1 flex justify-end">
            <Link
              href="/profile/followers"
              className="text-xs font-bold text-sky-700"
            >
              SEE {remaining} MORE
            </Link>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
