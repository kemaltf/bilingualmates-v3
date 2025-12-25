"use client";

import * as React from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { CourseMapContent } from "./CourseMapContent";
import type { CurriculumPath } from "@/lib/learn/types";

interface CourseMapSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  trigger: React.ReactNode;
  path?: CurriculumPath | null;
  activeSectionId?: string;
  onSelectSection?: (sectionId: string) => void;
}

export function CourseMapSheet({
  open,
  onOpenChange,
  trigger,
  path,
  activeSectionId,
  onSelectSection,
}: CourseMapSheetProps) {
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <Tooltip>
        <SheetTrigger asChild>
          <TooltipTrigger asChild>{trigger}</TooltipTrigger>
        </SheetTrigger>
        <TooltipContent side="left" className="z-[70]">
          Course Map
        </TooltipContent>
      </Tooltip>

      <SheetContent
        side="left"
        className="w-[85vw] sm:w-[400px] overflow-y-auto p-6"
      >
        <SheetHeader className="mb-6">
          <SheetTitle>Course Map</SheetTitle>
        </SheetHeader>
        <CourseMapContent
          path={path}
          activeSectionId={activeSectionId}
          onSelectSection={onSelectSection}
          onClose={() => onOpenChange(false)}
        />
      </SheetContent>
    </Sheet>
  );
}
