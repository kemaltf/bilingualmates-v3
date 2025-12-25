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
        "flex items-center justify-between p-3 md:p-4 fixed md:sticky top-0 left-0 right-0 md:left-[16rem] z-[40] rounded-none border-x-0 border-t-0 lg:rounded-xl lg:border-2 lg:static bg-white dark:bg-neutral-900 lg:bg-white lg:dark:bg-neutral-900",
        className
      )}
    >
      <div className="w-full flex items-center justify-between gap-4">
        <LanguageSelector stats={stats} />
        <StreakStats stats={stats} />
        <CurrencyStats stats={stats} />
      </div>
    </Card>
  );
}
