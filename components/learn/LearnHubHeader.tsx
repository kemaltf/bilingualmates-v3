"use client";
import * as React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { BookOpen } from "lucide-react";
import { cn } from "@/lib/utils";
import { Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip";
import type { ButtonVariant } from "@/lib/ui/design-tokens";

export interface LearnHubHeaderProps {
  courseTitle: string;
  headerColor: string;
  chooseVariant: ButtonVariant;
}

const LearnHubHeader = React.forwardRef<HTMLElement, LearnHubHeaderProps>(
  function LearnHubHeader({ courseTitle, headerColor, chooseVariant }, ref) {
    return (
      <section
        className={cn("sticky top-3 z-20 rounded-2xl p-3 md:p-4 shadow", headerColor)}
        ref={ref}
      >
        <div className="grid grid-cols-1 md:grid-cols-3 items-center">
          <div className="md:col-span-2">
            <h1 className={`font-extrabold text-white text-2xl md:text-3xl`}>{courseTitle}</h1>
            <p className="text-white/90 mt-1">Start your nodes and earn the unit badge.</p>
          </div>
          <div className="flex justify-end">
            <Tooltip>
              <TooltipTrigger asChild>
                <Link href="/path" title="Choose Path">
                  <Button variant={chooseVariant} size="icon-sm" aria-label="Choose Path">
                    <BookOpen className="size-4" />
                  </Button>
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