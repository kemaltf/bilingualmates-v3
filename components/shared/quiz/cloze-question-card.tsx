"use client";
import * as React from "react";
import { cn } from "@/lib/utils";
import type { MediaContent, ClozeBlankSpec } from "@/lib/quiz/types";
import { OptionButton } from "@/components/ui/option-button";
import { MediaRenderer } from "../media-renderer";
import { MarkdownText } from "../markdown-text";

export interface ClozeQuestionProps {
  prompt: MediaContent;
  segments: Array<
    { kind: "text"; text: string } | { kind: "blank"; blank: ClozeBlankSpec }
  >;
  value?: Record<string, string>;
  onChange?: (answers: Record<string, string>) => void;
  locked?: boolean;
  className?: string;
}

function isPunctStart(text: string) {
  return /^[,\.\!\?]/.test(text);
}

function isPunctEnd(text: string) {
  return /[,\.\!\?]$/.test(text);
}

function BlankSlot({
  spec,
  current,
  onClear,
  onFocus,
  focused,
  disabled,
}: {
  spec: ClozeBlankSpec;
  current?: string;
  onClear: () => void;
  onFocus: () => void;
  focused?: boolean;
  disabled?: boolean;
}) {
  const base =
    "inline-block align-baseline rounded-xl border-[3px] px-3 py-2 min-w-[6ch]";
  const tone = current
    ? "bg-card border-border text-card-foreground"
    : "bg-card border-border text-muted-foreground";
  const fx =
    "shadow-[0_1px_0_0_hsl(var(--border))] focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-ring";
  const disabledCls = disabled
    ? "opacity-70 cursor-not-allowed"
    : "hover:bg-muted";
  return (
    <button
      type="button"
      disabled={disabled}
      onClick={() => {
        if (disabled) return;
        if (current) onClear();
        else onFocus();
      }}
      className={cn(
        base,
        tone,
        fx,
        disabledCls,
        focused && "ring-2 ring-sky-500"
      )}
    >
      {current ?? spec.placeholder ?? "_____"}
    </button>
  );
}

export default function ClozeQuestionCard({
  prompt,
  segments,
  value = {},
  onChange,
  locked = false,
  className,
}: ClozeQuestionProps) {
  const answersRef = React.useRef<Record<string, string>>(value);
  React.useEffect(() => {
    answersRef.current = value;
  }, [value]);

  const handleSet = (id: string, val: string) => {
    const next = { ...(answersRef.current ?? {}), [id]: val };
    onChange?.(next);
  };
  const handleClear = (id: string) => {
    const next = { ...(answersRef.current ?? {}) };
    delete next[id];
    onChange?.(next);
  };

  function isBlankSeg(
    seg: ClozeQuestionProps["segments"][number]
  ): seg is { kind: "blank"; blank: ClozeBlankSpec } {
    return seg.kind === "blank";
  }
  const blankIds = React.useMemo(
    () => segments.filter(isBlankSeg).map((s) => s.blank.id),
    [segments]
  );
  const allOptions = React.useMemo(
    () => segments.filter(isBlankSeg).flatMap((s) => s.blank.options ?? []),
    [segments]
  );

  function countMap(list: string[]) {
    const m = new Map<string, number>();
    for (const x of list) m.set(x, (m.get(x) || 0) + 1);
    return m;
  }
  const optionsCount = React.useMemo(() => countMap(allOptions), [allOptions]);
  const usedCount = React.useMemo(
    () => countMap(Object.values(value ?? {})),
    [value]
  );
  const bank = React.useMemo(() => {
    const result: string[] = [];
    for (const [opt, total] of optionsCount) {
      const used = usedCount.get(opt) || 0;
      for (let i = 0; i < Math.max(0, total - used); i++) result.push(opt);
    }
    return result;
  }, [optionsCount, usedCount]);

  const [focusedId, setFocusedId] = React.useState<string | null>(null);

  return (
    <div className={cn("flex flex-col gap-6", className)}>
      <div className="w-full">
        <MediaRenderer content={prompt} role="question" />
      </div>
      <div className="text-lg leading-relaxed">
        {segments.map((seg, idx) => {
          if (seg.kind === "text") {
            return (
              <span key={`t-${idx}`} className="align-baseline">
                <MarkdownText text={seg.text} />
              </span>
            );
          }
          const prev = segments[idx - 1];
          const next = segments[idx + 1];
          const ml =
            prev && prev.kind === "text" && isPunctEnd(prev.text)
              ? "ml-0"
              : "ml-1";
          const mr =
            next && next.kind === "text" && isPunctStart(next.text)
              ? "mr-0"
              : "mr-1";
          const current = value?.[seg.blank.id];
          return (
            <span
              key={`b-${seg.blank.id}`}
              className={cn("inline-block", ml, mr)}
            >
              <BlankSlot
                spec={seg.blank}
                current={current}
                disabled={locked}
                focused={focusedId === seg.blank.id}
                onClear={() => {
                  if (locked) return;
                  if (current) handleClear(seg.blank.id);
                }}
                onFocus={() => {
                  if (locked) return;
                  setFocusedId(seg.blank.id);
                }}
              />
            </span>
          );
        })}
      </div>

      {allOptions.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {bank.map((opt, i) => (
            <OptionButton
              key={`${opt}-${i}`}
              variant="option-default"
              disabled={locked}
              onClick={() => {
                if (locked) return;
                const targetId =
                  focusedId ??
                  blankIds.find((id) => !(value && value[id])) ??
                  null;
                if (!targetId) return;
                handleSet(targetId, opt);
              }}
              showLabel={false}
              className={cn("w-auto inline-flex px-3 py-2 rounded-xl")}
            >
              {opt}
            </OptionButton>
          ))}
        </div>
      )}
    </div>
  );
}
