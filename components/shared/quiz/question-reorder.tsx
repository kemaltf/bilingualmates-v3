"use client";
import * as React from "react";
import { cn } from "@/lib/utils";
import { OptionButton } from "@/components/ui/option-button";

export interface QuestionReorderProps {
  tokens: string[];
  value: string[];
  onChange: (updated: string[]) => void;
  prompt?: string;
  disabled?: boolean;
  className?: string;
  answerClassName?: string;
  bankClassName?: string;
  feedbackStatus?: "idle" | "correct" | "incorrect";
  incorrectFromIndex?: number;
}

function computeBank(tokens: string[], value: string[]) {
  const used = new Map<string, number>();
  for (const v of value) used.set(v, (used.get(v) || 0) + 1);
  const bank: string[] = [];
  const seen = new Map<string, number>();
  for (const t of tokens) {
    const countUsed = used.get(t) || 0;
    const countSeen = seen.get(t) || 0;
    if (countSeen < countUsed) {
      seen.set(t, countSeen + 1);
      continue;
    }
    bank.push(t);
    seen.set(t, countSeen + 1);
  }
  return bank;
}

export default function QuestionReorder({
  tokens,
  value,
  onChange,
  prompt,
  disabled = false,
  className,
  answerClassName,
  bankClassName,
  feedbackStatus = "idle",
  incorrectFromIndex,
}: QuestionReorderProps) {
  const bank = React.useMemo(() => computeBank(tokens, value), [tokens, value]);

  const addToken = (t: string) => {
    if (disabled) return;
    onChange([...value, t]);
  };

  const removeTokenAt = (i: number) => {
    if (disabled) return;
    const next = value.slice(0, i).concat(value.slice(i + 1));
    onChange(next);
  };

  const containerStateCls =
    feedbackStatus === "correct"
      ? "bg-emerald-50 border-emerald-300"
      : feedbackStatus === "incorrect"
        ? "bg-rose-50 border-rose-300"
        : "bg-white border-neutral-300";
  return (
    <div className={cn("space-y-4", className)}>
      {prompt && <p className="text-lg font-medium">{prompt}</p>}

      <div
        className={cn(
          "min-h-[56px] p-3 rounded-2xl border-[3px] shadow-[0_3px_0_0_#a3a3a3]",
          containerStateCls,
          "flex flex-wrap gap-2",
          answerClassName
        )}
      >
        {value.map((t, i) => {
          const variant =
            feedbackStatus === "correct"
              ? "option-correct"
              : feedbackStatus === "incorrect"
                ? typeof incorrectFromIndex === "number"
                  ? i >= incorrectFromIndex
                    ? "option-incorrect"
                    : "option-selected"
                  : "option-incorrect"
                : "option-selected";
          return (
            <OptionButton
              key={`${t}-${i}`}
              variant={variant}
              disabled={disabled}
              onClick={() => removeTokenAt(i)}
              showLabel={false}
              className={cn("w-auto inline-flex px-3 py-2 rounded-xl")}
            >
              {t}
            </OptionButton>
          );
        })}
      </div>

      <div className={cn("flex flex-wrap gap-2", bankClassName)}>
        {bank.map((t, idx) => (
          <OptionButton
            key={`${t}-bank-${idx}`}
            variant="option-default"
            disabled={disabled}
            onClick={() => addToken(t)}
            showLabel={false}
            className={cn("w-auto inline-flex px-3 py-2 rounded-xl")}
          >
            {t}
          </OptionButton>
        ))}
      </div>
    </div>
  );
}
