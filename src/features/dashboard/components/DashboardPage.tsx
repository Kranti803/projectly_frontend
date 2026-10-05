import { CheckCircle2, FolderKanban, ListTodo, Users } from "lucide-react"

import { StatCard } from "@/features/dashboard/components/StatCard";
import { TaskCompletionChart } from "@/features/dashboard/components/TaskCompletionChart";
import { TasksByPriorityChart } from "@/features/dashboard/components/TaskByPriorityChart";
import { PageHeader } from "@/components/common/PageHeader";
import {
  completionData,
  priorityData,
  recentActivity,
  stats,
} from "@/constants/DashboardData";
import { RecentActivity } from "./RecentActivity";

export default function DashboardPage() {
  return (
    <div className="mx-auto max-w-7xl space-y-6 py-2">
      <PageHeader
        title="Welcome back, Kranti"
        description="Here's what's happening across your projects."
      />

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Total projects" value={stats.totalProjects} icon={FolderKanban} />
        <StatCard label="Active tasks" value={stats.activeTasks} icon={ListTodo} />
        <StatCard label="Completed tasks" value={stats.completedTasks} icon={CheckCircle2} />
        <StatCard label="Team members" value={stats.teamMembers} icon={Users} />
      </section>

      <section className="grid gap-6 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2">
          <TaskCompletionChart data={completionData} />
          <TasksByPriorityChart data={priorityData} />
        </div>
        <RecentActivity entries={recentActivity} />
      </section>
    </div>
  )
}