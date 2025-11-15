"use client"
import * as React from "react"
import { cn } from "@/lib/utils"

export interface QuestionReorderProps {
  tokens: string[]
  value: string[]
  onChange: (updated: string[]) => void
  prompt?: string
  disabled?: boolean
  className?: string
  answerClassName?: string
  bankClassName?: string
  feedbackStatus?: "idle" | "correct" | "incorrect"
  incorrectFromIndex?: number
}

function TokenButton({ label, onClick, disabled, variant = "bank", state = "idle", className = "" }: { label: string; onClick?: () => void; disabled?: boolean; variant?: "bank" | "answer"; state?: "idle" | "correct" | "incorrect"; className?: string }) {
  const base = "inline-flex items-center justify-center rounded-xl px-3 py-2 text-base font-medium transition-all select-none border-[3px]"
  const bank = "bg-white border-neutral-300 text-neutral-800 shadow-md hover:-translate-y-0.5 hover:bg-neutral-50 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-sky-500"
  const answerIdle = "bg-sky-100 border-sky-300 text-sky-800 shadow-[0_1px_0_0_#7dd3fc] focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-sky-500"
  const answerCorrect = "bg-emerald-100 border-emerald-400 text-emerald-900 shadow-none focus-visible:ring-emerald-500"
  const answerIncorrect = "bg-rose-100 border-rose-400 text-rose-900 shadow-none focus-visible:ring-rose-500"
  const disabledCls = "disabled:pointer-events-none disabled:opacity-60"
  const answer = state === "correct" ? answerCorrect : state === "incorrect" ? answerIncorrect : answerIdle
  return (
    <button type="button" disabled={disabled} onClick={onClick} className={cn(base, variant === "bank" ? bank : answer, disabledCls, className)}>
      {label}
    </button>
  )
}

function computeBank(tokens: string[], value: string[]) {
  const used = new Map<string, number>()
  for (const v of value) used.set(v, (used.get(v) || 0) + 1)
  const bank: string[] = []
  const seen = new Map<string, number>()
  for (const t of tokens) {
    const countUsed = used.get(t) || 0
    const countSeen = seen.get(t) || 0
    if (countSeen < countUsed) {
      seen.set(t, countSeen + 1)
      continue
    }
    bank.push(t)
    seen.set(t, countSeen + 1)
  }
  return bank
}

export default function QuestionReorder({ tokens, value, onChange, prompt, disabled = false, className, answerClassName, bankClassName, feedbackStatus = "idle", incorrectFromIndex }: QuestionReorderProps) {
  const bank = React.useMemo(() => computeBank(tokens, value), [tokens, value])

  const addToken = (t: string) => {
    if (disabled) return
    onChange([...value, t])
  }

  const removeTokenAt = (i: number) => {
    if (disabled) return
    const next = value.slice(0, i).concat(value.slice(i + 1))
    onChange(next)
  }

  const containerStateCls = feedbackStatus === "correct" ? "bg-emerald-50 border-emerald-300" : feedbackStatus === "incorrect" ? "bg-rose-50 border-rose-300" : "bg-white border-neutral-300"
  return (
    <div className={cn("space-y-4", className)}>
      {prompt && <p className="text-lg font-medium">{prompt}</p>}

      <div className={cn("min-h-[56px] p-3 rounded-2xl border-[3px] shadow-[0_3px_0_0_#a3a3a3]", containerStateCls, "flex flex-wrap gap-2", answerClassName)}>
        {value.map((t, i) => {
          const state = feedbackStatus === "correct" ? "correct" : feedbackStatus === "incorrect" ? (typeof incorrectFromIndex === "number" ? (i >= incorrectFromIndex ? "incorrect" : "idle") : "incorrect") : "idle"
          return (
            <TokenButton key={`${t}-${i}`} label={t} variant="answer" state={state} disabled={disabled} onClick={() => removeTokenAt(i)} />
          )
        })}
      </div>

      <div className={cn("flex flex-wrap gap-2", bankClassName)}>
        {bank.map((t, idx) => (
          <TokenButton key={`${t}-bank-${idx}`} label={t} disabled={disabled} onClick={() => addToken(t)} />
        ))}
      </div>
    </div>
  )
}