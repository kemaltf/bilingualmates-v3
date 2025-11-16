"use client"
import * as React from "react"
import { WorldChips } from "./WorldChips"
import { FeaturedMissionCard } from "./FeaturedMissionCard"
import { ChapterTrack } from "./ChapterTrack"
import { topics, videos, chaptersByTopic, continueWatching } from "@/lib/videos/mock"
import { Video, User2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import { Nunito, Inter } from "next/font/google"

const nunito = Nunito({ subsets: ["latin"], weight: ["700", "800"], variable: "--font-nunito" })
const inter = Inter({ subsets: ["latin"], variable: "--font-inter" })

export function VideosHubPage() {
  const [selected, setSelected] = React.useState<string>(topics[0]?.id ?? null)
  const featured = React.useMemo(() => {
    if (!selected) return null
    return videos.find((v) => v.topicId === selected) ?? null
  }, [selected])

  const chapters = React.useMemo(() => {
    if (!selected) return []
    return chaptersByTopic[selected] ?? []
  }, [selected])

  const onStart = () => {}
  const onSelectChapter = () => {}
  const hasHistory = continueWatching.length > 0

  return (
    <div className={`${inter.variable} bg-slate-100 min-h-screen`}>
      <div className="max-w-[1280px] mx-auto grid grid-cols-1 md:grid-cols-[80px_1fr] gap-4 px-4 py-6">
        <aside className="md:block hidden">
          <div className="flex flex-col items-center gap-4">
            <Button variant="blue" size="icon" aria-label="Videos">
              <Video className="size-5" />
            </Button>
            <Button variant="blue" size="icon" aria-label="Profile">
              <User2 className="size-5" />
            </Button>
          </div>
        </aside>
        <main>
          <section className="relative bg-emerald-500 rounded-2xl p-6 md:p-8">
            <div className="grid grid-cols-1 md:grid-cols-3 items-center">
              <div className="md:col-span-2">
                <h1 className={`${nunito.variable} font-[800] text-white text-3xl md:text-4xl`}>Learn with Videos</h1>
                <p className="text-white/90 mt-2">Watch short clips, learn vocabulary, and train your listening.</p>
              </div>
              <div className="flex justify-center md:justify-end">
                <Image src="https://picsum.photos/seed/clapper/120/120" alt="Clapper" width={120} height={120} className="rounded-xl bg-white" unoptimized />
              </div>
            </div>
            <div className="absolute top-4 right-4 flex items-center gap-2">
              <span className="px-3 py-1 rounded-full bg-white text-emerald-700 text-xs font-bold">🔥 3-day listening streak</span>
              <span className="px-3 py-1 rounded-full bg-white text-emerald-700 text-xs font-bold">⭐ 42 Video XP</span>
            </div>
          </section>

          <section className="mt-4">
            <WorldChips topics={topics} selectedId={selected} onSelect={setSelected} />
          </section>

          <section className="mt-4">
            <FeaturedMissionCard video={featured} progressPercent={35} onStart={onStart} />
          </section>

          <section className="mt-6">
            <div className="flex items-center justify-between mb-2">
              <h2 className={`${nunito.variable} font-[800] text-slate-800 text-xl`}>Chapter Progress</h2>
            </div>
            <ChapterTrack chapters={chapters} onSelect={onSelectChapter} />
          </section>

          {hasHistory && (
            <section className="mt-8">
              <h2 className={`${nunito.variable} font-[800] text-slate-800 text-xl mb-2`}>Continue Watching</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {continueWatching.map((v) => (
                  <div key={v.id} className="bg-white rounded-2xl shadow border-[3px] border-slate-300 p-3">
                    <div className="h-32 rounded-xl bg-slate-200" />
                    <div className="mt-3 text-sm font-bold">{v.title}</div>
                    <div className="mt-2 h-2 bg-slate-200 rounded-full overflow-hidden">
                      <div className="h-full bg-emerald-500" style={{ width: `${Math.min(100, Math.max(0, v.progressPercent))}%` }} />
                    </div>
                    <div className="mt-3 flex justify-end">
                      <Button variant="green" size="sm" label="RESUME" />
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}
        </main>
      </div>
    </div>
  )
}