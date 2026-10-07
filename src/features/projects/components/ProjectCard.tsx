import { CalendarDays } from "lucide-react"

import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { formatDate } from "@/lib/formatDate";
import type { Project } from "@/constants/ProjectData"
import { ProjectStatusBadge } from "./ProjectStatusBadge"
import { Link } from "@tanstack/react-router";
import { AvatarStack } from "@/components/common/AvatarStack";

export function ProjectCard({ project }: { project: Project }) {
  return (
    <Link
      to="/projects/$projectId"
      params={{ projectId: project.id }}
      className="block rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
    >
      <Card className="h-full transition-shadow hover:shadow-md">
        <CardContent className="space-y-4 p-5">
          <div className="flex items-start justify-between gap-3">
            <div className="flex min-w-0 items-center gap-3">
              <span
                className="flex size-9 shrink-0 items-center justify-center rounded-lg text-sm font-semibold text-white"
                style={{ backgroundColor: project.color }}
                aria-hidden
              >
                {project.name[0]}
              </span>
              <div className="min-w-0">
                <h3 className="truncate font-semibold">{project.name}</h3>
                <p className="text-xs text-muted-foreground">{project.team}</p>
              </div>
            </div>
            <ProjectStatusBadge status={project.status} />
          </div>

          <p className="line-clamp-2 text-sm text-muted-foreground">{project.description}</p>

          <div className="space-y-1.5">
            <div className="flex justify-between text-xs">
              <span className="text-muted-foreground">Progress</span>
              <span className="font-medium">{project.progress}%</span>
            </div>
            <Progress value={project.progress} />
          </div>

          <div className="flex items-center justify-between">
            <AvatarStack members={project.members} />
            <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <CalendarDays className="size-3.5" />
              {formatDate(project.dueDate)}
            </span>
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}