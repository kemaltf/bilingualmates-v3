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
  correctAnswers?: Record<string, string>
  explanation?: string
  praiseKey?: string
}

export interface ReorderQuestion {
  id: string
  prompt: MediaContent
  tokens: string[]
  correctSentence?: string
  correctOrder?: string[]
  explanation?: string
  praiseKey?: string
}

export type QuestionKind = "mcq" | "short_text" | "match" | "reorder" | "cloze"

export type QuizQuestion =
  | ({ kind: "mcq" } & MCQuestion)
  | ({ kind: "short_text" } & STQuestion)
  | ({ kind: "match" } & MatchQuestion)
  | ({ kind: "reorder" } & ReorderQuestion)
  | ({ kind: "cloze" } & ClozeQuestion)

export interface SubmitAnswerPayload {
  attemptId: string
  questionId: string
  questionType: "mcq" | "short_text" | "reorder" | "cloze" | "match"
  rawAnswer: unknown
  clientTimeMs?: number
}

export interface SubmitAttemptPayload {
  attemptId: string
  userId?: string
  lessonId: string
  startedAt: string
  completedAt: string
  clientTotalTimeMs?: number
  answers: SubmitAnswerPayload[]
}

export type { MatchQuestion as PairMatchQuestion }