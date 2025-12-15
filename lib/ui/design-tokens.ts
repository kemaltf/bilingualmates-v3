export type BrandColor =
  | "emerald"
  | "sky"
  | "violet"
  | "amber"
  | "rose"
  | "indigo";

export const BRAND_COLORS: BrandColor[] = [
  "emerald",
  "sky",
  "violet",
  "amber",
  "rose",
  "indigo",
];

export const brandColorToBg: Record<BrandColor, string> = {
  emerald: "bg-emerald-500",
  sky: "bg-sky-500",
  violet: "bg-violet-500",
  amber: "bg-amber-500",
  rose: "bg-rose-500",
  indigo: "bg-indigo-500",
};

export const brandColorToBorder: Record<BrandColor, string> = {
  emerald: "border-emerald-600",
  sky: "border-sky-600",
  violet: "border-violet-600",
  amber: "border-amber-600",
  rose: "border-rose-600",
  indigo: "border-indigo-600",
};

export type ButtonVariant =
  | "blue"
  | "green"
  | "purple"
  | "amber"
  | "red"
  | "indigo"
  | "outline-blue"
  | "outline-green"
  | "outline-red"
  | "outline-purple"
  | "outline-amber"
  | "outline-indigo";

export const brandColorToButtonVariant: Record<BrandColor, ButtonVariant> = {
  emerald: "green",
  sky: "blue",
  violet: "purple",
  amber: "amber",
  rose: "red",
  indigo: "indigo",
};

export function getBrandColorByIndex(index: number): BrandColor {
  const i = Math.abs(index) % BRAND_COLORS.length;
  return BRAND_COLORS[i];
}

export const PRIMARY_BRAND: BrandColor = "sky";

export const BRAND: Record<
  BrandColor,
  {
    bg500: string;
    border600: string;
    text600: string;
    shadow: string;
    focus: string;
  }
> = {
  emerald: {
    bg500: "bg-emerald-500",
    border600: "border-emerald-600",
    text600: "text-emerald-600",
    shadow: "shadow-[0_4px_0_0_#047857]",
    focus: "focus-visible:ring-emerald-500 focus-visible:border-emerald-500",
  },
  sky: {
    bg500: "bg-sky-500",
    border600: "border-sky-600",
    text600: "text-sky-600",
    shadow: "shadow-[0_4px_0_0_#0369a1]",
    focus: "focus-visible:ring-sky-500 focus-visible:border-sky-500",
  },
  violet: {
    bg500: "bg-violet-500",
    border600: "border-violet-600",
    text600: "text-violet-600",
    shadow: "shadow-[0_4px_0_0_#6d28d9]",
    focus: "focus-visible:ring-violet-500 focus-visible:border-violet-500",
  },
  amber: {
    bg500: "bg-amber-500",
    border600: "border-amber-600",
    text600: "text-amber-600",
    shadow: "shadow-[0_4px_0_0_#b45309]",
    focus: "focus-visible:ring-amber-500 focus-visible:border-amber-500",
  },
  rose: {
    bg500: "bg-rose-500",
    border600: "border-rose-600",
    text600: "text-rose-600",
    shadow: "shadow-[0_4px_0_0_#be123c]",
    focus: "focus-visible:ring-rose-500 focus-visible:border-rose-500",
  },
  indigo: {
    bg500: "bg-indigo-500",
    border600: "border-indigo-600",
    text600: "text-indigo-600",
    shadow: "shadow-[0_4px_0_0_#3730a3]",
    focus: "focus-visible:ring-indigo-500 focus-visible:border-indigo-500",
  },
};

export const NEUTRAL = {
  slate200: "bg-slate-200",
  slate300: "border-slate-300",
  slate600: "text-slate-600",
  shadowSlate: "shadow-[0_4px_0_0_var(--shadow-slate)]",
  focusSlate: "focus-visible:ring-slate-400 focus-visible:border-slate-400",
  neutral400: "disabled:text-neutral-400",
};
