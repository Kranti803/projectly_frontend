"use client";

import { useMemo } from "react";
import { ListChecks, SearchX } from "lucide-react";

import { Button } from "@/components/ui/button";
import { useTaskFilters } from "../hooks/useTaskFilter";

import type { Project } from "@/constants/ProjectData";
import type { Task } from "@/constants/TaskData";
import { PageHeader } from "@/components/common/PageHeader";
import { EmptyState } from "@/components/common/EmptyState";
import { TasksToolbar } from "./TaskToolbar";
import { TasksTable } from "./TaskTable";
import { SimplePagination } from "@/components/common/SimplePagination";
interface TasksViewProps {
  initialTasks: Task[];
  projects: Project[];
}

export function TasksView({ initialTasks, projects }: TasksViewProps) {
  const {
    filters,
    setFilter,
    resetFilters,
    hasActiveFilters,
    items,
    totalCount,
    page,
    setPage,
    totalPages,
  } = useTaskFilters(initialTasks);

  const projectOptions = useMemo(
    () => projects.map((p) => ({ value: p.id, label: p.name })),
    [projects],
  );

  // Only people who actually have tasks appear in the assignee filter.
  const assigneeOptions = useMemo(() => {
    const byId = new Map<string, string>();
    for (const task of initialTasks) {
      if (task.assignee) byId.set(task.assignee.id, task.assignee.name);
    }
    return [...byId].map(([value, label]) => ({ value, label }));
  }, [initialTasks]);

  // TODO: open the Task Detail panel (6.1) here.
  function handleSelectTask(_task: Task) {}

  return (
    <div className="mx-auto max-w-7xl space-y-6 p-4">
      <PageHeader
        title="Tasks"
        description="Every task across your projects."
      />

      {initialTasks.length === 0 ? (
        <EmptyState
          icon={ListChecks}
          title="No tasks yet"
          description="Tasks you create inside a project will show up here."
        />
      ) : (
        <>
          <TasksToolbar
            filters={filters}
            onFilterChange={setFilter}
            projects={projectOptions}
            assignees={assigneeOptions}
          />

          {totalCount === 0 ? (
            <EmptyState
              icon={SearchX}
              title="No matching tasks"
              description="Try a different search or clear your filters."
              action={
                hasActiveFilters ? (
                  <Button variant="outline" onClick={resetFilters}>
                    Clear filters
                  </Button>
                ) : undefined
              }
            />
          ) : (
            <>
              <p className="text-sm text-muted-foreground">
                {totalCount} {totalCount === 1 ? "task" : "tasks"}
              </p>
              <TasksTable
                tasks={items}
                projects={projects}
                onSelectTask={handleSelectTask}
              />
            </>
          )}

          <SimplePagination
            page={page}
            totalPages={totalPages}
            onPageChange={setPage}
          />
        </>
      )}
    </div>
  );
}
