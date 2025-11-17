"use client";
import * as React from "react";
import { VerticalPathTrack } from "./VerticalPathTrack";
import { paths } from "@/lib/learn/mock";
import { BookOpen } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { brandColorToBg, brandColorToButtonVariant } from "@/lib/ui/design-tokens";

export function LearnHubPage() {
  const [selected] = React.useState<string>(paths[0]?.id ?? null);
  const path = React.useMemo(
    () => paths.find((p) => p.id === selected) ?? null,
    [selected]
  );
  const [unitEls, setUnitEls] = React.useState<
    { id: string; title: string; el: HTMLElement }[]
  >([]);
  const [currentUnitIndex, setCurrentUnitIndex] = React.useState(0);
  // const [ioDebug, setIoDebug] = React.useState<
  //   { id: string; title: string; top: number; isVisible: boolean }[]
  // >([]);
  // const [anchorY, setAnchorY] = React.useState(0);
  React.useEffect(() => {
    if (unitEls.length === 0) return;
    const observer = new IntersectionObserver(
      (entries) => {
        const allVisible = entries.filter((e) => e.isIntersecting);
        if (allVisible.length === 0) return;
        const anchorY = Math.round(window.innerHeight * 0.35);
        const aboveAnchor = allVisible
          .filter((e) => e.boundingClientRect.top <= anchorY)
          .sort(
            (a, b) => b.boundingClientRect.top - a.boundingClientRect.top
          )[0];
        const nearest =
          aboveAnchor ??
          allVisible.sort(
            (a, b) => a.boundingClientRect.top - b.boundingClientRect.top
          )[0];
        if (nearest) {
          const item = unitEls.find((i) => i.el === nearest.target);
          if (!item) return;
          setCurrentUnitIndex(unitEls.findIndex((i) => i.el === item.el));
        }
        // const snapshot = unitEls.map((i) => {
        //   const r = i.el.getBoundingClientRect();
        //   return {
        //     id: i.id,
        //     title: i.title,
        //     top: Math.round(r.top),
        //     isVisible: r.top < window.innerHeight && r.bottom > 0,
        //   };
        // }).sort((a, b) => a.top - b.top);
        // setIoDebug(snapshot);
        // setAnchorY(anchorY);
      },
      {
        root: null,
        rootMargin: "0px 0px 0px 0px",
        threshold: [0, 0.25, 0.5, 0.75, 1],
      }
    );
    unitEls.forEach((i) => observer.observe(i.el));
    return () => observer.disconnect();
  }, [unitEls]);
  const unitBrandColor = path?.units[currentUnitIndex]?.brandColor ?? "sky";
  const headerColor = brandColorToBg[unitBrandColor];
  const chooseVariant = brandColorToButtonVariant[unitBrandColor];

  return (
    <div>
      <main>
        {/*
          <div
            className="fixed left-0 right-0 z-[150] pointer-events-none"
            style={{ top: anchorY }}
          >
            <div className="border-t-2 border-red-500 border-dashed" />
          </div>
          <div className="fixed top-2 right-2 z-[200] rounded-lg bg-black/70 text-white p-2 text-xs min-w-[220px]">
            <div className="font-bold">IO Debug</div>
            <div className="mt-1 space-y-1">
              {ioDebug.map((d) => (
                <div key={d.id} className={cn("flex justify-between", d.isVisible ? "text-emerald-300" : "text-slate-300")}> 
                  <span className="truncate max-w-[140px]">{d.title}</span>
                  <span>{d.top}px</span>
                </div>
              ))}
            </div>
          </div>
          */}
        <section
          className={cn(
            "sticky top-3 z-20 rounded-2xl p-3 md:p-4 shadow",
            headerColor
          )}
        >
          <div className="grid grid-cols-1 md:grid-cols-3 items-center">
            <div className="md:col-span-2">
              <h1 className={`font-extrabold text-white text-2xl md:text-3xl`}>
                {path ? path.course : "Course"}
              </h1>
              <p className="text-white/90 mt-1">
                Start your nodes and earn the unit badge.
              </p>
            </div>
            <div className="flex justify-end">
              <Tooltip>
                <TooltipTrigger asChild>
                  <Link href="/path" title="Choose Path">
                    <Button
                      variant={chooseVariant}
                      size="icon-sm"
                      aria-label="Choose Path"
                    >
                      <BookOpen className="size-4" />
                    </Button>
                  </Link>
                </TooltipTrigger>
                <TooltipContent side="left">Choose Path</TooltipContent>
              </Tooltip>
            </div>
          </div>
        </section>

        {path && (
          <section className="mt-6">
            <VerticalPathTrack path={path} onUnitRefs={setUnitEls} brandColor={unitBrandColor} />
          </section>
        )}
      </main>
    </div>
  );
}
