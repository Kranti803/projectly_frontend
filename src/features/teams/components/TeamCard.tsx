
import { AvatarStack } from "@/components/common/AvatarStack"
import { Card, CardContent } from "@/components/ui/card"
import type { Member } from "@/constants/ProjectData"
import type { Team } from "@/constants/TeamsData"
import { TeamIcon } from "./TeamIcon"
import { Link } from "@tanstack/react-router"

interface TeamCardProps {
  team: Team
  members: Member[]
  activeProjectCount: number
}

export function TeamCard({ team, members, activeProjectCount }: TeamCardProps) {
  return (
    <Link
      to="/teams/$teamId"
      params={{ teamId: team.id }}
      className="block rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
    >
      <Card className="h-full transition-shadow hover:shadow-md">
        <CardContent className="space-y-4 p-5">
          <div className="flex items-center gap-3">
            <TeamIcon name={team.name} color={team.color} />
            <div className="min-w-0">
              <h3 className="truncate font-semibold">{team.name}</h3>
              <p className="text-xs text-muted-foreground">
                {members.length} {members.length === 1 ? "member" : "members"}
              </p>
            </div>
          </div>

          <p className="line-clamp-2 min-h-10 text-sm text-muted-foreground">
            {team.description || "No description yet."}
          </p>

          <div className="flex items-center justify-between">
            <AvatarStack members={members} />
            <span className="text-xs text-muted-foreground">
              {activeProjectCount} active {activeProjectCount === 1 ? "project" : "projects"}
            </span>
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}