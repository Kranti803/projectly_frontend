import { AvatarStack } from "@/components/common/AvatarStack"
import { TableCell, TableRow } from "@/components/ui/table"
import type { MemberRole, OrgMember } from "@/constants/MembersData"
import { formatDate } from "@/lib/formatDate"
import { MemberActionsMenu } from "./MemberActionsMenu"
import { MemberStatusBadge } from "./MemberStatusBadge"
import { RoleBadge } from "./RoleBadge"

interface MemberRowProps {
  member: OrgMember
  canManage: boolean // false for the owner and for yourself
  onChangeRole: (id: string, role: MemberRole) => void
  onRemove: (member: OrgMember) => void
  onResend: (member: OrgMember) => void
}

export function MemberRow({ member, canManage, onChangeRole, onRemove, onResend }: MemberRowProps) {
  return (
    <TableRow>
      <TableCell>
        <div className="flex items-center gap-3">
          <AvatarStack
            members={[{ id: member.id, name: member.name ?? member.email, avatarUrl: member.avatarUrl }]}
            size="w-8 h-8"
          />
          {member.name ? (
            <span className="font-medium">{member.name}</span>
          ) : (
            <span className="text-sm text-muted-foreground">Pending invite</span>
          )}
        </div>
      </TableCell>
      <TableCell className="text-muted-foreground">{member.email}</TableCell>
      <TableCell>
        <RoleBadge role={member.role} />
      </TableCell>
      <TableCell>
        <MemberStatusBadge status={member.status} />
      </TableCell>
      <TableCell className="whitespace-nowrap text-muted-foreground">
        {member.joinedAt ? formatDate(member.joinedAt) : "Not joined yet"}
      </TableCell>
      <TableCell className="w-12 text-right">
        {canManage && (
          <MemberActionsMenu
            member={member}
            onChangeRole={(role) => onChangeRole(member.id, role)}
            onRemove={() => onRemove(member)}
            onResend={() => onResend(member)}
          />
        )}
      </TableCell>
    </TableRow>
  )
}