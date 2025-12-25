"use client";

import * as React from "react";
import type { TheoryQuestion } from "@/lib/quiz/types";
import { cn } from "@/lib/utils";
import { MediaRenderer } from "../media-renderer";

interface TheoryQuestionCardProps {
  question: TheoryQuestion;
}

export function TheoryQuestionCard({ question }: TheoryQuestionCardProps) {
  // Check if we are using the new blocks format
  const hasBlocks = question.blocks && question.blocks.length > 0;

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Title */}
      {question.title && (
        <h2 className="text-2xl sm:text-3xl font-bold text-neutral-900 dark:text-white tracking-tight">
          {question.title}
        </h2>
      )}

      {/* New Flexible Block Rendering */}
      {hasBlocks ? (
        <div className="space-y-8">
          {question.blocks!.map((block, index) => {
            switch (block.kind) {
              case "text":
                return (
                  <div
                    key={index}
                    className="prose dark:prose-invert max-w-none text-neutral-700 dark:text-neutral-300 leading-relaxed text-lg"
                  >
                    <div dangerouslySetInnerHTML={{ __html: block.html! }} />
                  </div>
                );
              case "image":
                return (
                  <div
                    key={index}
                    className="group relative rounded-2xl overflow-hidden bg-neutral-100 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 shadow-sm"
                  >
                    <MediaRenderer
                      content={{
                        kind: block.kind,
                        url: block.url,
                        alt: block.caption,
                      }}
                      role="question"
                      autoPlay={false}
                      className="w-full max-h-[500px] object-cover"
                    />
                    {block.caption && (
                      <div className="absolute bottom-0 inset-x-0 p-3 text-sm text-center text-white bg-black/60 backdrop-blur-sm">
                        {block.caption}
                      </div>
                    )}
                  </div>
                );
              case "video":
                return (
                  <div
                    key={index}
                    className="group relative rounded-2xl overflow-hidden bg-neutral-100 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 shadow-sm"
                  >
                    <MediaRenderer
                      content={{
                        kind: block.kind,
                        url: block.url,
                        alt: block.caption,
                      }}
                      role="question"
                      className="w-full"
                    />
                    {block.caption && (
                      <div className="p-3 text-sm text-center text-neutral-600 dark:text-neutral-400 bg-neutral-50 dark:bg-neutral-900 border-t border-neutral-200 dark:border-neutral-700">
                        {block.caption}
                      </div>
                    )}
                  </div>
                );
              case "audio":
                return (
                  <div key={index} className="space-y-3">
                    {block.samples.map((sample, i) => (
                      <MediaRenderer
                        key={i}
                        content={{
                          kind: "audio",
                          url: sample.audioUrl,
                          text: sample.text,
                          translation: sample.translation,
                        }}
                        role="question"
                        className="w-full"
                      />
                    ))}
                  </div>
                );
              default:
                return null;
            }
          })}
        </div>
      ) : (
        /* Legacy Rendering (Media -> Content -> Audio) */
        <>
          {/* Media Gallery */}
          {question.media && question.media.length > 0 && (
            <div
              className={cn(
                "grid gap-4",
                question.media.length > 1
                  ? "grid-cols-1 sm:grid-cols-2"
                  : "grid-cols-1"
              )}
            >
              {question.media.map((m, i) => (
                <div
                  key={i}
                  className="group relative rounded-2xl overflow-hidden bg-neutral-100 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 shadow-sm"
                >
                  <MediaRenderer
                    content={{
                      kind: m.kind,
                      url: m.url,
                      alt: m.caption,
                    }}
                    role="question"
                    className="w-full h-full object-cover"
                  />
                  {m.caption && (
                    <div className="absolute bottom-0 inset-x-0 p-3 text-sm text-center text-white bg-black/60 backdrop-blur-sm">
                      {m.caption}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* Content */}
          {question.content && (
            <div className="prose dark:prose-invert max-w-none text-neutral-700 dark:text-neutral-300 leading-relaxed text-lg">
              <div dangerouslySetInnerHTML={{ __html: question.content }} />
            </div>
          )}

          {/* Audio Samples */}
          {question.audioSamples && question.audioSamples.length > 0 && (
            <div className="space-y-3 pt-6">
              {question.audioSamples.map((sample, i) => (
                <MediaRenderer
                  key={i}
                  content={{
                    kind: "audio",
                    url: sample.audioUrl,
                    text: sample.text,
                    translation: sample.translation,
                  }}
                  role="question"
                  className="w-full"
                />
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}
