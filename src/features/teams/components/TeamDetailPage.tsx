import { orgMembers } from "@/constants/MembersData"
import { projects } from "@/constants/ProjectData"
import { getTeamById } from "@/constants/TeamsData"
import { notFound } from "@tanstack/react-router"
import { TeamDetailView } from "./TeamDetailView"


export default function TeamDetailPage({ teamId }: { teamId: string }) {
  // TODO: replace with real fetches.
  const team = getTeamById(teamId)
  if (!team) {
    notFound()
    return null
  }

  const teamProjects = projects.filter((p) => p.teamId === team.id)

  return <TeamDetailView initialTeam={team} orgMembers={orgMembers} projects={teamProjects} />
}