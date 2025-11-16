export type LanguageStats = {
  languageCode: string
  languageName: string
  level: number
  streakDays: number
  diamonds: number
  xp: number
}

export type DailyMission = {
  id: string
  title: string
  target: number
  progress: number
  rewardXp: number
}

export type AdItem = {
  id: string
  title: string
  subtitle?: string
  imageUrl: string
  ctaText: string
  href: string
}

export type NotificationItem = {
  id: string
  userName: string
  timeAgo: string
  message: string
  reactions?: { emoji: string; count: number }[]
}

export type FollowUser = {
  id: string
  name: string
  avatarUrl?: string
  xp: number
}

export type FollowsData = {
  following: FollowUser[]
  followers: FollowUser[]
}

export type RightSection =
  | { kind: "language_stats"; data: LanguageStats }
  | { kind: "missions"; data: DailyMission[] }
  | { kind: "ad"; data: AdItem }
  | { kind: "notifications"; data: NotificationItem[] }
  | { kind: "follows"; data: FollowsData }