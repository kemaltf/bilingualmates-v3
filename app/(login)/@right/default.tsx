import { RightPanelRenderer } from "@/components/layout/RightPanelRenderer"
import type { RightSection } from "@/lib/right/types"

export default function Page() {
  const sections: RightSection[] = [
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

  return <RightPanelRenderer sections={sections} />
}