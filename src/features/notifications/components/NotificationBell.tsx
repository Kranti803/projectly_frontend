import { useState } from "react"
import { useNavigate } from "@tanstack/react-router"
import { Bell } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { notificationsData } from "@/constants/NotificationsData"
import { useNotifications } from "../hooks/useNotificatons"
import type { AppNotification } from "../types/notifications.types"
import { NotificationPanel } from "./NotificationPannel"

export function NotificationBell() {
  const [open, setOpen] = useState(false)
  const navigate = useNavigate()
  // TODO: replace with a TanStack Query fetch, and call addNotification from a socket listener.
  const { items, tab, setTab, unreadCount, markAsRead, markAllAsRead } =
    useNotifications(notificationsData)

  function handleSelect(notification: AppNotification) {
    markAsRead(notification.id)
    setOpen(false)
    // Route paths are typed by TanStack Router. The mock data stores them as plain strings,
    // so cast here. Once notifications come from the API, store a typed target instead.
    navigate({ to: notification.to, params: notification.params } as never)
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger>
        <Button
          variant="ghost"
          size="icon"
          className="relative"
          aria-label={`Notifications${unreadCount > 0 ? `, ${unreadCount} unread` : ""}`}
        >
          <Bell className="size-5" />
          {unreadCount > 0 && (
            <span className="absolute right-1 top-1 flex min-w-4 items-center justify-center rounded-full bg-primary px-1 text-[10px] font-semibold leading-4 text-primary-foreground">
              {unreadCount > 9 ? "9+" : unreadCount}
            </span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent align="end" className="w-[min(24rem,calc(100vw-2rem))] p-0">
        <NotificationPanel
          notifications={items}
          tab={tab}
          onTabChange={setTab}
          unreadCount={unreadCount}
          onMarkAllAsRead={markAllAsRead}
          onSelect={handleSelect}
        />
      </PopoverContent>
    </Popover>
  )
}