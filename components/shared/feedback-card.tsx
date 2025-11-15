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
    return <CheckCircle2 className="size-6 text-emerald-600" />;
  if (status === "incorrect")
    return <XCircle className="size-6 text-rose-600" />;
  return <Info className="size-6 text-sky-600" />;
}

function containerClasses(status: FeedbackStatus) {
  if (status === "correct") return "bg-emerald-50 border-emerald-200";
  if (status === "incorrect") return "bg-rose-50 border-rose-200";
  return "bg-sky-50 border-sky-200";
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
          {title && <CardTitle>{title}</CardTitle>}
          {message && (
            <CardDescription className="text-neutral-700">
              {message}
            </CardDescription>
          )}
        </div>
      </CardHeader>
      <CardContent className="space-y-2">
        {explanation && (
          <div className="text-sm text-neutral-600">{explanation}</div>
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
