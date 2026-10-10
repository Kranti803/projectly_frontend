import type { Project } from "@/constants/ProjectData"
import type { Task } from "@/constants/TaskData"

export interface SelectOption {
  value: string
  label: string
}

export function getProjectOptions(projects: Project[]): SelectOption[] {
  return projects.map((p) => ({ value: p.id, label: p.name }))
}

// Only people who actually have tasks appear in an assignee filter.
export function getAssigneeOptions(tasks: Task[]): SelectOption[] {
  const byId = new Map<string, string>()
  for (const task of tasks) {
    if (task.assignee) byId.set(task.assignee.id, task.assignee.name)
  }
  return [...byId].map(([value, label]) => ({ value, label }))
}

// Everyone across all projects, without duplicates. Used for the assignee picker.
export function getUniqueMembers(projects: Project[]) {
  const byId = new Map<string, Project["members"][number]>()
  for (const project of projects) {
    for (const member of project.members) byId.set(member.id, member)
  }
  return [...byId.values()]
}