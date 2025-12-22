"use client";
import * as React from "react";
import { VerticalPathTrack } from "./VerticalPathTrack";
import { LearnHubHeader } from "./LearnHubHeader";

import {
  brandColorToBg,
  brandColorToButtonVariant,
} from "@/lib/ui/design-tokens";
import { PathProvider, usePath } from "./PathContext";

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

  const currentUnit = path?.units[currentUnitIndex];
  const unitBrandColor = currentUnit?.brandColor ?? "sky";
  const headerColor = brandColorToBg[unitBrandColor];
  const chooseVariant = brandColorToButtonVariant[unitBrandColor];

  return (
    <main className="max-w-[640px] mx-auto">
      <LearnHubHeader
        ref={headerRef}
        sectionTitle={currentUnit ? currentUnit.title : "Loading..."}
        description={currentUnit?.description}
        headerColor={headerColor}
        chooseVariant={chooseVariant}
      />

      {path && (
        <section className="mt-6">
          <VerticalPathTrack
            path={path}
            onDividerRefs={setDividerEls}
            brandColor={unitBrandColor}
          />
        </section>
      )}
    </main>
  );
}
