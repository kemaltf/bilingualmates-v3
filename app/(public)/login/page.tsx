"use client";
import * as React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { AlertOctagon, Lock, User } from "lucide-react";
import { cn } from "@/lib/utils";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import Image from "next/image";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { createLoginSchema } from "@/lib/zod-rules";

export default function LoginPage() {
  const t = useTranslations("auth.login");
  const tVal = useTranslations("auth.validation");
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  const loginSchema = React.useMemo(
    () => createLoginSchema(undefined, tVal),
    [tVal]
  );

  type LoginValues = z.infer<typeof loginSchema>;

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      identifier: "",
      password: "",
    },
  });

  const signInWithGoogle = async () => {
    setError(null);
    setLoading(true);
    try {
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
      const message =
        e instanceof Error ? e.message : "Terjadi kesalahan saat login Google";
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  const onSubmit = async (values: LoginValues) => {
    setError(null);
    setLoading(true);
    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          identifier: values.identifier,
          password: values.password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || t("error") || "Login gagal");
      }

      if (typeof window !== "undefined") window.location.assign("/learn");
    } catch (e: unknown) {
      const message =
        e instanceof Error ? e.message : t("error") || "Login gagal";
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={cn("min-h-screen flex items-center justify-center px-4")}>
      <div className="w-full max-w-[440px] space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
        <div className="space-y-2 text-center">
          <h1 className="text-2xl font-bold text-slate-700 dark:text-slate-200">
            {t("title")}
          </h1>
        </div>

        <div className="space-y-4">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <Controller
              control={control}
              name="identifier"
              render={({ field: { onChange, value } }) => (
                <Input
                  value={value}
                  onChange={onChange}
                  placeholder={t("fields.identifier.placeholder")}
                  prefix={<User className="size-4" />}
                  status={errors.identifier ? "incorrect" : "idle"}
                  helperText={errors.identifier?.message}
                />
              )}
            />

            <Controller
              control={control}
              name="password"
              render={({ field: { onChange, value } }) => (
                <Input
                  value={value}
                  onChange={onChange}
                  placeholder={t("fields.password.placeholder")}
                  type="password"
                  prefix={<Lock className="size-4" />}
                  status={errors.password ? "incorrect" : "idle"}
                  helperText={errors.password?.message}
                />
              )}
            />

            <div className="flex justify-end">
              <Link
                href="/forgot-password"
                className="text-xs font-bold text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-300 uppercase tracking-wider"
              >
                {t("forgotPassword")}
              </Link>
            </div>

            {error && (
              <div className="text-sm text-rose-600 flex items-center gap-2 justify-center bg-rose-50 dark:bg-rose-900/20 p-2 rounded-lg">
                <AlertOctagon className="size-4" />
                <span>{error}</span>
              </div>
            )}

            <Button
              variant="green"
              size="lg"
              className="w-full"
              disabled={loading}
            >
              {loading ? "..." : t("submit")}
            </Button>
          </form>

          <div className="flex items-center gap-4">
            <div className="h-px flex-1 bg-slate-200 dark:bg-slate-700" />
            <span className="text-xs uppercase text-slate-500 dark:text-slate-400 font-bold">
              {t("or")}
            </span>
            <div className="h-px flex-1 bg-slate-200 dark:bg-slate-700" />
          </div>

          <Button
            variant="ghost"
            size="lg"
            className="w-full border-2 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
            onClick={signInWithGoogle}
            disabled={loading}
          >
            <Image
              src="/svg/google.svg"
              alt="Google"
              width={20}
              height={20}
              className="mr-2"
            />
            <span>{t("google")}</span>
          </Button>

          <div className="text-sm text-center text-slate-600 dark:text-slate-400 font-bold">
            {t("noAccount")}{" "}
            <Link
              href="/register"
              className="text-sky-500 hover:text-sky-600 uppercase tracking-wide ml-1"
            >
              {t("register")}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
