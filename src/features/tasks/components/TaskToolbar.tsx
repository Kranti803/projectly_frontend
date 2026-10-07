"use client"

import { Search, User } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { FilterSelect } from "./FilterSelect"
import { columns, statusLabels, type Priority, type TaskStatus } from "@/constants/TaskData"
import type { TaskFilters, TaskSortKey } from "../hooks/useTaskFilter"

interface Option {
  value: string
  label: string
}

const statusOptions: Option[] = columns.map((c) => ({ value: c.id, label: statusLabels[c.id] }))

const priorityOptions: Option[] = [
  { value: "urgent", label: "Urgent" },
  { value: "high", label: "High" },
  { value: "medium", label: "Medium" },
  { value: "low", label: "Low" },
]

interface TasksToolbarProps {
  filters: TaskFilters
  onFilterChange: <K extends keyof TaskFilters>(key: K, value: TaskFilters[K]) => void
  projects: Option[]
  assignees: Option[]
}

export function TasksToolbar({ filters, onFilterChange, projects, assignees }: TasksToolbarProps) {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <div className="relative min-w-55 flex-1 sm:max-w-xs">
        <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          value={filters.query}
          onChange={(e) => onFilterChange("query", e.target.value)}
          placeholder="Search tasks"
          className="pl-9"
          aria-label="Search tasks"
        />
      </div>

      <FilterSelect
        value={filters.status}
        onChange={(v) => onFilterChange("status", v as TaskStatus | "all")}
        options={statusOptions}
        allLabel="All statuses"
        ariaLabel="Filter by status"
        className="w-35"
      />

      <FilterSelect
        value={filters.priority}
        onChange={(v) => onFilterChange("priority", v as Priority | "all")}
        options={priorityOptions}
        allLabel="All priorities"
        ariaLabel="Filter by priority"
        className="w-35"
      />

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

      <Select value={filters.sort} onValueChange={(v) => onFilterChange("sort", v as TaskSortKey)}>
        <SelectTrigger className="w-37.5" aria-label="Sort tasks">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="dueDate">Due date</SelectItem>
          <SelectItem value="priority">Priority</SelectItem>
          <SelectItem value="status">Status</SelectItem>
          <SelectItem value="title">Title</SelectItem>
        </SelectContent>
      </Select>

      <Button
        variant={filters.mine ? "default" : "outline"}
        aria-pressed={filters.mine}
        onClick={() => onFilterChange("mine", !filters.mine)}
        className="ml-auto"
      >
        <User className="size-4" />
        Assigned to me
      </Button>
    </div>
  )
}