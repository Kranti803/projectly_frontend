import { Bar, BarChart, XAxis, YAxis } from "recharts"

import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart"
import { ReportCard } from "./ReportCard"
import type { WorkloadRow } from "../types/Report.types"


const chartConfig = {
  open: { label: "Open", color: "#6366f1" },
  completed: { label: "Completed", color: "#10b981" },
} satisfies ChartConfig

const ROW_HEIGHT = 44

export function WorkloadChart({ data }: { data: WorkloadRow[] }) {
  return (
    <ReportCard title="Workload by member" description="Open and completed tasks per person">
      {data.length === 0 ? (
        <p className="py-10 text-center text-sm text-muted-foreground">No tasks to show yet.</p>
      ) : (
        <ChartContainer
          config={chartConfig}
          className="aspect-auto w-full"
          // Grows with the number of people so the bars never get squashed.
          style={{ height: Math.max(220, data.length * ROW_HEIGHT + 40) }}
        >
          <BarChart data={data} layout="vertical" accessibilityLayer margin={{ left: 0, right: 12 }}>
            <YAxis dataKey="name" type="category" tickLine={false} axisLine={false} width={100} />
            <XAxis type="number" hide />
            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
            <Bar dataKey="open" stackId="tasks" fill="var(--color-open)" radius={[5, 0, 0, 5]} />
            <Bar dataKey="completed" stackId="tasks" fill="var(--color-completed)" radius={[0, 5, 5, 0]} />
            <ChartLegend content={<ChartLegendContent />} />
          </BarChart>
        </ChartContainer>
      )}
    </ReportCard>
  )
}