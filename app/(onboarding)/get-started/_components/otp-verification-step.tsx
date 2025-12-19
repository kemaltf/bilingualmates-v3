"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { useTranslations } from "next-intl";
import { Loader2 } from "lucide-react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { verifyOtpAction, resendOtpAction } from "@/app/actions/auth";

type Props = {
  email: string;
  password?: string;
  onVerify: () => void;
  onBack: () => void;
};

export function OtpVerificationStep({
  email,
  password,
  onVerify,
  onBack,
}: Props) {
  const t = useTranslations("onboarding.otp");
  const [serverError, setServerError] = React.useState<string | null>(null);

  const otpSchema = z.object({
    otp: z
      .string()
      .length(6, t("validation.length"))
      .regex(/^\d+$/, t("validation.numeric")),
  });

  type OtpValues = z.infer<typeof otpSchema>;

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
    watch,
  } = useForm<OtpValues>({
    resolver: zodResolver(otpSchema),
    defaultValues: {
      otp: "",
    },
  });

  const otpValue = watch("otp");

  const onSubmit = async (data: OtpValues) => {
    setServerError(null);
    try {
      const result = await verifyOtpAction(email, data.otp, password);

      if (result.error) {
        setServerError(result.error);
        return;
      }

      onVerify();
    } catch (e: unknown) {
      const message = e instanceof Error ? e.message : t("error");
      setServerError(message);
    }
  };

  const handleResend = async () => {
    try {
      const result = await resendOtpAction(email);
      if (result.error) {
        setServerError(result.error);
      } else {
        alert(t("resent"));
      }
    } catch (e: unknown) {
      console.error(e);
      setServerError(t("error"));
    }
  };

  return (
    <div className="flex flex-col items-center gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500 w-full max-w-md mx-auto text-center">
      <div className="space-y-2">
        <h1 className="text-2xl font-bold text-slate-700 dark:text-slate-200">
          {t("title")}
        </h1>
        <p className="text-slate-500 dark:text-slate-400">
          {t("description")} <span className="font-semibold">{email}</span>
        </p>
      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full space-y-4 flex flex-col items-center"
      >
        <div className="space-y-1">
          <Controller
            control={control}
            name="otp"
            render={({ field }) => (
              <InputOTP
                maxLength={6}
                value={field.value}
                onChange={field.onChange}
              >
                <InputOTPGroup>
                  <InputOTPSlot index={0} />
                  <InputOTPSlot index={1} />
                  <InputOTPSlot index={2} />
                  <InputOTPSlot index={3} />
                  <InputOTPSlot index={4} />
                  <InputOTPSlot index={5} />
                </InputOTPGroup>
              </InputOTP>
            )}
          />
          {errors.otp && (
            <span className="text-red-500 text-xs block text-center mt-2">
              {errors.otp.message}
            </span>
          )}
          {serverError && (
            <span className="text-red-500 text-xs block text-center mt-2">
              {serverError}
            </span>
          )}
        </div>

        <Button
          type="submit"
          variant="green"
          size="lg"
          className="w-full mt-4"
          disabled={isSubmitting || otpValue.length < 6}
        >
          {isSubmitting ? <Loader2 className="animate-spin" /> : t("submit")}
        </Button>
      </form>

      <div className="text-sm text-slate-500">
        {t("resendPrompt")}{" "}
        <button
          type="button"
          onClick={handleResend}
          className="text-green-600 font-semibold hover:underline"
        >
          {t("resend")}
        </button>
      </div>

      <Button variant="ghost" onClick={onBack} className="text-slate-400">
        {t("back")}
      </Button>
    </div>
  );
}
