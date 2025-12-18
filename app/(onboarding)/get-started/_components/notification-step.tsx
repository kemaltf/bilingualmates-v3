"use client";

import { Button } from "@/components/ui/button";
import { Bell } from "lucide-react";
import { useTranslations } from "next-intl";

type Props = {
  onEnable: () => Promise<void>;
  onSkip: () => void;
};

export function NotificationStep({ onEnable, onSkip }: Props) {
  const t = useTranslations("onboarding.notifications");

  return (
    <div className="flex flex-col items-center gap-8 animate-in fade-in slide-in-from-bottom-4 duration-500 w-full max-w-xl mx-auto text-center">
      <div className="relative">
        <div className="absolute -top-4 -right-4 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full animate-bounce">
          1
        </div>
        <Bell className="w-24 h-24 text-blue-500" />
      </div>
      <h1 className="text-2xl font-bold text-slate-700 dark:text-slate-200">
        {t("title")}
      </h1>
      <p className="text-slate-600 dark:text-slate-400 text-lg">
        {t("description")}
      </p>
      <div className="flex flex-col gap-4 w-full max-w-sm">
        <Button size="lg" variant="green" className="w-full" onClick={onEnable}>
          {t("enable")}
        </Button>
        <Button
          size="lg"
          variant="ghost"
          className="w-full text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200"
          onClick={onSkip}
        >
          {t("later")}
        </Button>
      </div>
    </div>
  );
}
