"use client";

import * as React from "react";
import Link from "next/link";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import type { CurriculumPath } from "@/lib/learn/types";

export interface CourseMapContentProps {
  path?: CurriculumPath | null;
  activeSectionId?: string;
  onSelectSection?: (sectionId: string) => void;
  onClose: () => void;
}

export function CourseMapContent({
  path,
  activeSectionId,
  onSelectSection,
  onClose,
}: CourseMapContentProps) {
  const handleSelect = (id: string) => {
    onSelectSection?.(id);
    onClose();
  };

  return (
    <div className="space-y-6">
      {/* Current Course Info */}
      <div className="p-4 rounded-xl border-2 border-slate-200 bg-slate-50 dark:bg-neutral-800 dark:border-neutral-700">
        <div className="text-xs font-bold text-slate-500 uppercase mb-2">
          Current Course
        </div>
        <div className="flex items-center justify-between gap-2">
          <div className="font-extrabold text-lg truncate">
            {path?.course ?? "Loading..."}
          </div>
          <Link href="/path" onClick={onClose}>
            <Button variant="outline-blue" size="sm">
              SWITCH
            </Button>
          </Link>
        </div>
      </div>

      {/* Sections List */}
      <div>
        <div className="text-xs font-bold text-slate-500 uppercase mb-3 px-1">
          Sections
        </div>
        <div className="space-y-3">
          {path?.sections?.map((sec, index) => {
            const isActive = activeSectionId === sec.id;
            return (
              <button
                key={sec.id}
                onClick={() => handleSelect(sec.id)}
                className={cn(
                  "w-full text-left p-4 rounded-xl border-2 transition-all relative overflow-hidden",
                  isActive
                    ? "border-sky-500 bg-sky-50 dark:bg-sky-900/20"
                    : "border-slate-200 hover:border-slate-300 bg-white dark:bg-neutral-800 dark:border-neutral-700"
                )}
              >
                <div className="flex items-start justify-between gap-3 relative z-10">
                  <div className="flex-1">
                    <div className="text-xs font-bold text-slate-500 mb-1">
                      SECTION {index + 1}
                    </div>
                    <div className="font-bold text-slate-800 dark:text-slate-200">
                      {sec.title}
                    </div>
                    {sec.description && (
                      <div className="text-sm text-slate-500 mt-1 line-clamp-2">
                        {sec.description}
                      </div>
                    )}
                  </div>
                  {isActive && (
                    <div className="bg-sky-500 rounded-full p-1">
                      <Check className="w-4 h-4 text-white" />
                    </div>
                  )}
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
