"use client";

import * as React from "react";
import { Zap } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import type { LanguageStats } from "@/lib/right/types";

interface XpStatsProps {
  stats: LanguageStats;
}

export function XpStats({ stats }: XpStatsProps) {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <div className="flex items-center gap-1.5 cursor-pointer">
          <Zap className="w-5 h-5 text-yellow-500 fill-yellow-500" />
          <span className="font-bold text-yellow-500">{stats.xp}</span>
        </div>
      </TooltipTrigger>
      <TooltipContent className="z-[70]">
        <p className="font-bold">XP</p>
      </TooltipContent>
    </Tooltip>
  );
}
