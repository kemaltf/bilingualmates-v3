"use client";
import * as React from "react";
import { cn } from "@/lib/utils";
import type { MatchQuestion, MatchItem } from "@/lib/quiz/types";
import { OptionButton } from "@/components/ui/option-button";
import { MediaRenderer } from "../media-renderer";

export interface MatchQuestionCardProps {
  question: MatchQuestion;
  matches: { leftId: string; rightId: string }[];
  onCreateMatch: (leftId: string, rightId: string) => void;
  className?: string;
  questionClassName?: string;
  containerClassName?: string;
  showLabels?: boolean;
  leftTitle?: string;
  rightTitle?: string;
}

function playSound(url?: string) {
  if (!url) return;
  try {
    const a = new Audio(url);
    a.play();
  } catch {}
}

function MatchButton({
  item,
  label,
  selected,
  matched,
  onClick,
  showLabel = true,
  feedbackVariant,
}: {
  item: MatchItem;
  label?: string;
  selected?: boolean;
  matched?: boolean;
  onClick: () => void;
  showLabel?: boolean;
  feedbackVariant?: "option-correct" | "option-incorrect" | undefined;
}) {
  const variant = matched
    ? feedbackVariant ?? "option-disabled"
    : selected
    ? "option-selected"
    : "option-default";
  return (
    <OptionButton
      variant={variant}
      disabled={matched}
      onClick={() => {
        const soundUrl = item.clickSoundUrl ?? item.content.pronunciationUrl;
        if (soundUrl) playSound(soundUrl);
        onClick();
      }}
      label={label}
      showLabel={showLabel}
      className={cn(
        "w-full h-auto justify-start text-left rounded-2xl px-4 py-3"
      )}
    >
      <div className="flex items-center gap-3 w-full">
        <MediaRenderer content={item.content} role="option" />
      </div>
    </OptionButton>
  );
}

export function MatchQuestionCard({
  question,
  matches,
  onCreateMatch,
  className,
  questionClassName,
  containerClassName = "md:grid-cols-2",
  showLabels = true,
  leftTitle,
  rightTitle,
}: MatchQuestionCardProps) {
  const [selectedLeft, setSelectedLeft] = React.useState<string | null>(null);
  const leftItems = question.leftItems;
  const rightItems = question.rightItems;

  return (
    <div className={cn("flex flex-col gap-6", className)}>
      <div className={cn("w-full", questionClassName)}>
        <MediaRenderer content={question.prompt} role="question" />
        {question.textPrompt && (
          <p className="mt-2 text-base">{question.textPrompt}</p>
        )}
      </div>

      <div className={cn("grid gap-4", containerClassName)}>
        <div className="flex flex-col gap-3">
          {leftTitle && (
            <div className="text-sm font-semibold uppercase tracking-wide text-neutral-600">
              {leftTitle}
            </div>
          )}
          {leftItems.map((item, idx) => {
            const matchedPair = matches.find((m) => m.leftId === item.id);
            const matched = !!matchedPair;
            const hasCorrect =
              Array.isArray(question.correctPairs) &&
              question.correctPairs.length > 0;
            const isCorrect =
              hasCorrect &&
              !!matchedPair &&
              question.correctPairs!.some(
                (p) =>
                  p.leftId === matchedPair.leftId &&
                  p.rightId === matchedPair.rightId
              );
            const selected = selectedLeft === item.id;
            return (
              <MatchButton
                key={item.id}
                item={item}
                label={String.fromCharCode(65 + idx)}
                selected={selected}
                matched={matched}
                feedbackVariant={
                  matched && hasCorrect
                    ? isCorrect
                      ? "option-correct"
                      : "option-incorrect"
                    : undefined
                }
                onClick={() => {
                  if (matched) return;
                  setSelectedLeft(item.id);
                }}
                showLabel={showLabels}
              />
            );
          })}
        </div>

        <div className="flex flex-col gap-3">
          {rightTitle && (
            <div className="text-sm font-semibold uppercase tracking-wide text-neutral-600">
              {rightTitle}
            </div>
          )}
          {rightItems.map((item, idx) => {
            const matchedPair = matches.find((m) => m.rightId === item.id);
            const matched = !!matchedPair;
            const hasCorrect =
              Array.isArray(question.correctPairs) &&
              question.correctPairs.length > 0;
            const isCorrect =
              hasCorrect &&
              !!matchedPair &&
              question.correctPairs!.some(
                (p) =>
                  p.leftId === matchedPair.leftId &&
                  p.rightId === matchedPair.rightId
              );
            const label = String(idx + 1);
            return (
              <MatchButton
                key={item.id}
                item={item}
                label={label}
                matched={matched}
                feedbackVariant={
                  matched && hasCorrect
                    ? isCorrect
                      ? "option-correct"
                      : "option-incorrect"
                    : undefined
                }
                onClick={() => {
                  if (matched) return;
                  if (!selectedLeft) return;
                  onCreateMatch(selectedLeft, item.id);
                  setSelectedLeft(null);
                }}
                showLabel={showLabels}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}
