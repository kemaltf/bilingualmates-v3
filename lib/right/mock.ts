import type { RightSection } from "./types"

export const learnRightSections: RightSection[] = [
  {
    kind: "language_stats",
    data: {
      languageCode: "id",
      languageName: "Bahasa Indonesia",
      level: 12,
      streakDays: 65,
      diamonds: 240,
      xp: 1050,
    },
  },
  {
    kind: "missions",
    data: [
      { id: "m1", title: "Dapatkan 20 XP", target: 20, progress: 0, rewardXp: 20 },
      { id: "m2", title: "Selesaikan 1 pelajaran sempurna", target: 1, progress: 0, rewardXp: 10 },
      { id: "m3", title: "Raih 15 XP bonus kombo", target: 15, progress: 0, rewardXp: 15 },
    ],
  },
  {
    kind: "ad",
    data: {
      id: "ad1",
      title: "Candlelight Singapore",
      subtitle: "Candlelight",
      imageUrl: "/ad/candlelight.jpg",
      ctaText: "Open",
      href: "https://example.com",
    },
  },
]

export const profileRightSections: RightSection[] = [
  {
    kind: "language_stats",
    data: {
      languageCode: "id",
      languageName: "Bahasa Indonesia",
      level: 12,
      streakDays: 65,
      diamonds: 250,
      xp: 1051,
    },
  },
  {
    kind: "notifications",
    data: [
      { id: "n1", userName: "anna", timeAgo: "54 menit", message: "Menyelesaikan lebih dari 10 pelajaran dalam sehari!", reactions: [{ emoji: "🎉", count: 100 }] },
      { id: "n2", userName: "nicholas", timeAgo: "5 jam", message: "Top 3 Liga Berlian sebanyak 169 kali!", reactions: [{ emoji: "🥈", count: 1 }] },
    ],
  },
  {
    kind: "follows",
    data: {
      following: [
        { id: "u1", name: "Framework2", xp: 18143070 },
        { id: "u2", name: "LanguageGarden", xp: 8571003 },
      ],
      followers: [
        { id: "u3", name: "Jose Ramiro Vivar", xp: 7697715 },
      ],
    },
  },
]