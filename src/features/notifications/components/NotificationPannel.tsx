
import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import type { AppNotification, NotificationTab } from "../types/notifications.types"
import { NotificationItem } from "./NotificationItem"

interface NotificationPanelProps {
  notifications: AppNotification[] // already filtered by the active tab
  tab: NotificationTab
  onTabChange: (tab: NotificationTab) => void
  unreadCount: number
  onMarkAllAsRead: () => void
  onSelect: (notification: AppNotification) => void
}

export function NotificationPanel({
  notifications,
  tab,
  onTabChange,
  unreadCount,
  onMarkAllAsRead,
  onSelect,
}: NotificationPanelProps) {
  return (
    <div className="flex flex-col">
      <div className="flex items-center justify-between px-4 py-3">
        <h2 className="font-semibold">Notifications</h2>
        <Button
          variant="link"
          size="sm"
          className="h-auto p-0"
          onClick={onMarkAllAsRead}
          disabled={unreadCount === 0}
        >
          Mark all as read
        </Button>
      </div>

      <div className="px-4 pb-3">
        <Tabs value={tab} onValueChange={(v) => onTabChange(v as NotificationTab)}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="unread">Unread{unreadCount > 0 && ` (${unreadCount})`}</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      <div className="max-h-96 overflow-y-auto border-t">
        {notifications.length === 0 ? (
          <p className="px-4 py-10 text-center text-sm text-muted-foreground">
            {tab === "unread" ? "You're all caught up." : "No notifications yet."}
          </p>
        ) : (
          <ul className="divide-y">
            {notifications.map((notification) => (
              <NotificationItem
                key={notification.id}
                notification={notification}
                onSelect={onSelect}
              />
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}