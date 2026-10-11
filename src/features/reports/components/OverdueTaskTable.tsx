import { Link } from "@tanstack/react-router"
import { PartyPopper } from "lucide-react"

import { AvatarStack } from "@/components/common/AvatarStack"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { formatShortDate } from "@/utils/report-utils"
import type { OverdueRow } from "../types/Report.types"
import { ReportCard } from "./ReportCard"

export function OverdueTasksTable({ rows }: { rows: OverdueRow[] }) {
  return (
    <ReportCard
      title="Overdue tasks"
      description="Past their due date and not done yet, most overdue first"
      className="lg:col-span-2"
    >
      {rows.length === 0 ? (
        <div className="flex flex-col items-center gap-2 py-10 text-center">
          <PartyPopper className="size-6 text-muted-foreground" />
          <p className="text-sm text-muted-foreground">Nothing is overdue. Nice work.</p>
        </div>
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Task</TableHead>
              <TableHead>Project</TableHead>
              <TableHead>Assignee</TableHead>
              <TableHead>Due date</TableHead>
              <TableHead className="text-right">Overdue by</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {rows.map(({ task, projectName, projectColor, daysOverdue }) => (
              <TableRow key={task.id}>
                <TableCell className="max-w-70">
                  <Link
                    to="/projects/$projectId"
                    params={{ projectId: task.projectId }}
                    className="font-medium hover:underline"
                  >
                    {task.title}
                  </Link>
                </TableCell>
                <TableCell>
                  <span className="flex items-center gap-2 text-sm">
                    <span
                      className="size-2.5 shrink-0 rounded-full"
                      style={{ backgroundColor: projectColor }}
                      aria-hidden
                    />
                    {projectName}
                  </span>
                </TableCell>
                <TableCell>
                  {task.assignee ? (
                    <span className="flex items-center gap-2 text-sm">
                      <AvatarStack members={[task.assignee]} size="w-6 h-6" />
                      {task.assignee.name}
                    </span>
                  ) : (
                    <span className="text-sm text-muted-foreground">Unassigned</span>
                  )}
                </TableCell>
                <TableCell className="whitespace-nowrap text-sm text-muted-foreground">
                  {task.dueDate ? formatShortDate(task.dueDate) : ""}
                </TableCell>
                <TableCell className="whitespace-nowrap text-right text-sm font-medium text-rose-600">
                  {daysOverdue} {daysOverdue === 1 ? "day" : "days"}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </ReportCard>
  )
}