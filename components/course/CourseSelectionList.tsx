"use client";

import * as React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Check, Loader2 } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { Course } from "@/lib/learn/types";
import { updateCurrentCourse } from "@/lib/actions/course";
import { toast } from "sonner";

interface CourseSelectionListProps {
  courses: Course[];
  currentCourseId: string | null;
}

export function CourseSelectionList({
  courses,
  currentCourseId,
}: CourseSelectionListProps) {
  const router = useRouter();
  const [loadingId, setLoadingId] = React.useState<string | null>(null);

  const handleSelect = async (course: Course) => {
    if (course.id === currentCourseId) return;

    try {
      setLoadingId(course.id);
      await updateCurrentCourse(course.id);
      toast.success(`Course changed to ${course.title}`);
      router.push("/path");
      router.refresh();
    } catch (error) {
      toast.error("Failed to change course");
      console.error(error);
      setLoadingId(null);
    }
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {courses.map((course) => {
        const isActive = course.id === currentCourseId;
        const isLoading = loadingId === course.id;

        return (
          <Card
            key={course.id}
            className={cn(
              "relative overflow-hidden cursor-pointer transition-all hover:shadow-md border-2",
              isActive
                ? "border-emerald-500 bg-emerald-50/10"
                : "border-neutral-200 hover:border-neutral-300"
            )}
            onClick={() => handleSelect(course)}
          >
            {isActive && (
              <div className="absolute top-3 right-3 z-10 bg-emerald-500 text-white p-1 rounded-full">
                <Check className="w-4 h-4" />
              </div>
            )}

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

              <div className="mt-auto pt-2 w-full">
                <Button
                  variant={isActive ? "green" : "outline-green"}
                  size="sm"
                  className="w-full uppercase font-bold tracking-widest"
                  disabled={isActive || isLoading}
                >
                  {isLoading ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : isActive ? (
                    "Active"
                  ) : (
                    "Select"
                  )}
                </Button>
              </div>
            </div>
          </Card>
        );
      })}
    </div>
  );
}
