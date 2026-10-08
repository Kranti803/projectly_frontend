import { EmptyState } from "@/components/common/EmptyState"
import type { Project } from "@/constants/ProjectData"
import { ProjectCard } from "@/features/projects/components/ProjectCard"
import { FolderKanban } from "lucide-react"



export function TeamProjectsGrid({ projects }: { projects: Project[] }) {
  if (projects.length === 0) {
    return (
      <EmptyState
        icon={FolderKanban}
        title="No projects yet"
        description="Projects assigned to this team will show up here."
      />
    )
  }

  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
      {projects.map((project) => (
        <ProjectCard key={project.id} project={project} />
      ))}
    </div>
  )
}