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
  variant?: "default" | "mobile-header";
}

export function LanguageStatsCard({
  stats,
  className,
  variant = "default",
}: LanguageStatsCardProps) {
  const isHeader = variant === "mobile-header";

  return (
    <Card
      className={cn(
        "flex items-center justify-between p-3 md:p-4 bg-white dark:bg-neutral-900",
        isHeader
          ? "fixed top-0 left-0 right-0 md:left-[16rem] md:right-auto md:w-[calc(100%-16rem)] md:max-w-[1024px] md:mx-auto z-[40] rounded-none border-x-0 border-t-0 border-b-2"
          : "rounded-xl border-2",
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
