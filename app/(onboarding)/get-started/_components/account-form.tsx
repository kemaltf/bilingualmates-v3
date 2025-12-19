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

import Image from "next/image";
import { PasswordStrength } from "@/components/ui/password-strength";

type RegisterSchemaType = ReturnType<typeof createRegisterSchema>;
type RegisterValues = z.infer<RegisterSchemaType>;

type Props = {
  onRegister: (data: RegisterValues) => Promise<void>;
  onboardingData?: unknown; // We'll use this to save to cookie before Google login
};

export function AccountForm({ onRegister, onboardingData }: Props) {
  const t = useTranslations("onboarding.account");
  const tReg = useTranslations("auth.register");
  const tLogin = useTranslations("auth.login");
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

  const handleGoogleLogin = async () => {
    setLoading(true);
    try {
      // Save onboarding data to cookie before redirecting
      if (onboardingData) {
        document.cookie = `onboarding-data=${JSON.stringify(
          onboardingData
        )}; path=/; max-age=3600`;
      }

      const response = await fetch("/api/auth/google", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          redirectTo: `${window.location.origin}/auth/callback`,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Gagal inisialisasi login Google");
      }

      if (data.url) {
        window.location.href = data.url;
      }
    } catch (e: unknown) {
      console.error(e);
      // In a real app we might want to show this error
    } finally {
      setLoading(false);
    }
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
        <PasswordStrength password={password} />

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

        <div className="relative my-4">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t border-slate-300 dark:border-slate-700" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-slate-50 dark:bg-slate-900 px-2 text-slate-500">
              {tLogin("or")}
            </span>
          </div>
        </div>

        <Button
          type="button"
          variant="ghost"
          size="lg"
          className="w-full border-2 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
          onClick={handleGoogleLogin}
        >
          <Image
            src="/svg/google.svg"
            alt="Google"
            width={20}
            height={20}
            className="mr-2"
          />
          {tLogin("google")}
        </Button>
      </form>
    </div>
  );
}
