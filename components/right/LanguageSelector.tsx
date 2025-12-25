"use client";

import * as React from "react";
import Image from "next/image";
import { Check, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { useTranslations } from "next-intl";
import { courses } from "@/lib/learn/mock";
import { CourseSelector } from "@/components/path/CourseSelector";
import type { LanguageStats } from "@/lib/right/types";

interface LanguageSelectorProps {
  stats: LanguageStats;
}

import { updateCurrentCourseAndPath } from "@/lib/actions/course";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export function LanguageSelector({ stats }: LanguageSelectorProps) {
  const t = useTranslations("sidebar.language");
  const router = useRouter();
  const [loadingId, setLoadingId] = React.useState<string | null>(null);

  const handleSelect = async (courseId: string) => {
    if (courseId === stats.languageCode) return;

    try {
      setLoadingId(courseId);

      // Find the course and its default/first path
      const selectedCourse = courses.find((c) => c.id === courseId);
      const defaultPathId = selectedCourse?.paths?.[0]?.id;

      if (defaultPathId) {
        // If course has paths, update both course and path
        await updateCurrentCourseAndPath(courseId, defaultPathId);
      } else {
        // Fallback to just updating course if no paths found (shouldn't happen with valid data)
        await updateCurrentCourseAndPath(courseId, "general");
      }

      toast.success("Language changed successfully");
      router.refresh();
    } catch (error) {
      toast.error("Failed to change language");
      console.error(error);
    } finally {
      setLoadingId(null);
    }
  };

  // Filter available languages based on mock courses or keep static if needed
  // For now we map courses to the format expected by the dropdown
  // or just use the courses list directly if we want to show all courses in the dropdown
  // But the design shows a specific list. Let's use the courses mock to populate the list if possible
  // or keep the static list but translated.
  // The user requirement implies we should use the new modal for "Add new course".

  // Let's replace the static AVAILABLE_LANGUAGES with data from courses mock to be consistent
  const availableLanguages = courses.map((c) => ({
    code: c.id,
    name: c.title,
    flagUrl: c.flagUrl,
  }));

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className="cursor-pointer outline-none">
          {stats.flagUrl ? (
            <div className="relative w-10 h-7 overflow-hidden rounded-md shadow-sm">
              <Image
                src={stats.flagUrl}
                alt={stats.languageName}
                fill
                className="object-cover"
              />
            </div>
          ) : (
            <span className="text-xl font-bold">
              {stats.languageCode.toUpperCase()}
            </span>
          )}
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="w-80 p-0 overflow-hidden z-[100]"
        align="start"
      >
        <div className="flex flex-col">
          <div className="p-4 text-xs font-bold text-neutral-500 dark:text-neutral-400 uppercase tracking-wider">
            {t("myCourses")}
          </div>
          <div className="flex flex-col max-h-[300px] overflow-y-auto">
            {availableLanguages.map((lang) => (
              <button
                key={lang.code}
                onClick={() => handleSelect(lang.code)}
                disabled={loadingId === lang.code}
                className={cn(
                  "flex items-center gap-3 px-4 py-3 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors w-full text-left",
                  lang.code === stats.languageCode &&
                    "bg-blue-50/50 dark:bg-blue-900/20",
                  loadingId === lang.code && "opacity-50 cursor-not-allowed"
                )}
              >
                <div className="relative w-8 h-6 overflow-hidden rounded shadow-sm flex-shrink-0">
                  <Image
                    src={lang.flagUrl || "/flags/en.svg"}
                    alt={lang.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <span
                  className={cn(
                    "font-bold flex-1",
                    lang.code === stats.languageCode
                      ? "text-blue-500 dark:text-blue-400"
                      : "text-neutral-700 dark:text-neutral-200"
                  )}
                >
                  {lang.name}
                </span>
                {lang.code === stats.languageCode && (
                  <Check className="w-5 h-5 text-blue-500 dark:text-blue-400" />
                )}
              </button>
            ))}
          </div>
          <div className="p-2 border-t border-neutral-200 dark:border-neutral-800">
            <CourseSelector
              courses={courses}
              currentCourseId={stats.languageCode}
              trigger={
                <Button
                  variant="ghost"
                  className="w-full justify-start gap-3 h-auto py-3 text-neutral-500 dark:text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-800"
                >
                  <div className="w-8 h-8 rounded-lg border-2 border-dashed border-neutral-300 dark:border-neutral-600 flex items-center justify-center">
                    <Plus className="w-5 h-5" />
                  </div>
                  <span className="font-bold">{t("addNew")}</span>
                </Button>
              }
            />
          </div>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
