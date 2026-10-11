import { CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts"

import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart"
import { formatShortDate } from "@/utils/report-utils"
import type { ActivityPoint } from "../types/Report.types"
import { ReportCard } from "./ReportCard"

const chartConfig = {
  completed: { label: "Completed", color: "var(--primary)" },
  created: { label: "Created", color: "#94a3b8" },
} satisfies ChartConfig

export function CompletionTrendChart({ data }: { data: ActivityPoint[] }) {
  return (
    <ReportCard
      title="Tasks completed over time"
      description="Tasks finished and tasks created each day"
      className="lg:col-span-2"
    >
      <ChartContainer config={chartConfig} className="h-70 w-full">
        <LineChart data={data} accessibilityLayer margin={{ left: 0, right: 12 }}>
          <CartesianGrid vertical={false} />
          <XAxis
            dataKey="date"
            tickLine={false}
            axisLine={false}
            tickMargin={8}
            minTickGap={28}
            tickFormatter={formatShortDate}
          />
          <YAxis tickLine={false} axisLine={false} width={28} allowDecimals={false} />
          <ChartTooltip
            content={<ChartTooltipContent labelFormatter={(value) => formatShortDate(String(value))} />}
          />
          <Line
            dataKey="created"
            type="monotone"
            stroke="var(--color-created)"
            strokeWidth={2}
            dot={false}
          />
          <Line
            dataKey="completed"
            type="monotone"
            stroke="var(--color-completed)"
            strokeWidth={2}
            dot={false}
          />
          <ChartLegend content={<ChartLegendContent />} />
        </LineChart>
      </ChartContainer>
    </ReportCard>
  )
}