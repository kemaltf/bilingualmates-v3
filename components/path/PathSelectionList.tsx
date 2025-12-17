"use client";

import { Card, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Users, Check } from "lucide-react";
import type { CurriculumPath } from "@/lib/learn/types";
import { cn } from "@/lib/utils";

import { updateCurrentPath } from "@/lib/actions/course";
import { toast } from "sonner";
import * as React from "react";

interface PathSelectionListProps {
  paths: CurriculumPath[];
}

export function PathSelectionList({ paths }: PathSelectionListProps) {
  const router = useRouter();
  const [loadingId, setLoadingId] = React.useState<string | null>(null);

  const handleSelect = async (path: CurriculumPath) => {
    try {
      setLoadingId(path.id);
      await updateCurrentPath(path.id);
      toast.success(`Path changed to ${path.course}`);
      router.push(`/learn`);
      router.refresh();
    } catch (error) {
      toast.error("Failed to change path");
      console.error(error);
      setLoadingId(null);
    }
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {paths.map((path) => {
        const isLocked = path.units.every((u) =>
          u.nodes.every((n) => n.status === "locked")
        );
        const isLoading = loadingId === path.id;

        return (
          <Card
            key={path.id}
            className="overflow-hidden hover:shadow-md transition-shadow cursor-pointer border-[3px] border-b-[6px] active:border-b-[3px] active:translate-y-[3px]"
            onClick={() => {
              if (path.price && path.price > 0) {
                router.push(`/path/${path.id}`);
              } else if (!isLocked) {
                handleSelect(path);
              }
            }}
          >
            <div className="h-40 bg-neutral-100 dark:bg-neutral-800 relative">
              <Image
                src={path.imageUrl ?? "/images/path-general.svg"}
                alt={path.course}
                fill
                className="object-cover"
              />
              {isLocked && (
                <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                  <span className="bg-slate-800 text-white px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1">
                    🔒 Locked
                  </span>
                </div>
              )}
            </div>
            <CardContent className="p-4">
              <CardTitle className="flex items-center gap-2 mb-2">
                <span className="text-2xl">{path.emoji}</span>
                <span className="font-bold text-lg">{path.course}</span>
              </CardTitle>
              <div className="text-sm text-neutral-500 dark:text-neutral-400 mb-4 min-h-[40px] line-clamp-2">
                {path.description || "Start your journey here."}
              </div>

              <div className="flex items-center gap-4 text-xs text-slate-500 dark:text-slate-400 mb-4 font-medium border-b pb-4">
                {path.studentsCount && (
                  <div className="flex items-center gap-1">
                    <Users className="w-3 h-3" />
                    <span>{path.studentsCount.toLocaleString()} Students</span>
                  </div>
                )}
                <div className="flex items-center gap-1">
                  <span>{path.units.length} Units</span>
                </div>
              </div>

              <Button
                variant="green"
                className="w-full"
                disabled={isLoading || isLocked}
              >
                {isLoading
                  ? "SELECTING..."
                  : isLocked
                    ? "LOCKED"
                    : "SELECT PATH"}
              </Button>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
