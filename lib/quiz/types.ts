export type MediaKind = "text" | "audio" | "image" | "video"

export interface MediaContent {
  kind: MediaKind
  text?: string
  url?: string
  alt?: string
  transcript?: string
}

export interface MCOption {
  id: string
  content: MediaContent
}

export interface MCQuestion {
  id: string
  prompt: MediaContent
  options: MCOption[]
  correctOptionId: string
}

export type { MCOption as MultipleChoiceOption, MCQuestion as MultipleChoiceQuestion }