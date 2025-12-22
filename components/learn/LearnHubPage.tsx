"use client";
import * as React from "react";
import { VerticalPathTrack } from "./VerticalPathTrack";
import { LearnHubHeader } from "./LearnHubHeader";

import {
  brandColorToBg,
  brandColorToButtonVariant,
} from "@/lib/ui/design-tokens";
import { PathProvider, usePath } from "./PathContext";
import { cn } from "@/lib/utils";

export interface LearnHubPageProps {
  initialPathId?: string;
}

export function LearnHubPage({ initialPathId }: LearnHubPageProps) {
  return (
    <PathProvider initialPathId={initialPathId}>
      <LearnHubContent />
    </PathProvider>
  );
}

function LearnHubContent() {
  const { currentPath: path } = usePath();
  const [activeSectionId, setActiveSectionId] = React.useState<string | null>(
    null
  );

  React.useEffect(() => {
    if (path?.sections?.length && !activeSectionId) {
      setActiveSectionId(path.sections[0].id);
    }
  }, [path, activeSectionId]);

  const activeSection =
    path?.sections?.find((s) => s.id === activeSectionId) ||
    path?.sections?.[0];
  const activeUnits = activeSection?.units ?? [];

  const [currentUnitIndex, setCurrentUnitIndex] = React.useState(0);
  const [dividerEls, setDividerEls] = React.useState<
    { index: number; el: HTMLElement }[]
  >([]);
  const headerRef = React.useRef<HTMLElement | null>(null);

  React.useEffect(() => {
    if (dividerEls.length === 0) return;
    const computeIndex = () => {
      const headerBottom = headerRef.current
        ? headerRef.current.getBoundingClientRect().bottom
        : 0;
      const crossed = dividerEls
        .map((d) => ({ idx: d.index, top: d.el.getBoundingClientRect().top }))
        .filter((x) => x.top <= headerBottom)
        .map((x) => x.idx);
      setCurrentUnitIndex(crossed.length > 0 ? Math.max(...crossed) : 0);
    };
    computeIndex();
    const observer = new IntersectionObserver(() => computeIndex(), {
      root: null,
      threshold: [0, 0.25, 0.5, 0.75, 1],
    });
    dividerEls.forEach((d) => observer.observe(d.el));
    const onScroll = () => computeIndex();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [dividerEls]);

  const currentUnit = activeUnits[currentUnitIndex];
  const unitBrandColor = currentUnit?.brandColor ?? "sky";
  const headerColor = brandColorToBg[unitBrandColor];
  const chooseVariant = brandColorToButtonVariant[unitBrandColor];

  return (
    <main className="max-w-[640px] mx-auto">
      <LearnHubHeader
        ref={headerRef}
        sectionTitle={activeSection ? activeSection.title : "Loading..."}
        description={activeSection?.description}
        headerColor={headerColor}
        chooseVariant={chooseVariant}
      />

      {path && (
        <section className="mt-6">
          {path.sections.length > 1 && (
            <div className="flex gap-2 overflow-x-auto pb-4 mb-4 px-3 md:px-0 no-scrollbar">
              {path.sections.map((sec) => (
                <button
                  key={sec.id}
                  onClick={() => setActiveSectionId(sec.id)}
                  className={cn(
                    "px-4 py-2 rounded-full border-2 text-sm font-bold whitespace-nowrap transition-colors",
                    activeSection?.id === sec.id
                      ? "bg-slate-800 text-white border-slate-800"
                      : "bg-white text-slate-600 border-slate-200 hover:border-slate-300"
                  )}
                >
                  {sec.title}
                </button>
              ))}
            </div>
          )}
          <VerticalPathTrack
            units={activeUnits}
            onDividerRefs={setDividerEls}
            brandColor={unitBrandColor}
          />
        </section>
      )}
    </main>
  );
}
