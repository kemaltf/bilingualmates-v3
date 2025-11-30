"use client";
import * as React from "react";

export interface FinishStats {
  xp: number;
  accuracyPct: number;
  minutes: number;
  seconds: number;
}

export default function FinishStatsGrid({ stats }: { stats: FinishStats }) {
  return (
    <div className="space-y-2">
      <div className="text-sm font-bold">Statistics</div>
      <div className="grid sm:grid-cols-3 gap-4">
        <div className="p-3 rounded-xl border">
          <div className="text-xs text-neutral-600">XP gained</div>
          <div className="text-lg font-extrabold">{stats.xp}</div>
        </div>
        <div className="p-3 rounded-xl border">
          <div className="text-xs text-neutral-600">Accuracy</div>
          <div className="text-lg font-extrabold">{stats.accuracyPct}%</div>
        </div>
        <div className="p-3 rounded-xl border">
          <div className="text-xs text-neutral-600">Time spent</div>
          <div className="text-lg font-extrabold">
            {stats.minutes}m {stats.seconds}s
          </div>
        </div>
      </div>
    </div>
  );
}

