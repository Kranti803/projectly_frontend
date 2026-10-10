import { useMemo, useState } from "react"
import { Views, type View } from "react-big-calendar"
import type { EventInteractionArgs } from "react-big-calendar/lib/addons/dragAndDrop"

import { PageHeader } from "@/components/common/PageHeader"
import type { Project } from "@/constants/ProjectData"
import { labelCatalog } from "@/constants/TaskDetailData"
import type { Task } from "@/constants/TaskData"
import { CalendarFilters } from "@/features/calendar/components/CalendarFilters"
import { useCalendarEvents } from "@/features/calendar/hooks/useCalendarEvents"
import type { CalendarEvent } from "@/features/calendar/types/calendar.types"
import { TaskDetailSheet } from "@/features/tasks/components/TaskDetailSheet"
// Adjust this path if you haven't renamed useTaskPannel.ts to useTaskPanel.ts yet.
import { useTaskPanel } from "@/features/tasks/hooks/useTaskPannel"
import { toDueDate } from "@/utils/Calendar"
import { CalendarGrid } from "./CalendrGrid"
import { getProjectOptions, getAssigneeOptions, getUniqueMembers } from "@/lib/task-options"

interface CalendarViewProps {
  initialTasks: Task[]
  projects: Project[]
}

export function CalendarView({ initialTasks, projects }: CalendarViewProps) {
  // Tasks live in state so edits made in the panel or by dragging show up on the calendar.
  const [tasks, setTasks] = useState(initialTasks)
  const [date, setDate] = useState(() => new Date())
  const [view, setView] = useState<View>(Views.MONTH)

  const panel = useTaskPanel(tasks)
  const { filters, setFilter, resetFilters, hasActiveFilters, events, unscheduledCount } =
    useCalendarEvents(tasks)

  const projectOptions = useMemo(() => getProjectOptions(projects), [projects])
  const assigneeOptions = useMemo(() => getAssigneeOptions(tasks), [tasks])
  const allMembers = useMemo(() => getUniqueMembers(projects), [projects])

  // TODO: replace with an API call (PATCH /tasks/:id).
  function updateTask(id: string, patch: Partial<Task>) {
    setTasks((prev) => prev.map((t) => (t.id === id ? { ...t, ...patch } : t)))
  }

  // Dropping a task on another day changes its due date.
  function handleEventDrop({ event, start }: EventInteractionArgs<CalendarEvent>) {
    updateTask(event.resource.id, { dueDate: toDueDate(new Date(start)) })
  }

  return (
    <div className="mx-auto max-w-7xl space-y-6">
      <PageHeader
        title="Calendar"
        description="Tasks on their due dates. Drag a task to another day to reschedule it."
      />

      <CalendarFilters
        filters={filters}
        onFilterChange={setFilter}
        projects={projectOptions}
        assignees={assigneeOptions}
        hasActiveFilters={hasActiveFilters}
        onReset={resetFilters}
        unscheduledCount={unscheduledCount}
      />

      <CalendarGrid
        events={events}
        date={date}
        view={view}
        onNavigate={setDate}
        onView={setView}
        onSelectEvent={(event) => panel.openTask(event.resource)}
        onEventDrop={handleEventDrop}
      />

      <TaskDetailSheet
        open={panel.open}
        onOpenChange={panel.onOpenChange}
        task={panel.selectedTask}
        detail={panel.detail}
        members={allMembers}
        labels={labelCatalog}
        onUpdateTask={updateTask}
        onDetailChange={panel.updateDetail}
      />
    </div>
  )
}