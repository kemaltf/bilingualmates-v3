"use client";

import * as React from "react";
import Image from "next/image";
import { Check, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { cn } from "@/lib/utils";
import type { LanguageStats } from "@/lib/right/types";

interface LanguageSelectorProps {
  stats: LanguageStats;
}

const AVAILABLE_LANGUAGES = [
  { code: "id", name: "Bahasa Indonesia", flagUrl: "/flags/id.svg" },
  { code: "en", name: "Bahasa Inggris", flagUrl: "/flags/en.svg" },
  { code: "jp", name: "Japanese", flagUrl: "/flags/en.svg" },
  { code: "cn", name: "Chinese", flagUrl: "/flags/en.svg" },
];

export function LanguageSelector({ stats }: LanguageSelectorProps) {
  return (
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
  );
}
