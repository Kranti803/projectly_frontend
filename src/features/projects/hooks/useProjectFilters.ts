"use client";

import { useMemo, useState } from "react";
import type { Project, ProjectStatus } from "@/constants/ProjectData";
export type SortKey = "name" | "dueDate" | "progress";

export interface ProjectFilters {
  query: string;
  status: ProjectStatus | "all";
  team: string; // "all" or a team name
  sort: SortKey;
}

const defaultFilters: ProjectFilters = {
  query: "",
  status: "all",
  team: "all",
  sort: "dueDate",
};

export function useProjectFilters(projects: Project[], pageSize = 9) {
  const [filters, setFilters] = useState<ProjectFilters>(defaultFilters);
  const [page, setPage] = useState(1);

  // Changing any filter sends the user back to page 1.
  function setFilter<K extends keyof ProjectFilters>(
    key: K,
    value: ProjectFilters[K],
  ) {
    setFilters((prev) => ({ ...prev, [key]: value }));
    setPage(1);
  }

  function resetFilters() {
    setFilters(defaultFilters);
    setPage(1);
  }

  const filtered = useMemo(() => {
    const q = filters.query.trim().toLowerCase();

    return projects
      .filter((p) =>
        filters.status === "all" ? true : p.status === filters.status,
      )
      .filter((p) => (filters.team === "all" ? true : p.team === filters.team))
      .filter((p) =>
        q ? `${p.name} ${p.description}`.toLowerCase().includes(q) : true,
      )
      .sort((a, b) => {
        switch (filters.sort) {
          case "name":
            return a.name.localeCompare(b.name);
          case "progress":
            return b.progress - a.progress;
          case "dueDate":
            return a.dueDate.localeCompare(b.dueDate);
        }
      });
  }, [projects, filters]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const currentPage = Math.min(page, totalPages);
  const items = filtered.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize,
  );

  const hasActiveFilters =
    filters.query !== "" || filters.status !== "all" || filters.team !== "all";

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
  };
}
