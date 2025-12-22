"use client";
import * as React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { BookOpen } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@/components/ui/tooltip";
import type { ButtonVariant } from "@/lib/ui/design-tokens";

export interface LearnHubHeaderProps {
  sectionTitle: string;
  description?: string;
  headerColor: string;
  chooseVariant: ButtonVariant;
}

const LearnHubHeader = React.forwardRef<HTMLElement, LearnHubHeaderProps>(
  function LearnHubHeader(
    { sectionTitle, description, headerColor, chooseVariant },
    ref
  ) {
    return (
      <section
        className={cn(
          "sticky top-15 md:top-3 z-20 rounded-2xl p-3 md:p-4 shadow",
          headerColor
        )}
        ref={ref}
      >
        <div className="flex items-center justify-between gap-4">
          <div className="flex-1 min-w-0">
            <h1
              className={`font-extrabold text-white text-2xl md:text-3xl truncate`}
            >
              {sectionTitle}
            </h1>
            <p className="text-white/90 mt-1 line-clamp-1">{description}</p>
          </div>
          <div className="flex-shrink-0">
            <Tooltip>
              <TooltipTrigger asChild>
                <Link href="/path" title="Choose Path">
                  <div className="border-[3px] border-black/20 shadow-[0_4px_0_0_rgba(0,0,0,0.3)] hover:bg-black/5 active:shadow-none active:translate-y-1 rounded-xl transition-all cursor-pointer p-2">
                    <BookOpen className="size-6 text-white" />
                  </div>
                </Link>
              </TooltipTrigger>
              <TooltipContent side="left">Choose Path</TooltipContent>
            </Tooltip>
          </div>
        </div>
      </section>
    );
  }
);

export { LearnHubHeader };
