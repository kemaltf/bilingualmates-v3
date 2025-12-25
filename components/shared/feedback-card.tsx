"use client";
import * as React from "react";
import { cn } from "@/lib/utils";
import {
  CheckCircle2,
  XCircle,
  Info,
  Maximize2,
  Flag,
  MessageSquare,
  Share2,
} from "lucide-react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import type { MediaContent } from "@/lib/quiz/types";
import { MediaRenderer } from "./media-renderer";
import { MarkdownText } from "./markdown-text";
import { motion, AnimatePresence } from "framer-motion";

type FeedbackStatus = "correct" | "incorrect" | "info";

export interface FeedbackCardProps {
  status: FeedbackStatus;
  title?: string;
  message?: string;
  explanation?: string;
  media?: MediaContent;
  className?: string;
}

function iconByStatus(status: FeedbackStatus) {
  if (status === "correct")
    return (
      <CheckCircle2 className="size-6 sm:size-8 text-emerald-600 dark:text-emerald-400" />
    );
  if (status === "incorrect")
    return (
      <XCircle className="size-6 sm:size-8 text-rose-600 dark:text-rose-400" />
    );
  return <Info className="size-6 sm:size-8 text-sky-600 dark:text-sky-400" />;
}

function containerClasses(status: FeedbackStatus) {
  if (status === "correct")
    return "bg-emerald-50 dark:bg-emerald-900/40 border-emerald-200 dark:border-emerald-700";
  if (status === "incorrect")
    return "bg-rose-50 dark:bg-rose-900/40 border-rose-200 dark:border-rose-700";
  return "bg-sky-50 dark:bg-sky-900/40 border-sky-200 dark:border-sky-700";
}

export function FeedbackCard({
  status,
  title,
  message,
  explanation,
  media,
  className,
}: FeedbackCardProps) {
  const [isExpanded, setIsExpanded] = React.useState(false);

  // If no detailed explanation/media, don't allow expansion
  const canExpand = !!(explanation || media);

  const toggleExpand = () => {
    if (canExpand) setIsExpanded(!isExpanded);
  };

  return (
    <>
      {/* Short Mode (Default) */}
      <motion.div
        layoutId="feedback-card"
        className={cn(
          "relative rounded-xl border-2 p-4 cursor-pointer transition-colors",
          containerClasses(status),
          canExpand && "hover:bg-opacity-80 active:scale-[0.98]",
          className
        )}
        onClick={toggleExpand}
      >
        <div className="flex flex-row items-center gap-4">
          <div className="flex-shrink-0">{iconByStatus(status)}</div>
          <div className="flex-1 min-w-0">
            {title && (
              <h3 className="text-lg font-bold text-foreground truncate">
                <MarkdownText text={title} />
              </h3>
            )}
            {message && (
              <p className="text-sm text-muted-foreground truncate">
                <MarkdownText text={message} />
              </p>
            )}
          </div>
          {canExpand && (
            <div className="flex-shrink-0 text-muted-foreground/60">
              <Maximize2 className="size-5" />
            </div>
          )}
        </div>
      </motion.div>

      {/* Expanded Mode (Full Screen) */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center bg-black/60 p-4 backdrop-blur-sm"
            onClick={toggleExpand}
          >
            <motion.div
              layoutId="feedback-card"
              className={cn(
                "w-full max-w-lg overflow-hidden rounded-2xl bg-background shadow-2xl ring-1 ring-border",
                // Re-apply border colors for consistency
                status === "correct" &&
                  "ring-emerald-200 dark:ring-emerald-700",
                status === "incorrect" && "ring-rose-200 dark:ring-rose-700",
                status === "info" && "ring-sky-200 dark:ring-sky-700"
              )}
              onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside
            >
              <div
                className={cn("p-6", containerClasses(status), "border-b-0")}
              >
                <div className="flex flex-row items-start gap-4">
                  <div className="flex-shrink-0 mt-1">
                    {iconByStatus(status)}
                  </div>
                  <div className="flex-1 space-y-1">
                    {title && (
                      <h2 className="text-xl sm:text-2xl font-black tracking-tight text-foreground">
                        <MarkdownText text={title} />
                      </h2>
                    )}
                    {message && (
                      <div className="text-base font-medium text-muted-foreground">
                        <MarkdownText text={message} />
                      </div>
                    )}
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="flex-shrink-0 -mr-2 -mt-2 rounded-full hover:bg-black/5 dark:hover:bg-white/5"
                    onClick={toggleExpand}
                  >
                    <XCircle className="size-6 text-muted-foreground" />
                  </Button>
                </div>
              </div>

              <div className="p-6 space-y-6 bg-background">
                {explanation && (
                  <div className="space-y-2">
                    <h4 className="text-sm font-bold uppercase tracking-wider text-muted-foreground">
                      Explanation
                    </h4>
                    <div className="text-base leading-relaxed text-foreground/90">
                      <MarkdownText text={explanation} />
                    </div>
                  </div>
                )}

                {media && (
                  <div className="rounded-xl overflow-hidden border bg-muted/30 p-2">
                    <MediaRenderer content={media} role="option" />
                  </div>
                )}

                <div className="flex items-center justify-between pt-4 border-t">
                  <div className="flex gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-muted-foreground gap-2"
                    >
                      <Flag className="size-4" />
                      Report
                    </Button>
                  </div>
                  <Button variant="primary" size="sm" onClick={toggleExpand}>
                    Got it
                  </Button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
