"use client"
import * as React from "react"
import Image from "next/image"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Volume2 } from "lucide-react"
import type { MediaContent } from "@/lib/quiz/types"

export interface MediaRendererProps {
  content: MediaContent
  role?: "question" | "option"
  className?: string
  autoPlayTrigger?: number
}

export function MediaRenderer({ content, role = "question", className, autoPlayTrigger }: MediaRendererProps) {
  const isQuestion = role === "question"
  const textClasses = cn(isQuestion ? "text-xl font-semibold" : "text-base")

  switch (content.kind) {
    case "text":
      return <p className={cn(textClasses, className)}>{content.text}</p>
    case "image":
      return (
        <div className={cn("rounded-xl overflow-hidden", className)}>
          {content.url && (
            <Image src={content.url} alt={content.alt ?? ""} width={800} height={600} className="h-auto w-full object-cover" unoptimized />
          )}
        </div>
      )
    case "audio":
      return <AudioPlayer url={content.url} className={className} autoPlayTrigger={autoPlayTrigger} />
    case "video":
      return (
        <div className={cn("rounded-xl overflow-hidden", className)}>
          {content.url && (
            <video src={content.url} controls className="w-full h-auto" />
          )}
        </div>
      )
    default:
      return null
  }
}

function AudioPlayer({ url, className, autoPlayTrigger }: { url?: string; className?: string; autoPlayTrigger?: number }) {
  const audioRef = React.useRef<HTMLAudioElement | null>(null)
  const [playing, setPlaying] = React.useState(false)
  const [progress, setProgress] = React.useState(0)
  const [barCount, setBarCount] = React.useState(18)
  const containerRef = React.useRef<HTMLDivElement | null>(null)

  React.useEffect(() => {
    const el = containerRef.current
    if (!el) return
    const ro = new ResizeObserver((entries) => {
      const w = entries[0]?.contentRect?.width ?? 0
      const step = 7
      const count = Math.max(8, Math.floor(w / step))
      setBarCount(count)
    })
    ro.observe(el)
    return () => ro.disconnect()
  }, [])

  const bars = React.useMemo(() => {
    return Array.from({ length: barCount }, (_, i) => {
      const t = i / barCount
      const v = 8 + Math.round(22 * Math.abs(Math.sin(t * Math.PI)))
      return v
    })
  }, [barCount])

  const toggle = () => {
    if (!audioRef.current) return
    if (playing) {
      audioRef.current.pause()
      setPlaying(false)
    } else {
      audioRef.current.play()
      setPlaying(true)
    }
  }

  React.useEffect(() => {
    if (!audioRef.current || !autoPlayTrigger) return
    audioRef.current.play()
    setPlaying(true)
  }, [autoPlayTrigger])

  const onTimeUpdate = () => {
    const a = audioRef.current
    if (!a || !a.duration || Number.isNaN(a.duration)) return
    setProgress(a.currentTime / a.duration)
  }

  const activeBars = Math.max(0, Math.min(bars.length, Math.round(progress * bars.length)))

  return (
    <div className={cn("flex items-center gap-3 w-full", className)}>
      <Button onClick={toggle} variant="primary" size="default" aria-pressed={playing} className="h-10 w-10 p-0 rounded-full flex items-center justify-center">
        <Volume2 className="size-5" />
      </Button>
      <div ref={containerRef} className="flex-1 min-w-0 flex items-center gap-[3px] h-10">
        {bars.map((h, i) => (
          <span
            key={i}
            className={cn(
              "w-1 rounded-full transition-colors",
              playing ? "animate-pulse" : "",
              i <= activeBars ? "bg-sky-500" : "bg-sky-300"
            )}
            style={{ height: `${h}px` }}
          />
        ))}
      </div>
      <audio ref={audioRef} src={url} onTimeUpdate={onTimeUpdate} onEnded={() => { setPlaying(false); setProgress(0) }} />
    </div>
  )
}