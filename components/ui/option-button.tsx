"use client";
import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const optionButtonVariants = cva(
  "w-full p-4 text-left rounded-2xl transition-all duration-150 ease-in-out focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 border-[3px]",
  {
    variants: {
      variant: {
        "option-default":
          "bg-card border-border text-card-foreground shadow-[0_3px_0_0_hsl(var(--border))] active:translate-y-1 active:shadow-none hover:bg-muted cursor-pointer focus-visible:ring-ring",
        "option-selected":
          "bg-sky-100 border-sky-300 text-sky-800 shadow-[0_1px_0_0_#7dd3fc] translate-y-1 cursor-pointer focus-visible:ring-ring",
        "option-correct":
          "bg-emerald-100 border-emerald-400 text-emerald-900 shadow-none cursor-default focus-visible:ring-ring",
        "option-incorrect":
          "bg-rose-100 border-rose-400 text-rose-900 shadow-none cursor-default focus-visible:ring-ring",
        "option-disabled":
          "bg-muted border-border text-muted-foreground opacity-80 cursor-not-allowed",
      },
    },
    defaultVariants: {
      variant: "option-default",
    },
  }
);

export type OptionButtonVariant = VariantProps<
  typeof optionButtonVariants
>["variant"];

function labelClassesByVariant(variant: OptionButtonVariant) {
  const base =
    "flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center font-bold text-base";
  switch (variant) {
    case "option-selected":
      return `${base} bg-sky-200 text-sky-700`;
    case "option-correct":
      return `${base} bg-emerald-200 text-emerald-700`;
    case "option-incorrect":
      return `${base} bg-rose-200 text-rose-700`;
    case "option-disabled":
      return `${base} bg-muted text-muted-foreground`;
    default:
      return `${base} bg-muted text-muted-foreground`;
  }
}

export function getOptionButtonVariant(params: {
  optionId: string;
  selectedId?: string | null;
  locked?: boolean;
  feedback?: "idle" | "correct" | "incorrect" | undefined;
  answerKey?: string | null;
}): OptionButtonVariant {
  const { optionId, selectedId, locked, feedback, answerKey } = params;
  const isSelected = selectedId === optionId;

  if (locked) {
    if (feedback === "correct") {
      return isSelected ? "option-correct" : "option-disabled";
    }
    if (feedback === "incorrect") {
      if (isSelected) return "option-incorrect";
      if (answerKey && optionId === answerKey) return "option-correct";
      return "option-disabled";
    }
    return "option-disabled";
  }

  return isSelected ? "option-selected" : "option-default";
}

type OptionButtonProps = React.ComponentProps<"button"> &
  VariantProps<typeof optionButtonVariants> & {
    label?: string | number;
    showLabel?: boolean;
    pressed?: boolean;
    hotkey?: string | number;
  };

function OptionButton({
  className,
  variant,
  disabled,
  children,
  label,
  showLabel = true,
  pressed = false,
  hotkey,
  ...props
}: OptionButtonProps) {
  const btnRef = React.useRef<HTMLButtonElement | null>(null);
  React.useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (disabled) return;
      const tgt = e.target as HTMLElement | null;
      const tag = tgt?.tagName;
      if (tag === "INPUT" || tag === "TEXTAREA" || tgt?.isContentEditable)
        return;
      const k = typeof hotkey === "number" ? String(hotkey) : hotkey;
      if (!k) return;
      const eq =
        typeof k === "string"
          ? e.key.toLowerCase() === k.toLowerCase()
          : e.key === k;
      if (eq) {
        btnRef.current?.click();
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [disabled, hotkey]);
  return (
    <button
      ref={btnRef}
      type="button"
      aria-disabled={disabled}
      disabled={disabled}
      aria-keyshortcuts={typeof hotkey === "number" ? String(hotkey) : hotkey}
      className={cn(
        optionButtonVariants({ variant, className }),
        pressed && "translate-y-1 shadow-none"
      )}
      {...props}
    >
      <div className="flex items-center gap-4">
        {showLabel && label !== undefined && (
          <span
            className={labelClassesByVariant(variant as OptionButtonVariant)}
          >
            {label}
          </span>
        )}
        <div className="flex-1 space-y-2">{children}</div>
      </div>
    </button>
  );
}

export { OptionButton, optionButtonVariants };
