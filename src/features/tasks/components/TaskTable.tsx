"use client"

import { useMemo } from "react"

import { Table, TableBody, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import type { Task } from "@/constants/TaskData"

import type { Project } from "@/constants/ProjectData"
import { TaskTableRow } from "./TaskTableRow"
interface TasksTableProps {
  tasks: Task[]
  projects: Project[]
  onSelectTask?: (task: Task) => void
}

export function TasksTable({ tasks, projects, onSelectTask }: TasksTableProps) {
  const projectsById = useMemo(() => new Map(projects.map((p) => [p.id, p])), [projects])

  return (
    <div className="rounded-xl border bg-card">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Task</TableHead>
            <TableHead>Project</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Priority</TableHead>
            <TableHead>Assignee</TableHead>
            <TableHead>Due date</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {tasks.map((task) => (
            <TaskTableRow
              key={task.id}
              task={task}
              project={projectsById.get(task.projectId)}
              onSelect={onSelectTask}
            />
          ))}
        </TableBody>
      </Table>
    </div>
  )
}