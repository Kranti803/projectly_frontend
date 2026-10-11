import { differenceInCalendarDays, format } from "date-fns"

import type { Project } from "@/constants/ProjectData"
import { columns, statusLabels, type Task } from "@/constants/TaskData"
import { parseDueDate, toDueDate } from "./Calendar"
import type { ActivityPoint, OverdueRow, ProjectProgressRow, ReportData, WorkloadRow } from "@/features/reports/types/Report.types"
import { type CsvCell, toCsv } from "@/lib/csv"


export function formatShortDate(iso: string) {
  return format(parseDueDate(iso), "MMM d")
}

interface BuildReportInput {
  tasks: Task[] // already limited to the selected project
  projects: Project[] // the same project scope
  activity: { points: ActivityPoint[]; avgDaysToComplete: number }
  today?: Date
}

// Turns tasks into everything the Reports page shows.
// TODO: when the backend exists, these become aggregation pipelines and this file shrinks.
export function buildReport({ tasks, projects, activity, today = new Date() }: BuildReportInput): ReportData {
  const todayIso = toDueDate(today)
  const projectsById = new Map(projects.map((p) => [p.id, p]))

  const byStatus = columns.map((column) => ({
    status: column.id,
    label: statusLabels[column.id],
    tasks: tasks.filter((t) => t.status === column.id).length,
  }))

  const workloadById = new Map<string, WorkloadRow>()
  for (const task of tasks) {
    const id = task.assignee?.id ?? "unassigned"
    const row = workloadById.get(id) ?? {
      id,
      name: task.assignee?.name ?? "Unassigned",
      open: 0,
      completed: 0,
    }
    if (task.status === "done") row.completed++
    else row.open++
    workloadById.set(id, row)
  }
  const workload = [...workloadById.values()].sort(
    (a, b) => b.open - a.open || b.completed - a.completed
  )

  const projectProgress = projects.flatMap<ProjectProgressRow>((project) => {
    const projectTasks = tasks.filter((t) => t.projectId === project.id)
    if (projectTasks.length === 0) return []
    return [
      {
        id: project.id,
        name: project.name,
        color: project.color,
        done: projectTasks.filter((t) => t.status === "done").length,
        total: projectTasks.length,
      },
    ]
  })

  const overdue: OverdueRow[] = tasks
    .filter((t) => t.dueDate && t.status !== "done" && t.dueDate < todayIso)
    .sort((a, b) => (a.dueDate as string).localeCompare(b.dueDate as string))
    .map((task) => {
      const project = projectsById.get(task.projectId)
      return {
        task,
        projectName: project?.name ?? "Unknown",
        projectColor: project?.color ?? "#94a3b8",
        daysOverdue: differenceInCalendarDays(today, parseDueDate(task.dueDate as string)),
      }
    })

  return {
    summary: {
      completed: activity.points.reduce((sum, p) => sum + p.completed, 0),
      created: activity.points.reduce((sum, p) => sum + p.created, 0),
      overdue: overdue.length,
      avgDaysToComplete: activity.avgDaysToComplete,
    },
    activity: activity.points,
    byStatus,
    workload,
    projectProgress,
    overdue,
  }
}

// One CSV with a titled block per section, separated by blank lines.
export function reportToCsv(report: ReportData, rangeLabel: string) {
  const rows: CsvCell[][] = [
    ["Projectly report"],
    ["Range", rangeLabel],
    [],
    ["Summary"],
    ["Metric", "Value"],
    ["Tasks completed", report.summary.completed],
    ["Tasks created", report.summary.created],
    ["Overdue tasks", report.summary.overdue],
    ["Average days to complete", report.summary.avgDaysToComplete.toFixed(1)],
    [],
    ["Daily activity"],
    ["Date", "Created", "Completed"],
    ...report.activity.map((p) => [p.date, p.created, p.completed]),
    [],
    ["Workload"],
    ["Member", "Open", "Completed"],
    ...report.workload.map((w) => [w.name, w.open, w.completed]),
    [],
    ["Project progress"],
    ["Project", "Done", "Total"],
    ...report.projectProgress.map((p) => [p.name, p.done, p.total]),
    [],
    ["Overdue tasks"],
    ["Task", "Project", "Due date", "Days overdue"],
    ...report.overdue.map((o) => [o.task.title, o.projectName, o.task.dueDate ?? "", o.daysOverdue]),
  ]
  return toCsv(rows)
}