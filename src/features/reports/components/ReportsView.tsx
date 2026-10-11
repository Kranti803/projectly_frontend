import { useMemo } from "react"
import { AlertTriangle, CheckCircle2, ListPlus, Timer } from "lucide-react"

import { PageHeader } from "@/components/common/PageHeader"
import type { Project } from "@/constants/ProjectData"
import type { Task } from "@/constants/TaskData"
import { StatCard } from "@/features/dashboard/components/StatCard"
import { useReport } from "./UserReport"
import { rangeOptions } from "@/constants/ReportsData"
import { downloadCsv } from "@/lib/csv"
import { getProjectOptions } from "@/lib/task-options"
import { reportToCsv } from "@/utils/report-utils"
import { CompletionTrendChart } from "./CompletionTrendChart"
import { OverdueTasksTable } from "./OverdueTaskTable"
import { ProjectProgressList } from "./ProjectProgressList"
import { ReportsToolbar } from "./ReportsToolbar"
import { StatusBreakdownChart } from "./StatusBreakDownChart"
import { WorkloadChart } from "./WorkloadChart"

interface ReportsViewProps {
  tasks: Task[]
  projects: Project[]
}

export function ReportsView({ tasks, projects }: ReportsViewProps) {
  const { filters, setFilter, report } = useReport(tasks, projects)
  const projectOptions = useMemo(() => getProjectOptions(projects), [projects])
  const rangeLabel = rangeOptions.find((o) => o.value === filters.range)?.label ?? ""

  function handleExport() {
    downloadCsv("projectly-report.csv", reportToCsv(report, rangeLabel))
  }

  return (
    <div className="mx-auto max-w-7xl space-y-6">
      <PageHeader
        title="Reports"
        description="How work is moving across your projects."
      />

      <ReportsToolbar
        filters={filters}
        onFilterChange={setFilter}
        projects={projectOptions}
        onExport={handleExport}
      />

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label={`Completed (${rangeLabel.toLowerCase()})`} value={report.summary.completed} icon={CheckCircle2} />
        <StatCard label={`Created (${rangeLabel.toLowerCase()})`} value={report.summary.created} icon={ListPlus} />
        <StatCard label="Overdue now" value={report.summary.overdue} icon={AlertTriangle} />
        <StatCard
          label="Avg. time to complete"
          value={`${report.summary.avgDaysToComplete.toFixed(1)} days`}
          icon={Timer}
        />
      </section>

      <section className="grid gap-6 lg:grid-cols-3">
        <CompletionTrendChart data={report.activity} />
        <StatusBreakdownChart data={report.byStatus} />
      </section>

      <section className="grid gap-6 lg:grid-cols-2">
        <WorkloadChart data={report.workload} />
        <ProjectProgressList data={report.projectProgress} />
      </section>

      <section className="grid gap-6 lg:grid-cols-2">
        <OverdueTasksTable rows={report.overdue} />
      </section>
    </div>
  )
}