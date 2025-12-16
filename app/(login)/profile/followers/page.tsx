"use client";
/* eslint-disable @next/next/no-img-element */
import * as React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { profileRightSections } from "@/lib/right/mock";
import type { FollowsData } from "@/lib/right/types";

function getFollows(): FollowsData {
  const s = profileRightSections.find((x) => x.kind === "follows");
  return (s?.data as FollowsData) ?? { following: [], followers: [] };
}

export default function Page() {
  const [tab, setTab] = React.useState<"following" | "followers">("following");
  const data = getFollows();
  const list = tab === "following" ? data.following : data.followers;

  return (
    <div className={cn("space-y-4")}>
      <h1 className="text-xl font-extrabold">Semua teman</h1>
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <CardTitle>
                {tab === "following" ? "Mengikuti" : "Pengikut"}
              </CardTitle>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <button
                className={cn(
                  "font-bold",
                  tab === "following" ? "text-sky-700" : "text-neutral-600"
                )}
                onClick={() => setTab("following")}
              >
                Mengikuti
              </button>
              <button
                className={cn(
                  "font-bold",
                  tab === "followers" ? "text-sky-700" : "text-neutral-600"
                )}
                onClick={() => setTab("followers")}
              >
                Pengikut
              </button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-2">
          {list.map((u) => (
            <div key={u.id} className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <img
                  src="https://images.unsplash.com/photo-1728577740843-5f29c7586afe?q=80&w=880&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  alt="avatar"
                  className="size-10 rounded-full object-cover border-[3px] border-sky-600"
                />
                <div>
                  <div className="text-sm font-bold">{u.name}</div>
                  <div className="text-xs text-neutral-600">{u.xp} XP</div>
                </div>
              </div>
              {tab === "following" && (
                <Button variant="blue" size="sm" label="UNFOLLOW" />
              )}
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
