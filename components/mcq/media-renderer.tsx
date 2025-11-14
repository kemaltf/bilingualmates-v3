"use client"
import * as React from "react"
import Image from "next/image"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Play } from "lucide-react"
import type { MediaContent } from "@/lib/quiz/types"

export interface MediaRendererProps {
  content: MediaContent
  role?: "question" | "option"
  className?: string
}

export function MediaRenderer({ content, role = "question", className }: MediaRendererProps) {
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
      return <AudioPlayer url={content.url} className={className} />
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

function AudioPlayer({ url, className }: { url?: string; className?: string }) {
  const audioRef = React.useRef<HTMLAudioElement | null>(null)
  const [playing, setPlaying] = React.useState(false)

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

  return (
    <div className={cn("flex items-center gap-3", className)}>
      <Button onClick={toggle} variant="primary" size="default" aria-pressed={playing}>
        <Play className="size-4" />
        <span>{playing ? "Pause" : "Play"}</span>
      </Button>
      <audio ref={audioRef} src={url} onEnded={() => setPlaying(false)} />
    </div>
  )
}