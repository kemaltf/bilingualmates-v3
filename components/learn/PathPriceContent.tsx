"use client";

import * as React from "react";
import type { CurriculumPath } from "@/lib/learn/types";
import { Button } from "@/components/ui/button";
import {
  FileText,
  BarChart3,
  Users,
  Globe,
  Clock,
  Award,
  Gift,
} from "lucide-react";
import { useTranslations } from "next-intl";

interface PathPriceContentProps {
  path: CurriculumPath;
  totalLessons: number;
  hideEnrollButton?: boolean;
}

export function PathPriceContent({
  path,
  totalLessons,
  hideEnrollButton = false,
}: PathPriceContentProps) {
  const t = useTranslations("path.detail");

  const formatPrice = (price: number, currency: string = "IDR") => {
    return new Intl.NumberFormat(currency === "IDR" ? "id-ID" : "en-US", {
      style: "currency",
      currency: currency,
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  const discount =
    path.price && path.originalPrice
      ? Math.round(
          ((path.originalPrice - path.price) / path.originalPrice) * 100
        )
      : 0;

  return (
    <div className="space-y-2">
      {/* Price Header */}
      <div>
        {path.originalPrice && (
          <div className="text-slate-400 line-through text-sm font-medium">
            {formatPrice(path.originalPrice, path.currency)}
          </div>
        )}
        <div className="flex items-center gap-3">
          <div className="text-3xl font-extrabold text-slate-900 dark:text-white">
            {formatPrice(path.price || 0, path.currency)}
          </div>
          {discount > 0 && (
            <div className="bg-emerald-500 text-white text-xs font-bold px-2 py-1 rounded-full">
              {discount}% {t("off")}
            </div>
          )}
        </div>
        <div className="mt-2 inline-block bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400 text-xs font-bold px-3 py-1 rounded-full">
          {t("cheaper")}
        </div>
      </div>

      {/* Stats Grid - Compact Layout */}
      <div className="grid grid-cols-2 gap-x-2 gap-y-2">
        <div className="flex flex-col gap-1 p-2 rounded-lg bg-slate-50 dark:bg-neutral-800/50">
          <div className="flex items-center gap-2 text-xs font-medium text-slate-500 dark:text-slate-400">
            <FileText className="w-3.5 h-3.5" />
            <span>{t("lessons")}</span>
          </div>
          <span className="font-bold text-sm text-slate-900 dark:text-white">
            {totalLessons}
          </span>
        </div>

        <div className="flex flex-col gap-1 p-2 rounded-lg bg-slate-50 dark:bg-neutral-800/50">
          <div className="flex items-center gap-2 text-xs font-medium text-slate-500 dark:text-slate-400">
            <BarChart3 className="w-3.5 h-3.5" />
            <span>{t("difficulty")}</span>
          </div>
          <span className="font-bold text-sm text-slate-900 dark:text-white truncate">
            {path.difficulty || "Beginner"}
          </span>
        </div>

        <div className="flex flex-col gap-1 p-2 rounded-lg bg-slate-50 dark:bg-neutral-800/50">
          <div className="flex items-center gap-2 text-xs font-medium text-slate-500 dark:text-slate-400">
            <Users className="w-3.5 h-3.5" />
            <span>{t("students")}</span>
          </div>
          <span className="font-bold text-sm text-slate-900 dark:text-white">
            {path.studentsCount?.toLocaleString() || 0}
          </span>
        </div>

        <div className="flex flex-col gap-1 p-2 rounded-lg bg-slate-50 dark:bg-neutral-800/50">
          <div className="flex items-center gap-2 text-xs font-medium text-slate-500 dark:text-slate-400">
            <Globe className="w-3.5 h-3.5" />
            <span>{t("language")}</span>
          </div>
          <span className="font-bold text-sm text-slate-900 dark:text-white truncate">
            {path.language || "English"}
          </span>
        </div>

        <div className="flex flex-col gap-1 p-2 rounded-lg bg-slate-50 dark:bg-neutral-800/50">
          <div className="flex items-center gap-2 text-xs font-medium text-slate-500 dark:text-slate-400">
            <Clock className="w-3.5 h-3.5" />
            <span>{t("duration")}</span>
          </div>
          <span className="font-bold text-sm text-slate-900 dark:text-white">
            {path.estimatedTime || "4 Weeks"}
          </span>
        </div>

        <div className="flex flex-col gap-1 p-2 rounded-lg bg-slate-50 dark:bg-neutral-800/50">
          <div className="flex items-center gap-2 text-xs font-medium text-slate-500 dark:text-slate-400">
            <Award className="w-3.5 h-3.5" />
            <span>{t("certificate")}</span>
          </div>
          <span className="font-bold text-sm text-slate-900 dark:text-white">
            {path.certificate ? t("yes") : t("no")}
          </span>
        </div>
      </div>

      {/* Actions */}
      {!hideEnrollButton && (
        <div className="space-y-3 pt-4 border-t border-slate-100 dark:border-neutral-700">
          <Button
            variant="green"
            size="lg"
            className="w-full font-bold tracking-wide"
          >
            {t("enroll")}
          </Button>
          <Button
            variant="outline"
            size="lg"
            className="w-full font-bold tracking-wide gap-2 text-slate-600 dark:text-slate-400 border-2"
          >
            <Gift className="w-4 h-4" />
            {t("gift")}
          </Button>
        </div>
      )}
    </div>
  );
}
