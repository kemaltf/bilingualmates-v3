"use client";
import * as React from "react";
import { paths } from "@/lib/learn/mock";
import { Button } from "@/components/ui/button";
import { useRouter, useParams } from "next/navigation";
import LottiePlayer from "@/components/shared/LottiePlayer";

export default function SuccessPage() {
  const params = useParams<{ pathId: string }>();
  const router = useRouter();
  const pathId = params?.pathId;
  const path = paths.find((p) => p.id === pathId);

  const firstLessonId = path?.units[0]?.nodes[0]?.id;

  React.useEffect(() => {
    // Auto-redirect after 3 seconds
    const timer = setTimeout(() => {
      if (path && firstLessonId) {
        router.push(`/learn/${firstLessonId}?pathId=${path.id}`);
      } else if (path) {
        router.push(`/learn?pathId=${path.id}`);
      }
    }, 3000);
    return () => clearTimeout(timer);
  }, [path, firstLessonId, router]);

  if (!path) {
    return <div>Path not found</div>;
  }

  return (
    <div className="min-h-screen bg-white dark:bg-neutral-900 p-6 flex flex-col items-center justify-center text-center">
      <div className="w-64 h-64 mb-8">
        <LottiePlayer src="/medals.json" className="w-full h-full" />
      </div>

      <h1 className="text-3xl font-extrabold text-slate-800 dark:text-slate-100 mb-4">
        Payment Successful!
      </h1>
      <p className="text-lg text-slate-600 dark:text-slate-300 mb-8 max-w-md">
        You have successfully unlocked{" "}
        <span className="font-bold text-slate-800 dark:text-slate-100">
          {path.course}
        </span>
        . Get ready to start learning!
      </p>

      <Button
        variant="green"
        size="lg"
        className="w-full max-w-xs text-lg h-14 font-bold shadow-xl shadow-green-200 dark:shadow-green-900/20"
        onClick={() =>
          router.push(
            firstLessonId
              ? `/learn/${firstLessonId}?pathId=${path.id}`
              : `/learn?pathId=${path.id}`
          )
        }
      >
        Start Learning Now
      </Button>

      <p className="mt-4 text-sm text-slate-400 dark:text-slate-500">
        Redirecting you automatically...
      </p>
    </div>
  );
}
