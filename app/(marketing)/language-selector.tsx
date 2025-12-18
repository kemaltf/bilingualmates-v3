"use client";

import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { cn } from "@/lib/utils";
import { Check, Globe } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useLocale } from "next-intl";
import * as React from "react";

const LANGUAGES = [
  { code: "en", name: "English", flag: "/flags/en.svg" },
  { code: "id", name: "Bahasa Indonesia", flag: "/flags/id.svg" },
] as const;

export const LanguageSelector = () => {
  const router = useRouter();
  const locale = useLocale();
  const [pendingLocale, setPendingLocale] = React.useState<string | null>(null);

  const currentLanguage =
    LANGUAGES.find((l) => l.code === locale) || LANGUAGES[0];

  React.useEffect(() => {
    if (pendingLocale) {
      document.cookie = `NEXT_LOCALE=${pendingLocale}; path=/; max-age=31536000; SameSite=Lax`;
      router.refresh();
      setPendingLocale(null);
    }
  }, [pendingLocale, router]);

  const handleLanguageChange = (code: string) => {
    setPendingLocale(code);
  };

  return (
    <HoverCard openDelay={0} closeDelay={200}>
      <HoverCardTrigger asChild>
        <div className="hidden md:flex items-center gap-x-2 text-slate-500 font-bold uppercase tracking-wide mr-4 cursor-pointer hover:text-slate-700 transition">
          <Globe className="h-5 w-5" />
          <span>Site Language: {currentLanguage.name}</span>
        </div>
      </HoverCardTrigger>
      <HoverCardContent className="w-60 p-2" align="end">
        <div className="flex flex-col gap-1">
          {LANGUAGES.map((lang) => {
            const isActive = lang.code === locale;
            return (
              <button
                key={lang.code}
                onClick={() => handleLanguageChange(lang.code)}
                className={cn(
                  "flex items-center gap-3 w-full p-2 rounded-md transition text-sm font-medium",
                  isActive
                    ? "bg-slate-100 text-slate-900"
                    : "text-slate-600 hover:bg-slate-50"
                )}
              >
                <div className="relative w-6 h-4 rounded-sm overflow-hidden border border-slate-200 shadow-sm">
                  <Image
                    src={lang.flag}
                    alt={lang.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <span className="flex-1 text-left">{lang.name}</span>
                {isActive && <Check className="h-4 w-4 text-green-600" />}
              </button>
            );
          })}
        </div>
      </HoverCardContent>
    </HoverCard>
  );
};
