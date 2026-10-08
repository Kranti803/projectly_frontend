// Mock data. Replace with real fetches once the API exists.
// This REPLACES the previous projects-data.ts. Changes: `team` (a name) is now `teamId`,
// and the `teams` string list is gone (teams now live in lib/teams-data.ts).

export type ProjectStatus = "active" | "archived"

export interface Member {
  id: string
  name: string
  avatarUrl?: string
}

export interface Project {
  id: string
  name: string
  description: string
  status: ProjectStatus
  progress: number // 0 to 100
  dueDate: string // ISO date, e.g. "2026-11-30"
  teamId: string
  color: string
  members: Member[]
}

export const projectColors = [
  "#6366f1",
  "#0ea5e9",
  "#10b981",
  "#f59e0b",
  "#f43f5e",
  "#8b5cf6",
]

const people: Member[] = [
  { id: "m1", name: "Sarah Chen" },
  { id: "m2", name: "Marcus Lee" },
  { id: "m3", name: "Priya Nair" },
  { id: "m4", name: "Daniel Ortiz" },
  { id: "m5", name: "Amara Okafor" },
  { id: "m6", name: "Tomas Berg" },
]

export const projects: Project[] = [
  {
    id: "p1",
    name: "Mobile app v2",
    description: "Rebuild the mobile experience with offline support and a faster task flow.",
    status: "active",
    progress: 62,
    dueDate: "2026-12-15",
    teamId: "t-eng",
    color: projectColors[0],
    members: people.slice(0, 5),
  },
  {
    id: "p2",
    name: "Checkout redesign",
    description: "Simplify the payment steps and reduce drop-off at the billing screen.",
    status: "active",
    progress: 35,
    dueDate: "2026-11-20",
    teamId: "t-design",
    color: projectColors[1],
    members: people.slice(1, 4),
  },
  {
    id: "p3",
    name: "Q4 launch campaign",
    description: "Plan and ship the announcement site, emails and social posts.",
    status: "active",
    progress: 80,
    dueDate: "2026-10-31",
    teamId: "t-marketing",
    color: projectColors[3],
    members: people.slice(2, 6),
  },
  {
    id: "p4",
    name: "Onboarding emails",
    description: "A five-step email series for new workspaces.",
    status: "active",
    progress: 15,
    dueDate: "2027-01-10",
    teamId: "t-marketing",
    color: projectColors[4],
    members: people.slice(0, 2),
  },
  {
    id: "p5",
    name: "Billing migration",
    description: "Move subscriptions to the new payment provider without downtime.",
    status: "active",
    progress: 48,
    dueDate: "2026-12-01",
    teamId: "t-eng",
    color: projectColors[5],
    members: people.slice(3, 6),
  },
  {
    id: "p6",
    name: "Vendor review",
    description: "Compare contracts and renewal dates for all external tools.",
    status: "archived",
    progress: 100,
    dueDate: "2026-08-30",
    teamId: "t-ops",
    color: projectColors[2],
    members: people.slice(4, 6),
  },
]