"use client";

import * as React from "react";
import { Sparkles, Gem } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTranslations } from "next-intl";
import Link from "next/link";

export function PromoCard() {
  const t = useTranslations("path.promo");

  return (
    <div className="relative mt-6 overflow-hidden rounded-2xl border-2 border-indigo-200 bg-indigo-50 p-6 dark:border-indigo-800 dark:bg-indigo-950/30">
      {/* Background decoration */}
      <div className="absolute -right-6 -top-6 rotate-12 opacity-10">
        <Sparkles className="h-32 w-32 text-indigo-500" />
      </div>

      <div className="relative z-10 flex flex-col gap-4 sm:flex-row sm:items-center">
        {/* Icon */}
        <div className="flex size-14 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-400 to-indigo-600 text-white shadow-lg shadow-indigo-500/20">
          <Gem className="size-7" />
        </div>

        {/* Content */}
        <div className="flex-1 space-y-1">
          <h3 className="text-lg font-extrabold text-indigo-950 dark:text-indigo-50">
            {t("title")}
          </h3>
          <p className="text-sm font-medium text-indigo-700 dark:text-indigo-300">
            {t("description")}
          </p>
        </div>

        {/* Action */}
        <div className="shrink-0">
          <Link href="/shop">
            <Button
              variant="indigo"
              className="w-full sm:w-auto font-bold uppercase tracking-widest"
            >
              {t("action")}
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
