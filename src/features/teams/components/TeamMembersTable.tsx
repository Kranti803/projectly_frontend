import { UserMinus } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { AvatarStack } from "@/components/common/AvatarStack"
import type { OrgMember } from "@/constants/MembersData"
import { type ResolvedTeamMember, toAvatarMember } from "@/utils/team-utils"
import { TeamRoleBadge } from "./TeamRoleBadge"

interface TeamMembersTableProps {
  members: ResolvedTeamMember[]
  onRemove: (member: OrgMember) => void
}

export function TeamMembersTable({ members, onRemove }: TeamMembersTableProps) {
  return (
    <div className="rounded-xl border bg-card">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Team role</TableHead>
            <TableHead className="w-12">
              <span className="sr-only">Actions</span>
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {members.map(({ member, role }) => {
            const displayName = member.name ?? member.email
            return (
              <TableRow key={member.id}>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <AvatarStack members={[toAvatarMember(member)]} size="w-8 h-8" />
                    <span className="font-medium">{displayName}</span>
                  </div>
                </TableCell>
                <TableCell className="text-muted-foreground">{member.email}</TableCell>
                <TableCell>
                  <TeamRoleBadge role={role} />
                </TableCell>
                <TableCell className="text-right">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="size-8"
                    onClick={() => onRemove(member)}
                    aria-label={`Remove ${displayName} from team`}
                  >
                    <UserMinus className="size-4" />
                  </Button>
                </TableCell>
              </TableRow>
            )
          })}
        </TableBody>
      </Table>
    </div>
  )
}