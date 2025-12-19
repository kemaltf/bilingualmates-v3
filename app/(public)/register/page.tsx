"use client";

import * as React from "react";
import { AccountForm } from "@/app/(onboarding)/get-started/_components/account-form";
import { OtpVerificationStep } from "@/app/(onboarding)/get-started/_components/otp-verification-step";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

type Step = "account" | "otp";

// Define minimal OnboardingData type if needed, or just use partial
interface AccountData {
  username?: string;
  email?: string;
  password?: string;
}

export default function RegisterPage() {
  const t = useTranslations("auth.register");
  const [step, setStep] = React.useState<Step>("account");
  const [accountData, setAccountData] = React.useState<AccountData>({});

  return (
    <div
      className={cn(
        "min-h-screen flex items-center justify-center px-4 relative"
      )}
    >
      <Button
        variant="ghost"
        size="icon"
        className="absolute top-4 left-4 md:top-8 md:left-8 text-slate-500 dark:text-slate-400"
        asChild
      >
        <Link href="/">
          <X className="size-6" />
        </Link>
      </Button>
      <div className="w-full max-w-[480px]">
        {step === "account" && (
          <>
            <AccountForm
              onRegister={async (data) => {
                setAccountData(data);
                try {
                  const response = await fetch("/api/auth/register", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                      username: data.username,
                      email: data.email,
                      password: data.password,
                    }),
                  });
                  const res = await response.json();
                  if (!response.ok) throw new Error(res.error);

                  if (res.isEmailConfirmationRequired) {
                    setStep("otp");
                  } else {
                    // Direct success (unlikely with current config, but safe to handle)
                    window.location.href = "/learn";
                  }
                } catch (e) {
                  alert(e instanceof Error ? e.message : "Registration failed");
                }
              }}
            />
            <div className="text-sm text-center text-slate-600 dark:text-slate-400 font-bold mt-4">
              {t("hasAccount")}{" "}
              <Link
                href="/login"
                className="text-sky-500 hover:text-sky-600 uppercase tracking-wide ml-1"
              >
                {t("login")}
              </Link>
            </div>
          </>
        )}

        {step === "otp" && (
          <OtpVerificationStep
            email={accountData.email || ""}
            password={accountData.password}
            onVerify={() => {
              // Registration complete, redirect to learn (or onboarding if needed)
              window.location.href = "/learn";
            }}
            onBack={() => setStep("account")}
          />
        )}
      </div>
    </div>
  );
}
