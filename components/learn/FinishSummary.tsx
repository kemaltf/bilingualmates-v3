"use client";
import * as React from "react";
import LottiePlayer from "@/components/shared/LottiePlayer";
import FinishStatsGrid from "@/components/learn/FinishStatsGrid";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export interface FinishStats {
  xp: number;
  accuracyPct: number;
  minutes: number;
  seconds: number;
}

interface Props {
  animationSrc: string;
  fallbackSrc?: string;
  stats: FinishStats;
  praise: string;
  onReview: () => void;
  onContinue: () => void;
  className?: string;
}

export default function FinishSummary({
  animationSrc,
  fallbackSrc,
  stats,
  praise,
  onReview,
  onContinue,
  className,
}: Props) {
  return (
    <div className={cn("w-full max-w-[760px] mx-auto", className)}>
      <div className="flex min-h-[75vh] items-center justify-center flex-col gap-2 text-center">
        <LottiePlayer
          src={animationSrc}
          fallbackSrc={fallbackSrc ?? "/window.svg"}
          className="h-48 w-48"
        />
        <div className="text-2xl font-extrabold">{praise}</div>
        <FinishStatsGrid stats={stats} />
        <div className="flex items-center justify-center gap-3 mt-6">
          <Button
            variant="blue"
            size="md"
            label="Review lesson"
            onClick={onReview}
          />
          <Button
            variant="green"
            size="md"
            label="Continue"
            onClick={onContinue}
          />
        </div>
      </div>
    </div>
  );
}
