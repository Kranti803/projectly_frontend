    "use client"

import { useState, type FormEvent } from "react"

import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { AvatarStack } from "@/components/common/AvatarStack"
import type { OrgMember } from "@/constants/MembersData"
import { toAvatarMember } from "@/utils/team-utils"

interface AddTeamMembersDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  candidates: OrgMember[] // active org members who aren't on the team yet
  onSubmit: (memberIds: string[]) => void
}

export function AddTeamMembersDialog({
  open,
  onOpenChange,
  candidates,
  onSubmit,
}: AddTeamMembersDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Add members</DialogTitle>
          <DialogDescription>Choose people from your organization to add to this team.</DialogDescription>
        </DialogHeader>
        {/* DialogContent unmounts when closed, so the selection resets on every open. */}
        <AddMembersForm
          candidates={candidates}
          onCancel={() => onOpenChange(false)}
          onSubmit={(ids) => {
            onSubmit(ids)
            onOpenChange(false)
          }}
        />
      </DialogContent>
    </Dialog>
  )
}

interface AddMembersFormProps {
  candidates: OrgMember[]
  onCancel: () => void
  onSubmit: (memberIds: string[]) => void
}

function AddMembersForm({ candidates, onCancel, onSubmit }: AddMembersFormProps) {
  const [selected, setSelected] = useState<string[]>([])

  function toggle(id: string) {
    setSelected((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]))
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault()
    if (selected.length > 0) onSubmit(selected)
  }

  if (candidates.length === 0) {
    return (
      <div className="space-y-4">
        <p className="text-sm text-muted-foreground">
          Everyone in your organization is already on this team.
        </p>
        <DialogFooter>
          <Button type="button" variant="outline" onClick={onCancel}>
            Close
          </Button>
        </DialogFooter>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <ul className="max-h-72 space-y-1 overflow-y-auto">
        {candidates.map((member) => {
          const displayName = member.name ?? member.email
          return (
            <li key={member.id}>
              <label className="flex cursor-pointer items-center gap-3 rounded-lg px-2 py-2 hover:bg-muted">
                <Checkbox
                  checked={selected.includes(member.id)}
                  onCheckedChange={() => toggle(member.id)}
                />
                <AvatarStack members={[toAvatarMember(member)]} size="w-8 h-8" />
                <span className="min-w-0 flex-1">
                  <span className="block truncate text-sm font-medium">{displayName}</span>
                  <span className="block truncate text-xs text-muted-foreground">{member.email}</span>
                </span>
              </label>
            </li>
          )
        })}
      </ul>

      <DialogFooter>
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit" disabled={selected.length === 0}>
          {selected.length > 0 ? `Add ${selected.length}` : "Add members"}
        </Button>
      </DialogFooter>
    </form>
  )
}      