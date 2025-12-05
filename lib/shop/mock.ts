import type { SubscriptionPlan, DiamondPackage } from "./types";

export const subscriptionPlans: SubscriptionPlan[] = [
  {
    id: "sub-3m",
    title: "Paket 3 Bulan",
    durationMonths: 3,
    priceCents: 9900000,
    currency: "IDR",
    benefits: ["Tanpa iklan", "Akses premium"],
  },
  {
    id: "sub-6m",
    title: "Paket 6 Bulan",
    durationMonths: 6,
    priceCents: 17900000,
    currency: "IDR",
    benefits: ["Tanpa iklan", "Akses premium", "Diskon khusus"],
  },
  {
    id: "sub-12m",
    title: "Paket 1 Tahun",
    durationMonths: 12,
    priceCents: 32900000,
    currency: "IDR",
    benefits: ["Tanpa iklan", "Akses premium", "Prioritas dukungan"],
  },
];

export const diamondPackages: DiamondPackage[] = [
  {
    id: "dia-200",
    title: "200 💎",
    amount: 200,
    priceCents: 490000,
    currency: "IDR",
    giftable: true,
    allowedLessonIds: ["n2", "n3", "bn2"],
  },
  {
    id: "dia-500",
    title: "500 💎",
    amount: 500,
    priceCents: 990000,
    currency: "IDR",
    giftable: true,
    allowedLessonIds: ["n2", "n3", "bn2", "tn2"],
  },
  {
    id: "dia-1200",
    title: "1200 💎",
    amount: 1200,
    priceCents: 1990000,
    currency: "IDR",
    giftable: true,
  },
];
