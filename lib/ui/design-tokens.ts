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
  | "indigo";

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
