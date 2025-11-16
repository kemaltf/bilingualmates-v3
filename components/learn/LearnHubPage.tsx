"use client";
import * as React from "react";
import { VerticalPathTrack } from "./VerticalPathTrack";
import { paths } from "@/lib/learn/mock";
import { BookOpen, User2 } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { cn } from "@/lib/utils";

export function LearnHubPage() {
  const [selected] = React.useState<string>(paths[0]?.id ?? null);
  const path = React.useMemo(
    () => paths.find((p) => p.id === selected) ?? null,
    [selected]
  );
  const [currentUnitTitle, setCurrentUnitTitle] = React.useState<string | null>(null)
  const [unitEls, setUnitEls] = React.useState<{ id: string; title: string; el: HTMLElement }[]>([])
  const [currentUnitIndex, setCurrentUnitIndex] = React.useState(0)
  React.useEffect(() => {
    if (unitEls.length === 0) return
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0]
        if (visible) {
          const item = unitEls.find((i) => i.el === visible.target)
          if (item) setCurrentUnitTitle(item.title)
          if (item) setCurrentUnitIndex(unitEls.findIndex((i) => i.el === item.el))
        }
      },
      { root: null, rootMargin: "-40% 0px -50% 0px", threshold: 0.1 }
    )
    unitEls.forEach((i) => observer.observe(i.el))
    return () => observer.disconnect()
  }, [unitEls])
  const colorClasses = ["bg-emerald-500", "bg-sky-500", "bg-violet-500", "bg-amber-500", "bg-rose-500", "bg-indigo-500"]
  const headerColor = colorClasses[currentUnitIndex % colorClasses.length]

  return (
    <div className={`bg-slate-100 min-h-screen`}>
      <div className="max-w-[1280px] mx-auto grid grid-cols-1 md:grid-cols-[80px_1fr] gap-4 px-4 py-6">
        <aside className="md:block hidden">
          <div className="flex flex-col items-center gap-4">
            <Link href="/path">
              <Button variant="blue" size="icon" aria-label="Choose Path">
                <BookOpen className="size-5" />
              </Button>
            </Link>
            <Button variant="blue" size="icon" aria-label="Profile">
              <User2 className="size-5" />
            </Button>
          </div>
        </aside>
        <main>
          <section className={cn("sticky top-0 z-20 rounded-b-2xl p-3 md:p-4 shadow", headerColor)}>
            <div className="grid grid-cols-1 md:grid-cols-3 items-center">
              <div className="md:col-span-2">
                <h1 className={`font-extrabold text-white text-2xl md:text-3xl`}>
                  {currentUnitTitle ?? (path ? path.units[0]?.title : "Unit")}
                </h1>
                <p className="text-white/90 mt-1">Start your nodes and earn the unit badge.</p>
              </div>
              <div className="flex justify-center md:justify-end">
                <Image
                  src="https://picsum.photos/seed/book/80/80"
                  alt="Learn"
                  width={80}
                  height={80}
                  className="rounded-xl bg-white"
                  unoptimized
                />
              </div>
            </div>
          </section>

          {path && (
            <section className="mt-6">
              <VerticalPathTrack path={path} onUnitRefs={setUnitEls} />
            </section>
          )}
        </main>
      </div>
    </div>
  );
}
