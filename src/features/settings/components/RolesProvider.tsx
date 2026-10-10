"use client"

import type { Role, RoleInput } from "@/constants/RolesData"
import { createContext, useContext, useState, type ReactNode } from "react"


interface RolesContextValue {
  roles: Role[]
  getRole: (id: string) => Role | undefined
  createRole: (input: RoleInput) => void
  updateRole: (id: string, input: Partial<RoleInput>) => void
  deleteRole: (id: string) => void
}

const RolesContext = createContext<RolesContextValue | null>(null)

// Lives in the settings layout, so changes survive moving between settings pages.
// TODO: replace the local state with API calls (and refetch or update a cache).
export function RolesProvider({
  initialRoles,
  children,
}: {
  initialRoles: Role[]
  children: ReactNode
}) {
  const [roles, setRoles] = useState(initialRoles)

  const value: RolesContextValue = {
    roles,
    getRole: (id) => roles.find((r) => r.id === id),
    createRole: (input) =>
      setRoles((prev) => [...prev, { ...input, id: `r-${Date.now()}`, isDefault: false }]),
    updateRole: (id, input) =>
      setRoles((prev) => prev.map((r) => (r.id === id ? { ...r, ...input } : r))),
    // Default roles can't be deleted.
    deleteRole: (id) => setRoles((prev) => prev.filter((r) => r.id !== id || r.isDefault)),
  }

  return <RolesContext.Provider value={value}>{children}</RolesContext.Provider>
}

export function useRoles() {
  const context = useContext(RolesContext)
  if (!context) throw new Error("useRoles must be used inside RolesProvider")
  return context
}