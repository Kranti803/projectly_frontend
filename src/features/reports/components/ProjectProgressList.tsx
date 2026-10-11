import { Progress } from "@/components/ui/progress"
import type { ProjectProgressRow } from "../types/Report.types"
import { ReportCard } from "./ReportCard"

export function ProjectProgressList({ data }: { data: ProjectProgressRow[] }) {
  return (
    <ReportCard title="Project progress" description="Finished tasks out of all tasks">
      {data.length === 0 ? (
        <p className="py-10 text-center text-sm text-muted-foreground">No projects with tasks yet.</p>
      ) : (
        <ul className="space-y-5">
          {data.map((project) => {
            const percent = Math.round((project.done / project.total) * 100)
            return (
              <li key={project.id} className="space-y-2">
                <div className="flex items-center justify-between gap-3 text-sm">
                  <span className="flex min-w-0 items-center gap-2 font-medium">
                    <span
                      className="size-2.5 shrink-0 rounded-full"
                      style={{ backgroundColor: project.color }}
                      aria-hidden
                    />
                    <span className="truncate">{project.name}</span>
                  </span>
                  <span className="shrink-0 text-muted-foreground">
                    {project.done}/{project.total} tasks · {percent}%
                  </span>
                </div>
                <Progress value={percent} aria-label={`${project.name} progress`} />
              </li>
            )
          })}
        </ul>
      )}
    </ReportCard>
  )
}