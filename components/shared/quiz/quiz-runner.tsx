"use client"
import * as React from "react"
import type { QuizQuestion, SubmitAttemptPayload } from "@/lib/quiz/types"
import { useQuizController } from "@/hooks/use-quiz-controller"
import { QuestionRenderer } from "./question-renderer"
import { FeedbackCard } from "@/components/shared/feedback-card"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export interface QuizRunnerProps {
  questions: QuizQuestion[]
  onComplete?: (payload: SubmitAttemptPayload) => void
  onSubmitAnswer?: (payload: SubmitAttemptPayload["answers"][number]) => void
  attemptId?: string
  lessonId?: string
  userId?: string
  className?: string
}

function feedbackToCardStatus(fb: "idle" | "correct" | "incorrect"): "correct" | "incorrect" | "info" {
  if (fb === "correct") return "correct"
  if (fb === "incorrect") return "incorrect"
  return "info"
}

function praise(id: string) {
  const variants = ["Great job!", "Nice work!", "Well done!", "Awesome!"]
  const sum = Array.from(id).reduce((acc, ch) => acc + ch.charCodeAt(0), 0)
  return variants[sum % variants.length]
}

export function QuizRunner({ questions, onComplete, onSubmitAnswer, attemptId, lessonId, userId, className }: QuizRunnerProps) {
  const controller = useQuizController(
    questions,
    onComplete,
    { attemptId: attemptId ?? `attempt-${lessonId ?? "lesson-demo"}`, lessonId: lessonId ?? "lesson-demo", userId },
    onSubmitAnswer
  )
  const q = controller.question
  const value = controller.answers[q.id]

  React.useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Enter") {
        if (!controller.isLocked) controller.checkAnswer()
        else controller.nextQuestion()
      }
    }
    window.addEventListener("keydown", handler)
    return () => window.removeEventListener("keydown", handler)
  }, [controller.isLocked, controller.checkAnswer, controller.nextQuestion])

  const progress = Math.round(((controller.index + 1) / questions.length) * 100)

  return (
    <div className={cn("w-full max-w-[840px] mx-auto space-y-6", className)}>
      <div className="flex items-center justify-between">
        <div className="text-sm font-semibold">Question {controller.index + 1} of {questions.length}</div>
        <div className="w-40 h-2 bg-neutral-200 rounded-full overflow-hidden">
          <div className="h-2 bg-sky-500" style={{ width: `${progress}%` }} />
        </div>
      </div>

      <div className="rounded-2xl border-[3px] border-neutral-300 shadow-[0_3px_0_0_#a3a3a3] p-4">
        <QuestionRenderer
          question={q}
          locked={controller.isLocked}
          value={value}
          onAnswerChange={(val) => controller.setAnswer(q.id, val)}
        />
      </div>

      {controller.feedback !== "idle" && (
        <FeedbackCard
          status={feedbackToCardStatus(controller.feedback)}
          title={controller.feedback === "correct" ? praise(q.id) : "Try again"}
          explanation={q.explanation}
        />
      )}

      <div className="flex items-center justify-end gap-3">
        <Button
          variant="blue"
          size="md"
          disabled={!controller.canCheck || controller.isLocked}
          onClick={controller.checkAnswer}
          label="Check"
        />
        <Button
          variant="green"
          size="md"
          disabled={controller.feedback === "idle"}
          onClick={controller.nextQuestion}
          label={controller.isLast ? "Finish" : "Next"}
        />
      </div>
    </div>
  )
}