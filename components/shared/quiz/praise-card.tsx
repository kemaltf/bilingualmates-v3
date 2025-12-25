"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import {
  Trophy,
  ArrowRight,
  RefreshCcw,
  Sparkles,
  TrendingUp,
} from "lucide-react";
import { MarkdownText } from "../markdown-text";

export type PraiseType =
  | "encouragement"
  | "recovery"
  | "momentum"
  | "celebration"
  | "identity"
  | "soft-upsell";

interface PraiseCardProps {
  type: PraiseType;
  onContinue: () => void;
}

const PRAISE_CONFIG: Record<
  PraiseType,
  { title: string; message: string; icon: React.ReactNode; color: string }
> = {
  encouragement: {
    title: "You’re doing great!",
    message: "Keep going, you're on a roll!",
    icon: <Sparkles className="size-12" />,
    color: "text-yellow-500 bg-yellow-50 dark:bg-yellow-900/20",
  },
  recovery: {
    title: "Don't worry!",
    message: "Mistakes are part of learning.",
    icon: <RefreshCcw className="size-12" />,
    color: "text-blue-500 bg-blue-50 dark:bg-blue-900/20",
  },
  momentum: {
    title: "Almost there!",
    message: "Just one more step.",
    icon: <TrendingUp className="size-12" />,
    color: "text-green-500 bg-green-50 dark:bg-green-900/20",
  },
  celebration: {
    title: "Lesson Complete! 🎉",
    message: "You did it! Great job!",
    icon: <Trophy className="size-12" />,
    color: "text-purple-500 bg-purple-50 dark:bg-purple-900/20",
  },
  identity: {
    title: "You’re a learner!",
    message: "Every day you get better.",
    icon: <Sparkles className="size-12" />,
    color: "text-indigo-500 bg-indigo-50 dark:bg-indigo-900/20",
  },
  "soft-upsell": {
    title: "Unlock more?",
    message: "Most learners choose Premium for faster progress.",
    icon: <Trophy className="size-12" />,
    color: "text-orange-500 bg-orange-50 dark:bg-orange-900/20",
  },
};

export function PraiseCard({ type, onContinue }: PraiseCardProps) {
  const config = PRAISE_CONFIG[type];

  // Auto-focus the button for accessibility and keyboard navigation
  const buttonRef = React.useRef<HTMLButtonElement>(null);
  React.useEffect(() => {
    // Small delay to ensure render
    const t = setTimeout(() => buttonRef.current?.focus(), 100);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="w-full max-w-[720px] mx-auto min-h-[400px] flex items-center justify-center animate-in fade-in slide-in-from-bottom-4 duration-500">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="w-full bg-white dark:bg-neutral-900 border-2 border-neutral-100 dark:border-neutral-800 rounded-3xl p-8 flex flex-col items-center text-center space-y-6"
      >
        <div className={`p-6 rounded-full ${config.color} mb-2`}>
          {config.icon}
        </div>

        <div className="space-y-2">
          <h2 className="text-2xl font-bold tracking-tight">
            <MarkdownText text={config.title} />
          </h2>
          <p className="text-neutral-500 dark:text-neutral-400 font-medium">
            <MarkdownText text={config.message} />
          </p>
        </div>

        <Button
          ref={buttonRef}
          variant="green"
          size="lg"
          className="w-full max-w-xs text-lg h-14 rounded-xl"
          onClick={onContinue}
        >
          Continue <ArrowRight className="ml-2 size-5" />
        </Button>
      </motion.div>
    </div>
  );
}
