import { Badge } from "@/components/ui/badge"
import type { TeamRole } from "@/constants/TeamsData";
import { cn } from "@/lib/utils"

const styles: Record<TeamRole, { label: string; className: string }> = {
  lead: { label: "Lead", className: "bg-indigo-100 text-indigo-700 hover:bg-indigo-100" },
  member: { label: "Member", className: "bg-slate-100 text-slate-700 hover:bg-slate-100" },
}

export function TeamRoleBadge({ role }: { role: TeamRole }) {
  const { label, className } = styles[role]
  return <Badge className={cn("border-transparent font-medium", className)}>{label}</Badge>
}