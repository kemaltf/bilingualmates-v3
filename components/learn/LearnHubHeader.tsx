"use client";
import * as React from "react";
import Link from "next/link";
import { Map, Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-mobile";
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@/components/ui/tooltip";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalTitle,
  ModalTrigger,
} from "@/components/ui/modal";
import { Button } from "@/components/ui/button";
import type { ButtonVariant } from "@/lib/ui/design-tokens";
import type { CurriculumPath } from "@/lib/learn/types";

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

    const handleSelect = (id: string) => {
      onSelectSection?.(id);
      setOpen(false);
    };

    const MapTrigger = (
      <div className="border-[3px] border-black/20 shadow-[0_4px_0_0_rgba(0,0,0,0.3)] hover:bg-black/5 active:shadow-none active:translate-y-1 rounded-xl transition-all cursor-pointer p-2">
        <Map className="size-6 text-white" />
      </div>
    );

    const CourseMapContent = (
      <div className="space-y-6">
        {/* Current Course Info */}
        <div className="p-4 rounded-xl border-2 border-slate-200 bg-slate-50 dark:bg-neutral-800 dark:border-neutral-700">
          <div className="text-xs font-bold text-slate-500 uppercase mb-2">
            Current Course
          </div>
          <div className="flex items-center justify-between gap-2">
            <div className="font-extrabold text-lg truncate">
              {path?.course ?? "Loading..."}
            </div>
            <Link href="/path" onClick={() => setOpen(false)}>
              <Button variant="outline-blue" size="sm">
                SWITCH
              </Button>
            </Link>
          </div>
        </div>

        {/* Sections List */}
        <div>
          <div className="text-xs font-bold text-slate-500 uppercase mb-3 px-1">
            Sections
          </div>
          <div className="space-y-3">
            {path?.sections?.map((sec, index) => {
              const isActive = activeSectionId === sec.id;
              return (
                <button
                  key={sec.id}
                  onClick={() => handleSelect(sec.id)}
                  className={cn(
                    "w-full text-left p-4 rounded-xl border-2 transition-all relative overflow-hidden",
                    isActive
                      ? "border-sky-500 bg-sky-50 dark:bg-sky-900/20"
                      : "border-slate-200 hover:border-slate-300 bg-white dark:bg-neutral-800 dark:border-neutral-700"
                  )}
                >
                  <div className="flex items-start justify-between gap-3 relative z-10">
                    <div className="flex-1">
                      <div className="text-xs font-bold text-slate-500 mb-1">
                        SECTION {index + 1}
                      </div>
                      <div className="font-bold text-slate-800 dark:text-slate-200">
                        {sec.title}
                      </div>
                      {sec.description && (
                        <div className="text-sm text-slate-500 mt-1 line-clamp-2">
                          {sec.description}
                        </div>
                      )}
                    </div>
                    {isActive && (
                      <div className="bg-sky-500 rounded-full p-1">
                        <Check className="w-4 h-4 text-white" />
                      </div>
                    )}
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    );

    return (
      <section
        className={cn(
          "sticky top-15 md:top-3 z-[60] rounded-2xl p-3 md:p-4 shadow",
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
              <Sheet open={open} onOpenChange={setOpen}>
                <Tooltip>
                  <SheetTrigger asChild>
                    <TooltipTrigger asChild>{MapTrigger}</TooltipTrigger>
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
                  {CourseMapContent}
                </SheetContent>
              </Sheet>
            ) : (
              <Modal open={open} onOpenChange={setOpen}>
                <Tooltip>
                  <ModalTrigger asChild>
                    <TooltipTrigger asChild>{MapTrigger}</TooltipTrigger>
                  </ModalTrigger>
                  <TooltipContent side="left" className="z-[70]">
                    Course Map
                  </TooltipContent>
                </Tooltip>

                <ModalContent className="max-w-screen-md w-full h-[85vh] p-0 overflow-hidden flex flex-col">
                  <ModalHeader className="border-b px-6 py-4">
                    <ModalTitle className="text-center text-xl font-extrabold text-slate-700 dark:text-slate-200">
                      Course Map
                    </ModalTitle>
                  </ModalHeader>
                  <div className="flex-1 overflow-y-auto p-6">
                    {CourseMapContent}
                  </div>
                </ModalContent>
              </Modal>
            )}
          </div>
        </div>
      </section>
    );
  }
);

export { LearnHubHeader };
