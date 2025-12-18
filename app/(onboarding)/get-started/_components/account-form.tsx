"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import { User, Mail, Lock } from "lucide-react";
import {
  createRegisterSchema,
  calculatePasswordStrength,
  checkPasswordRequirements,
} from "@/lib/zod-rules";
import * as z from "zod";

type RegisterSchemaType = ReturnType<typeof createRegisterSchema>;
type RegisterValues = z.infer<RegisterSchemaType>;

type Props = {
  onRegister: (data: RegisterValues) => Promise<void>;
};

export function AccountForm({ onRegister }: Props) {
  const t = useTranslations("onboarding.account");
  const tReg = useTranslations("auth.register");
  const tVal = useTranslations("auth.validation");
  const [loading, setLoading] = React.useState(false);

  const registerSchema = React.useMemo(
    () => createRegisterSchema(undefined, tVal),
    [tVal]
  );
  type RegisterValues = z.infer<typeof registerSchema>;

  const {
    control,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<RegisterValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const password = watch("password");
  const strength = calculatePasswordStrength(password);
  const requirements = checkPasswordRequirements(password);

  const onSubmit = async (data: RegisterValues) => {
    setLoading(true);
    await onRegister(data);
    setLoading(false);
  };

  return (
    <div className="flex flex-col items-center gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500 w-full max-w-md mx-auto">
      <h1 className="text-2xl font-bold text-slate-700 dark:text-slate-200">
        {t("title")}
      </h1>
      <form onSubmit={handleSubmit(onSubmit)} className="w-full space-y-4">
        <Controller
          control={control}
          name="username"
          render={({ field }) => (
            <div className="space-y-1">
              <Input
                {...field}
                placeholder={tReg("fields.username.placeholder")}
                prefix={<User className="size-4" />}
                status={errors.username ? "incorrect" : "idle"}
              />
              {errors.username && (
                <span className="text-red-500 text-xs">
                  {errors.username.message}
                </span>
              )}
            </div>
          )}
        />
        <Controller
          control={control}
          name="email"
          render={({ field }) => (
            <div className="space-y-1">
              <Input
                {...field}
                placeholder={tReg("fields.email.placeholder")}
                prefix={<Mail className="size-4" />}
                status={errors.email ? "incorrect" : "idle"}
              />
              {errors.email && (
                <span className="text-red-500 text-xs">
                  {errors.email.message}
                </span>
              )}
            </div>
          )}
        />
        <Controller
          control={control}
          name="password"
          render={({ field }) => (
            <div className="space-y-1">
              <Input
                {...field}
                type="password"
                placeholder={tReg("fields.password.placeholder")}
                prefix={<Lock className="size-4" />}
                status={errors.password ? "incorrect" : "idle"}
              />
              {errors.password && (
                <span className="text-red-500 text-xs">
                  {errors.password.message}
                </span>
              )}
            </div>
          )}
        />

        {/* Password Strength Meter */}
        {password && (
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
                      : "bg-gray-200"
                  }`}
                />
              ))}
            </div>
            <p className="text-xs text-right text-slate-500">
              {strength === 0 && tReg("passwordStrength.weak")}
              {strength === 1 && tReg("passwordStrength.weak")}
              {strength === 2 && tReg("passwordStrength.medium")}
              {strength === 3 && tReg("passwordStrength.strong")}
              {strength === 4 && tReg("passwordStrength.veryStrong")}
            </p>

            <div className="space-y-1">
              <p className="text-xs font-semibold text-slate-600 dark:text-slate-400">
                {tReg("requirements.title")}
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
                        req.met ? "bg-green-500" : "bg-slate-300"
                      }`}
                    />
                    {tReg(`requirements.${req.key}`)}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}

        <Controller
          control={control}
          name="confirmPassword"
          render={({ field }) => (
            <div className="space-y-1">
              <Input
                {...field}
                type="password"
                placeholder={tReg("fields.confirmPassword.placeholder")}
                prefix={<Lock className="size-4" />}
                status={errors.confirmPassword ? "incorrect" : "idle"}
              />
              {errors.confirmPassword && (
                <span className="text-red-500 text-xs">
                  {errors.confirmPassword.message}
                </span>
              )}
            </div>
          )}
        />
        <Button
          type="submit"
          variant="green"
          size="lg"
          className="w-full mt-4"
          disabled={loading}
        >
          {loading ? tReg("title") + "..." : tReg("submit")}
        </Button>
      </form>
    </div>
  );
}
