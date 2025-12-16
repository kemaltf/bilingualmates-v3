"use client";
import { paths } from "@/lib/learn/mock";
import { Card, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Users } from "lucide-react";

function formatIDR(amount: number) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(amount);
}

export default function PathPage() {
  const router = useRouter();
  return (
    <main className="w-full">
      <div className="mb-8">
        <h1 className="text-2xl md:text-3xl font-extrabold mb-2">
          Learn English for your life needs now.
        </h1>
        <p className="text-neutral-600 dark:text-neutral-400">
          {`Choose what's relevant. You can switch anytime.`}
        </p>
        <div className="mt-6 p-4 bg-sky-50 dark:bg-sky-900/20 border border-sky-100 dark:border-sky-800 rounded-xl flex items-start gap-3">
          <span className="text-xl">💡</span>
          <div className="text-sm text-neutral-700 dark:text-neutral-300">
            <strong>Planning to learn more than 1 class?</strong>
            <p className="mt-0.5 text-neutral-600 dark:text-neutral-400">
              Most learners choose subscription for unlimited access to all
              paths.
            </p>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {paths.map((path) => {
          const isLocked = path.units.every((u) =>
            u.nodes.every((n) => n.status === "locked")
          );
          return (
            <Card
              key={path.id}
              className="overflow-hidden hover:shadow-md transition-shadow cursor-pointer border-[3px] border-b-[6px] active:border-b-[3px] active:translate-y-[3px]"
              onClick={() => {
                if (path.price && path.price > 0) {
                  router.push(`/path/${path.id}`);
                } else if (!isLocked) {
                  router.push(`/learn?pathId=${path.id}`);
                }
              }}
            >
              <div className="h-40 bg-neutral-100 dark:bg-neutral-800 relative">
                <Image
                  src={path.imageUrl ?? "/images/path-general.svg"}
                  alt={path.course}
                  fill
                  className="object-cover"
                />
                {isLocked && (
                  <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                    <span className="bg-slate-800 text-white px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1">
                      🔒 Locked
                    </span>
                  </div>
                )}
              </div>
              <CardContent className="p-4">
                <CardTitle className="flex items-center gap-2 mb-2">
                  <span className="text-2xl">{path.emoji}</span>
                  <span className="font-bold text-lg">{path.course}</span>
                </CardTitle>
                <div className="text-sm text-neutral-500 dark:text-neutral-400 mb-4 min-h-[40px] line-clamp-2">
                  {path.description ||
                    (path.id === "general"
                      ? "Perfect for beginners starting their journey."
                      : path.id === "business"
                        ? "Master professional communication."
                        : path.id === "kids"
                          ? "Fun and engaging lessons for children."
                          : "Essential phrases for your travels.")}
                </div>

                <div className="flex items-center gap-4 text-xs text-slate-500 dark:text-slate-400 mb-4 font-medium border-b pb-4">
                  {path.studentsCount && (
                    <div className="flex items-center gap-1">
                      <Users className="w-3 h-3" />
                      <span>
                        {path.studentsCount.toLocaleString()} Students
                      </span>
                    </div>
                  )}
                  <div className="flex items-center gap-1">
                    <span>{path.units.length} Units</span>
                  </div>
                </div>

                <div className="flex items-end justify-between mt-4">
                  {path.price && path.price > 0 ? (
                    <div className="flex flex-col items-start gap-1">
                      {path.originalPrice && (
                        <div className="text-xs text-slate-400 line-through">
                          {formatIDR(path.originalPrice)}
                        </div>
                      )}
                      <div className="text-lg font-extrabold text-slate-800 dark:text-slate-200">
                        {formatIDR(path.price)}
                      </div>
                    </div>
                  ) : (
                    <div className="text-lg font-extrabold text-green-600 dark:text-green-400">
                      Free
                    </div>
                  )}

                  <Button
                    variant={path.price && path.price > 0 ? "blue" : "green"}
                    size="sm"
                    label={
                      path.price && path.price > 0 ? "See Inside" : "My Choice"
                    }
                    className="px-6"
                    onClick={(e) => {
                      e.stopPropagation();
                      if (path.price && path.price > 0) {
                        router.push(`/path/${path.id}`);
                      } else {
                        router.push(`/learn?pathId=${path.id}`);
                      }
                    }}
                  />
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </main>
  );
}
