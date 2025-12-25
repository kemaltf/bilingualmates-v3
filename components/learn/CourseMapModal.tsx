"use client";

import * as React from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalTitle,
  ModalTrigger,
} from "@/components/ui/modal";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { CourseMapContent } from "./CourseMapContent";
import type { CurriculumPath } from "@/lib/learn/types";

interface CourseMapModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  trigger: React.ReactNode;
  path?: CurriculumPath | null;
  activeSectionId?: string;
  onSelectSection?: (sectionId: string) => void;
}

export function CourseMapModal({
  open,
  onOpenChange,
  trigger,
  path,
  activeSectionId,
  onSelectSection,
}: CourseMapModalProps) {
  return (
    <Modal open={open} onOpenChange={onOpenChange}>
      <Tooltip>
        <ModalTrigger asChild>
          <TooltipTrigger asChild>{trigger}</TooltipTrigger>
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
          <CourseMapContent
            path={path}
            activeSectionId={activeSectionId}
            onSelectSection={onSelectSection}
            onClose={() => onOpenChange(false)}
          />
        </div>
      </ModalContent>
    </Modal>
  );
}
