"use client";

import { Button } from "@/components/ui/button";
import { useTranslations } from "next-intl";

type Props = {
  onCreateProfile: () => void;
};

export function TrialCompletedStep({ onCreateProfile }: Props) {
  const t = useTranslations("onboarding.trialCompleted");

  return (
    <div className="flex flex-col items-center gap-8 animate-in fade-in slide-in-from-bottom-4 duration-500 w-full max-w-xl mx-auto text-center">
      <div className="text-6xl mb-4">🎉</div>
      <h1 className="text-3xl font-bold text-slate-700 dark:text-slate-200">
        {t("title")}
      </h1>
      <p className="text-slate-600 dark:text-slate-400 text-lg">
        {t("description")}
      </p>
      <Button
        size="lg"
        variant="green"
        className="w-full max-w-sm"
        onClick={onCreateProfile}
      >
        {t("createProfile")}
      </Button>
    </div>
  );
}
