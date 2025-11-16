export type NodeStatus = "completed" | "in_progress" | "locked"

export interface LessonNode {
  id: string
  title: string
  description?: string
  status: NodeStatus
  xpReward: number
  durationSec: number
}

export interface Unit {
  id: string
  title: string
  sequence: number
  nodes: LessonNode[]
}

export interface CurriculumPath {
  id: string
  name: string
  emoji?: string
  color?: string
  units: Unit[]
}