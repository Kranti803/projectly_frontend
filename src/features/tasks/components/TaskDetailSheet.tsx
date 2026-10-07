"use client"


import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet"
import { currentUserId, type Task } from "@/constants/TaskData"
import { TaskDetailBody, type TaskDetailBodyProps } from "./TaskDetailBody"


interface TaskDetailSheetProps extends Omit<TaskDetailBodyProps, "task" | "detail" | "currentUser"> {
  open: boolean
  onOpenChange: (open: boolean) => void
  task: Task | null
  detail: TaskDetailBodyProps["detail"] | null
}

export function TaskDetailSheet({
  open,
  onOpenChange,
  task,
  detail,
  members,
  ...bodyProps
}: TaskDetailSheetProps) {
  // TODO: use the real logged-in user instead of the mock currentUserId.
  const currentUser = members.find((m) => m.id === currentUserId) ?? {
    id: currentUserId,
    name: "You",
  }

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="right" className="w-full gap-0 overflow-y-auto p-0 sm:max-w-xl">
        {/* Required for screen readers; the visible title is the editable input below. */}
        <SheetHeader className="sr-only">
          <SheetTitle>Task details</SheetTitle>
          <SheetDescription>View and edit this task.</SheetDescription>
        </SheetHeader>

        {task && detail && (
          // key resets the title input whenever a different task is opened.
          <TaskDetailBody
            key={task.id}
            task={task}
            detail={detail}
            members={members}
            currentUser={currentUser}
            {...bodyProps}
          />
        )}
      </SheetContent>
    </Sheet>
  )
}