"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import type { Task, TaskLabel } from "@/constants/TaskData"
import type { TaskDetailData } from "@/constants/TaskDetailData"
import type { Member } from "@/constants/ProjectData"
import { CommentThread } from "./CommentThread"
import { AttachmentList } from "./AttachmentList"
import { DueDateField } from "./DueDateField"
import { LabelPicker } from "./LabelPicker"
import { AssigneeSelect } from "./AssigneeSelect"
import { StatusSelect } from "./StatusSelect"
import { TaskFieldRow } from "./TaskFieldRow"
import { PrioritySelect } from "./PrioritySelect"
import { SubtaskList } from "./SubTaskList"


export interface TaskDetailBodyProps {
  task: Task
  detail: TaskDetailData
  members: Member[]
  labels: TaskLabel[]
  currentUser: Member
  onUpdateTask: (id: string, patch: Partial<Task>) => void
  onDetailChange: (updater: (current: TaskDetailData) => TaskDetailData) => void
}

export function TaskDetailBody({
  task,
  detail,
  members,
  labels,
  currentUser,
  onUpdateTask,
  onDetailChange,
}: TaskDetailBodyProps) {
  const [title, setTitle] = useState(task.title)
  const update = (patch: Partial<Task>) => onUpdateTask(task.id, patch)
  const updateDetail = (patch: Partial<TaskDetailData>) =>
    onDetailChange((current) => ({ ...current, ...patch }))

  // Saves on blur or Enter. An empty title reverts to the previous one.
  function commitTitle() {
    const trimmed = title.trim()
    if (!trimmed) return setTitle(task.title)
    if (trimmed !== task.title) update({ title: trimmed })
  }

  return (
    <div className="space-y-6 p-6 pt-12">
      <Input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        onBlur={commitTitle}
        onKeyDown={(e) => e.key === "Enter" && e.currentTarget.blur()}
        aria-label="Task title"
        className="h-auto border-transparent px-2 py-1 text-xl font-semibold shadow-none hover:border-input focus-visible:border-input"
      />

      <div className="space-y-3">
        <TaskFieldRow label="Status" htmlFor="task-status">
          <StatusSelect id="task-status" value={task.status} onChange={(status) => update({ status })} />
        </TaskFieldRow>
        <TaskFieldRow label="Priority" htmlFor="task-priority">
          <PrioritySelect
            id="task-priority"
            value={task.priority}
            onChange={(priority) => update({ priority })}
          />
        </TaskFieldRow>
        <TaskFieldRow label="Assignee" htmlFor="task-assignee">
          <AssigneeSelect
            id="task-assignee"
            value={task.assignee}
            members={members}
            onChange={(assignee) => update({ assignee })}
          />
        </TaskFieldRow>
        <TaskFieldRow label="Due date" htmlFor="task-due">
          <DueDateField id="task-due" value={task.dueDate} onChange={(dueDate) => update({ dueDate })} />
        </TaskFieldRow>
        <TaskFieldRow label="Labels">
          <LabelPicker
            selected={task.labels}
            available={labels}
            onChange={(next) => update({ labels: next })}
          />
        </TaskFieldRow>
      </div>

      <section className="space-y-2 border-t pt-6">
        <Label htmlFor="task-description" className="text-sm font-semibold">
          Description
        </Label>
        {/* Plain textarea for now. Swap in a rich-text editor (e.g. Tiptap) later. */}
        <Textarea
          id="task-description"
          value={detail.description}
          onChange={(e) => updateDetail({ description: e.target.value })}
          placeholder="Add more detail about this task"
          rows={5}
        />
      </section>

      <section className="border-t pt-6">
        <SubtaskList subtasks={detail.subtasks} onChange={(subtasks) => updateDetail({ subtasks })} />
      </section>

      <section className="border-t pt-6">
        <AttachmentList
          attachments={detail.attachments}
          onChange={(attachments) => updateDetail({ attachments })}
        />
      </section>

      <section className="border-t pt-6">
        <CommentThread
          comments={detail.comments}
          currentUser={currentUser}
          onChange={(comments) => updateDetail({ comments })}
        />
      </section>
    </div>
  )
}