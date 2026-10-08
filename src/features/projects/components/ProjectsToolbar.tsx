"use client"

import { LayoutGrid, List, Search } from "lucide-react"

import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import type { ProjectFilters, SortKey } from "../hooks/useProjectFilters"
import type { ProjectStatus } from "@/constants/ProjectData"
import type { Team } from "@/constants/TeamsData"

export type ViewMode = "grid" | "list"

interface ProjectsToolbarProps {
  filters: ProjectFilters
  onFilterChange: <K extends keyof ProjectFilters>(key: K, value: ProjectFilters[K]) => void
  teams: Team[]
  view: ViewMode
  onViewChange: (view: ViewMode) => void
}

export function ProjectsToolbar({
  filters,
  onFilterChange,
  teams,
  view,
  onViewChange,
}: ProjectsToolbarProps) {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <div className="relative min-w-55 flex-1 sm:max-w-xs">
        <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          value={filters.query}
          onChange={(e) => onFilterChange("query", e.target.value)}
          placeholder="Search projects"
          className="pl-9"
          aria-label="Search projects"
        />
      </div>

      <Select
        value={filters.status}
        onValueChange={(v) => onFilterChange("status", v as ProjectStatus | "all")}
      >
        <SelectTrigger className="w-35" aria-label="Filter by status">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All statuses</SelectItem>
          <SelectItem value="active">Active</SelectItem>
          <SelectItem value="archived">Archived</SelectItem>
        </SelectContent>
      </Select>

      <Select
        value={filters.team}
        onValueChange={(v) => v !== null && onFilterChange("team", v)}
      >
        <SelectTrigger className="w-37.5" aria-label="Filter by team">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All teams</SelectItem>
          {teams.map((team) => (
            <SelectItem key={team.id} value={team.id}>
              {team.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select value={filters.sort} onValueChange={(v) => onFilterChange("sort", v as SortKey)}>
        <SelectTrigger className="w-40" aria-label="Sort projects">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="dueDate">Due date</SelectItem>
          <SelectItem value="name">Name</SelectItem>
          <SelectItem value="progress">Progress</SelectItem>
        </SelectContent>
      </Select>

      <ToggleGroup
        value={[view]}
        onValueChange={(values) => {
          const nextView = values[0]
          if (nextView === "grid" || nextView === "list") {
            onViewChange(nextView)
          }
        }}
        variant="outline"
        className="ml-auto"
      >
        <ToggleGroupItem value="grid" aria-label="Grid view">
          <LayoutGrid className="size-4" />
        </ToggleGroupItem>
        <ToggleGroupItem value="list" aria-label="List view">
          <List className="size-4" />
        </ToggleGroupItem>
      </ToggleGroup>
    </div>
  )
}