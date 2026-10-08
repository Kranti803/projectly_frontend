// Mock data. Replace with real fetches once the API exists.

import { projectColors } from "./ProjectData"

export type TeamRole = "lead" | "member"

export interface TeamMembership {
  memberId: string // matches an OrgMember id
  role: TeamRole
}

export interface Team {
  id: string
  name: string
  description: string
  color: string
  memberships: TeamMembership[]
}

// Member ids m1 to m6 match lib/members-data.ts.
export const teams: Team[] = [
  {
    id: "t-design",
    name: "Design",
    description: "Product design, UX research and the design system.",
    color: projectColors[1],
    memberships: [
      { memberId: "m3", role: "lead" },
      { memberId: "m5", role: "member" },
    ],
  },
  {
    id: "t-eng",
    name: "Engineering",
    description: "Web and mobile development, infrastructure and QA.",
    color: projectColors[0],
    memberships: [
      { memberId: "m2", role: "lead" },
      { memberId: "m1", role: "member" },
      { memberId: "m4", role: "member" },
    ],
  },
  {
    id: "t-marketing",
    name: "Marketing",
    description: "Campaigns, content and lifecycle emails.",
    color: projectColors[3],
    memberships: [
      { memberId: "m5", role: "lead" },
      { memberId: "m3", role: "member" },
      { memberId: "m6", role: "member" },
    ],
  },
  {
    id: "t-ops",
    name: "Operations",
    description: "Vendors, finance and day-to-day operations.",
    color: projectColors[2],
    memberships: [
      { memberId: "m1", role: "lead" },
      { memberId: "m5", role: "member" },
    ],
  },
]

export function getTeamById(id: string) {
  return teams.find((t) => t.id === id)
}

export function getTeamName(id: string) {
  return getTeamById(id)?.name ?? "No team"
}