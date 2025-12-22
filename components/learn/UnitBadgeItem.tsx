"use client";
import * as React from "react";
import type { Unit } from "@/lib/learn/types";
import { Button } from "@/components/ui/button";

import { cn } from "@/lib/utils";
import { Trophy } from "lucide-react";

export function UnitBadgeItem({
  unit: u,
  colIndex,
}: {
  unit: Unit;
  colIndex: number;
}) {
  const badgeStatus = u.badge?.status ?? "locked";
  return (
    <Button
      variant="disabled"
      size="md"
      className={cn(
        "w-auto rounded-full p-4",
        "flex items-center gap-2",
        colIndex === 0
          ? "self-start ml-8"
          : colIndex === 1
            ? "self-center"
            : "self-end mr-8"
      )}
      aria-label="Unit Badge"
    >
      <Trophy
        className={cn(
          "size-5",
          badgeStatus === "locked"
            ? "text-muted-foreground"
            : badgeStatus === "in_progress"
              ? "text-amber-500"
              : "text-emerald-600"
        )}
      />
      <div className="text-sm font-bold">{u.badge?.title ?? "Unit Badge"}</div>
    </Button>
  );
}
