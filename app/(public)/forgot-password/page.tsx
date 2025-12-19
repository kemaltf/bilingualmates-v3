"use client";
import * as React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Mail, ArrowLeft, Lock, AlertOctagon } from "lucide-react";
import { cn } from "@/lib/utils";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import Link from "next/link";
import { useTranslations } from "next-intl";
import {
  createForgotPasswordSchema,
  createUpdatePasswordSchema,
} from "@/lib/zod-rules";
import { OtpVerificationStep } from "@/app/(onboarding)/get-started/_components/otp-verification-step";
import { PasswordStrength } from "@/components/ui/password-strength";
import { useRouter } from "next/navigation";

type Step = "email" | "otp" | "reset";

export default function ForgotPasswordPage() {
  const t = useTranslations("auth.forgotPassword");
  const tUpdate = useTranslations("auth.updatePassword");
  const tVal = useTranslations("auth.validation");
  const router = useRouter();

  const [step, setStep] = React.useState<Step>("email");
  const [email, setEmail] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  // Schema for Email Step
  const forgotPasswordSchema = React.useMemo(
    () => createForgotPasswordSchema(undefined, tVal),
    [tVal]
  );
  type ForgotPasswordValues = z.infer<typeof forgotPasswordSchema>;

  const {
    control: emailControl,
    handleSubmit: handleEmailSubmit,
    formState: { errors: emailErrors },
  } = useForm<ForgotPasswordValues>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: { email: "" },
  });

  // Schema for Reset Step
  const updatePasswordSchema = React.useMemo(
    () => createUpdatePasswordSchema(undefined, tVal),
    [tVal]
  );
  type UpdatePasswordValues = z.infer<typeof updatePasswordSchema>;

  const {
    control: resetControl,
    handleSubmit: handleResetSubmit,
    formState: { errors: resetErrors },
    watch: watchReset,
  } = useForm<UpdatePasswordValues>({
    resolver: zodResolver(updatePasswordSchema),
    defaultValues: { password: "", confirmPassword: "" },
  });

  const password = watchReset("password");

  const onEmailSubmit = async (values: ForgotPasswordValues) => {
    setError(null);
    setLoading(true);
    try {
      const response = await fetch("/api/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: values.email }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || t("error"));
      }

      setEmail(values.email);
      setStep("otp");
    } catch (e: unknown) {
      const message = e instanceof Error ? e.message : t("error");
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  const onResetSubmit = async (values: UpdatePasswordValues) => {
    setError(null);
    setLoading(true);
    try {
      const response = await fetch("/api/auth/update-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password: values.password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || tUpdate("error"));
      }

      // Success - redirect to login or learn
      router.push("/learn");
    } catch (e: unknown) {
      const message = e instanceof Error ? e.message : tUpdate("error");
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={cn("min-h-screen flex items-center justify-center px-4")}>
      <div className="w-full max-w-[440px] animate-in fade-in slide-in-from-bottom-4 duration-500">
        {step === "email" && (
          <div className="space-y-6">
            <div className="space-y-2 text-center">
              <h1 className="text-2xl font-bold text-slate-700 dark:text-slate-200">
                {t("title")}
              </h1>
            </div>

            <form
              onSubmit={handleEmailSubmit(onEmailSubmit)}
              className="space-y-4"
            >
              <Controller
                control={emailControl}
                name="email"
                render={({ field: { onChange, value } }) => (
                  <Input
                    value={value}
                    onChange={onChange}
                    placeholder={t("fields.email.placeholder")}
                    prefix={<Mail className="size-4" />}
                    status={emailErrors.email ? "incorrect" : "idle"}
                    helperText={emailErrors.email?.message}
                  />
                )}
              />

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

            <div className="flex justify-center">
              <Link href="/login">
                <Button
                  variant="ghost"
                  className="gap-2 text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-200"
                >
                  <ArrowLeft className="size-4" />
                  {t("backToLogin")}
                </Button>
              </Link>
            </div>
          </div>
        )}

        {step === "otp" && (
          <OtpVerificationStep
            email={email}
            onVerify={() => setStep("reset")}
            onBack={() => setStep("email")}
          />
        )}

        {step === "reset" && (
          <div className="space-y-6">
            <div className="space-y-2 text-center">
              <h1 className="text-2xl font-bold text-slate-700 dark:text-slate-200">
                {tUpdate("title")}
              </h1>
            </div>

            <form
              onSubmit={handleResetSubmit(onResetSubmit)}
              className="space-y-4"
            >
              <Controller
                control={resetControl}
                name="password"
                render={({ field: { onChange, value } }) => (
                  <Input
                    value={value}
                    onChange={onChange}
                    type="password"
                    placeholder={tUpdate("fields.password.placeholder")}
                    prefix={<Lock className="size-4" />}
                    status={resetErrors.password ? "incorrect" : "idle"}
                    helperText={resetErrors.password?.message}
                  />
                )}
              />

              <PasswordStrength password={password} />

              <Controller
                control={resetControl}
                name="confirmPassword"
                render={({ field: { onChange, value } }) => (
                  <Input
                    value={value}
                    onChange={onChange}
                    type="password"
                    placeholder={tUpdate("fields.confirmPassword.placeholder")}
                    prefix={<Lock className="size-4" />}
                    status={resetErrors.confirmPassword ? "incorrect" : "idle"}
                    helperText={resetErrors.confirmPassword?.message}
                  />
                )}
              />

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
                {loading ? "..." : tUpdate("submit")}
              </Button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
