"use client";
import * as React from "react";
import { Map } from "lucide-react";
import { cn } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-mobile";
import type { ButtonVariant } from "@/lib/ui/design-tokens";
import type { CurriculumPath } from "@/lib/learn/types";
import { CourseMapSheet } from "./CourseMapSheet";
import { CourseMapModal } from "./CourseMapModal";

export interface LearnHubHeaderProps {
  sectionTitle: string;
  description?: string;
  headerColor: string;
  chooseVariant: ButtonVariant;
  path?: CurriculumPath | null;
  activeSectionId?: string;
  onSelectSection?: (sectionId: string) => void;
}

const LearnHubHeader = React.forwardRef<HTMLElement, LearnHubHeaderProps>(
  function LearnHubHeader(
    {
      sectionTitle,
      description,
      headerColor,
      path,
      activeSectionId,
      onSelectSection,
    },
    ref
  ) {
    const [open, setOpen] = React.useState(false);
    const isMobile = useIsMobile();

    const MapTrigger = (
      <div className="border-[3px] border-black/20 shadow-[0_4px_0_0_rgba(0,0,0,0.3)] hover:bg-black/5 active:shadow-none active:translate-y-1 rounded-xl transition-all cursor-pointer p-2">
        <Map className="size-6 text-white" />
      </div>
    );

    return (
      <section
        className={cn(
          "sticky top-15 lg:top-3 z-[30] rounded-2xl p-3 md:p-4 shadow",
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
            {isMobile ? (
              <CourseMapSheet
                open={open}
                onOpenChange={setOpen}
                trigger={MapTrigger}
                path={path}
                activeSectionId={activeSectionId}
                onSelectSection={onSelectSection}
              />
            ) : (
              <CourseMapModal
                open={open}
                onOpenChange={setOpen}
                trigger={MapTrigger}
                path={path}
                activeSectionId={activeSectionId}
                onSelectSection={onSelectSection}
              />
            )}
          </div>
        </div>
      </section>
    );
  }
);

export { LearnHubHeader };
