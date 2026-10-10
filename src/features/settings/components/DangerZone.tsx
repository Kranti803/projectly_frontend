"use client"

import { useState } from "react"

import { Button } from "@/components/ui/button"
import { DeleteOrganizationDialog } from "./DeleteOrganizationDialog"
import { SettingsSection } from "./SettingsSection"

export function DangerZone({ organizationName }: { organizationName: string }) {
  const [open, setOpen] = useState(false)

  // TODO: call DELETE /organizations/:id, then sign out or send the user to another organization.
  function handleDelete() {}

  return (
    <>
      <SettingsSection
        title="Danger zone"
        description="Actions here are permanent."
        variant="danger"
      >
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-sm font-medium">Delete this organization</p>
            <p className="text-sm text-muted-foreground">
              Removes all projects, tasks and member access.
            </p>
          </div>
          <Button variant="destructive" onClick={() => setOpen(true)}>
            Delete organization
          </Button>
        </div>
      </SettingsSection>

      <DeleteOrganizationDialog
        open={open}
        onOpenChange={setOpen}
        organizationName={organizationName}
        onConfirm={handleDelete}
      />
    </>
  )
}