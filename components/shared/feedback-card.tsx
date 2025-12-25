"use client";
import { cn } from "@/lib/utils";
import { CheckCircle2, XCircle, Info } from "lucide-react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import type { MediaContent } from "@/lib/quiz/types";
import { MediaRenderer } from "./media-renderer";
import { MarkdownText } from "./markdown-text";

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
      <CheckCircle2 className="size-6 text-emerald-600 dark:text-emerald-400" />
    );
  if (status === "incorrect")
    return <XCircle className="size-6 text-rose-600 dark:text-rose-400" />;
  return <Info className="size-6 text-sky-600 dark:text-sky-400" />;
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
  return (
    <Card className={cn(containerClasses(status), className)}>
      <CardHeader className="flex flex-row items-start gap-3">
        <div className="flex-shrink-0">{iconByStatus(status)}</div>
        <div className="flex-1 space-y-1">
          {title && (
            <CardTitle className="text-card-foreground">
              <MarkdownText text={title} />
            </CardTitle>
          )}
          {message && (
            <CardDescription className="text-muted-foreground">
              <MarkdownText text={message} />
            </CardDescription>
          )}
        </div>
      </CardHeader>
      <CardContent className="space-y-2">
        {explanation && (
          <div className="text-sm text-muted-foreground">
            <MarkdownText text={explanation} />
          </div>
        )}
        {media && (
          <div className="mt-1">
            <MediaRenderer content={media} role="option" />
          </div>
        )}
      </CardContent>
    </Card>
  );
}
