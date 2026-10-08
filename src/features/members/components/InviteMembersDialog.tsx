"use client"

import { useState, type FormEvent } from "react"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { type MemberRole, assignableRoles } from "@/constants/MembersData"

export interface InviteValues {
  emails: string[]
  role: MemberRole
}

interface InviteMembersDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  existingEmails: string[] // lowercase emails already in the org or invited
  onSubmit: (values: InviteValues) => void
}

export function InviteMembersDialog({
  open,
  onOpenChange,
  existingEmails,
  onSubmit,
}: InviteMembersDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Invite members</DialogTitle>
          <DialogDescription>
            Send an email invite. People join with the role you pick.
          </DialogDescription>
        </DialogHeader>
        {/* DialogContent unmounts when closed, so the form resets on every open. */}
        <InviteForm
          existingEmails={existingEmails}
          onCancel={() => onOpenChange(false)}
          onSubmit={(values) => {
            onSubmit(values)
            onOpenChange(false)
          }}
        />
      </DialogContent>
    </Dialog>
  )
}

interface InviteFormProps {
  existingEmails: string[]
  onCancel: () => void
  onSubmit: (values: InviteValues) => void
}

function InviteForm({ existingEmails, onCancel, onSubmit }: InviteFormProps) {
  const [emails, setEmails] = useState<string[]>([])
  const [role, setRole] = useState<MemberRole>("member")
  const [error, setError] = useState<string | null>(null)

  function handleSubmit(e: FormEvent) {
    e.preventDefault()
    if (emails.length === 0) {
      setError("Add at least one email address.")
      return
    }
    const duplicate = emails.find((email) => existingEmails.includes(email))
    if (duplicate) {
      setError(`${duplicate} is already a member or has a pending invite.`)
      return
    }
    onSubmit({ emails, role })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4" noValidate>
      <div className="space-y-2">
        <Label htmlFor="invite-emails">Email addresses</Label>
        <Input
          id="invite-emails"
          type="email"
          multiple
          value={emails.join(", ")}
          onChange={(event) => {
            const next = event.target.value
              .split(",")
              .map((email) => email.trim())
              .filter(Boolean)
            setEmails(next)
            setError(null)
          }}
          placeholder="name@company.com, name2@company.com"
          aria-invalid={!!error}
        />
        {error && <p className="text-xs text-destructive">{error}</p>}
      </div>

      <div className="space-y-2">
        <Label htmlFor="invite-role">Role</Label>
        <Select value={role} onValueChange={(v) => setRole(v as MemberRole)}>
          <SelectTrigger id="invite-role">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {assignableRoles.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <DialogFooter className="pt-2">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit">Send invites</Button>
      </DialogFooter>
    </form>
  )
}