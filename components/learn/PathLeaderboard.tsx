"use client";
import * as React from "react";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Crown } from "lucide-react";

interface LeaderboardUser {
  id: string;
  name: string;
  xp: number;
  avatarUrl?: string;
  isCurrentUser?: boolean;
}

const MOCK_LEADERBOARD: LeaderboardUser[] = [
  {
    id: "1",
    name: "Sarah J.",
    xp: 12500,
    avatarUrl: "https://i.pravatar.cc/150?u=1",
  },
  {
    id: "2",
    name: "Michael C.",
    xp: 11200,
    avatarUrl: "https://i.pravatar.cc/150?u=2",
  },
  {
    id: "3",
    name: "You",
    xp: 10850,
    isCurrentUser: true,
    avatarUrl: "https://i.pravatar.cc/150?u=3",
  },
  {
    id: "4",
    name: "David K.",
    xp: 9400,
    avatarUrl: "https://i.pravatar.cc/150?u=4",
  },
  {
    id: "5",
    name: "Emma W.",
    xp: 8900,
    avatarUrl: "https://i.pravatar.cc/150?u=5",
  },
];

export function PathLeaderboard({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "bg-white dark:bg-neutral-800 rounded-2xl border-2 border-slate-100 dark:border-neutral-700 p-4",
        className
      )}
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-bold text-slate-800 dark:text-slate-200 text-lg">
          Class Leaderboard
        </h3>
        <Crown className="w-5 h-5 text-amber-500" />
      </div>

      <div className="space-y-3">
        {MOCK_LEADERBOARD.map((user, index) => (
          <div
            key={user.id}
            className={cn(
              "flex items-center gap-3 p-2 rounded-xl transition-colors",
              user.isCurrentUser
                ? "bg-sky-50 dark:bg-sky-900/20 border border-sky-100 dark:border-sky-800"
                : "hover:bg-slate-50 dark:hover:bg-neutral-700/50"
            )}
          >
            <div
              className={cn(
                "w-6 text-center font-bold text-sm",
                index === 0
                  ? "text-amber-500"
                  : index === 1
                    ? "text-slate-400"
                    : index === 2
                      ? "text-amber-700"
                      : "text-slate-500"
              )}
            >
              {index + 1}
            </div>
            <Avatar className="w-8 h-8 border border-slate-200 dark:border-neutral-700">
              <AvatarImage src={user.avatarUrl} />
              <AvatarFallback>{user.name[0]}</AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <div
                className={cn(
                  "text-sm font-semibold truncate",
                  user.isCurrentUser
                    ? "text-sky-600 dark:text-sky-400"
                    : "text-slate-700 dark:text-slate-200"
                )}
              >
                {user.name}
              </div>
            </div>
            <div className="text-sm font-bold text-slate-600 dark:text-slate-400">
              {user.xp.toLocaleString()} XP
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
