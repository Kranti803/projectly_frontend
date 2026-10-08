"use client"

import { Search } from "lucide-react"

import { Input } from "@/components/ui/input"
import { FilterSelect } from "@/features/tasks/components/FilterSelect";

import type { MemberFilters } from "../hooks/useMemberFilters";
import { type MemberRole, roleOptions, type MemberStatus } from "@/constants/MembersData";
const statusOptions = [
  { value: "active", label: "Active" },
  { value: "pending", label: "Pending" },
]

interface MembersToolbarProps {
  filters: MemberFilters
  onFilterChange: <K extends keyof MemberFilters>(key: K, value: MemberFilters[K]) => void
}

export function MembersToolbar({ filters, onFilterChange }: MembersToolbarProps) {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <div className="relative min-w-55 flex-1 sm:max-w-xs">
        <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          value={filters.query}
          onChange={(e) => onFilterChange("query", e.target.value)}
          placeholder="Search by name or email"
          className="pl-9"
          aria-label="Search members"
        />
      </div>

      <FilterSelect
        value={filters.role}
        onChange={(v) => onFilterChange("role", v as MemberRole | "all")}
        options={roleOptions}
        allLabel="All roles"
        ariaLabel="Filter by role"
        className="w-42.5"
      />

      <FilterSelect
        value={filters.status}
        onChange={(v) => onFilterChange("status", v as MemberStatus | "all")}
        options={statusOptions}
        allLabel="All statuses"
        ariaLabel="Filter by status"
        className="w-37.5"
      />
    </div>
  )
}