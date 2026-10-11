import { Bar, BarChart, XAxis, YAxis } from "recharts"

import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart"
import { ReportCard } from "./ReportCard"
import type { StatusRow } from "../types/Report.types"


// Same colours as the StatusBadge, so a status looks the same everywhere.
const chartConfig = {
  tasks: { label: "Tasks" },
  todo: { label: "To Do", color: "#94a3b8" },
  in_progress: { label: "In Progress", color: "#6366f1" },
  in_review: { label: "In Review", color: "#f59e0b" },
  done: { label: "Done", color: "#10b981" },
} satisfies ChartConfig

export function StatusBreakdownChart({ data }: { data: StatusRow[] }) {
  const rows = data.map((row) => ({ ...row, fill: `var(--color-${row.status})` }))

  return (
    <ReportCard title="Tasks by status" description="Where work currently stands">
      <ChartContainer config={chartConfig} className="h-70 w-full">
        <BarChart data={rows} layout="vertical" accessibilityLayer margin={{ left: 0, right: 12 }}>
          <YAxis
            dataKey="label"
            type="category"
            tickLine={false}
            axisLine={false}
            width={90}
          />
          <XAxis dataKey="tasks" type="number" hide />
          <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
          <Bar dataKey="tasks" radius={5} />
        </BarChart>
      </ChartContainer>
    </ReportCard>
  )
}