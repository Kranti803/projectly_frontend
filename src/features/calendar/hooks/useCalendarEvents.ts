import { useMemo, useState } from "react"

import type { Task } from "@/constants/TaskData"
import { taskToEvent } from "@/utils/Calendar"
import type { CalendarEvent } from "../types/calendar.types"

export interface CalendarFilterValues {
  projectId: string // "all" or a project id
  assigneeId: string // "all" or a member id
}

const defaultFilters: CalendarFilterValues = { projectId: "all", assigneeId: "all" }

export function useCalendarEvents(tasks: Task[]) {
  const [filters, setFilters] = useState<CalendarFilterValues>(defaultFilters)

  function setFilter<K extends keyof CalendarFilterValues>(key: K, value: CalendarFilterValues[K]) {
    setFilters((prev) => ({ ...prev, [key]: value }))
  }

  const filteredTasks = useMemo(
    () =>
      tasks
        .filter((t) => (filters.projectId === "all" ? true : t.projectId === filters.projectId))
        .filter((t) => (filters.assigneeId === "all" ? true : t.assignee?.id === filters.assigneeId)),
    [tasks, filters]
  )

  const events = useMemo(
    () =>
      filteredTasks.flatMap((task) => {
        const event = taskToEvent(task)
        return event ? [event] : []
      }),
    [filteredTasks]
  )

  const hasActiveFilters = filters.projectId !== "all" || filters.assigneeId !== "all"

  return {
    filters,
    setFilter,
    resetFilters: () => setFilters(defaultFilters),
    hasActiveFilters,
    events: events as CalendarEvent[],
    // Tasks with no due date can't be placed on the calendar.
    unscheduledCount: filteredTasks.length - events.length,
  }
}