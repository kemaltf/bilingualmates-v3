"use client";

import * as React from "react";
import { Card } from "@/components/ui/card";
import type { LanguageStats } from "@/lib/right/types";
import { cn } from "@/lib/utils";
import { LanguageStatsContent } from "./LanguageStatsContent";

export interface LanguageStatsCardProps {
  stats: LanguageStats;
  className?: string;
  variant?: "default" | "mobile" | "tablet";
}

export function LanguageStatsCard({
  stats,
  className,
  variant = "default",
}: LanguageStatsCardProps) {
  const isMobile = variant === "mobile";
  const isTablet = variant === "tablet";

  return (
    <Card
      className={cn(
        "flex items-center justify-between p-3 md:p-4 bg-white dark:bg-neutral-900",
        isMobile &&
          "fixed top-0 left-0 right-0 z-[40] rounded-none border-x-0 border-t-0 border-b-2",
        isTablet &&
          "rounded-b-2xl border-x-2 border-b-2 border-t-0 shadow-sm mb-6",
        !isMobile && !isTablet && "rounded-xl border-2",
        className
      )}
    >
      <LanguageStatsContent stats={stats} />
    </Card>
  );
}
