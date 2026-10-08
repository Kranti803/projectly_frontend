import { Table, TableBody, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import type { OrgMember, MemberRole } from "@/constants/MembersData"
import { currentUserId } from "@/constants/TaskData" // TODO: use the real session user
import { MemberRow } from "./MembersRow"


interface MembersTableProps {
  members: OrgMember[]
  onChangeRole: (id: string, role: MemberRole) => void
  onRemove: (member: OrgMember) => void
  onResend: (member: OrgMember) => void
}

export function MembersTable({ members, onChangeRole, onRemove, onResend }: MembersTableProps) {
  return (
    <div className="rounded-xl border bg-card">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Joined</TableHead>
            <TableHead className="w-12">
              <span className="sr-only">Actions</span>
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {members.map((member) => (
            <MemberRow
              key={member.id}
              member={member}
              // The owner can't be changed or removed, and you can't edit yourself.
              canManage={member.role !== "owner" && member.id !== currentUserId}
              onChangeRole={onChangeRole}
              onRemove={onRemove}
              onResend={onResend}
            />
          ))}
        </TableBody>
      </Table>
    </div>
  )
}