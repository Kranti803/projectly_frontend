"use client"

import { Bar, BarChart, CartesianGrid, XAxis } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart"
import type { CompletionPoint } from "@/constants/DashboardData";

const chartConfig = {
  completed: { label: "Completed", color: "var(--primary)" },
} satisfies ChartConfig

interface TaskCompletionChartProps {
  data: CompletionPoint[]
}

export function TaskCompletionChart({ data }: TaskCompletionChartProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Task completion this month</CardTitle>
        <CardDescription>Tasks marked done, by week</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-65 w-full">
          <BarChart data={data} accessibilityLayer>
            <CartesianGrid vertical={false} />
            <XAxis dataKey="day" tickLine={false} axisLine={false} tickMargin={10} />
            <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
            <Bar dataKey="completed" fill="var(--color-completed)" radius={6} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}