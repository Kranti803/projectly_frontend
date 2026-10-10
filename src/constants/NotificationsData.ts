// Mock data. Replace with a real fetch (TanStack Query) once the API exists.

import type { AppNotification } from "@/features/notifications/types/notifications.types"

// Times are relative to now, so the panel always shows fresh-looking "5m ago" style stamps.
const minutesAgo = (minutes: number) => new Date(Date.now() - minutes * 60_000).toISOString()

export const notificationsData: AppNotification[] = [
  {
    id: "n1",
    type: "mention",
    title: "Marcus Lee mentioned you in Checkout redesign",
    body: "Can you review the new payment steps before Friday?",
    createdAt: minutesAgo(8),
    read: false,
    to: "/projects/$projectId",
    params: { projectId: "p2" },
  },
  {
    id: "n2",
    type: "task_assigned",
    title: "Priya Nair assigned you “Fix login redirect loop”",
    createdAt: minutesAgo(45),
    read: false,
    to: "/tasks",
  },
  {
    id: "n3",
    type: "comment",
    title: "Daniel Ortiz commented on “Kanban drag and drop”",
    body: "Keyboard support would be a nice follow-up.",
    createdAt: minutesAgo(3 * 60),
    read: false,
    to: "/projects/$projectId",
    params: { projectId: "p1" },
  },
  {
    id: "n4",
    type: "role_changed",
    title: "Your role was changed to Admin",
    body: "Sarah Chen updated your permissions.",
    createdAt: minutesAgo(26 * 60),
    read: true,
    to: "/settings/roles",
  },
  {
    id: "n5",
    type: "task_assigned",
    title: "Marcus Lee assigned you “Build notification preferences API”",
    createdAt: minutesAgo(3 * 24 * 60),
    read: true,
    to: "/tasks",
  },
]