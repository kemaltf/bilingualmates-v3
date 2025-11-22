export type NodeStatus = "completed" | "in_progress" | "locked"

export type NodeKind = "lesson" | "ad"

export interface AdPayload {
  id: string
  provider?: string
  targetingTags?: string[]
  mediaUrl?: string
}

export interface LessonNode {
  id: string
  title: string
  description?: string
  status: NodeStatus
  xpReward: number
  durationSec: number
  kind?: NodeKind
  ad?: AdPayload
}

export interface UnitBadge {
  status: NodeStatus
  title?: string
  xpReward?: number
}

import type { BrandColor } from "@/lib/ui/design-tokens"

export interface Unit {
  id: string
  title: string
  sequence: number
  nodes: LessonNode[]
  badge?: UnitBadge
  brandColor?: BrandColor
}

export interface CurriculumPath {
  id: string
  course: string
  emoji?: string
  color?: string
  imageUrl?: string
  units: Unit[]
}