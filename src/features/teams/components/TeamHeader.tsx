import { ArrowLeft, Pencil, UserPlus } from "lucide-react"
import {Link} from "@tanstack/react-router";
import { Button } from "@/components/ui/button"

import type { Team } from "@/constants/TeamsData"
import { TeamIcon } from "./TeamIcon";
interface TeamHeaderProps {
  team: Pick<Team, "name" | "description" | "color">
  onEdit: () => void
  onAddMember: () => void
}

export function TeamHeader({ team, onEdit, onAddMember }: TeamHeaderProps) {
  return (
    <div className="space-y-4">
      <Link
        to="/teams"
        className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="size-4" />
        All teams
      </Link>

      <div className="flex flex-wrap items-start justify-between gap-4">
        <div className="flex items-center gap-4">
          <TeamIcon name={team.name} color={team.color} size="lg" />
          <div>
            <h1 className="text-2xl font-semibold tracking-tight">{team.name}</h1>
            {team.description && (
              <p className="mt-0.5 max-w-xl text-sm text-muted-foreground">{team.description}</p>
            )}
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="outline" onClick={onEdit}>
            <Pencil className="size-4" />
            Edit
          </Button>
          <Button onClick={onAddMember}>
            <UserPlus className="size-4" />
            Add member
          </Button>
        </div>
      </div>
    </div>
  )
}