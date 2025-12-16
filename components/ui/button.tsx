"use client";
import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";
import { BRAND, NEUTRAL, PRIMARY_BRAND } from "@/lib/ui/design-tokens";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
  {
    variants: {
      variant: {
        primary: [
          "relative select-none rounded-full uppercase font-semibold tracking-wide",
          "transition-transform active:translate-y-1 active:shadow-none",
          "focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
          BRAND[PRIMARY_BRAND].bg500,
          "text-white",
          "border-[3px]",
          BRAND[PRIMARY_BRAND].border600,
          BRAND[PRIMARY_BRAND].shadow,
          BRAND[PRIMARY_BRAND].focus,
        ].join(" "),
        blue: [
          "relative select-none rounded-full uppercase font-semibold tracking-wide",
          "transition-transform active:translate-y-1 active:shadow-none",
          "focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
          BRAND.sky.bg500,
          "text-white",
          "border-[3px]",
          BRAND.sky.border600,
          BRAND.sky.shadow,
          BRAND.sky.focus,
        ].join(" "),
        green: [
          "relative select-none rounded-full uppercase font-semibold tracking-wide",
          "transition-transform active:translate-y-1 active:shadow-none",
          "focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
          BRAND.emerald.bg500,
          "text-white",
          "border-[3px]",
          BRAND.emerald.border600,
          BRAND.emerald.shadow,
          BRAND.emerald.focus,
        ].join(" "),
        red: [
          "relative select-none rounded-full uppercase font-semibold tracking-wide",
          "transition-transform active:translate-y-1 active:shadow-none",
          "focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
          BRAND.rose.bg500,
          "text-white",
          "border-[3px]",
          BRAND.rose.border600,
          BRAND.rose.shadow,
          BRAND.rose.focus,
        ].join(" "),
        purple: [
          "relative select-none rounded-full uppercase font-semibold tracking-wide",
          "transition-transform active:translate-y-1 active:shadow-none",
          "focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
          BRAND.violet.bg500,
          "text-white",
          "border-[3px]",
          BRAND.violet.border600,
          BRAND.violet.shadow,
          BRAND.violet.focus,
        ].join(" "),
        amber: [
          "relative select-none rounded-full uppercase font-semibold tracking-wide",
          "transition-transform active:translate-y-1 active:shadow-none",
          "focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
          BRAND.amber.bg500,
          "text-white",
          "border-[3px]",
          BRAND.amber.border600,
          BRAND.amber.shadow,
          BRAND.amber.focus,
        ].join(" "),
        indigo: [
          "relative select-none rounded-full uppercase font-semibold tracking-wide",
          "transition-transform active:translate-y-1 active:shadow-none",
          "focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
          BRAND.indigo.bg500,
          "text-white",
          "border-[3px]",
          BRAND.indigo.border600,
          BRAND.indigo.shadow,
          BRAND.indigo.focus,
        ].join(" "),
        "outline-blue": [
          "relative select-none rounded-full uppercase font-semibold tracking-wide",
          "transition-transform active:translate-y-1 active:shadow-none",
          "focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
          "bg-transparent",
          BRAND.sky.text600,
          "border-[3px]",
          BRAND.sky.border600,
          BRAND.sky.shadow,
          BRAND.sky.focus,
        ].join(" "),
        "outline-green": [
          "relative select-none rounded-full uppercase font-semibold tracking-wide",
          "transition-transform active:translate-y-1 active:shadow-none",
          "focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
          "bg-transparent",
          BRAND.emerald.text600,
          "border-[3px]",
          BRAND.emerald.border600,
          BRAND.emerald.shadow,
          BRAND.emerald.focus,
        ].join(" "),
        "outline-red": [
          "relative select-none rounded-full uppercase font-semibold tracking-wide",
          "transition-transform active:translate-y-1 active:shadow-none",
          "focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
          "bg-transparent",
          BRAND.rose.text600,
          "border-[3px]",
          BRAND.rose.border600,
          BRAND.rose.shadow,
          BRAND.rose.focus,
        ].join(" "),
        "outline-purple": [
          "relative select-none rounded-full uppercase font-semibold tracking-wide",
          "transition-transform active:translate-y-1 active:shadow-none",
          "focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
          "bg-transparent",
          BRAND.violet.text600,
          "border-[3px]",
          BRAND.violet.border600,
          BRAND.violet.shadow,
          BRAND.violet.focus,
        ].join(" "),
        "outline-amber": [
          "relative select-none rounded-full uppercase font-semibold tracking-wide",
          "transition-transform active:translate-y-1 active:shadow-none",
          "focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
          "bg-transparent",
          BRAND.amber.text600,
          "border-[3px]",
          BRAND.amber.border600,
          BRAND.amber.shadow,
          BRAND.amber.focus,
        ].join(" "),
        "outline-indigo": [
          "relative select-none rounded-full uppercase font-semibold tracking-wide",
          "transition-transform active:translate-y-1 active:shadow-none",
          "focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
          "bg-transparent",
          BRAND.indigo.text600,
          "border-[3px]",
          BRAND.indigo.border600,
          BRAND.indigo.shadow,
          BRAND.indigo.focus,
        ].join(" "),
        disabled: [
          "relative select-none rounded-full uppercase font-semibold tracking-wide",
          "transition-transform active:translate-y-1 active:shadow-none",
          "focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
          "bg-muted",
          "text-muted-foreground",
          "border-[3px]",
          "border-border",
          NEUTRAL.shadowSlate,
          "focus-visible:ring-ring focus-visible:border-ring",
        ].join(" "),
        ghost: [
          "relative select-none rounded-full uppercase font-semibold tracking-wide",
          "transition-colors",
          "bg-transparent",
          "text-slate-500 dark:text-slate-400",
          "hover:bg-slate-100 dark:hover:bg-slate-800",
          "hover:text-slate-700 dark:hover:text-slate-200",
          "border-[3px] border-transparent",
          "shadow-none",
        ].join(" "),
        text: [
          "bg-transparent",
          BRAND[PRIMARY_BRAND].text600,
          "border-0 shadow-none",
          "!px-0 !py-0 !h-auto",
          "hover:underline",
          "focus:outline-none focus-visible:ring-0 focus-visible:ring-offset-0",
          "disabled:text-muted-foreground",
        ].join(" "),
      },
      size: {
        default: "h-9 px-4 py-2 has-[>svg]:px-3",
        sm: "h-8 gap-1.5 px-3 has-[>svg]:px-2.5",
        lg: "h-10 px-6 has-[>svg]:px-4",
        icon: "size-9",
        "icon-sm": "size-8",
        "icon-lg": "size-10",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "default",
    },
  }
);

