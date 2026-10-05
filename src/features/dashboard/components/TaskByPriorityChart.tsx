"use client";

import { useMemo } from "react";
import { Label, Pie, PieChart } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import type { PriorityPoint } from "@/constants/DashboardData";

const chartConfig = {
  tasks: { label: "Tasks" },
  low: { label: "Low", color: "#94a3b8" },
  medium: { label: "Medium", color: "#6366f1" },
  high: { label: "High", color: "#f59e0b" },
  urgent: { label: "Urgent", color: "#f43f5e" },
} satisfies ChartConfig;

interface TasksByPriorityChartProps {
  data: PriorityPoint[];
}

export function TasksByPriorityChart({ data }: TasksByPriorityChartProps) {
  const total = useMemo(
    () => data.reduce((sum, d) => sum + d.tasks, 0),
    [data],
  );

  return (
    <Card>
      <CardHeader>
        <CardTitle>Tasks by priority</CardTitle>
        <CardDescription>Open tasks across all projects</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer
          config={chartConfig}
          className="mx-auto h-65 w-full"
        >
          <PieChart>
            <ChartTooltip content={<ChartTooltipContent hideLabel />} />
            <Pie
              data={data}
              dataKey="tasks"
              nameKey="priority"
              innerRadius={60}
              strokeWidth={4}
            >
              <Label
                content={({ viewBox }) => {
                  if (!viewBox || !("cx" in viewBox)) return null;
                  return (
                    <text
                      x={viewBox.cx}
                      y={viewBox.cy}
                      textAnchor="middle"
                      dominantBaseline="middle"
                    >
                      <tspan
                        x={viewBox.cx}
                        y={viewBox.cy}
                        className="fill-foreground text-3xl font-semibold"
                      >
                        {total}
                      </tspan>
                      <tspan
                        x={viewBox.cx}
                        y={(viewBox.cy ?? 0) + 22}
                        className="fill-muted-foreground text-sm"
                      >
                        Open tasks
                      </tspan>
                    </text>
                  );
                }}
              />
            </Pie>
            <ChartLegend content={<ChartLegendContent nameKey="priority" />} />
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
