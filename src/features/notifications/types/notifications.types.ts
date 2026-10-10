export type NotificationType = "mention" | "task_assigned" | "comment" | "role_changed"

// Named AppNotification so it doesn't clash with the browser's built-in `Notification`.
export interface AppNotification {
  id: string
  type: NotificationType
  title: string // the bold summary line
  body?: string // optional second line
  createdAt: string // ISO timestamp
  read: boolean
  // Where clicking the notification goes. `to` is a route path, e.g. "/projects/$projectId".
  to: string
  params?: Record<string, string>
}

export type NotificationTab = "all" | "unread"