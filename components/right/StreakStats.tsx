"use client";

import * as React from "react";
import Image from "next/image";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import LottiePlayer from "@/components/shared/LottiePlayer";
import type { LanguageStats } from "@/lib/right/types";

interface StreakStatsProps {
  stats: LanguageStats;
}

export function StreakStats({ stats }: StreakStatsProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div
          className="flex items-center gap-1.5 cursor-pointer outline-none"
          title="Streak"
        >
          <Image src="/svg/streak.svg" width={20} height={20} alt="Streak" />
          <span className="font-bold text-orange-500">{stats.streakDays}</span>
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-80 p-6 z-[70]" align="center">
        <div className="flex flex-col items-center text-center gap-4">
          <div className="flex items-center justify-center w-full">
            <div className="w-32 h-32">
              <LottiePlayer
                src="/lottie/Fire Streak Orange.json"
                loop={true}
                autoplay={true}
                className="w-full h-full"
              />
            </div>
          </div>

          <div className="space-y-1">
            <h3 className="text-xl font-bold text-neutral-700 dark:text-neutral-100">
              Sultan Runtunan
            </h3>
            <p className="text-neutral-500 dark:text-neutral-400 font-bold text-lg">
              {stats.streakDays} hari beruntun
            </p>
          </div>

          <p className="text-neutral-600 dark:text-neutral-300 text-sm">
            Selesaikan satu pelajaran hari ini dan perpanjang runtunanmu!
          </p>

          <div className="w-full bg-neutral-100 dark:bg-neutral-800 rounded-xl p-3 mt-2">
            <div className="flex justify-between px-2 text-xs font-bold text-neutral-400 dark:text-neutral-500 mb-2">
              <span>M</span>
              <span>S</span>
              <span className="text-orange-500">S</span>
              <span>R</span>
              <span>K</span>
              <span>J</span>
              <span>S</span>
            </div>
            {/* Mock progress bar */}
            <div className="relative h-4 bg-neutral-200 dark:bg-neutral-700 rounded-full overflow-hidden">
              <div className="absolute top-0 left-0 h-full w-1/3 bg-orange-400 rounded-full" />
            </div>
          </div>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
