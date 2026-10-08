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
import { Textarea } from "@/components/ui/textarea"
import { ColorPicker } from "@/components/common/ColorPicker"
import type { Team } from "@/constants/TeamsData"

export interface TeamFormValues {
  name: string
  description: string
  color: string
}

interface TeamFormDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  colors: string[]
  team?: Team // when given, the dialog edits this team instead of creating one
  onSubmit: (values: TeamFormValues) => void
}

export function TeamFormDialog({ open, onOpenChange, colors, team, onSubmit }: TeamFormDialogProps) {
  const isEditing = !!team

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{isEditing ? "Edit team" : "Create team"}</DialogTitle>
          <DialogDescription>
            {isEditing
              ? "Update the team's name, description and color."
              : "Teams group people together and own projects."}
          </DialogDescription>
        </DialogHeader>
        {/* DialogContent unmounts when closed, so the form resets on every open. */}
        <TeamForm
          colors={colors}
          team={team}
          submitLabel={isEditing ? "Save changes" : "Create team"}
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

interface TeamFormProps {
  colors: string[]
  team?: Team
  submitLabel: string
  onCancel: () => void
  onSubmit: (values: TeamFormValues) => void
}

function TeamForm({ colors, team, submitLabel, onCancel, onSubmit }: TeamFormProps) {
  const [values, setValues] = useState<TeamFormValues>({
    name: team?.name ?? "",
    description: team?.description ?? "",
    color: team?.color ?? colors[0],
  })
  const [nameError, setNameError] = useState<string | null>(null)

  function handleSubmit(e: FormEvent) {
    e.preventDefault()
    const name = values.name.trim()
    if (!name) {
      setNameError("Team name is required.")
      return
    }
    onSubmit({ ...values, name, description: values.description.trim() })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4" noValidate>
      <div className="space-y-2">
        <Label htmlFor="team-name">Team name</Label>
        <Input
          id="team-name"
          value={values.name}
          onChange={(e) => {
            setValues((prev) => ({ ...prev, name: e.target.value }))
            setNameError(null)
          }}
          placeholder="e.g. Customer Success"
          aria-invalid={!!nameError}
        />
        {nameError && <p className="text-xs text-destructive">{nameError}</p>}
      </div>

      <div className="space-y-2">
        <Label htmlFor="team-description">Description</Label>
        <Textarea
          id="team-description"
          value={values.description}
          onChange={(e) => setValues((prev) => ({ ...prev, description: e.target.value }))}
          placeholder="What does this team work on?"
          rows={3}
        />
      </div>

      <div className="space-y-2">
        <Label>Color</Label>
        <ColorPicker
          colors={colors}
          value={values.color}
          onChange={(color) => setValues((prev) => ({ ...prev, color }))}
        />
      </div>

      <DialogFooter className="pt-2">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit">{submitLabel}</Button>
      </DialogFooter>
    </form>
  )
}