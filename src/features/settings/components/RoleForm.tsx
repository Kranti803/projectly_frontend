"use client"

import { useState, type FormEvent } from "react"
import { ArrowLeft, Info } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

import type { Role } from "@/constants/RolesData"
import { Link, useRouter } from "@tanstack/react-router"
import { usePermissionMatrix } from "../hooks/UsePermissionMatrix"
import { PermissionMatrix } from "./PermissionMatrix"
import { useRoles } from "./RolesProvider"

interface RoleFormProps {
  role?: Role // when given, the form edits this role instead of creating one
}

export function RoleForm({ role }: RoleFormProps) {
  const router = useRouter()
  const { roles, createRole, updateRole } = useRoles()
  const isEditing = !!role
  const isOwner = role?.id === "owner" // the Owner always has every permission

  const [name, setName] = useState(role?.name ?? "")
  const [description, setDescription] = useState(role?.description ?? "")
  const [nameError, setNameError] = useState<string | null>(null)
  const matrix = usePermissionMatrix(role?.permissions ?? [])

  function validateName() {
    const trimmed = name.trim()
    if (!trimmed) return "Role name is required."
    const taken = roles.some((r) => r.id !== role?.id && r.name.toLowerCase() === trimmed.toLowerCase())
    return taken ? "A role with this name already exists." : null
  }

  // TODO: replace with API calls (POST /roles or PATCH /roles/:id).
  function handleSubmit(e: FormEvent) {
    e.preventDefault()
    const error = validateName()
    setNameError(error)
    if (error) return

    const input = {
      name: name.trim(),
      description: description.trim(),
      permissions: matrix.permissions,
    }
    if (role) updateRole(role.id, isOwner ? { description: input.description } : input)
    else createRole(input)
    router.navigate({ to: "/settings/roles" })
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-6">
      <div className="space-y-3">
        <Link
          to="/settings/roles"
          className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="size-4" />
          All roles
        </Link>
        <h2 className="text-xl font-semibold tracking-tight">
          {isEditing ? `Edit ${role.name}` : "Create role"}
        </h2>
      </div>

      <div className="space-y-4 rounded-xl border bg-card p-5">
        <div className="space-y-2">
          <Label htmlFor="role-name">Role name</Label>
          <Input
            id="role-name"
            value={name}
            onChange={(e) => {
              setName(e.target.value)
              setNameError(null)
            }}
            placeholder="e.g. Reviewer"
            disabled={role?.isDefault}
            aria-invalid={!!nameError}
          />
          {nameError && <p className="text-xs text-destructive">{nameError}</p>}
          {role?.isDefault && (
            <p className="text-xs text-muted-foreground">Default roles can't be renamed.</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="role-description">Description</Label>
          <Textarea
            id="role-description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="What is this role for?"
            rows={2}
          />
        </div>
      </div>

      <div className="space-y-3">
        <div className="flex items-baseline justify-between">
          <h3 className="font-semibold">Permissions</h3>
          <span className="text-sm text-muted-foreground">{matrix.count} enabled</span>
        </div>

        {isOwner && (
          <p className="flex items-center gap-2 rounded-lg bg-muted px-3 py-2 text-sm text-muted-foreground">
            <Info className="size-4 shrink-0" />
            The Owner always has every permission, so these can't be changed.
          </p>
        )}

        <PermissionMatrix matrix={matrix} readOnly={isOwner} />
      </div>

      {/* Sticks to the bottom of the scrolling page area. */}
      <div className="sticky bottom-0 z-10 -mx-6 mt-8 flex justify-end gap-3 border-t bg-background/95 px-6 py-4 backdrop-blur lg:-mx-8 lg:px-8">
        <Button type="button" variant="outline">
          <Link to="/settings/roles">Cancel</Link>
        </Button>
        <Button type="submit">{isEditing ? "Save role" : "Create role"}</Button>
      </div>
    </form>
  )
}
