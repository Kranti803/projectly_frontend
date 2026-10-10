"use client"

import { permissionGroups } from "@/constants/Permissions"
import type { PermissionMatrixState } from "../hooks/UsePermissionMatrix"
import { PermissionGroup } from "./PermissionGroup"

interface PermissionMatrixProps {
  matrix: PermissionMatrixState
  readOnly?: boolean
}

export function PermissionMatrix({ matrix, readOnly }: PermissionMatrixProps) {
  return (
    <div className="space-y-3">
      {permissionGroups.map((group, index) => (
        <PermissionGroup
          key={group.id}
          group={group}
          matrix={matrix}
          readOnly={readOnly}
          defaultOpen={index === 0}
        />
      ))}
    </div>
  )
}