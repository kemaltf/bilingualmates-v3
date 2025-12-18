"use client";
import * as React from "react";
import { Card } from "@/components/ui/card";
import type { LanguageStats } from "@/lib/right/types";
import { cn } from "@/lib/utils";
import { LanguageSelector } from "./LanguageSelector";
import { StreakStats } from "./StreakStats";
import { CurrencyStats } from "./CurrencyStats";

export interface LanguageStatsCardProps {
  stats: LanguageStats;
  className?: string;
}

export function LanguageStatsCard({
  stats,
  className,
}: LanguageStatsCardProps) {
  return (
    <Card
      className={cn(
        "flex items-center justify-between p-4 fixed top-0 inset-x-0 z-50 rounded-none border-x-0 border-t-0 md:rounded-xl md:border-2 md:static bg-white dark:bg-neutral-900 md:bg-white md:dark:bg-neutral-900",
        className
      )}
    >
      <div className="flex items-center gap-3">
        <LanguageSelector stats={stats} />
      </div>

      <div className="flex items-center gap-4">
        <StreakStats stats={stats} />
        <CurrencyStats stats={stats} />
      </div>
    </Card>
  );
}
