"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import {
  Modal,
  ModalClose,
  ModalContent,
  ModalHeader,
  ModalTitle,
  ModalTrigger,
} from "@/components/ui/modal";
import { CourseSelectionList } from "@/components/course/CourseSelectionList";
import { Course } from "@/lib/learn/types";
import { Globe, X } from "lucide-react";
import { useTranslations } from "next-intl";

interface CourseSelectorProps {
  courses: Course[];
  currentCourseId: string;
  trigger?: React.ReactNode;
}

export function CourseSelector({
  courses,
  currentCourseId,
  trigger,
}: CourseSelectorProps) {
  const t = useTranslations("course.selector");
  const [open, setOpen] = React.useState(false);
  const currentCourse = courses.find((c) => c.id === currentCourseId);

  return (
    <Modal open={open} onOpenChange={setOpen}>
      <ModalTrigger asChild>
        {trigger || (
          <Button variant="outline" className="gap-2 mb-0">
            <Globe className="w-4 h-4" />
            {currentCourse?.title || t("buttonDefault")}
          </Button>
        )}
      </ModalTrigger>
      <ModalContent className="max-w-none w-full h-full rounded-none p-0 flex flex-col z-[100]">
        <ModalHeader className="border-b px-6 py-4 bg-background z-10 flex-row items-center justify-between">
          <ModalTitle className="text-2xl">{t("modalTitle")}</ModalTitle>
          <ModalClose asChild>
            <Button variant="ghost" size="icon" className="rounded-xl">
              <X className="w-5 h-5" />
            </Button>
          </ModalClose>
        </ModalHeader>
        <div className="flex-1 overflow-y-auto p-6 bg-slate-50 dark:bg-neutral-900 pb-24">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-2xl font-bold mb-2 text-neutral-700 dark:text-neutral-200">
              {t("listTitle")}
            </h2>
            <p className="text-neutral-500 mb-8">{t("listDescription")}</p>
            <CourseSelectionList
              courses={courses}
              currentCourseId={currentCourseId}
              onSelect={() => setOpen(false)}
            />
          </div>
        </div>
      </ModalContent>
    </Modal>
  );
}
