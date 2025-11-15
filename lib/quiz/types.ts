export type MediaKind = "text" | "audio" | "image" | "video"

export interface MediaContent {
  kind: MediaKind
  text?: string
  url?: string
  alt?: string
  transcript?: string
  pronunciationUrl?: string
}

export interface MCOption {
  id: string
  content: MediaContent
  clickSoundUrl?: string
}

export interface MCQuestion {
  id: string
  prompt: MediaContent
  textPrompt?: string
  options: MCOption[]
  correctOptionId: string
  explanation?: string
  praiseKey?: string
}

export type { MCOption as MultipleChoiceOption, MCQuestion as MultipleChoiceQuestion }