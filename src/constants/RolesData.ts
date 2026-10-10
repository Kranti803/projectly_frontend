import { allPermissionKeys } from "./Permissions"

// Mock data. Replace with real fetches once the API exists.
export interface Role {
  id: string // default roles use the MemberRole value: "owner", "admin", ...
  name: string
  description: string
  isDefault: boolean // default roles can't be deleted or renamed
  permissions: string[]
}

export type RoleInput = Pick<Role, "name" | "description" | "permissions">

const without = (...keys: string[]) => allPermissionKeys.filter((k) => !keys.includes(k))

export const roles: Role[] = [
  {
    id: "owner",
    name: "Owner",
    description: "Full control of the organization, including billing and deletion.",
    isDefault: true,
    permissions: allPermissionKeys,
  },
  {
    id: "admin",
    name: "Admin",
    description: "Manages people, teams and projects. Can't delete the organization or change billing.",
    isDefault: true,
    permissions: without("organization.delete", "billing.manage"),
  },
  {
    id: "project_manager",
    name: "Project Manager",
    description: "Runs projects and tasks, and keeps teams on track.",
    isDefault: true,
    permissions: [
      "members.view", "roles.view",
      "projects.create", "projects.update", "projects.archive",
      "tasks.create", "tasks.update", "tasks.assign", "tasks.delete",
      "comments.create", "comments.delete_any",
      "attachments.upload", "attachments.delete",
    ],
  },
  {
    id: "member",
    name: "Member",
    description: "Works on tasks and collaborates with the team.",
    isDefault: true,
    permissions: [
      "members.view",
      "tasks.create", "tasks.update", "tasks.assign",
      "comments.create",
      "attachments.upload",
    ],
  },
  {
    id: "guest",
    name: "Guest",
    description: "Limited access for people outside the organization.",
    isDefault: true,
    permissions: ["comments.create"],
  },
  {
    id: "r-reviewer",
    name: "Reviewer",
    description: "Reviews work and moderates comments without editing projects.",
    isDefault: false,
    permissions: ["members.view", "tasks.update", "comments.create", "comments.delete_any"],
  },
]