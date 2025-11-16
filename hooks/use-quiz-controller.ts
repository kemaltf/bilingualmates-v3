"use client"
import * as React from "react"
import type { QuizQuestion } from "@/lib/quiz/types"

type FeedbackState = "idle" | "correct" | "incorrect"

export interface QuizControllerResult {
  index: number
  question: QuizQuestion
  answers: Record<string, unknown>
  feedback: FeedbackState
  isLocked: boolean
  isLast: boolean
  canCheck: boolean
  canNext: boolean
  score: { correct: number; total: number; percentage: number }
  setAnswer: (questionId: string, value: unknown) => void
  checkAnswer: () => void
  nextQuestion: () => void
  resetFeedback: () => void
}

function normalizeText(s: string) {
  const lowered = s.toLowerCase().trim()
  const stripped = lowered.replace(/[\p{P}\p{S}]/gu, "")
  return stripped.replace(/\s+/g, " ")
}

function isAnswered(q: QuizQuestion, val: unknown): boolean {
  if (q.kind === "mcq") return typeof val === "string" && val.length > 0
  if (q.kind === "short_text") return typeof val === "string" && val.trim().length > 0
  if (q.kind === "reorder") return Array.isArray(val) && (val as string[]).length > 0
  if (q.kind === "cloze") return !!val && typeof val === "object" && Object.keys(val as Record<string, string>).length > 0
  if (q.kind === "match") return Array.isArray(val) && (val as { leftId: string; rightId: string }[]).length > 0
  return false
}

function evaluate(q: QuizQuestion, val: unknown): boolean {
  if (q.kind === "mcq") {
    return val === q.correctOptionId
  }
  if (q.kind === "short_text") {
    const v = typeof val === "string" ? normalizeText(val) : ""
    const keys = (q.correctAnswers ?? []).map(normalizeText)
    return keys.includes(v)
  }
  if (q.kind === "reorder") {
    const ans = Array.isArray(val) ? (val as string[]).join(" ") : ""
    const normalizedAns = normalizeText(ans)
    const correct = q.correctSentence
      ? normalizeText(q.correctSentence)
      : normalizeText((q.correctOrder ?? []).join(" "))
    return normalizedAns === correct
  }
  if (q.kind === "cloze") {
    const user = (val as Record<string, string>) || {}
    const correct = q.correctAnswers || {}
    const keys = Object.keys(correct)
    if (keys.length === 0) return false
    for (const k of keys) {
      if ((user[k] ?? "") !== correct[k]) return false
    }
    return true
  }
  if (q.kind === "match") {
    const pairs = Array.isArray(val) ? (val as { leftId: string; rightId: string }[]) : []
    const correct = q.correctPairs ?? []
    if (correct.length === 0) return false
    if (pairs.length !== correct.length) return false
    const set = new Set(correct.map((p) => `${p.leftId}:${p.rightId}`))
    for (const p of pairs) {
      if (!set.has(`${p.leftId}:${p.rightId}`)) return false
    }
    return true
  }
  return false
}

export function useQuizController(questions: QuizQuestion[], onComplete?: (score: QuizControllerResult["score"]) => void): QuizControllerResult {
  const [index, setIndex] = React.useState(0)
  const [feedback, setFeedback] = React.useState<FeedbackState>("idle")
  const [isLocked, setLocked] = React.useState(false)
  const [answers, setAnswers] = React.useState<Record<string, unknown>>({})
  const [correctCount, setCorrectCount] = React.useState(0)
  const [checkedIds, setCheckedIds] = React.useState<Set<string>>(new Set())

  const question = questions[index]
  const currentValue = answers[question.id]
  const canCheck: boolean = isAnswered(question, currentValue)
  const isLast = index === questions.length - 1
  const canNext = feedback !== "idle"
  const score = {
    correct: correctCount,
    total: checkedIds.size,
    percentage: checkedIds.size === 0 ? 0 : Math.round((correctCount / checkedIds.size) * 100),
  }

  const setAnswer = (questionId: string, value: unknown) => {
    if (questionId !== question.id) return
    setAnswers((prev) => ({ ...prev, [questionId]: value }))
    setFeedback("idle")
  }

  const checkAnswer = () => {
    if (isLocked) return
    if (!canCheck) return
    const ok = evaluate(question, currentValue)
    setFeedback(ok ? "correct" : "incorrect")
    setLocked(true)
    setCheckedIds((s) => new Set(s).add(question.id))
    if (ok) setCorrectCount((c) => c + 1)
  }

  const nextQuestion = () => {
    if (!canNext) return
    if (isLast) {
      if (onComplete) onComplete(score)
      return
    }
    setIndex((i) => i + 1)
    setFeedback("idle")
    setLocked(false)
  }

  const resetFeedback = () => {
    setFeedback("idle")
    setLocked(false)
  }

  return {
    index,
    question,
    answers,
    feedback,
    isLocked,
    isLast,
    canCheck,
    canNext,
    score,
    setAnswer,
    checkAnswer,
    nextQuestion,
    resetFeedback,
  }
}