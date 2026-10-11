import { useMemo, useState } from "react"

import type { Project } from "@/constants/ProjectData"
import { getActivityMock } from "@/constants/ReportsData"
import type { Task } from "@/constants/TaskData"
import { buildReport } from "@/utils/report-utils"
import type { ReportFilters } from "../types/Report.types"

const defaultFilters: ReportFilters = { range: "30", projectId: "all" }

export function useReport(tasks: Task[], projects: Project[]) {
  const [filters, setFilters] = useState<ReportFilters>(defaultFilters)

  function setFilter<K extends keyof ReportFilters>(key: K, value: ReportFilters[K]) {
    setFilters((prev) => ({ ...prev, [key]: value }))
  }

  // TODO: replace with a TanStack Query call that sends `filters` to the API.
  const report = useMemo(() => {
    const inScope = filters.projectId === "all"
    return buildReport({
      tasks: inScope ? tasks : tasks.filter((t) => t.projectId === filters.projectId),
      projects: inScope ? projects : projects.filter((p) => p.id === filters.projectId),
      activity: getActivityMock(Number(filters.range), filters.projectId),
    })
  }, [tasks, projects, filters])

  return { filters, setFilter, report }
}