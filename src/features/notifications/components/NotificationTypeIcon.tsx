import { AtSign, ListChecks, MessageSquare, ShieldCheck, type LucideIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import type { NotificationType } from "../types/notifications.types";

const config: Record<NotificationType, { icon: LucideIcon; className: string }> = {
  mention: { icon: AtSign, className: "bg-indigo-100 text-indigo-700" },
  task_assigned: { icon: ListChecks, className: "bg-sky-100 text-sky-700" },
  comment: { icon: MessageSquare, className: "bg-emerald-100 text-emerald-700" },
  role_changed: { icon: ShieldCheck, className: "bg-amber-100 text-amber-700" },
}

export function NotificationTypeIcon({ type }: { type: NotificationType }) {
  const { icon: Icon, className } = config[type]
  return (
    <span
      className={cn("flex size-8 shrink-0 items-center justify-center rounded-full", className)}
      aria-hidden
    >
      <Icon className="size-4" />
    </span>
  )
}