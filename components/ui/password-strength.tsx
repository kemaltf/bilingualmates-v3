"use client";

import React from "react";
import { useTranslations } from "next-intl";
import {
  calculatePasswordStrength,
  checkPasswordRequirements,
} from "@/lib/zod-rules";

type Props = {
  password: string;
};

export function PasswordStrength({ password }: Props) {
  const t = useTranslations("auth.register");
  const strength = calculatePasswordStrength(password);
  const requirements = checkPasswordRequirements(password);

  if (!password) return null;

  return (
    <div className="space-y-2">
      <div className="flex gap-1 h-1.5 w-full">
        {[1, 2, 3, 4].map((level) => (
          <div
            key={level}
            className={`h-full flex-1 rounded-full transition-colors ${
              strength >= level
                ? strength <= 2
                  ? "bg-red-500"
                  : strength === 3
                  ? "bg-yellow-500"
                  : "bg-green-500"
                : "bg-gray-200 dark:bg-slate-700"
            }`}
          />
        ))}
      </div>
      <p className="text-xs text-right text-slate-500">
        {strength === 0 && t("passwordStrength.weak")}
        {strength === 1 && t("passwordStrength.weak")}
        {strength === 2 && t("passwordStrength.medium")}
        {strength === 3 && t("passwordStrength.strong")}
        {strength === 4 && t("passwordStrength.veryStrong")}
      </p>

      <div className="space-y-1">
        <p className="text-xs font-semibold text-slate-600 dark:text-slate-400">
          {t("requirements.title")}
        </p>
        <ul className="grid grid-cols-2 gap-1">
          {requirements.map((req) => (
            <li
              key={req.key}
              className={`text-xs flex items-center gap-1 ${
                req.met ? "text-green-600" : "text-slate-400"
              }`}
            >
              <div
                className={`w-1.5 h-1.5 rounded-full ${
                  req.met ? "bg-green-500" : "bg-slate-300 dark:bg-slate-600"
                }`}
              />
              {t(`requirements.${req.key}`)}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
