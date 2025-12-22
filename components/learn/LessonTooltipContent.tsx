"use client";
import * as React from "react";
import * as TooltipPrimitive from "@radix-ui/react-tooltip";
import type { Unit, LessonNode } from "@/lib/learn/types";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipTrigger,
  TooltipProvider,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import type { BrandColor } from "@/lib/ui/design-tokens";
import { useRouter } from "next/navigation";

interface LessonTooltipProps {
  children: React.ReactNode;
  node: LessonNode;
  unit: Unit;
  isOpen: boolean;
  onOpenToggle: () => void;
  onUnitTest?: (unit: Unit) => void;
  inlinePlayer?: boolean;
  onActivate: () => void;
  brandColor?: BrandColor;
}

export function LessonTooltip({
  children,
  node: n,
  unit: u,
  isOpen,
  onOpenToggle,
  onUnitTest,
  inlinePlayer,
  onActivate,
  brandColor,
}: LessonTooltipProps) {
  const router = useRouter();

  const activeBrandColor = u.brandColor ?? brandColor ?? "violet";

  // Map brandColor to styles for tooltip (bg, border, text)
  const brandStyles: Record<
    string,
    { content: string; arrow: string; buttonText: string }
  > = {
    violet: {
      content: "bg-violet-500 border-violet-500 text-white",
      arrow: "bg-violet-500 border-violet-500",
      buttonText: "text-violet-600 hover:text-violet-700",
    },
    green: {
      content: "bg-emerald-500 border-emerald-500 text-white",
      arrow: "bg-emerald-500 border-emerald-500",
      buttonText: "text-emerald-600 hover:text-emerald-700",
    },
    blue: {
      content: "bg-blue-500 border-blue-500 text-white",
      arrow: "bg-blue-500 border-blue-500",
      buttonText: "text-blue-600 hover:text-blue-700",
    },
    red: {
      content: "bg-red-500 border-red-500 text-white",
      arrow: "bg-red-500 border-red-500",
      buttonText: "text-red-600 hover:text-red-700",
    },
    yellow: {
      content: "bg-yellow-500 border-yellow-500 text-yellow-950",
      arrow: "bg-yellow-500 border-yellow-500",
      buttonText: "text-yellow-600 hover:text-yellow-700",
    },
    orange: {
      content: "bg-orange-500 border-orange-500 text-white",
      arrow: "bg-orange-500 border-orange-500",
      buttonText: "text-orange-600 hover:text-orange-700",
    },
    pink: {
      content: "bg-pink-500 border-pink-500 text-white",
      arrow: "bg-pink-500 border-pink-500",
      buttonText: "text-pink-600 hover:text-pink-700",
    },
    teal: {
      content: "bg-teal-500 border-teal-500 text-white",
      arrow: "bg-teal-500 border-teal-500",
      buttonText: "text-teal-600 hover:text-teal-700",
    },
    indigo: {
      content: "bg-indigo-500 border-indigo-500 text-white",
      arrow: "bg-indigo-500 border-indigo-500",
      buttonText: "text-indigo-600 hover:text-indigo-700",
    },
    cyan: {
      content: "bg-cyan-500 border-cyan-500 text-cyan-950",
      arrow: "bg-cyan-500 border-cyan-500",
      buttonText: "text-cyan-600 hover:text-cyan-700",
    },
    lime: {
      content: "bg-lime-500 border-lime-500 text-lime-950",
      arrow: "bg-lime-500 border-lime-500",
      buttonText: "text-lime-600 hover:text-lime-700",
    },
    sky: {
      content: "bg-sky-500 border-sky-500 text-white",
      arrow: "bg-sky-500 border-sky-500",
      buttonText: "text-sky-600 hover:text-sky-700",
    },
    fuchsia: {
      content: "bg-fuchsia-500 border-fuchsia-500 text-white",
      arrow: "bg-fuchsia-500 border-fuchsia-500",
      buttonText: "text-fuchsia-600 hover:text-fuchsia-700",
    },
    rose: {
      content: "bg-rose-500 border-rose-500 text-white",
      arrow: "bg-rose-500 border-rose-500",
      buttonText: "text-rose-600 hover:text-rose-700",
    },
    slate: {
      content: "bg-slate-500 border-slate-500 text-white",
      arrow: "bg-slate-500 border-slate-500",
      buttonText: "text-slate-600 hover:text-slate-700",
    },
  };

  const style = brandStyles[activeBrandColor] || brandStyles.violet;

  return (
    <TooltipProvider delayDuration={0}>
      <Tooltip open={isOpen}>
        <TooltipTrigger
          asChild
          onClick={(e) => {
            e.preventDefault();
            onOpenToggle();
          }}
          onPointerDown={(e) => {
            // Prevent focus stealing or other side effects if needed
            // e.preventDefault();
          }}
        >
          {children}
        </TooltipTrigger>
        <TooltipPrimitive.Portal>
          <TooltipPrimitive.Content
            side="bottom"
            sideOffset={10}
            className={cn(
              "z-50 w-[300px] rounded-2xl p-4 shadow-xl animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 border-0",
              style.content
            )}
            onPointerDownOutside={(e) => {
              // Optional: Close on outside click if desired
            }}
          >
            <div className="text-lg font-bold mb-1">{n.title}</div>
            {n.description && (
              <div className="text-sm opacity-90 mb-4 leading-snug">
                {n.description}
              </div>
            )}
            {n.kind === "ad" && (
              <div className="mb-2 text-xs opacity-80">
                {`Ads help BilingualMates' mission to provide free English education.`}
              </div>
            )}

            <div className="w-full">
              {n.status === "locked" ? (
                <Button
                  variant="white"
                  size="lg"
                  className={cn("w-full")}
                  onClick={() => {
                    if (onUnitTest) onUnitTest(u);
                  }}
                >
                  JUMP HERE
                </Button>
              ) : (
                <Button
                  variant="white"
                  size="lg"
                  className={cn("w-full")}
                  onClick={() => {
                    if (onUnitTest) onUnitTest(u);
                    if (inlinePlayer) {
                      onActivate();
                    } else {
                      if (typeof window !== "undefined") {
                        router.push(`/learn/${n.id}`);
                      }
                    }
                  }}
                >
                  {n.kind === "ad" ? "WATCH AD" : "START +10 XP"}
                </Button>
              )}
            </div>

            {/* Custom Arrow (Solid) */}
            <TooltipPrimitive.Arrow
              className={cn(
                "fill-current",
                style.arrow
                  .split(" ")
                  .find((c) => c.startsWith("bg-"))
                  ?.replace("bg-", "text-")
              )}
              width={20}
              height={10}
            />
          </TooltipPrimitive.Content>
        </TooltipPrimitive.Portal>
      </Tooltip>
    </TooltipProvider>
  );
}
