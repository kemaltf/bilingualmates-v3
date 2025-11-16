import { RightPanelRenderer } from "@/components/layout/RightPanelRenderer"
import type { RightSection } from "@/lib/right/types"

export default function Page() {
  const learnSections: RightSection[] = [
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

  return <RightPanelRenderer sections={learnSections} />
}