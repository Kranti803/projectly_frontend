"use client"

import { ShieldQuestion } from "lucide-react"
import { Button } from "@/components/ui/button"
import { EmptyState } from "@/components/common/EmptyState"
import { Link } from "@tanstack/react-router"
import { RoleForm } from "./RoleForm"
import { useRoles } from "./RolesProvider"

// Roles live in client state for now, so the lookup happens here instead of in the server page.
export function EditRolePage({ roleId }: { roleId: string }) {
  const { getRole } = useRoles()
  const role = getRole(roleId)

  if (!role) {
    return (
      <EmptyState
        icon={ShieldQuestion}
        title="Role not found"
        description="This role may have been deleted."
        action={
          <Button variant="outline">
            <Link to="/settings/roles">Back to roles</Link>
          </Button>
        }
      />
    )
  }

  // key resets the form when a different role is opened.
  return <RoleForm key={role.id} role={role} />
}
