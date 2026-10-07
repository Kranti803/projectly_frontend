import { ArrowLeft, UserPlus } from "lucide-react"
import {Link} from "@tanstack/react-router";
import { Button } from "@/components/ui/button"

import type { Project } from "@/constants/ProjectData"
import { AvatarStack } from "@/components/common/AvatarStack";
import { ProjectStatusBadge } from "./ProjectStatusBadge";
import { ProjectTabs } from "./ProjectTab";

interface ProjectHeaderProps {
  project: Project
}

export function ProjectHeader({ project }: ProjectHeaderProps) {
  return (
    <div className="space-y-4">
      <Link
        to="/projects"
        className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="size-4" />
        All projects
      </Link>

      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <span
            className="flex size-10 shrink-0 items-center justify-center rounded-lg text-base font-semibold text-white"
            style={{ backgroundColor: project.color }}
            aria-hidden
          >
            {project.name[0]}
          </span>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-semibold tracking-tight">{project.name}</h1>
              <ProjectStatusBadge status={project.status} />
            </div>
            <p className="text-sm text-muted-foreground">{project.team}</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <AvatarStack members={project.members} />
          {/* TODO: open an add-member dialog once Members/Teams exist. */}
          <Button variant="outline" size="sm">
            <UserPlus className="size-4" />
            Add member
          </Button>
        </div>
      </div>

      <ProjectTabs />
    </div>
  )
}