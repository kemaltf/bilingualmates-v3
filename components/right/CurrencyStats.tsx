"use client";

import * as React from "react";
import { Zap, Crown } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import type { LanguageStats } from "@/lib/right/types";

interface CurrencyStatsProps {
  stats: LanguageStats;
}

export function CurrencyStats({ stats }: CurrencyStatsProps) {
  return (
    <>
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

      <Tooltip>
        <TooltipTrigger asChild>
          <div className="flex items-center gap-1.5 cursor-pointer">
            <Crown className="w-5 h-5 text-purple-500" />
            <span className="font-bold text-neutral-700">{stats.level}</span>
          </div>
        </TooltipTrigger>
        <TooltipContent className="z-[70]">
          <p className="font-bold">Level</p>
        </TooltipContent>
      </Tooltip>
    </>
  );
}
