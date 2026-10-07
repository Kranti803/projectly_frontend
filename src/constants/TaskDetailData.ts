// Mock data. Replace getTaskDetail with a real fetch once the API exists.

import type { Member } from "./ProjectData"
import { labels, type TaskLabel } from "./TaskData"

export interface Subtask {
  id: string
  title: string
  done: boolean
}

export interface Attachment {
  id: string
  name: string
  size: number // bytes
  type: string // MIME type
}

export interface Comment {
  id: string
  author: Member
  body: string
  createdAt: string // ISO timestamp
}

// The extra data a task has beyond what the board and list need.
export interface TaskDetailData {
  description: string
  subtasks: Subtask[]
  attachments: Attachment[]
  comments: Comment[]
}

// Needs `export const labels` in tasks-data.ts (one-word change).
export const labelCatalog: TaskLabel[] = Object.values(labels)

const sarah: Member = { id: "m1", name: "Sarah Chen" }
const marcus: Member = { id: "m2", name: "Marcus Lee" }

const empty: TaskDetailData = {
  description: "",
  subtasks: [],
  attachments: [],
  comments: [],
}

const details: Record<string, TaskDetailData> = {
  t1: {
    description:
      "Users get bounced between /login and /dashboard after their session expires. Reproduce, find the cause, and add a regression test.",
    subtasks: [
      { id: "s1", title: "Reproduce with an expired token", done: true },
      { id: "s2", title: "Fix redirect logic in middleware", done: false },
      { id: "s3", title: "Add regression test", done: false },
    ],
    attachments: [{ id: "a1", name: "redirect-loop.png", size: 248000, type: "image/png" }],
    comments: [
      {
        id: "c1",
        author: marcus,
        body: "Looks like the refresh call fails silently. I'll pair on this if you want.",
        createdAt: "2026-10-06T09:30:00Z",
      },
      {
        id: "c2",
        author: sarah,
        body: "Thanks! Found it, the cookie isn't cleared on logout.",
        createdAt: "2026-10-06T14:10:00Z",
      },
    ],
  },
  t5: {
    description: "Let people drag cards between columns and reorder them within a column.",
    subtasks: [
      { id: "s4", title: "Set up dnd-kit", done: true },
      { id: "s5", title: "Cross-column moves", done: true },
      { id: "s6", title: "Keyboard sensor", done: false },
    ],
    attachments: [],
    comments: [],
  },
}

export function getTaskDetail(taskId: string): TaskDetailData {
  return details[taskId] ?? empty
}