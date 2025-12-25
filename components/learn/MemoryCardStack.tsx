"use client";
import * as React from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import type { MediaContent } from "@/lib/quiz/types";
import { MediaRenderer } from "@/components/shared/media-renderer";
import type { BrandColor } from "@/lib/ui/design-tokens";
import {
  BRAND,
  brandColorToBg,
  getBrandColorByIndex,
} from "@/lib/ui/design-tokens";
import { Volume2 } from "lucide-react";
import LottiePlayer from "@/components/shared/LottiePlayer";

export interface MemoryItem {
  id: string;
  title?: string;
  content: MediaContent;
  translation?: string;
  examples?: string[];
  phonetic?: string;
  color?: BrandColor;
}

export interface MemoryCardStackProps {
  items: MemoryItem[];
  className?: string;
  onKnow?: (id: string) => void;
  onLearn?: (id: string) => void;
  footerVariant?: "sticky" | "inline";
  onComplete?: () => void;
}

export default function MemoryCardStack({
  items,
  className,
  onKnow,
  onLearn,
  footerVariant = "sticky",
  onComplete,
}: MemoryCardStackProps) {
  const [index, setIndex] = React.useState(0);
  const [flipped, setFlipped] = React.useState(false);
  const audioRef = React.useRef<HTMLAudioElement | null>(null);
  const current = items[index];
  const pct = Math.round(((index + 1) / Math.max(1, items.length)) * 100);
  const brand = current?.color ?? getBrandColorByIndex(index);
  const [showConfetti, setShowConfetti] = React.useState(false);

  React.useEffect(() => {
    if (showConfetti) {
      const t = setTimeout(() => setShowConfetti(false), 1500);
      return () => clearTimeout(t);
    }
  }, [showConfetti]);

  const next = () =>
    setIndex((i) => {
      const ni = Math.min(items.length - 1, i + 1);
      if (ni === items.length - 1 && items.length === i + 1) onComplete?.();
      return ni;
    });

  const handleKnow = () => {
    if (current) onKnow?.(current.id);
    setShowConfetti(true);
    next();
  };

  const handleLearn = () => {
    if (current) onLearn?.(current.id);
    next();
  };

  const toggleFlip = () => setFlipped((f) => !f);
  const playPronunciation = () => {
    const url = current?.content?.pronunciationUrl ?? current?.content?.url;
    if (!url) return;
    if (!audioRef.current) audioRef.current = new Audio(url);
    try {
      audioRef.current.currentTime = 0;
      audioRef.current.play();
    } catch {}
  };

  return (
    <div className={cn("w-full space-y-4", className)}>
      <div className="flex items-center justify-between pl-0 pr-4">
        <Button
          variant="text"
          size="icon-sm"
          aria-label="Close"
          onClick={() => {
            if (typeof window !== "undefined") window.history.back();
          }}
        >
          <svg viewBox="0 0 24 24" className="size-5" aria-hidden="true">
            <path
              d="M18 6L6 18"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
            <path
              d="M6 6L18 18"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        </Button>
        <div className="flex items-center gap-3">
          <div className="text-sm font-semibold hidden md:block">
            Memory {index + 1} of {items.length}
          </div>
          <div className="w-56 h-2 bg-neutral-200 rounded-full overflow-hidden">
            <div
              className="h-2 bg-sky-500 transition-all duration-500"
              style={{ width: `${pct}%` }}
            />
          </div>
        </div>
      </div>

      {showConfetti && (
        <div className="fixed inset-x-0 bottom-0 z-40 pointer-events-none translate-y-6">
          <LottiePlayer
            key={index}
            src="/confetti big.json"
            className="w-screen"
            fitWidth
            loop={false}
          />
        </div>
      )}

      <div className="max-w-[760px] mx-auto px-4">
        <div
          className="relative w-full h-[340px] [perspective:1000px] cursor-pointer group"
          onClick={toggleFlip}
        >
          {/* Shadow/Depth element */}
          <div className="absolute top-2 inset-x-0 h-full rounded-[22px] bg-black/5 dark:bg-white/5" />
          <div className="absolute top-1 inset-x-0 h-full rounded-[22px] shadow-[0_8px_0_0_rgba(0,0,0,0.15)]" />

          {/* Card Container */}
          <div
            className={cn(
              "relative w-full h-full [transform-style:preserve-3d] transition-all duration-500 ease-out rounded-[22px]"
            )}
            style={{
              transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)",
            }}
          >
            {/* front */}
            <div
              className={cn(
                "absolute inset-0 rounded-[22px] bg-white border-[3px] border-neutral-300 overflow-hidden"
              )}
              style={{ backfaceVisibility: "hidden" }}
            >
              <div className="relative w-full h-full">
                <div
                  className={cn(
                    "absolute inset-x-0 top-0 h-[72%] text-white flex flex-col items-center justify-center gap-3 p-4 text-center",
                    brandColorToBg[brand],
                    BRAND[brand].border600,
                    "border-b-[3px]"
                  )}
                >
                  <div className="text-3xl font-extrabold tracking-wide drop-shadow-sm">
                    {current?.title ?? current?.content?.text ?? ""}
                  </div>
                  {current?.phonetic && (
                    <div className="text-lg opacity-90 font-medium font-mono bg-black/10 px-3 py-1 rounded-full">
                      {current.phonetic}
                    </div>
                  )}
                  {(current?.content?.pronunciationUrl ||
                    current?.content?.url) && (
                    <div className="absolute bottom-4 right-4">
                      <Button
                        variant="primary"
                        aria-label="Play pronunciation"
                        onClick={(e) => {
                          e.stopPropagation();
                          playPronunciation();
                        }}
                      >
                        <Volume2 className="size-6" />
                      </Button>
                    </div>
                  )}
                </div>
                <div className="absolute inset-x-0 bottom-0 h-[28%] bg-neutral-50 flex items-center justify-center text-neutral-400 text-sm font-medium uppercase tracking-widest">
                  Tap to flip
                </div>
              </div>
            </div>

            {/* back */}
            <div
              className="absolute inset-0 rounded-[22px] p-6 bg-white text-neutral-800 border-[3px] border-neutral-300 overflow-y-auto"
              style={{
                backfaceVisibility: "hidden",
                transform: "rotateY(180deg)",
              }}
            >
              {current?.translation && (
                <div className="text-base font-bold mb-2">
                  {current.translation}
                </div>
              )}
              <MediaRenderer
                content={current?.content ?? { kind: "text", text: "" }}
                role="question"
              />
              {current?.examples && current.examples.length > 0 && (
                <div className="mt-3 space-y-1">
                  {current.examples.map((ex, i) => (
                    <div key={i} className="text-sm">
                      • {ex}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {footerVariant === "inline" ? (
        <div className="flex items-center justify-end gap-3 px-4">
          <Button
            variant="green"
            size="md"
            label="I KNOW"
            onClick={handleKnow}
          />
          <Button
            variant="blue"
            size="md"
            label="I LEARN"
            onClick={handleLearn}
          />
        </div>
      ) : (
        <div className="fixed bottom-0 inset-x-0 z-50">
          <div className="bg-white border-t dark:bg-neutral-900 dark:border-neutral-800">
            <div className="max-w-[980px] mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-6">
              <div className="flex items-center gap-3">
                <div className="text-sm font-extrabold">Pilih ingatan</div>
              </div>
              <div className="flex items-center gap-3">
                <Button
                  variant="green"
                  size="md"
                  label="I KNOW"
                  onClick={handleKnow}
                />
                <Button
                  variant="blue"
                  size="md"
                  label="I LEARN"
                  onClick={handleLearn}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