type ButtonOwnProps = {
  asChild?: boolean;
  label?: string;
  loading?: boolean;
  pressed?: boolean;
  size?: VariantProps<typeof buttonVariants>["size"] | "md";
  onFocus?: React.FocusEventHandler<HTMLButtonElement>;
};

function Button({
  className,
  variant,
  size,
  asChild = false,
  label,
  loading = false,
  pressed = false,
  onFocus,
  ...props
}: React.ComponentProps<"button"> &
  Omit<VariantProps<typeof buttonVariants>, "size"> &
  ButtonOwnProps) {
  const Comp = asChild ? Slot : "button";
  const mappedSize = size === "md" ? "default" : size;

  return (
    <Comp
      data-slot="button"
      className={cn(
        buttonVariants({
          variant,
          size: mappedSize as VariantProps<typeof buttonVariants>["size"],
        }),
        className,
        pressed && "translate-y-1 shadow-none"
      )}
      aria-busy={loading}
      aria-pressed={pressed}
      onFocus={onFocus}
      {...props}
    >
      {loading && (
        <svg
          className="h-4 w-4 animate-spin shrink-0"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="white"
            strokeWidth="4"
            fill="none"
          />
          <path
            className="opacity-75"
            fill="none"
            stroke="white"
            strokeWidth="4"
            strokeLinecap="round"
            d="M22 12a10 10 0 00-10-10"
          />
        </svg>
      )}
      {props.children ? (
        props.children
      ) : (
        <span className={cn(loading && "opacity-90")}>{label}</span>
      )}
    </Comp>
  );
}

export { Button, buttonVariants };
