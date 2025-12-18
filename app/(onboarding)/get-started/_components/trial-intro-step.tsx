"use client";

import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import { useTranslations } from "next-intl";

type Props = {
  onStart: () => void;
};

export function TrialIntroStep({ onStart }: Props) {
  const t = useTranslations("onboarding.trialIntro");

  return (
    <div className="flex flex-col items-center gap-8 animate-in fade-in slide-in-from-bottom-4 duration-500 w-full max-w-xl mx-auto text-center">
      <div className="w-32 h-32 bg-green-100 rounded-full flex items-center justify-center mb-4">
        <Check className="w-16 h-16 text-green-500" />
      </div>
      <h1 className="text-2xl font-bold text-slate-700 dark:text-slate-200">
        {t("title")}
      </h1>
      <p className="text-slate-600 dark:text-slate-400 text-lg">
        {t("description")}
      </p>
      <Button
        size="lg"
        variant="green"
        className="w-full max-w-sm"
        onClick={onStart}
      >
        {t("start")}
      </Button>
    </div>
  );
}
