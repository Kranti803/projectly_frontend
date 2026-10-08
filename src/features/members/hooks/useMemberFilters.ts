"use client"

import type { MemberRole, MemberStatus, OrgMember } from "@/constants/MembersData"
import { useMemo, useState } from "react"


export interface MemberFilters {
  query: string
  role: MemberRole | "all"
  status: MemberStatus | "all"
}

const defaultFilters: MemberFilters = { query: "", role: "all", status: "all" }

export function useMemberFilters(members: OrgMember[], pageSize = 10) {
  const [filters, setFilters] = useState<MemberFilters>(defaultFilters)
  const [page, setPage] = useState(1)

  // Changing any filter sends the user back to page 1.
  function setFilter<K extends keyof MemberFilters>(key: K, value: MemberFilters[K]) {
    setFilters((prev) => ({ ...prev, [key]: value }))
    setPage(1)
  }

  function resetFilters() {
    setFilters(defaultFilters)
    setPage(1)
  }

  const filtered = useMemo(() => {
    const q = filters.query.trim().toLowerCase()

    return members
      .filter((m) => (filters.role === "all" ? true : m.role === filters.role))
      .filter((m) => (filters.status === "all" ? true : m.status === filters.status))
      .filter((m) => (q ? `${m.name ?? ""} ${m.email}`.toLowerCase().includes(q) : true))
      .sort((a, b) => {
        // Active members first, then alphabetical.
        if (a.status !== b.status) return a.status === "active" ? -1 : 1
        return (a.name ?? a.email).localeCompare(b.name ?? b.email)
      })
  }, [members, filters])

  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize))
  const currentPage = Math.min(page, totalPages)
  const items = filtered.slice((currentPage - 1) * pageSize, currentPage * pageSize)

  const hasActiveFilters = filters.query !== "" || filters.role !== "all" || filters.status !== "all"

  return {
    filters,
    setFilter,
    resetFilters,
    hasActiveFilters,
    items,
    totalCount: filtered.length,
    page: currentPage,
    setPage,
    totalPages,
  }
}