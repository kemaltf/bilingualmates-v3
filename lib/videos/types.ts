export type VideoDifficulty = "beginner" | "intermediate" | "advanced"

export interface Topic {
  id: string
  name: string
  icon?: string
}

export interface VideoItem {
  id: string
  title: string
  durationSec: number
  thumbnailUrl: string
  xpReward: number
  difficulty: VideoDifficulty
  topicId: string
}

export interface ContinueWatchingItem extends VideoItem {
  progressPercent: number
}

export type ChapterStatus = "completed" | "in_progress" | "locked"

export interface ChapterItem extends VideoItem {
  status: ChapterStatus
  progressPercent?: number
  sequence: number
}