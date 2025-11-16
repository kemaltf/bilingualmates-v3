"use client"
import * as React from "react"
import { TopicChips } from "./TopicChips"
import { VideoCard } from "./VideoCard"
import { ContinueWatchingRow } from "./ContinueWatchingRow"
import { topics, videos, continueWatching } from "@/lib/videos/mock"
import { cn } from "@/lib/utils"

export function VideosPage() {
  const [selected, setSelected] = React.useState<string | null>(null)

  const filtered = React.useMemo(() => {
    if (!selected) return []
    return videos.filter((v) => v.topicId === selected)
  }, [selected])

  const onSelectVideo = (v: (typeof videos)[number]) => {
    alert("Selected video\n" + JSON.stringify(v, null, 2))
  }

  return (
    <div className="w-full">
      <section className={cn("w-full", "bg-gradient-to-r from-emerald-200 to-sky-200")}>
        <div className="max-w-[1120px] mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
          <div className="md:col-span-2 space-y-2">
            <h1 className="text-3xl md:text-4xl font-bold">Learn with Videos</h1>
            <p className="text-neutral-700">Watch short clips, study vocabulary, and train your listening.</p>
          </div>
          <div className="text-5xl md:text-6xl text-center">🎬</div>
        </div>
      </section>

      <section className="max-w-[1120px] mx-auto px-6 py-6">
        <TopicChips topics={topics} selectedId={selected} onSelect={setSelected} />
      </section>

      <section className="max-w-[1120px] mx-auto px-6 pb-10">
        {selected ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((v) => (
              <VideoCard key={v.id} video={v} onSelect={onSelectVideo} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-12">
            <div className="text-6xl">🎯</div>
            <div className="mt-3 text-lg font-semibold">Select a topic to start learning</div>
          </div>
        )}
      </section>

      <section className="max-w-[1120px] mx-auto px-6 pb-16">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-xl font-bold">Continue Watching</h2>
        </div>
        <ContinueWatchingRow items={continueWatching} onResume={(v) => onSelectVideo(v)} />
      </section>
    </div>
  )
}