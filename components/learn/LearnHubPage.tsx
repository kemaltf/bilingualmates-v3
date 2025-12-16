"use client";
import * as React from "react";
import { VerticalPathTrack } from "./VerticalPathTrack";
import { LearnHubHeader } from "./LearnHubHeader";
import { paths } from "@/lib/learn/mock";

import {
  brandColorToBg,
  brandColorToButtonVariant,
} from "@/lib/ui/design-tokens";
import { useSearchParams } from "next/navigation";

export function LearnHubPage() {
  const searchParams = useSearchParams();
  const selectedParam = searchParams.get("pathId");
  const fallback = paths[0]?.id ?? null;
  const selected = selectedParam ?? fallback;
  const path = React.useMemo(
    () => paths.find((p) => p.id === selected) ?? null,
    [selected]
  );

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

  const unitBrandColor = path?.units[currentUnitIndex]?.brandColor ?? "sky";
  const headerColor = brandColorToBg[unitBrandColor];
  const chooseVariant = brandColorToButtonVariant[unitBrandColor];

  return (
    <main className="max-w-[640px] mx-auto md:px-6">
      <LearnHubHeader
        ref={headerRef}
        courseTitle={path ? path.course : "Course"}
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
