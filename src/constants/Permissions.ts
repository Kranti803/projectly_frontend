// The single source of truth for permission keys.
// Later, share this file (or generate it) with the Express backend so both sides
// use exactly the same keys, e.g. requirePermission("projects.delete").

export interface PermissionDefinition {
  key: string
  label: string
  description: string
}

export interface PermissionGroupDefinition {
  id: string
  label: string
  permissions: PermissionDefinition[]
}

export const permissionGroups: PermissionGroupDefinition[] = [
  {
    id: "organization",
    label: "Organization",
    permissions: [
      { key: "organization.update", label: "Edit organization settings", description: "Change the name, logo, URL and timezone." },
      { key: "organization.delete", label: "Delete organization", description: "Permanently delete the organization and all its data." },
    ],
  },
  {
    id: "members",
    label: "Members",
    permissions: [
      { key: "members.view", label: "View members", description: "See everyone in the organization." },
      { key: "members.invite", label: "Invite members", description: "Send invitations by email." },
      { key: "members.remove", label: "Remove members", description: "Remove people or cancel pending invites." },
      { key: "members.change_role", label: "Change member roles", description: "Move people between roles." },
    ],
  },
  {
    id: "roles",
    label: "Roles",
    permissions: [
      { key: "roles.view", label: "View roles", description: "See roles and what they allow." },
      { key: "roles.manage", label: "Create and edit roles", description: "Create, edit and delete custom roles." },
    ],
  },
  {
    id: "teams",
    label: "Teams",
    permissions: [
      { key: "teams.create", label: "Create teams", description: "Start new teams." },
      { key: "teams.update", label: "Edit teams", description: "Change a team's name, description and color." },
      { key: "teams.delete", label: "Delete teams", description: "Delete teams." },
      { key: "teams.manage_members", label: "Manage team members", description: "Add and remove people on a team." },
    ],
  },
  {
    id: "projects",
    label: "Projects",
    permissions: [
      { key: "projects.create", label: "Create projects", description: "Start new projects." },
      { key: "projects.update", label: "Edit projects", description: "Change project details and members." },
      { key: "projects.archive", label: "Archive projects", description: "Archive and restore projects." },
      { key: "projects.delete", label: "Delete projects", description: "Permanently delete projects and their tasks." },
    ],
  },
  {
    id: "tasks",
    label: "Tasks",
    permissions: [
      { key: "tasks.create", label: "Create tasks", description: "Add tasks to projects." },
      { key: "tasks.update", label: "Edit tasks", description: "Change status, priority, dates and labels." },
      { key: "tasks.assign", label: "Assign tasks", description: "Choose who a task is assigned to." },
      { key: "tasks.delete", label: "Delete tasks", description: "Permanently delete tasks." },
    ],
  },
  {
    id: "comments",
    label: "Comments",
    permissions: [
      { key: "comments.create", label: "Write comments", description: "Comment on tasks." },
      { key: "comments.delete_any", label: "Delete anyone's comments", description: "People can always delete their own." },
    ],
  },
  {
    id: "attachments",
    label: "Attachments",
    permissions: [
      { key: "attachments.upload", label: "Upload attachments", description: "Attach files to tasks." },
      { key: "attachments.delete", label: "Delete attachments", description: "Remove files from tasks." },
    ],
  },
  {
    id: "billing",
    label: "Billing",
    permissions: [
      { key: "billing.view", label: "View billing", description: "See the plan and invoices." },
      { key: "billing.manage", label: "Manage billing", description: "Change the plan and payment method." },
    ],
  },
]

export const allPermissionKeys = permissionGroups.flatMap((g) => g.permissions.map((p) => p.key))