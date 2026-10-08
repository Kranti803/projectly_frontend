"use client"

import { MoreHorizontal, Send, Trash2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { assignableRoles, type MemberRole, type OrgMember } from "@/constants/MembersData"

interface MemberActionsMenuProps {
  member: OrgMember
  onChangeRole: (role: MemberRole) => void
  onRemove: () => void
  onResend: () => void
}

export function MemberActionsMenu({
  member,
  onChangeRole,
  onRemove,
  onResend,
}: MemberActionsMenuProps) {
  const label = member.name ?? member.email

  return (
    // modal={false} stops the menu from blocking clicks once the confirm dialog opens.
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger>
        <Button variant="ghost" size="icon" className="size-8" aria-label={`Actions for ${label}`}>
          <MoreHorizontal className="size-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48">
        {member.status === "pending" && (
          <DropdownMenuItem onSelect={onResend}>
            <Send className="size-4" />
            Resend invite
          </DropdownMenuItem>
        )}

        <DropdownMenuSub>
          <DropdownMenuSubTrigger>Change role</DropdownMenuSubTrigger>
          <DropdownMenuSubContent>
            <DropdownMenuRadioGroup
              value={member.role}
              onValueChange={(v) => onChangeRole(v as MemberRole)}
            >
              {assignableRoles.map((role) => (
                <DropdownMenuRadioItem key={role.value} value={role.value}>
                  {role.label}
                </DropdownMenuRadioItem>
              ))}
            </DropdownMenuRadioGroup>
          </DropdownMenuSubContent>
        </DropdownMenuSub>

        <DropdownMenuSeparator />
        <DropdownMenuItem
          onSelect={onRemove}
          className="text-destructive focus:text-destructive"
        >
          <Trash2 className="size-4" />
          {member.status === "pending" ? "Cancel invite" : "Remove member"}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}