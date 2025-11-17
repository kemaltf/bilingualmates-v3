export type NodeStatus = "completed" | "in_progress" | "locked"

export interface LessonNode {
  id: string
  title: string
  description?: string
  status: NodeStatus
  xpReward: number
  durationSec: number
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