
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { ActivityEntry } from "@/constants/DashboardData"
import { Link } from "@tanstack/react-router"
import { ActivityItem } from "./ActivityItem"


interface RecentActivityProps {
  entries: ActivityEntry[]
}

export function RecentActivity({ entries }: RecentActivityProps) {
  return (
    <Card className="h-full">
      <CardHeader className="flex flex-row items-center justify-between space-y-0">
        <CardTitle>Recent activity</CardTitle>
        <Button variant="ghost" size="sm">
          <Link to="/">View all</Link>
        </Button>
      </CardHeader>
      <CardContent>
        {entries.length === 0 ? (
          <p className="text-sm text-muted-foreground">
            Activity from your projects will show up here.
          </p>
        ) : (
          <ul className="space-y-5">
            {entries.map((entry) => (
              <ActivityItem key={entry.id} entry={entry} />
            ))}
          </ul>
        )}
      </CardContent>
    </Card>
  )
}