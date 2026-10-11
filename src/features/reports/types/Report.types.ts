import type { Task, TaskStatus } from "@/constants/TaskData"

// Strings, so they can be used directly as Select values.
export type ReportRange = "7" | "30" | "90"

export interface ReportFilters {
  range: ReportRange
  projectId: string // "all" or a project id
}

export interface ActivityPoint {
  date: string // yyyy-MM-dd
  created: number
  completed: number
}

export interface StatusRow {
  status: TaskStatus
  label: string
  tasks: number
}

export interface WorkloadRow {
  id: string
  name: string
  open: number
  completed: number
}

export interface ProjectProgressRow {
  id: string
  name: string
  color: string
  done: number
  total: number
}

export interface OverdueRow {
  task: Task
  projectName: string
  projectColor: string
  daysOverdue: number
}

// The shape a future GET /reports endpoint should return.
export interface ReportData {
  summary: {
    completed: number
    created: number
    overdue: number
    avgDaysToComplete: number
  }
  activity: ActivityPoint[]
  byStatus: StatusRow[]
  workload: WorkloadRow[]
  projectProgress: ProjectProgressRow[]
  overdue: OverdueRow[]
}