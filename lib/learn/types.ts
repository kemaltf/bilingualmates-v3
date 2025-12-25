import type { QuizQuestion } from "@/lib/quiz/types";

export type NodeStatus = "completed" | "in_progress" | "locked";

export type NodeKind = "lesson" | "ad";

export interface AdPayload {
  id: string;
  provider?: string;
  targetingTags?: string[];
  mediaUrl?: string;
}

export interface LessonNode {
  id: string;
  title: string;
  description?: string;
  status: NodeStatus;
  xpReward: number;
  durationSec: number;
  kind?: NodeKind;
  ad?: AdPayload;
  finish?: LessonFinishMeta;
  quizQuestions?: QuizQuestion[];
}

export interface UnitBadge {
  status: NodeStatus;
  title?: string;
  xpReward?: number;
}

import type { BrandColor } from "@/lib/ui/design-tokens";

export interface Unit {
  id: string;
  title: string;
  description?: string;
  sequence: number;
  nodes: LessonNode[];
  badge?: UnitBadge;
  brandColor?: BrandColor;
}

export interface Course {
  id: string;
  title: string;
  flagUrl: string;
  description?: string;
  paths: CurriculumPath[];
}

export interface Section {
  id: string;
  title: string;
  description?: string;
  sequence: number;
  units: Unit[];
}

export interface CurriculumPath {
  id: string;
  course: string;
  emoji?: string;
  color?: string;
  imageUrl?: string;
  sections: Section[];
  price?: number;
  currency?: string;
  description?: string;
  learningPoints?: string[];
  estimatedTime?: string;
  studentsCount?: number;
  difficulty?: "Beginner" | "Intermediate" | "Advanced";
  certificate?: boolean;
  language?: string;
  subtitles?: string[];
  videoUrl?: string;
  originalPrice?: number;
  badgeImg?: string;
  certificateImg?: string;
}

export type FinishAnimationKind = "lottie" | "image" | "gif";

export interface LessonFinishAnimation {
  kind: FinishAnimationKind;
  src: string;
  fallbackSrc?: string;
}

export interface LessonFinishMeta {
  animation?: LessonFinishAnimation;
  praise?: string;
}
