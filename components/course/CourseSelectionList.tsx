"use client";

import * as React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Check, Loader2 } from "lucide-react";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import type { Course } from "@/lib/learn/types";
import { updateCurrentCourse } from "@/lib/actions/course";
import { toast } from "sonner";

interface CourseSelectionListProps {
  courses: Course[];
  currentCourseId: string | null;
  isPublic?: boolean;
  onSelect?: () => void;
}

export function CourseSelectionList({
  courses,
  currentCourseId,
  isPublic = false,
  onSelect,
}: CourseSelectionListProps) {
  const router = useRouter();
  const [loadingId, setLoadingId] = React.useState<string | null>(null);

  const handleSelect = async (course: Course) => {
    if (isPublic) {
      router.push("/login");
      return;
    }

    if (course.id === currentCourseId) return;

    try {
      setLoadingId(course.id);
      await updateCurrentCourse(course.id);
      toast.success(`Course changed to ${course.title}`);
      onSelect?.();
      router.push("/path");
      router.refresh();
    } catch (error) {
      toast.error("Failed to change course");
      console.error(error);
      setLoadingId(null);
    }
  };

  return (
    <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {courses.map((course) => {
        const isActive = course.id === currentCourseId;
        const isLoading = loadingId === course.id;

        return (
          <Card
            key={course.id}
            className={cn(
              "relative overflow-hidden transition-all hover:shadow-md border-2",
              isActive
                ? "border-emerald-500 bg-emerald-50/10 cursor-default"
                : "border-neutral-200 hover:border-neutral-300 cursor-pointer"
            )}
            onClick={() => handleSelect(course)}
          >
            {isLoading ? (
              <div className="absolute top-3 right-3 z-10 bg-white/50 p-1 rounded-full">
                <Loader2 className="w-4 h-4 animate-spin text-emerald-600" />
              </div>
            ) : isActive ? (
              <div className="absolute top-3 right-3 z-10 bg-emerald-500 text-white p-1 rounded-full">
                <Check className="w-4 h-4" />
              </div>
            ) : null}

            <div className="p-6 flex flex-col items-center text-center gap-4">
              <div className="relative w-20 h-14 shadow-sm rounded-md overflow-hidden">
                <Image
                  src={course.flagUrl || "/flags/en.svg"}
                  alt={course.title}
                  fill
                  className="object-cover"
                />
              </div>

              <div className="space-y-2">
                <h3 className="font-bold text-lg text-neutral-800 dark:text-neutral-100">
                  {course.title}
                </h3>
                {course.description && (
                  <p className="text-sm text-neutral-500 line-clamp-2">
                    {course.description}
                  </p>
                )}
              </div>
            </div>
          </Card>
        );
      })}
    </div>
  );
}
