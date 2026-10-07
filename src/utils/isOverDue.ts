import type { Priority } from "@/constants/DashboardData"
import type { Task } from "@/constants/TaskData"

// Higher number = more important. Used for sorting.
export const priorityRank: Record<Priority, number> = {
  low: 0,
  medium: 1,
  high: 2,
  urgent: 3,
}

// A task is overdue when its due date has passed and it isn't done.
export function isOverdue(task: Task, today = new Date().toISOString().slice(0, 10)) {
  return !!task.dueDate && task.status !== "done" && task.dueDate < today
}