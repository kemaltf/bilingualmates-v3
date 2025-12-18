"use client";

import { useTranslations } from "next-intl";
import { LEVELS, LANGUAGES } from "../constants";

type Props = {
  languageId?: string;
  onSelect: (levelId: string) => void;
};

export function LevelStep({ languageId, onSelect }: Props) {
  const t = useTranslations("onboarding.level");
  const languageName =
    LANGUAGES.find((l) => l.id === languageId)?.name || "Language";

  return (
    <div className="flex flex-col items-center gap-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <h1 className="text-2xl font-bold text-slate-700 dark:text-slate-200 text-center">
        {t("title", { language: languageName })}
      </h1>
      <div className="flex flex-col gap-4 w-full max-w-xl">
        {LEVELS.map((level) => (
          <button
            key={level.id}
            onClick={() => onSelect(level.id)}
            className="flex flex-col p-4 bg-white dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 rounded-2xl hover:bg-slate-50 dark:hover:bg-slate-700 hover:border-blue-400 transition-all gap-1 shadow-sm text-left"
          >
            <span className="font-bold text-slate-700 dark:text-slate-200 text-lg">
              {t(`options.${level.id}.label`, { language: languageName })}
            </span>
            <span className="text-slate-500 dark:text-slate-400">
              {t(`options.${level.id}.sub`)}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
