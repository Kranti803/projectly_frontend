import type { OrgMember } from "@/constants/MembersData"
import type { Member, Project } from "@/constants/ProjectData"
import type { Team, TeamRole } from "@/constants/TeamsData"


export interface ResolvedTeamMember {
  member: OrgMember
  role: TeamRole
}

// Joins a team's memberships with the organization's members. Leads come first.
export function resolveTeamMembers(team: Team, orgMembers: OrgMember[]): ResolvedTeamMember[] {
  const byId = new Map(orgMembers.map((m) => [m.id, m]))

  return team.memberships
    .flatMap(({ memberId, role }) => {
      const member = byId.get(memberId)
      return member ? [{ member, role }] : []
    })
    .sort((a, b) => (a.role === b.role ? 0 : a.role === "lead" ? -1 : 1))
}

// The shape AvatarStack expects.
export function toAvatarMember(member: OrgMember): Member {
  return { id: member.id, name: member.name ?? member.email, avatarUrl: member.avatarUrl }
}

export function countActiveProjects(teamId: string, projects: Project[]) {
  return projects.filter((p) => p.teamId === teamId && p.status === "active").length
}