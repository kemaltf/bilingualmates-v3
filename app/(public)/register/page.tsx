"use client";
import * as React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { AlertOctagon, Mail, Lock, User, Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useTranslations } from "next-intl";

export default function RegisterPage() {
  const t = useTranslations("auth.register");
  const tVal = useTranslations("auth.validation");
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const [success, setSuccess] = React.useState(false);

  const registerSchema = z
    .object({
      username: z
        .string()
        .trim()
        .min(3, tVal("usernameMin", { min: 3 })),
      email: z.string().trim().email(tVal("emailInvalid")),
      password: z.string().min(6, tVal("minChar", { min: 6 })),
      confirmPassword: z.string(),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: tVal("passwordMismatch"),
      path: ["confirmPassword"],
    });

  type RegisterValues = z.infer<typeof registerSchema>;

  const {
    control,
    handleSubmit,
    formState: { errors },
    getValues,
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

  const calculateStrength = (pass: string) => {
    let score = 0;
    if (!pass) return 0;
    if (pass.length > 5) score++;
    if (pass.length > 7) score++;
    if (/[A-Z]/.test(pass)) score++;
    if (/[0-9]/.test(pass)) score++;
    if (/[^A-Za-z0-9]/.test(pass)) score++;
    return score > 4 ? 4 : score;
  };

  const strength = calculateStrength(password);

  const getStrengthLabel = (s: number) => {
    switch (s) {
      case 0:
        return "";
      case 1:
        return t("passwordStrength.weak");
      case 2:
        return t("passwordStrength.medium");
      case 3:
        return t("passwordStrength.strong");
      case 4:
        return t("passwordStrength.veryStrong");
      default:
        return "";
    }
  };

  const getStrengthColor = (s: number) => {
    switch (s) {
      case 0:
        return "bg-neutral-200 dark:bg-neutral-700";
      case 1:
        return "bg-rose-500";
      case 2:
        return "bg-orange-500";
      case 3:
        return "bg-yellow-500";
      case 4:
        return "bg-emerald-500";
      default:
        return "bg-neutral-200 dark:bg-neutral-700";
    }
  };

  const requirements = [
    { key: "length", met: (password || "").length >= 6 },
    { key: "lowercase", met: /[a-z]/.test(password || "") },
    { key: "uppercase", met: /[A-Z]/.test(password || "") },
    { key: "number", met: /[0-9]/.test(password || "") },
    { key: "special", met: /[^A-Za-z0-9]/.test(password || "") },
  ] as const;

  const onSubmit = async (values: RegisterValues) => {
    setError(null);
    setLoading(true);
    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: values.email.trim(),
          password: values.password,
          username: values.username.trim().toLowerCase(),
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Registrasi gagal");
      }

      if (data.isEmailConfirmationRequired) {
        setSuccess(true);
      } else {
        if (typeof window !== "undefined") window.location.assign("/learn");
      }
    } catch (e: unknown) {
      const message = e instanceof Error ? e.message : "Registrasi gagal";
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className={cn("min-h-screen flex items-center justify-center px-4")}>
        <div className="w-full max-w-[480px]">
          <Card>
            <CardHeader>
              <CardTitle>{t("successTitle")}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-col items-center text-center gap-4 py-4">
                <div className="bg-emerald-100 dark:bg-emerald-900/50 p-4 rounded-full">
                  <Mail className="size-8 text-emerald-600 dark:text-emerald-400" />
                </div>
                <div className="text-neutral-600 dark:text-neutral-400">
                  {t.rich("successMessage", {
                    email: () => (
                      <strong className="text-neutral-900 dark:text-neutral-200">
                        {getValues("email")}
                      </strong>
                    ),
                  })}
                </div>
              </div>
              <div className="flex justify-center">
                <Button
                  variant="blue"
                  size="md"
                  onClick={() => (window.location.href = "/login")}
                  label={t("backToLogin")}
                />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className={cn("min-h-screen flex items-center justify-center px-4")}>
      <div className="w-full max-w-[480px]">
        <Card>
          <CardHeader>
            <CardTitle>{t("title")}</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <Controller
                control={control}
                name="username"
                render={({ field: { onChange, value } }) => (
                  <Input
                    value={value}
                    onChange={onChange}
                    placeholder={t("fields.username.placeholder")}
                    prefix={<User className="size-4" />}
                    status={errors.username ? "incorrect" : "idle"}
                    helperText={errors.username?.message}
                  />
                )}
              />

              <Controller
                control={control}
                name="email"
                render={({ field: { onChange, value } }) => (
                  <Input
                    value={value}
                    onChange={onChange}
                    placeholder={t("fields.email.placeholder")}
                    prefix={<Mail className="size-4" />}
                    status={errors.email ? "incorrect" : "idle"}
                    helperText={errors.email?.message}
                  />
                )}
              />

              <Controller
                control={control}
                name="password"
                render={({ field: { onChange, value } }) => (
                  <div className="space-y-2">
                    <Input
                      value={value}
                      onChange={onChange}
                      placeholder={t("fields.password.placeholder")}
                      type="password"
                      prefix={<Lock className="size-4" />}
                      status={errors.password ? "incorrect" : "idle"}
                      helperText={errors.password?.message}
                    />
                    {value && (
                      <div className="flex items-center gap-2">
                        <div className="flex-1 h-1.5 bg-neutral-200 dark:bg-neutral-700 rounded-full overflow-hidden">
                          <div
                            className={cn(
                              "h-full transition-all duration-300",
                              getStrengthColor(strength)
                            )}
                            style={{ width: `${(strength / 4) * 100}%` }}
                          />
                        </div>
                        <span className="text-xs text-neutral-500 font-medium">
                          {getStrengthLabel(strength)}
                        </span>
                      </div>
                    )}
                    <div className="pt-2 space-y-1">
                      <p className="text-xs font-medium text-neutral-600 dark:text-neutral-400 mb-2">
                        {t("requirements.title")}
                      </p>
                      {requirements.map((req) => (
                        <div
                          key={req.key}
                          className="flex items-center gap-2 text-xs"
                        >
                          {req.met ? (
                            <Check className="size-3 text-emerald-500" />
                          ) : (
                            <div className="size-1.5 rounded-full bg-neutral-300 dark:bg-neutral-600 ml-0.5 mr-0.5" />
                          )}
                          <span
                            className={cn(
                              req.met
                                ? "text-emerald-600 dark:text-emerald-400"
                                : "text-neutral-500 dark:text-neutral-500"
                            )}
                          >
                            {t(`requirements.${req.key}`)}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              />

              <Controller
                control={control}
                name="confirmPassword"
                render={({ field: { onChange, value } }) => (
                  <Input
                    value={value}
                    onChange={onChange}
                    placeholder={t("fields.confirmPassword.placeholder")}
                    type="password"
                    prefix={<Lock className="size-4" />}
                    status={errors.confirmPassword ? "incorrect" : "idle"}
                    helperText={errors.confirmPassword?.message}
                  />
                )}
              />

              {error && (
                <div className="text-sm text-rose-600 flex items-center gap-2">
                  <AlertOctagon className="size-4" />
                  <span>{error}</span>
                </div>
              )}
              <div className="flex justify-end">
                <Button
                  variant="green"
                  size="md"
                  // onClick handled by form onSubmit
                  disabled={loading}
                  label={t("submit")}
                />
              </div>
              <div className="text-sm text-neutral-600 dark:text-neutral-400">
                {t("hasAccount")}{" "}
                <a href="/login" className="underline">
                  {t("login")}
                </a>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
