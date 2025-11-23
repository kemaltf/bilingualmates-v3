"use client";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Flame, GraduationCap, Timer } from "lucide-react";
import { paths } from "@/lib/learn/mock";
import { brandColorToButtonVariant } from "@/lib/ui/design-tokens";
import { Button } from "@/components/ui/button";
import React from "react";

export default function Page() {
  const totalXp = paths
    .flatMap((p) => p.units.flatMap((u) => u.nodes))
    .filter((n) => n.status !== "locked")
    .reduce((acc, n) => acc + n.xpReward, 0);
  const totalStreak = 5;

  const achievements = [
    {
      id: "ach-challenge",
      title: "Challenger",
      description: "Earn 500 XP in timed challenges",
      icon: "timer" as const,
      level: 3,
      current: Math.min(256, 500),
      target: 500,
      color: "violet",
    },
    {
      id: "ach-streak",
      title: "Wildfire",
      description: "You reached a 365-day streak",
      icon: "flame" as const,
      level: 10,
      current: totalStreak,
      target: 365,
      color: "amber",
    },
    {
      id: "ach-xp",
      title: "Sage",
      description: "You earned 30000 XP",
      icon: "cap" as const,
      level: 10,
      current: totalXp,
      target: 30000,
      color: "emerald",
    },
  ];

  const [pressedId, setPressedId] = React.useState<string | null>(null);

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-extrabold">Profile</h1>

      <section>
        <Card>
          <CardHeader>
            <CardTitle>Statistics</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center justify-center size-9 rounded-full bg-emerald-500 text-white">
                  XP
                </span>
                <div>
                  <div className="text-lg font-extrabold">{totalXp}</div>
                  <div className="text-xs text-neutral-600">Total XP</div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center justify-center size-9 rounded-full bg-amber-500 text-white">
                  <Flame className="size-4" />
                </span>
                <div>
                  <div className="text-lg font-extrabold">{totalStreak}</div>
                  <div className="text-xs text-neutral-600">Total Streak</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      <section>
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Achievements</CardTitle>
              <span className="text-xs font-bold text-sky-600">VIEW MORE</span>
            </div>
          </CardHeader>
          <CardContent>
            <div className="divide-y rounded-2xl border border-border">
              {achievements.map((a) => {
                const pct = Math.min(
                  100,
                  Math.round((a.current / Math.max(1, a.target)) * 100)
                );
                const Hex = (
                  <Button
                    variant={
                      brandColorToButtonVariant[
                        a.color === "emerald"
                          ? "emerald"
                          : a.color === "amber"
                          ? "amber"
                          : "violet"
                      ]
                    }
                    size="md"
                    onMouseDown={() => setPressedId(a.id)}
                    onMouseUp={() => setPressedId(null)}
                    onMouseLeave={() => setPressedId(null)}
                    className={[
                      "relative w-14 h-14 p-0 flex-col gap-1 rounded-2xl",
                      pressedId === a.id ? "translate-y-1 shadow-none" : "",
                    ].join(" ")}
                    aria-label={a.title}
                  >
                    <span className="inline-flex items-center justify-center size-6">
                      {a.icon === "flame" && <Flame className="size-6" />}
                      {a.icon === "cap" && <GraduationCap className="size-6" />}
                      {a.icon === "timer" && <Timer className="size-6" />}
                    </span>
                    <span className="text-[10px] font-extrabold">
                      LEVEL {a.level}
                    </span>
                  </Button>
                );
                return (
                  <div
                    key={a.id}
                    className="p-4 flex items-center gap-3 w-full"
                  >
                    {Hex}
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-bold">{a.title}</div>
                      <div className="text-xs text-muted-foreground">
                        {a.description}
                      </div>
                      <div className="mt-2 flex items-center gap-2">
                        <div className="h-2 flex-1 bg-neutral-200 rounded-full overflow-hidden">
                          <div
                            className="h-2 bg-amber-500"
                            style={{ width: `${pct}%` }}
                          />
                        </div>
                        <div className="text-[11px] font-bold text-muted-foreground">
                          {a.current} / {a.target}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
