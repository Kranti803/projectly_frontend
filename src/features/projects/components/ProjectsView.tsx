"use client"

import { useState } from "react"
import { FolderKanban, Plus, SearchX } from "lucide-react"
import { Button } from "@/components/ui/button"
import { projectColors, type Project } from "@/constants/ProjectData"
import { teams } from "@/constants/TeamsData"
import { ProjectsToolbar, type ViewMode } from "./ProjectsToolbar"
import { useProjectFilters } from "../hooks/useProjectFilters"
import { ProjectFormDialog, type ProjectFormValues } from "./ProjectFormDialog"
import { PageHeader } from "@/components/common/PageHeader"
import { EmptyState } from "@/components/common/EmptyState"
import { ProjectCard } from "./ProjectCard"
import { SimplePagination } from "@/components/common/SimplePagination"
import { ProjectRow } from "./ProjectRow"


interface ProjectsViewProps {
  initialProjects: Project[]
}

export function ProjectsView({ initialProjects }: ProjectsViewProps) {
  const [projects, setProjects] = useState(initialProjects)
  const [dialogOpen, setDialogOpen] = useState(false)
  const [view, setView] = useState<ViewMode>("grid")

  const { filters, setFilter, resetFilters, hasActiveFilters, items, totalCount, page, setPage, totalPages } =
    useProjectFilters(projects)

  // TODO: replace with an API call (POST /projects) and refetch or update the cache.
  function handleCreate(values: ProjectFormValues) {
    const project: Project = {
      id: `p${Date.now()}`,
      name: values.name,
      description: values.description,
      status: "active",
      progress: 0,
      dueDate: values.dueDate || new Date().toISOString().slice(0, 10),
      teamId: values.teamId,
      color: values.color,
      members: [],
    }
    setProjects((prev) => [project, ...prev])
  }

  const newProjectButton = (
    <Button onClick={() => setDialogOpen(true)}>
      <Plus className="size-4" />
      New project
    </Button>
  )

  return (
    <div className="mx-auto max-w-7xl space-y-6 p-4">
      <PageHeader
        title="Projects"
        description="Everything your teams are working on."
        actions={newProjectButton}
      />

      {projects.length === 0 ? (
        <EmptyState
          icon={FolderKanban}
          title="No projects yet"
          description="Create your first project to get started."
          action={newProjectButton}
        />
      ) : (
        <>
          <ProjectsToolbar
            filters={filters}
            onFilterChange={setFilter}
            teams={teams}
            view={view}
            onViewChange={setView}
          />

          {totalCount === 0 ? (
            <EmptyState
              icon={SearchX}
              title="No matching projects"
              description="Try a different search or clear your filters."
              action={
                hasActiveFilters ? (
                  <Button variant="outline" onClick={resetFilters}>
                    Clear filters
                  </Button>
                ) : undefined
              }
            />
          ) : view === "grid" ? (
            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
              {items.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>
          ) : (
            <div className="space-y-3">
              {items.map((project) => (
                <ProjectRow key={project.id} project={project} />
              ))}
            </div>
          )}

          <SimplePagination page={page} totalPages={totalPages} onPageChange={setPage} />
        </>
      )}

      <ProjectFormDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        teams={teams}
        colors={projectColors}
        onSubmit={handleCreate}
      />
    </div>
  )
}