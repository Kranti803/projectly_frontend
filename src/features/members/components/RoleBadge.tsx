import { Badge } from "@/components/ui/badge"
import { type MemberRole, roleLabels } from "@/constants/MembersData"
import { cn } from "@/lib/utils"

const styles: Record<MemberRole, string> = {
  owner: "bg-violet-100 text-violet-700 hover:bg-violet-100",
  admin: "bg-indigo-100 text-indigo-700 hover:bg-indigo-100",
  project_manager: "bg-sky-100 text-sky-700 hover:bg-sky-100",
  member: "bg-slate-100 text-slate-700 hover:bg-slate-100",
  guest: "bg-amber-100 text-amber-700 hover:bg-amber-100",
}

export function RoleBadge({ role }: { role: MemberRole }) {
  return (
    <Badge className={cn("border-transparent font-medium", styles[role])}>{roleLabels[role]}</Badge>
  )
}