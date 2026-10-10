"use client"

import { useState } from "react"

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

interface DeleteOrganizationDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  organizationName: string
  onConfirm: () => void
}

export function DeleteOrganizationDialog({
  open,
  onOpenChange,
  organizationName,
  onConfirm,
}: DeleteOrganizationDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Delete {organizationName}?</DialogTitle>
          <DialogDescription>
            This permanently deletes the organization, its projects, tasks and members' access. This
            can't be undone.
          </DialogDescription>
        </DialogHeader>
        {/* DialogContent unmounts when closed, so the typed text resets on every open. */}
        <ConfirmForm
          organizationName={organizationName}
          onCancel={() => onOpenChange(false)}
          onConfirm={() => {
            onConfirm()
            onOpenChange(false)
          }}
        />
      </DialogContent>
    </Dialog>
  )
}

interface ConfirmFormProps {
  organizationName: string
  onCancel: () => void
  onConfirm: () => void
}

function ConfirmForm({ organizationName, onCancel, onConfirm }: ConfirmFormProps) {
  const [typed, setTyped] = useState("")
  const matches = typed === organizationName

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="confirm-org-name">
          Type <span className="font-semibold">{organizationName}</span> to confirm
        </Label>
        <Input
          id="confirm-org-name"
          value={typed}
          onChange={(e) => setTyped(e.target.value)}
          autoComplete="off"
        />
      </div>
      <DialogFooter>
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="button" variant="destructive" disabled={!matches} onClick={onConfirm}>
          Delete organization
        </Button>
      </DialogFooter>
    </div>
  )
}