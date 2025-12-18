"use client";

import { useTranslations } from "next-intl";
import { SOURCES } from "../constants";

type Props = {
  onSelect: (sourceId: string) => void;
};

export function SourceStep({ onSelect }: Props) {
  const t = useTranslations("onboarding.source");

  return (
    <div className="flex flex-col items-center gap-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <h1 className="text-2xl font-bold text-slate-700 dark:text-slate-200 text-center">
        {t("title")}
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-2xl">
        {SOURCES.map((source) => (
          <button
            key={source.id}
            onClick={() => onSelect(source.id)}
            className="flex items-center p-4 bg-white dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 rounded-2xl hover:bg-slate-50 dark:hover:bg-slate-700 hover:border-blue-400 transition-all gap-4 shadow-sm text-left"
          >
            <source.icon className="w-6 h-6 text-blue-500" />
            <span className="font-bold text-slate-600 dark:text-slate-300 flex-1">
              {t(`options.${source.id}`)}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
