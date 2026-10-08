// Mock data. Replace with real fetches once the API exists.

export type MemberRole = "owner" | "admin" | "project_manager" | "member" | "guest"
export type MemberStatus = "active" | "pending"

export interface OrgMember {
  id: string
  name: string | null // pending invites have no name yet
  email: string
  role: MemberRole
  status: MemberStatus
  joinedAt: string | null // ISO date, null while pending
  avatarUrl?: string
}

export const roleLabels: Record<MemberRole, string> = {
  owner: "Owner",
  admin: "Admin",
  project_manager: "Project Manager",
  member: "Member",
  guest: "Guest",
}

export const roleOptions = (Object.keys(roleLabels) as MemberRole[]).map((value) => ({
  value,
  label: roleLabels[value],
}))

// The owner role can't be handed out through an invite or the role menu.
export const assignableRoles = roleOptions.filter((o) => o.value !== "owner")

// Ids m1 to m6 match the people used in the projects and tasks mock data.
export const orgMembers: OrgMember[] = [
  { id: "m1", name: "Sarah Chen", email: "sarah@acme.com", role: "owner", status: "active", joinedAt: "2026-01-12" },
  { id: "m2", name: "Marcus Lee", email: "marcus@acme.com", role: "admin", status: "active", joinedAt: "2026-02-03" },
  { id: "m3", name: "Priya Nair", email: "priya@acme.com", role: "project_manager", status: "active", joinedAt: "2026-02-18" },
  { id: "m4", name: "Daniel Ortiz", email: "daniel@acme.com", role: "member", status: "active", joinedAt: "2026-03-09" },
  { id: "m5", name: "Amara Okafor", email: "amara@acme.com", role: "member", status: "active", joinedAt: "2026-05-21" },
  { id: "m6", name: "Tomas Berg", email: "tomas@acme.com", role: "guest", status: "active", joinedAt: "2026-08-14" },
  { id: "i1", name: null, email: "jane@acme.com", role: "member", status: "pending", joinedAt: null },
  { id: "i2", name: null, email: "leo@partner.io", role: "guest", status: "pending", joinedAt: null },
]