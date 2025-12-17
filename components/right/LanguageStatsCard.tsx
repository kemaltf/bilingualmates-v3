"use client";
import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { Zap, Crown, Plus, Check } from "lucide-react";
import { Card } from "@/components/ui/card";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import LottiePlayer from "@/components/shared/LottiePlayer";
import type { LanguageStats } from "@/lib/right/types";
import { cn } from "@/lib/utils";

export interface LanguageStatsCardProps {
  stats: LanguageStats;
  className?: string;
}

const AVAILABLE_LANGUAGES = [
  { code: "id", name: "Bahasa Indonesia", flagUrl: "/flags/id.svg" },
  { code: "en", name: "Bahasa Inggris", flagUrl: "/flags/en.svg" },
  // Add more mock languages as needed
  { code: "jp", name: "Japanese", flagUrl: "/flags/en.svg" }, // Placeholder flag
  { code: "cn", name: "Chinese", flagUrl: "/flags/en.svg" }, // Placeholder flag
];

export function LanguageStatsCard({
  stats,
  className,
}: LanguageStatsCardProps) {
  return (
    <Card className={cn("flex items-center justify-between p-4", className)}>
      <div className="flex items-center gap-3">
        <HoverCard openDelay={200}>
          <HoverCardTrigger asChild>
            <div className="cursor-pointer">
              {stats.flagUrl ? (
                <div className="relative w-10 h-7 overflow-hidden rounded-md shadow-sm">
                  <Image
                    src={stats.flagUrl}
                    alt={stats.languageName}
                    fill
                    className="object-cover"
                  />
                </div>
              ) : (
                <span className="text-xl font-bold">
                  {stats.languageCode.toUpperCase()}
                </span>
              )}
            </div>
          </HoverCardTrigger>
          <HoverCardContent className="w-80 p-0 overflow-hidden" align="start">
            <div className="flex flex-col">
              <div className="p-4 text-xs font-bold text-neutral-500 dark:text-neutral-400 uppercase tracking-wider">
                Kursusku
              </div>
              <div className="flex flex-col max-h-[300px] overflow-y-auto">
                {AVAILABLE_LANGUAGES.map((lang) => (
                  <button
                    key={lang.code}
                    className={cn(
                      "flex items-center gap-3 px-4 py-3 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors w-full text-left",
                      lang.code === stats.languageCode &&
                        "bg-blue-50/50 dark:bg-blue-900/20"
                    )}
                  >
                    <div className="relative w-8 h-6 overflow-hidden rounded shadow-sm flex-shrink-0">
                      <Image
                        src={lang.flagUrl}
                        alt={lang.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <span
                      className={cn(
                        "font-bold flex-1",
                        lang.code === stats.languageCode
                          ? "text-blue-500 dark:text-blue-400"
                          : "text-neutral-700 dark:text-neutral-200"
                      )}
                    >
                      {lang.name}
                    </span>
                    {lang.code === stats.languageCode && (
                      <Check className="w-5 h-5 text-blue-500 dark:text-blue-400" />
                    )}
                  </button>
                ))}
              </div>
              <div className="p-2 border-t border-neutral-200 dark:border-neutral-800">
                <Button
                  variant="ghost"
                  className="w-full justify-start gap-3 h-auto py-3 text-neutral-500 dark:text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-800"
                >
                  <div className="w-8 h-8 rounded-lg border-2 border-dashed border-neutral-300 dark:border-neutral-600 flex items-center justify-center">
                    <Plus className="w-5 h-5" />
                  </div>
                  <span className="font-bold">Tambahkan kursus baru</span>
                </Button>
              </div>
            </div>
          </HoverCardContent>
        </HoverCard>
      </div>

      <div className="flex items-center gap-4">
        <HoverCard openDelay={200}>
          <HoverCardTrigger asChild>
            <div
              className="flex items-center gap-1.5 cursor-pointer"
              title="Streak"
            >
              <Image
                src="/svg/streak.svg"
                width={20}
                height={20}
                alt="Streak"
              />
              <span className="font-bold text-orange-500">
                {stats.streakDays}
              </span>
            </div>
          </HoverCardTrigger>
          <HoverCardContent className="w-80 p-6" align="center">
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
          </HoverCardContent>
        </HoverCard>

        {/* <div className="flex items-center gap-1.5" title="Diamonds">
          <Gem className="w-5 h-5 text-blue-500 fill-blue-500" />
          <span className="font-bold text-blue-500">{stats.diamonds}</span>
        </div> */}

        <Tooltip>
          <TooltipTrigger asChild>
            <div className="flex items-center gap-1.5 cursor-pointer">
              <Zap className="w-5 h-5 text-yellow-500 fill-yellow-500" />
              <span className="font-bold text-yellow-500">{stats.xp}</span>
            </div>
          </TooltipTrigger>
          <TooltipContent>
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
          <TooltipContent>
            <p className="font-bold">Level</p>
          </TooltipContent>
        </Tooltip>
      </div>
    </Card>
  );
}
