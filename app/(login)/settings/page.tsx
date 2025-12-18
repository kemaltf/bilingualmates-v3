"use client";

import * as React from "react";
import { ThemeSelect } from "@/components/ui/theme-select";
import { useTranslations, useLocale } from "next-intl";
import { updateLanguage } from "@/lib/actions/settings";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { Locale } from "@/lib/i18n/types";

export default function Page() {
  const t = useTranslations("settings");
  const locale = useLocale();
  const router = useRouter();

  const handleLanguageChange = async (newLocale: Locale) => {
    try {
      await updateLanguage(newLocale);
      toast.success(
        newLocale === "id"
          ? "Bahasa diubah ke Indonesia"
          : "Language changed to English"
      );
      router.refresh();
    } catch (error) {
      toast.error("Failed to update language");
      console.error(error);
    }
  };

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-semibold">{t("title")}</h1>

      <div className="space-y-6">
        <div className="space-y-2">
          <h2 className="text-sm font-semibold">{t("language")}</h2>
          <p className="text-sm text-neutral-500">{t("languageDescription")}</p>
          <Select
            value={locale}
            onValueChange={(v) => handleLanguageChange(v as Locale)}
          >
            <SelectTrigger className="w-80">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="en">English</SelectItem>
              <SelectItem value="id">Bahasa Indonesia</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <h2 className="text-sm font-semibold">{t("darkMode")}</h2>
          <ThemeSelect className="w-80" />
        </div>
      </div>
    </div>
  );
}
