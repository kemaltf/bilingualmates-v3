"use client";
import * as React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Mail, ArrowLeft } from "lucide-react";
import { cn } from "@/lib/utils";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { createForgotPasswordSchema } from "@/lib/zod-rules";

export default function ForgotPasswordPage() {
  const t = useTranslations("auth.forgotPassword");
  const tVal = useTranslations("auth.validation");
  const [loading, setLoading] = React.useState(false);
  const [message, setMessage] = React.useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  const forgotPasswordSchema = React.useMemo(
    () => createForgotPasswordSchema(undefined, tVal),
    [tVal]
  );

  type ForgotPasswordValues = z.infer<typeof forgotPasswordSchema>;

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordValues>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = async (values: ForgotPasswordValues) => {
    setMessage(null);
    setLoading(true);
    try {
      const response = await fetch("/api/auth/forgot-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: values.email,
          redirectTo: `${window.location.origin}/auth/callback?next=/update-password`,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || t("error"));
      }

      setMessage({
        type: "success",
        text: t("success"),
      });
    } catch (e: unknown) {
      const message = e instanceof Error ? e.message : t("error");
      setMessage({ type: "error", text: message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={cn("min-h-screen flex items-center justify-center px-4")}>
      <div className="w-full max-w-[440px]">
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2 mb-2">
              <Link
                href="/login"
                className="text-neutral-500 hover:text-neutral-700"
              >
                <ArrowLeft className="w-5 h-5" />
              </Link>
            </div>
            <CardTitle>{t("title")}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {message && (
              <div
                className={cn(
                  "p-3 rounded-md text-sm font-medium",
                  message.type === "success"
                    ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                    : "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400"
                )}
              >
                {message.text}
              </div>
            )}

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <Controller
                control={control}
                name="email"
                render={({ field: { onChange, value } }) => (
                  <Input
                    value={value}
                    onChange={onChange}
                    placeholder={t("fields.email.placeholder")}
                    prefix={<Mail className="w-4 h-4" />}
                    status={errors.email ? "incorrect" : "idle"}
                    helperText={errors.email?.message}
                  />
                )}
              />
              <Button
                type="submit"
                variant="green"
                size="lg"
                className="w-full"
                loading={loading}
                label={t("submit")}
              />
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
