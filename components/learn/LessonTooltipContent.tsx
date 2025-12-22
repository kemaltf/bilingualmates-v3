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
import { BRAND, type BrandColor } from "@/lib/ui/design-tokens";
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

  const activeBrandColor = (u.brandColor ??
    brandColor ??
    "violet") as BrandColor;
  const brand = BRAND[activeBrandColor] || BRAND.violet;

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
              brand.bg500,
              "text-white"
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
                  className={cn("w-full", brand.text600)}
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
                  className={cn("w-full", brand.text600)}
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
                brand.text600.replace("text-", "text-").replace("600", "500")
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
