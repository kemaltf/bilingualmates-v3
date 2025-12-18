"use client";

import { Button } from "@/components/ui/button";
import { useTranslations } from "next-intl";

type Props = {
  value?: number;
  onChange: (value: number) => void;
  onContinue: () => void;
};

export function DailyGoalStep({ value = 1, onChange, onContinue }: Props) {
  const t = useTranslations("onboarding.dailyGoal");

  return (
    <div className="flex flex-col items-center gap-8 animate-in fade-in slide-in-from-bottom-4 duration-500 w-full max-w-xl mx-auto">
      <h1 className="text-2xl font-bold text-slate-700 dark:text-slate-200 text-center">
        {t("title")}
      </h1>
      <div className="w-full bg-white dark:bg-slate-800 p-8 rounded-2xl border-2 border-slate-200 dark:border-slate-700 shadow-sm">
        <div className="flex justify-between items-end mb-6">
          <span className="text-slate-500 font-bold">{t("casual")}</span>
          <span className="text-4xl font-extrabold text-blue-500">{value}</span>
          <span className="text-slate-500 font-bold">{t("intense")}</span>
        </div>
        <input
          type="range"
          min="1"
          max="10"
          step="1"
          defaultValue={value}
          className="w-full h-3 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-500"
          onChange={(e) => onChange(parseInt(e.target.value))}
        />
        <p className="text-center text-slate-500 mt-4 font-medium">
          {t("lessonsPerDay")}
        </p>
      </div>
      <Button
        size="lg"
        variant="green"
        className="w-full max-w-sm"
        onClick={onContinue}
      >
        {t("continue")}
      </Button>
    </div>
  );
}
