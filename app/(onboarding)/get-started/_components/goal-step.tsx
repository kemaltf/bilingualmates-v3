"use client";

import { useTranslations } from "next-intl";
import { GOALS, LANGUAGES } from "../constants";

type Props = {
  languageId?: string;
  onSelect: (goalId: string) => void;
};

export function GoalStep({ languageId, onSelect }: Props) {
  const t = useTranslations("onboarding.goal");
  const languageName =
    LANGUAGES.find((l) => l.id === languageId)?.name || "Language";

  return (
    <div className="flex flex-col items-center gap-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <h1 className="text-2xl font-bold text-slate-700 dark:text-slate-200 text-center">
        {t("title", { language: languageName })}
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-2xl">
        {GOALS.map((goal) => (
          <button
            key={goal.id}
            onClick={() => onSelect(goal.id)}
            className="flex items-center p-4 bg-white dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 rounded-2xl hover:bg-slate-50 dark:hover:bg-slate-700 hover:border-blue-400 transition-all gap-4 shadow-sm text-left"
          >
            <goal.icon className="w-6 h-6 text-green-500" />
            <span className="font-bold text-slate-600 dark:text-slate-300 flex-1">
              {t(`options.${goal.id}`)}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
