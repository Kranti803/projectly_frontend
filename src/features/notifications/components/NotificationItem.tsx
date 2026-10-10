import { cn } from "@/lib/utils"
// Adjust this path to wherever you put the formatRelativeTime helper from the task detail step.
import { formatRelativeTime } from "@/utils/format"

import type { AppNotification } from "../types/notifications.types"
import { NotificationTypeIcon } from "./NotificationTypeIcon"
interface NotificationItemProps {
  notification: AppNotification
  onSelect: (notification: AppNotification) => void
}

export function NotificationItem({ notification, onSelect }: NotificationItemProps) {
  return (
    <li>
      <button
        type="button"
        onClick={() => onSelect(notification)}
        className={cn(
          "flex w-full items-start gap-3 px-4 py-3 text-left transition-colors hover:bg-muted focus-visible:bg-muted focus-visible:outline-none",
          !notification.read && "bg-primary/5"
        )}
      >
        {/* Unread dot. Read items keep an invisible one so the text stays aligned. */}
        <span
          className={cn(
            "mt-3 size-2 shrink-0 rounded-full",
            notification.read ? "bg-transparent" : "bg-primary"
          )}
          aria-hidden
        />
        <NotificationTypeIcon type={notification.type} />
        <span className="min-w-0 flex-1">
          <span className="block text-sm font-semibold leading-snug">{notification.title}</span>
          {notification.body && (
            <span className="mt-0.5 block text-sm text-muted-foreground">{notification.body}</span>
          )}
          <span className="mt-1 block text-xs text-muted-foreground">
            {formatRelativeTime(notification.createdAt)}
          </span>
        </span>
        {!notification.read && <span className="sr-only">Unread</span>}
      </button>
    </li>
  )
}