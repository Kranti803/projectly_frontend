// Mock data. The real version of getActivityMock is a server-side aggregation (see the TODO below).

import type { ReportRange, ActivityPoint } from "@/features/reports/types/Report.types";
import { toDueDate } from "@/utils/Calendar";

export const rangeOptions: { value: ReportRange; label: string }[] = [
  { value: "7", label: "Last 7 days" },
  { value: "30", label: "Last 30 days" },
  { value: "90", label: "Last 90 days" },
]

// Creates a smooth, repeatable "tasks created and completed per day" series.
// TODO: replace with GET /reports/activity?days=30&projectId=...
// On the backend this is a MongoDB aggregation grouped by day, scoped to the organization.
export function getActivityMock(days: number, projectId: string) {
  // A different seed per project makes each project's chart look different.
  const seed = projectId === "all" ? 0 : [...projectId].reduce((sum, char) => sum + char.charCodeAt(0), 0)
  const scale = projectId === "all" ? 1 : 0.4
  const today = new Date()

  const points: ActivityPoint[] = Array.from({ length: days }, (_, i) => {
    const date = new Date(today)
    date.setDate(today.getDate() - (days - 1 - i))

    const created = (3 + Math.sin((i + seed) / 3) * 2 + ((i * 7 + seed) % 3)) * scale
    const completed = (2.5 + Math.cos((i + seed) / 4) * 2 + ((i * 5 + seed) % 3)) * scale

    return {
      date: toDueDate(date),
      created: Math.max(0, Math.round(created)),
      completed: Math.max(0, Math.round(completed)),
    }
  })

  const avgDaysToComplete = projectId === "all" ? 3.4 : 2.8 + (seed % 5) / 10
  return { points, avgDaysToComplete }
}