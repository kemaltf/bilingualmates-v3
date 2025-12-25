"use client";

import * as React from "react";
import { Card } from "@/components/ui/card";
import type { LanguageStats } from "@/lib/right/types";
import { cn } from "@/lib/utils";
import { LanguageStatsContent } from "./LanguageStatsContent";

interface MobileLanguageStatsProps {
  stats: LanguageStats;
  className?: string;
}

export function MobileLanguageStats({
  stats,
  className,
}: MobileLanguageStatsProps) {
  return (
    <Card
      className={cn(
        "flex items-center justify-between p-3 md:p-4 bg-white dark:bg-neutral-900",
        // Mobile (default): Fixed top, full width
        // Tablet (md): Fixed top, but offset by sidebar width (16rem) to prevent overlap
        "fixed top-0 left-0 right-0 md:left-[16rem] md:right-0 z-[40]",
        "rounded-none border-x-0 border-t-0 border-b-2",
        className
      )}
    >
      <LanguageStatsContent stats={stats} />
    </Card>
  );
}
