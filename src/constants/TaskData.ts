// Mock data. Replace with real fetches once the API exists.

import type { Member } from "./ProjectData";

export type Priority = "urgent" | "high" | "medium" | "low";

export type TaskStatus = "todo" | "in_progress" | "in_review" | "done";

export type LabelColor =
  "indigo" | "sky" | "emerald" | "amber" | "rose" | "violet";

export interface TaskLabel {
  id: string;
  name: string;
  color: LabelColor;
}

export interface Task {
  id: string;
  projectId: string;
  title: string;
  status: TaskStatus;
  priority: Priority;
  labels: TaskLabel[];
  assignee?: Member;
  dueDate?: string; // ISO date
}

export const columns: { id: TaskStatus; title: string }[] = [
  { id: "todo", title: "To Do" },
  { id: "in_progress", title: "In Progress" },
  { id: "in_review", title: "In Review" },
  { id: "done", title: "Done" },
];

export const statusLabels: Record<TaskStatus, string> = {
  todo: "To Do",
  in_progress: "In Progress",
  in_review: "In Review",
  done: "Done",
};

// TODO: replace with the logged-in user's id from your session.
export const currentUserId = "m1";

export const labels = {
  bug: { id: "l1", name: "Bug", color: "rose" },
  feature: { id: "l2", name: "Feature", color: "indigo" },
  design: { id: "l3", name: "Design", color: "violet" },
  backend: { id: "l4", name: "Backend", color: "sky" },
  docs: { id: "l5", name: "Docs", color: "emerald" },
} satisfies Record<string, TaskLabel>;

const sarah: Member = { id: "m1", name: "Sarah Chen" };
const marcus: Member = { id: "m2", name: "Marcus Lee" };
const priya: Member = { id: "m3", name: "Priya Nair" };
const daniel: Member = { id: "m4", name: "Daniel Ortiz" };

export const tasks: Task[] = [
  {
    id: "t1",
    projectId: "p1",
    title: "Fix login redirect loop",
    status: "todo",
    priority: "urgent",
    labels: [labels.bug],
    assignee: sarah,
    dueDate: "2026-10-12",
  },
  {
    id: "t2",
    projectId: "p2",
    title: "Design empty states for task list",
    status: "todo",
    priority: "low",
    labels: [labels.design],
    assignee: priya,
  },
  {
    id: "t3",
    projectId: "p1",
    title: "Add offline queue for task edits",
    status: "todo",
    priority: "high",
    labels: [labels.feature, labels.backend],
    assignee: daniel,
    dueDate: "2026-10-25",
  },
  {
    id: "t4",
    projectId: "p5",
    title: "Build notification preferences API",
    status: "in_progress",
    priority: "medium",
    labels: [labels.backend],
    assignee: marcus,
    dueDate: "2026-10-18",
  },
  {
    id: "t5",
    projectId: "p1",
    title: "Kanban drag and drop",
    status: "in_progress",
    priority: "high",
    labels: [labels.feature],
    assignee: sarah,
    dueDate: "2026-10-15",
  },
  {
    id: "t6",
    projectId: "p4",
    title: "Review onboarding copy",
    status: "in_review",
    priority: "low",
    labels: [labels.docs],
    assignee: priya,
  },
  {
    id: "t7",
    projectId: "p2",
    title: "Dashboard chart accessibility pass",
    status: "in_review",
    priority: "medium",
    labels: [labels.design, labels.bug],
    assignee: daniel,
    dueDate: "2026-10-10",
  },
  {
    id: "t8",
    projectId: "p5",
    title: "Set up CI for the web app",
    status: "done",
    priority: "medium",
    labels: [labels.backend],
    assignee: marcus,
  },
  {
    id: "t9",
    projectId: "p1",
    title: "Write project README",
    status: "done",
    priority: "low",
    labels: [labels.docs],
    assignee: sarah,
  },
  {
    id: "t10",
    projectId: "p3",
    title: "Draft launch announcement email",
    status: "in_progress",
    priority: "high",
    labels: [labels.docs],
    assignee: priya,
    dueDate: "2026-10-20",
  },
  {
    id: "t11",
    projectId: "p3",
    title: "Prepare social media assets",
    status: "todo",
    priority: "medium",
    labels: [labels.design],
    assignee: sarah,
    dueDate: "2026-10-28",
  },
  {
    id: "t12",
    projectId: "p5",
    title: "Migrate legacy subscriptions",
    status: "todo",
    priority: "urgent",
    labels: [labels.backend, labels.feature],
    dueDate: "2026-11-05",
  },
  {
    id: "t13",
    projectId: "p2",
    title: "Simplify billing address form",
    status: "in_progress",
    priority: "medium",
    labels: [labels.design],
    assignee: marcus,
    dueDate: "2026-11-02",
  },
];

// TODO: replace with real queries.
export function getAllTasks(): Task[] {
  return tasks;
}

export function getTasksForProject(projectId: string): Task[] {
  return tasks.filter((t) => t.projectId === projectId);
}
