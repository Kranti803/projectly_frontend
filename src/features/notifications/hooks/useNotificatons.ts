import { useMemo, useState } from "react"

import type {
  AppNotification,
  NotificationTab,
} from "@/features/notifications/types/notifications.types";

export function useNotifications(initial: AppNotification[]) {
  const [notifications, setNotifications] = useState(initial)
  const [tab, setTab] = useState<NotificationTab>("all")

  const unreadCount = useMemo(() => notifications.filter((n) => !n.read).length, [notifications])

  const items = useMemo(
    () => (tab === "unread" ? notifications.filter((n) => !n.read) : notifications),
    [notifications, tab]
  )

  // TODO: replace with API calls (PATCH /notifications/:id/read and /notifications/read-all).
  function markAsRead(id: string) {
    setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, read: true } : n)))
  }

  function markAllAsRead() {
    setNotifications((prev) => prev.map((n) => (n.read ? n : { ...n, read: true })))
  }

  // Ready for Socket.IO later: socket.on("notification", addNotification)
  function addNotification(notification: AppNotification) {
    setNotifications((prev) => [notification, ...prev])
  }

  return { items, tab, setTab, unreadCount, markAsRead, markAllAsRead, addNotification }
}