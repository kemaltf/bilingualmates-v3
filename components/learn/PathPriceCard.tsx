"use client";

import * as React from "react";
import type { CurriculumPath } from "@/lib/learn/types";
import { PathPriceContent } from "./PathPriceContent";

interface PathPriceCardProps {
  path: CurriculumPath;
  totalLessons: number;
}

export function PathPriceCard({ path, totalLessons }: PathPriceCardProps) {
  return (
    <div className="bg-white dark:bg-neutral-800 rounded-2xl border-2 border-slate-100 dark:border-neutral-700 p-6 shadow-sm">
      <PathPriceContent path={path} totalLessons={totalLessons} />
    </div>
  );
}
