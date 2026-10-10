"use client"

import { useState } from "react"
import { Plus } from "lucide-react"


import { Button } from "@/components/ui/button"
import { Link } from "@tanstack/react-router"

import type { OrgMember } from "@/constants/MembersData"
import type { Role } from "@/constants/RolesData"
import { ConfirmDialog } from "@/features/members/components/ConfirmDialog"
import { toAvatarMember } from "@/utils/team-utils"
import { RoleCard } from "./RoleCard"
import { useRoles } from "./RolesProvider"

export function RolesView({ orgMembers }: { orgMembers: OrgMember[] }) {
  const { roles, deleteRole } = useRoles()
  // roleToDelete stays set while the dialog animates closed, so its text doesn't vanish early.
  const [roleToDelete, setRoleToDelete] = useState<Role | null>(null)
  const [confirmOpen, setConfirmOpen] = useState(false)

  function requestDelete(role: Role) {
    setRoleToDelete(role)
    setConfirmOpen(true)
  }

  function confirmDelete() {
    if (roleToDelete) deleteRole(roleToDelete.id)
    setConfirmOpen(false)
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div className="space-y-1">
          <h2 className="text-xl font-semibold tracking-tight">Roles</h2>
          <p className="text-sm text-muted-foreground">
            Roles decide what people can see and do in your organization.
          </p>
        </div>
        <Button >
          <Link to="/settings/roles/new">
            <Plus className="size-4" />
            Create role
          </Link>
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {roles.map((role) => (
          <RoleCard
            key={role.id}
            role={role}
            members={orgMembers.filter((m) => m.role === role.id).map(toAvatarMember)}
            onDelete={requestDelete}
          />
        ))}
      </div>

      <ConfirmDialog
        open={confirmOpen}
        onOpenChange={setConfirmOpen}
        title={`Delete the ${roleToDelete?.name ?? ""} role?`}
        description="People with this role will lose its permissions. This can't be undone."
        confirmLabel="Delete role"
        destructive
        onConfirm={confirmDelete}
      />
    </div>
  )
}