"use client";
import * as React from "react";
import { paths } from "@/lib/learn/mock";
import { PathChips } from "@/components/learn/PathChips";
import { PathChaptersCarousel } from "@/components/learn/PathChaptersCarousel";
import { Nunito } from "next/font/google";

const nunito = Nunito({
  subsets: ["latin"],
  weight: ["700", "800"],
  variable: "--font-nunito",
});

export default function PathPage() {
  const [selected, setSelected] = React.useState<string>(paths[0]?.id ?? null);
  const path = React.useMemo(
    () => paths.find((p) => p.id === selected) ?? null,
    [selected]
  );

  return (
    <div className="bg-slate-100 min-h-screen">
      <div className="max-w-[1120px] mx-auto px-4 py-6">
        <h1 className={`${nunito.variable} font-[800] text-slate-800 text-2xl`}>
          Choose Your Path
        </h1>
        <div className="mt-3">
          <PathChips
            paths={paths}
            selectedId={selected}
            onSelect={setSelected}
          />
        </div>
        {path && (
          <div className="mt-4">
            <PathChaptersCarousel path={path} />
          </div>
        )}
      </div>
    </div>
  );
}
