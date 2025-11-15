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

export interface STQuestion {
  id: string
  prompt: MediaContent
  textPrompt?: string
  correctAnswers?: string[]
  placeholder?: string
  explanation?: string
  praiseKey?: string
}

export type { STQuestion as ShortTextQuestion }

export interface MatchItem {
  id: string
  content: MediaContent
  clickSoundUrl?: string
}

export interface MatchQuestion {
  id: string
  prompt: MediaContent
  textPrompt?: string
  leftItems: MatchItem[]
  rightItems: MatchItem[]
  correctPairs?: { leftId: string; rightId: string }[]
  explanation?: string
  praiseKey?: string
}

export interface ClozeBlankSpec {
  id: string
  options?: string[]
  placeholder?: string
  maxLength?: number
}

export type ClozeSegment =
  | { kind: "text"; text: string }
  | { kind: "blank"; blank: ClozeBlankSpec }

export interface ClozeQuestion {
  id: string
  prompt: MediaContent
  segments: ClozeSegment[]
  explanation?: string
  praiseKey?: string
}

export interface ReorderQuestion {
  id: string
  prompt: MediaContent
  tokens: string[]
  correctOrder?: string[]
  explanation?: string
  praiseKey?: string
}

export type { MatchQuestion as PairMatchQuestion }