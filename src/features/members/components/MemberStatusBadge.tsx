import { Badge } from "@/components/ui/badge"
import type { MemberStatus } from "@/constants/MembersData";
import { cn } from "@/lib/utils"

const styles: Record<MemberStatus, { label: string; className: string }> = {
  active: {
    label: "Active",
    className: "bg-emerald-100 text-emerald-700 hover:bg-emerald-100",
  },
  pending: {
    label: "Pending",
    className: "bg-amber-100 text-amber-700 hover:bg-amber-100",
  },
}

export function MemberStatusBadge({ status }: { status: MemberStatus }) {
  const { label, className } = styles[status]
  return <Badge className={cn("border-transparent font-medium", className)}>{label}</Badge>
}