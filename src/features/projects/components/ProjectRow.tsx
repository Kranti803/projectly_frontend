import { Link } from "@tanstack/react-router";
import { ProjectStatusBadge } from "./ProjectStatusBadge";
import { Progress } from "@/components/ui/progress";
import { formatDate } from "@/lib/formatDate";
import type { Project } from "@/constants/ProjectData";
import { AvatarStack } from "@/components/common/AvatarStack";


export function ProjectRow({ project }: { project: Project }) {
  return (
    <Link
      to={`/`}
      className="flex flex-wrap items-center gap-x-6 gap-y-3 rounded-xl border bg-card px-5 py-4 transition-shadow hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
    >
      <div className="flex min-w-50 flex-1 items-center gap-3">
        <span
          className="size-3 shrink-0 rounded-full"
          style={{ backgroundColor: project.color }}
          aria-hidden
        />
        <div className="min-w-0">
          <p className="truncate font-medium">{project.name}</p>
          <p className="text-xs text-muted-foreground">{project.team}</p>
        </div>
      </div>

      <ProjectStatusBadge status={project.status} />

      <div className="hidden w-40 items-center gap-2 md:flex">
        <Progress value={project.progress} />
        <span className="w-9 text-right text-xs font-medium">{project.progress}%</span>
      </div>

      <AvatarStack members={project.members} />

      <span className="w-28 text-right text-sm text-muted-foreground">
        {formatDate(project.dueDate)}
      </span>
    </Link>
  )
}