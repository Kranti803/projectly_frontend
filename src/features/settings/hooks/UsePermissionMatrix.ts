"use client"

import { type PermissionGroupDefinition, allPermissionKeys } from "@/constants/Permissions"
import { useState } from "react"


export function usePermissionMatrix(initial: string[]) {
  const [selected, setSelected] = useState<Set<string>>(() => new Set(initial))

  const has = (key: string) => selected.has(key)

  function toggle(key: string) {
    setSelected((prev) => {
      const next = new Set(prev)
      if (next.has(key)) next.delete(key)
      else next.add(key)
      return next
    })
  }

  // Turns every permission in a group on or off at once.
  function setGroup(group: PermissionGroupDefinition, enabled: boolean) {
    setSelected((prev) => {
      const next = new Set(prev)
      for (const permission of group.permissions) {
        if (enabled) next.add(permission.key)
        else next.delete(permission.key)
      }
      return next
    })
  }

  const enabledInGroup = (group: PermissionGroupDefinition) =>
    group.permissions.filter((p) => selected.has(p.key)).length

  return {
    // Kept in catalog order so saved roles are stable.
    permissions: allPermissionKeys.filter((k) => selected.has(k)),
    count: selected.size,
    has,
    toggle,
    setGroup,
    enabledInGroup,
  }
}

export type PermissionMatrixState = ReturnType<typeof usePermissionMatrix>