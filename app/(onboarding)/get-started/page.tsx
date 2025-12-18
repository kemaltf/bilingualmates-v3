"use client";

import * as React from "react";
import { OnboardingLayout } from "../layout-wrapper";
import { useRouter } from "next/navigation";
import { LanguageStep } from "./_components/language-step";
import { SourceStep } from "./_components/source-step";
import { GoalStep } from "./_components/goal-step";
import { LevelStep } from "./_components/level-step";
import { PathStep } from "./_components/path-step";
import { DailyGoalStep } from "./_components/daily-goal-step";
import { NotificationStep } from "./_components/notification-step";
import { TrialIntroStep } from "./_components/trial-intro-step";
import { TrialStep } from "./_components/trial-step";
import { TrialCompletedStep } from "./_components/trial-completed-step";
import { AccountForm } from "./_components/account-form";

type Step =
  | "language"
  | "source"
  | "goal"
  | "level"
  | "path"
  | "daily_goal"
  | "notifications"
  | "trial_intro"
  | "trial"
  | "trial_completed"
  | "profile"
  | "account"
  | "completed";

type OnboardingData = {
  language?: string;
  source?: string;
  goal?: string;
  level?: string;
  path?: string;
  dailyGoal?: number;
  notifications?: boolean;
  account?: {
    username: string;
    email: string;
    password: string;
  };
};

export default function GetStartedPage() {
  const router = useRouter();
  const [step, setStep] = React.useState<Step>("language");
  const [data, setData] = React.useState<OnboardingData>({});
  const [progress, setProgress] = React.useState(10);

  const updateData = <K extends keyof OnboardingData>(
    key: K,
    value: OnboardingData[K]
  ) => {
    setData((prev) => ({ ...prev, [key]: value }));
  };

  const nextStep = (next: Step, prog: number) => {
    setStep(next);
    setProgress(prog);
  };

  const renderStep = () => {
    switch (step) {
      case "language":
        return (
          <LanguageStep
            onSelect={(langId) => {
              updateData("language", langId);
              nextStep("source", 20);
            }}
          />
        );

      case "source":
        return (
          <SourceStep
            onSelect={(sourceId) => {
              updateData("source", sourceId);
              nextStep("goal", 30);
            }}
          />
        );

      case "goal":
        return (
          <GoalStep
            languageId={data.language}
            onSelect={(goalId) => {
              updateData("goal", goalId);
              nextStep("level", 40);
            }}
          />
        );

      case "level":
        return (
          <LevelStep
            languageId={data.language}
            onSelect={(levelId) => {
              updateData("level", levelId);
              nextStep("daily_goal", 50);
            }}
          />
        );

      case "path":
        return (
          <PathStep
            languageId={data.language}
            onSelect={(pathId) => {
              updateData("path", pathId);
              nextStep("trial", 80);
            }}
          />
        );

      case "daily_goal":
        return (
          <DailyGoalStep
            value={data.dailyGoal}
            onChange={(val) => updateData("dailyGoal", val)}
            onContinue={() => nextStep("notifications", 60)}
          />
        );

      case "notifications":
        return (
          <NotificationStep
            onEnable={async () => {
              if ("Notification" in window) {
                try {
                  const permission = await Notification.requestPermission();
                  if (permission === "granted") {
                    updateData("notifications", true);
                  } else {
                    updateData("notifications", false);
                  }
                } catch (error) {
                  console.error(
                    "Error requesting notification permission:",
                    error
                  );
                  updateData("notifications", false);
                }
              } else {
                updateData("notifications", false);
              }
              nextStep("trial_intro", 70);
            }}
            onSkip={() => {
              updateData("notifications", false);
              nextStep("trial_intro", 70);
            }}
          />
        );

      case "trial_intro":
        return <TrialIntroStep onStart={() => nextStep("path", 75)} />;

      case "trial":
        return (
          <TrialStep
            onComplete={() => {
              nextStep("trial_completed", 90);
            }}
          />
        );

      case "trial_completed":
        return (
          <TrialCompletedStep onCreateProfile={() => nextStep("account", 95)} />
        );

      case "account":
        return (
          <AccountForm
            onboardingData={data}
            onRegister={async (accData) => {
              updateData("account", accData);
              // Call API to register
              try {
                const response = await fetch("/api/auth/register", {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify({
                    username: accData.username,
                    email: accData.email,
                    password: accData.password,
                    // Pass onboarding data
                    language: data.language,
                    source: data.source,
                    goal: data.goal,
                    level: data.level,
                    path: data.path,
                    dailyGoal: data.dailyGoal,
                    notifications: data.notifications,
                  }),
                });
                const res = await response.json();
                if (!response.ok) throw new Error(res.error);

                // Redirect to learn
                window.location.href = "/learn";
              } catch (e) {
                alert(e instanceof Error ? e.message : "Registration failed");
              }
            }}
          />
        );

      default:
        return null;
    }
  };

  const handleBack = () => {
    switch (step) {
      case "source":
        nextStep("language", 10);
        break;
      case "goal":
        nextStep("source", 20);
        break;
      case "level":
        nextStep("goal", 30);
        break;
      case "path":
        nextStep("trial_intro", 70);
        break;
      case "daily_goal":
        nextStep("level", 40);
        break;
      case "notifications":
        nextStep("daily_goal", 50);
        break;
      case "trial_intro":
        nextStep("notifications", 60);
        break;
      case "trial":
        nextStep("path", 75);
        break;
      case "profile":
        nextStep("trial_completed", 90);
        break;
      case "account":
        nextStep("profile", 95);
        break;
      default:
        router.push("/");
    }
  };

  return (
    <OnboardingLayout progress={progress} onBack={handleBack}>
      <div className="flex-1 flex flex-col justify-center w-full">
        {renderStep()}
      </div>
    </OnboardingLayout>
  );
}
