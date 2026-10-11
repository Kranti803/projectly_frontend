import { Download } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { rangeOptions } from "@/constants/ReportsData"
import { FilterSelect } from "@/features/tasks/components/FilterSelect"
import type { SelectOption } from "@/lib/task-options"
import type { ReportFilters, ReportRange } from "../types/Report.types"

interface ReportsToolbarProps {
  filters: ReportFilters
  onFilterChange: <K extends keyof ReportFilters>(key: K, value: ReportFilters[K]) => void
  projects: SelectOption[]
  onExport: () => void
}

export function ReportsToolbar({ filters, onFilterChange, projects, onExport }: ReportsToolbarProps) {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <Select
        value={filters.range}
        onValueChange={(v) => onFilterChange("range", v as ReportRange)}
      >
        <SelectTrigger className="w-37.5" aria-label="Date range">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {rangeOptions.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <FilterSelect
        value={filters.projectId}
        onChange={(v) => onFilterChange("projectId", v)}
        options={projects}
        allLabel="All projects"
        ariaLabel="Filter by project"
      />

      <Button variant="outline" className="ml-auto" onClick={onExport}>
        <Download className="size-4" />
        Export CSV
      </Button>
    </div>
  )
}