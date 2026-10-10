import { Button } from "@/components/ui/button"
// Adjust this path if FilterSelect still lives in features/tasks/components.
import type { CalendarFilterValues } from "@/features/calendar/hooks/useCalendarEvents"
import { FilterSelect } from "@/features/tasks/components/FilterSelect"
import type { SelectOption } from "@/lib/task-options"

interface CalendarFiltersProps {
  filters: CalendarFilterValues
  onFilterChange: <K extends keyof CalendarFilterValues>(key: K, value: CalendarFilterValues[K]) => void
  projects: SelectOption[]
  assignees: SelectOption[]
  hasActiveFilters: boolean
  onReset: () => void
  unscheduledCount: number
}

export function CalendarFilters({
  filters,
  onFilterChange,
  projects,
  assignees,
  hasActiveFilters,
  onReset,
  unscheduledCount,
}: CalendarFiltersProps) {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <FilterSelect
        value={filters.projectId}
        onChange={(v) => onFilterChange("projectId", v)}
        options={projects}
        allLabel="All projects"
        ariaLabel="Filter by project"
      />
      <FilterSelect
        value={filters.assigneeId}
        onChange={(v) => onFilterChange("assigneeId", v)}
        options={assignees}
        allLabel="All assignees"
        ariaLabel="Filter by assignee"
      />
      {hasActiveFilters && (
        <Button variant="ghost" size="sm" onClick={onReset}>
          Clear filters
        </Button>
      )}

      {unscheduledCount > 0 && (
        <p className="ml-auto text-sm text-muted-foreground">
          {unscheduledCount} {unscheduledCount === 1 ? "task has" : "tasks have"} no due date and{" "}
          {unscheduledCount === 1 ? "isn't" : "aren't"} shown.
        </p>
      )}
    </div>
  )
}