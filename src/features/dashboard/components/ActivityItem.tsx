import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import type { ActivityEntry } from "@/constants/DashboardData"

function getInitials(name: string) {
  return name
    .split(" ")
    .map((part) => part[0])
    .slice(0, 2)
    .join("")
    .toUpperCase()
}

interface ActivityItemProps {
  entry: ActivityEntry
}

export function ActivityItem({ entry }: ActivityItemProps) {
  return (
    <li className="flex items-start gap-3">
      <Avatar className="size-8">
        <AvatarImage src={entry.avatarUrl} alt={entry.actor} />
        <AvatarFallback className="text-xs">{getInitials(entry.actor)}</AvatarFallback>
      </Avatar>
      <div className="min-w-0 flex-1">
        <p className="text-sm leading-snug">
          <span className="font-medium">{entry.actor}</span>{" "}
          <span className="text-muted-foreground">{entry.action}</span>{" "}
          <span className="font-medium">{entry.target}</span>
        </p>
        <p className="mt-0.5 text-xs text-muted-foreground">{entry.timestamp}</p>
      </div>
    </li>
  )
}