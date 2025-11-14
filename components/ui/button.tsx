"use client";
import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
  {
    variants: {
      variant: {
        primary: [
          "relative select-none rounded-full uppercase font-semibold tracking-wide",
          "bg-sky-500 text-white border-[3px] border-sky-600 shadow-[0_4px_0_0_#0369a1]",
          "transition-transform active:translate-y-1 active:shadow-none",
          "focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-sky-500 focus-visible:border-sky-500",
        ].join(" "),
        blue: [
          "relative select-none rounded-full uppercase font-semibold tracking-wide",
          "bg-sky-500 text-white border-[3px] border-sky-600 shadow-[0_4px_0_0_#0369a1]",
          "transition-transform active:translate-y-1 active:shadow-none",
          "focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-sky-500 focus-visible:border-sky-500",
        ].join(" "),
        green: [
          "relative select-none rounded-full uppercase font-semibold tracking-wide",
          "bg-emerald-500 text-white border-[3px] border-emerald-600 shadow-[0_4px_0_0_#047857]",
          "transition-transform active:translate-y-1 active:shadow-none",
          "focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-emerald-500 focus-visible:border-emerald-500",
        ].join(" "),
        red: [
          "relative select-none rounded-full uppercase font-semibold tracking-wide",
          "bg-rose-500 text-white border-[3px] border-rose-600 shadow-[0_4px_0_0_#be123c]",
          "transition-transform active:translate-y-1 active:shadow-none",
          "focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-rose-500 focus-visible:border-rose-500",
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
};

function Button({
  className,
  variant,
  size,
  asChild = false,
  label,
  loading = false,
  pressed = false,
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
        buttonVariants({ variant, size: mappedSize as VariantProps<typeof buttonVariants>["size"], className }),
        pressed && "translate-y-1 shadow-none"
      )}
      aria-busy={loading}
      aria-pressed={pressed}
      {...props}
    >
      {loading && (
        <svg className="h-4 w-4 animate-spin shrink-0" viewBox="0 0 24 24" aria-hidden="true">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="white" strokeWidth="4" fill="none" />
          <path className="opacity-75" fill="none" stroke="white" strokeWidth="4" strokeLinecap="round" d="M22 12a10 10 0 00-10-10" />
        </svg>
      )}
      {props.children ? props.children : <span className={cn(loading && "opacity-90")}>{label}</span>}
    </Comp>
  );
}

export { Button, buttonVariants };
