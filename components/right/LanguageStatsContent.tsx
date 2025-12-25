"use client";

import * as React from "react";
import type { LanguageStats } from "@/lib/right/types";
import { LanguageSelector } from "./LanguageSelector";
import { StreakStats } from "./StreakStats";
import { XpStats } from "./XpStats";
import { LevelStats } from "./LevelStats";

interface LanguageStatsContentProps {
  stats: LanguageStats;
}

export function LanguageStatsContent({ stats }: LanguageStatsContentProps) {
  return (
    <div className="w-full flex items-center justify-between gap-4">
      <LanguageSelector stats={stats} />
      <StreakStats stats={stats} />
      <XpStats stats={stats} />
      <LevelStats stats={stats} />
    </div>
  );
}
