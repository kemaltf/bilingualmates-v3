"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { LANGUAGES } from "../constants";

type Props = {
  onSelect: (langId: string) => void;
};

export function LanguageStep({ onSelect }: Props) {
  const t = useTranslations("onboarding.language");

  return (
    <div className="flex flex-col items-center gap-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <h1 className="text-2xl font-bold text-slate-700 dark:text-slate-200 text-center">
        {t("title")}
      </h1>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 w-full max-w-2xl">
        {LANGUAGES.map((lang) => (
          <button
            key={lang.id}
            onClick={() => onSelect(lang.id)}
            className="flex flex-col items-center justify-center p-6 bg-white dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 rounded-2xl hover:bg-slate-50 dark:hover:bg-slate-700 hover:border-blue-400 transition-all gap-4 shadow-sm"
          >
            <div className="relative w-16 h-12 rounded-md overflow-hidden shadow-sm border border-slate-100">
              <Image
                src={lang.flag}
                alt={lang.name}
                fill
                className="object-cover"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = "/globe.svg";
                }}
              />
            </div>
            <span className="font-bold text-slate-600 dark:text-slate-300">
              {lang.name}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
