"use client"

import { columns, currentUserId, type Priority, type Task, type TaskStatus } from "@/constants/TaskData"
import { priorityRank } from "@/utils/isOverDue"
import { useMemo, useState } from "react"


export type TaskSortKey = "dueDate" | "priority" | "title" | "status"

export interface TaskFilters {
  query: string
  status: TaskStatus | "all"
  priority: Priority | "all"
  projectId: string // "all" or a project id
  assigneeId: string // "all" or a member id
  mine: boolean // only tasks assigned to the current user
  sort: TaskSortKey
}

const defaultFilters: TaskFilters = {
  query: "",
  status: "all",
  priority: "all",
  projectId: "all",
  assigneeId: "all",
  mine: false,
  sort: "dueDate",
}

const statusOrder = (task: Task) => columns.findIndex((c) => c.id === task.status)

export function useTaskFilters(tasks: Task[], pageSize = 10) {
  const [filters, setFilters] = useState<TaskFilters>(defaultFilters)
  const [page, setPage] = useState(1)

  // Changing any filter sends the user back to page 1.
  function setFilter<K extends keyof TaskFilters>(key: K, value: TaskFilters[K]) {
    setFilters((prev) => ({ ...prev, [key]: value }))
    setPage(1)
  }

  function resetFilters() {
    setFilters(defaultFilters)
    setPage(1)
  }

  const filtered = useMemo(() => {
    const q = filters.query.trim().toLowerCase()

    return tasks
      .filter((t) => (filters.status === "all" ? true : t.status === filters.status))
      .filter((t) => (filters.priority === "all" ? true : t.priority === filters.priority))
      .filter((t) => (filters.projectId === "all" ? true : t.projectId === filters.projectId))
      .filter((t) => (filters.assigneeId === "all" ? true : t.assignee?.id === filters.assigneeId))
      .filter((t) => (filters.mine ? t.assignee?.id === currentUserId : true))
      .filter((t) => (q ? t.title.toLowerCase().includes(q) : true))
      .sort((a, b) => {
        switch (filters.sort) {
          case "title":
            return a.title.localeCompare(b.title)
          case "priority":
            return priorityRank[b.priority] - priorityRank[a.priority]
          case "status":
            return statusOrder(a) - statusOrder(b)
          case "dueDate":
            // Tasks without a due date go last.
            if (!a.dueDate && !b.dueDate) return 0
            if (!a.dueDate) return 1
            if (!b.dueDate) return -1
            return a.dueDate.localeCompare(b.dueDate)
        }
      })
  }, [tasks, filters])

  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize))
  const currentPage = Math.min(page, totalPages)
  const items = filtered.slice((currentPage - 1) * pageSize, currentPage * pageSize)

  const hasActiveFilters =
    filters.query !== "" ||
    filters.status !== "all" ||
    filters.priority !== "all" ||
    filters.projectId !== "all" ||
    filters.assigneeId !== "all" ||
    filters.mine

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