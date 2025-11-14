"use client"
import * as React from "react"

import { cn } from "@/lib/utils"

type InputStatus = "idle" | "correct" | "incorrect"

type InputProps = {
  value: string
  onChange?: (value: string) => void
  placeholder?: string
  disabled?: boolean
  status?: InputStatus
  className?: string
  name?: string
  id?: string
  autoFocus?: boolean
  onEnter?: () => void
  prefix?: React.ReactNode
  suffix?: React.ReactNode
  helperText?: string
}

function containerClasses({ disabled, status }: { disabled?: boolean; status?: InputStatus }) {
  const base =
    "w-full rounded-2xl border-[3px] overflow-hidden transition-all duration-150 ease-in-out focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 p-4"

  if (disabled) {
    return `${base} bg-neutral-100 border-neutral-200 text-neutral-400 opacity-80 cursor-not-allowed`
  }

  switch (status) {
    case "correct":
      return `${base} bg-emerald-100 border-emerald-400 text-emerald-900 focus-within:ring-emerald-500`
    case "incorrect":
      return `${base} bg-rose-100 border-rose-400 text-rose-900 focus-within:ring-rose-500`
    default:
      return `${base} bg-white border-neutral-300 text-neutral-800 shadow-[0_3px_0_0_#a3a3a3] hover:bg-neutral-50 focus-within:ring-sky-500`
  }
}

function Input({
  value,
  onChange,
  placeholder = "Type your answer…",
  disabled = false,
  status = "idle",
  className = "",
  name,
  id,
  autoFocus,
  onEnter,
  prefix,
  suffix,
  helperText,
}: InputProps) {
  return (
    <div className={cn(containerClasses({ disabled, status }), className)}>
      <div className="flex items-center gap-3">
        {prefix && <div className="flex-shrink-0">{prefix}</div>}

        <input
          type="text"
          name={name}
          id={id}
          autoFocus={autoFocus}
          value={value}
          onChange={(e) => onChange?.(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") onEnter?.()
          }}
          disabled={disabled}
          aria-invalid={status === "incorrect"}
          aria-disabled={disabled}
          placeholder={placeholder}
          className="w-full bg-transparent text-base outline-none placeholder:text-neutral-400"
        />

        {suffix && <div className="flex-shrink-0">{suffix}</div>}
      </div>

      {helperText && <div className="mt-2 text-sm text-neutral-500">{helperText}</div>}
    </div>
  )
}

export { Input }
