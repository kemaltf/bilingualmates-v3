export type Currency = "IDR" | "USD"

export interface SubscriptionPlan {
  id: string
  title: string
  durationMonths: number
  priceCents: number
  currency: Currency
  benefits?: string[]
}

export interface DiamondPackage {
  id: string
  title: string
  amount: number
  priceCents: number
  currency: Currency
  giftable: boolean
  allowedLessonIds?: string[]
}

export type PurchaseKind = "subscription" | "diamond"

export interface PurchaseRequest {
  kind: PurchaseKind
  planId?: string
  packageId?: string
  targetLessonId?: string | null
}