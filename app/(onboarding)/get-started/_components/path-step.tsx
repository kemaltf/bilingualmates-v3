"use client";

import { Card, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Users } from "lucide-react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { PATHS, LANGUAGES } from "../constants";

type Props = {
  languageId?: string;
  onSelect: (pathId: string) => void;
};

export function PathStep({ languageId, onSelect }: Props) {
  const t = useTranslations("onboarding.path");
  const tCard = useTranslations("path.card");
  const languageName =
    LANGUAGES.find((l) => l.id === languageId)?.name || "Language";

  return (
    <div className="flex flex-col items-center gap-8 animate-in fade-in slide-in-from-bottom-4 duration-500 w-full max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold text-slate-700 dark:text-slate-200 text-center">
        {t("title", { language: languageName })}
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
        {PATHS.map((path) => {
          // Mock data to simulate the look of PathSelectionList
          const price = path.id === "basics" ? 0 : 150000;
          const studentsCount = 1234;
          const unitsLength = 10;

          return (
            <Card
              key={path.id}
              className="overflow-hidden hover:shadow-md transition-shadow cursor-pointer border-[3px] border-b-[6px] active:border-b-[3px] active:translate-y-[3px]"
              onClick={() => onSelect(path.id)}
            >
              <div className="h-40 bg-neutral-100 dark:bg-neutral-800 relative">
                <Image
                  src={`/images/path-${path.id}.svg`}
                  alt={t(`options.${path.id}.title`)}
                  fill
                  className="object-cover"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src =
                      "/images/path-general.svg";
                  }}
                />
              </div>
              <CardContent className="p-4 flex flex-col flex-1 h-[calc(100%-160px)]">
                <CardTitle className="flex items-center gap-2 mb-2">
                  <span className="text-2xl">
                    {path.id === "basics"
                      ? "🌱"
                      : path.id === "travel"
                        ? "✈️"
                        : path.id === "business"
                          ? "💼"
                          : "🎓"}
                  </span>
                  <span className="font-bold text-lg">
                    {t(`options.${path.id}.title`)}
                  </span>
                </CardTitle>
                <div className="text-sm text-neutral-500 dark:text-neutral-400 mb-4 min-h-[40px] line-clamp-2">
                  {t(`options.${path.id}.description`)}
                </div>

                <div className="flex items-center gap-4 text-xs text-slate-500 dark:text-slate-400 mb-4 font-medium border-b pb-4">
                  <div className="flex items-center gap-1">
                    <Users className="w-3 h-3" />
                    <span>
                      {studentsCount.toLocaleString()} {tCard("students")}
                    </span>
                  </div>
                  <div className="flex items-center gap-1">
                    <span>
                      {unitsLength} {tCard("units")}
                    </span>
                  </div>
                </div>

                {/* Pricing Section & Action Button */}
                <div className="mt-auto flex items-end justify-between gap-4">
                  <div className="flex flex-col">
                    <span className="text-xs text-neutral-400 font-bold uppercase mb-1">
                      {tCard("purchased")}
                    </span>
                    <span className="text-lg font-bold text-emerald-600 dark:text-emerald-500">
                      {tCard("owned")}
                    </span>
                  </div>

                  <Button
                    variant="green"
                    size="sm"
                    className="px-6 font-bold uppercase tracking-wide"
                  >
                    {tCard("myChoice")}
                  </Button>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
