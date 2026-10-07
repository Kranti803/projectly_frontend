"use client"

import { AvatarStack } from "@/components/common/AvatarStack"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import type { Member } from "@/constants/ProjectData"

const UNASSIGNED = "none"

interface AssigneeSelectProps {
  id?: string
  value?: Member
  members: Member[]
  onChange: (member: Member | undefined) => void
}

export function AssigneeSelect({ id, value, members, onChange }: AssigneeSelectProps) {
  return (
    <Select
      value={value?.id ?? UNASSIGNED}
      onValueChange={(v) => onChange(members.find((m) => m.id === v))}
    >
      <SelectTrigger id={id} className="w-full">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value={UNASSIGNED}>Unassigned</SelectItem>
        {members.map((member) => (
          <SelectItem key={member.id} value={member.id}>
            <span className="flex items-center gap-2">
              <AvatarStack members={[member]} size="w-5 h-5" />
              {member.name}
            </span>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}