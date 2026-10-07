import { Badge } from "@/components/ui/badge"
import type { ProjectStatus } from "@/constants/ProjectData";
import { cn } from "@/lib/utils"

const styles: Record<ProjectStatus, { label: string; className: string }> = {
  active: {
    label: "Active",
    className: "border-transparent bg-emerald-100 text-emerald-700 hover:bg-emerald-100",
  },
  archived: {
    label: "Archived",
    className: "border-transparent bg-muted text-muted-foreground hover:bg-muted",
  },
}

export function ProjectStatusBadge({ status }: { status: ProjectStatus }) {
  const { label, className } = styles[status]
  return <Badge className={cn("font-medium", className)}>{label}</Badge>
}