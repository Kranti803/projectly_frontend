"use client"

import { ChevronRight } from "lucide-react"

import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { Switch } from "@/components/ui/switch"
import type { PermissionGroupDefinition } from "@/constants/Permissions"
import type { PermissionMatrixState } from "../hooks/UsePermissionMatrix"


interface PermissionGroupProps {
  group: PermissionGroupDefinition
  matrix: PermissionMatrixState
  readOnly?: boolean
  defaultOpen?: boolean
}

export function PermissionGroup({ group, matrix, readOnly, defaultOpen }: PermissionGroupProps) {
  const enabled = matrix.enabledInGroup(group)
  const total = group.permissions.length

  return (
    <Collapsible defaultOpen={defaultOpen} className="rounded-xl border bg-card">
      <div className="flex items-center gap-3 px-4 py-3">
        <CollapsibleTrigger className="group flex flex-1 items-center gap-2 text-left">
          <ChevronRight className="size-4 text-muted-foreground transition-transform group-data-[state=open]:rotate-90" />
          <span className="font-medium">{group.label}</span>
          <span className="text-xs text-muted-foreground">
            {enabled} of {total} enabled
          </span>
        </CollapsibleTrigger>
        {/* Outside the trigger, so flipping it doesn't also open or close the group. */}
        <Switch
          checked={enabled === total}
          onCheckedChange={(checked) => matrix.setGroup(group, checked)}
          disabled={readOnly}
          aria-label={`Enable all ${group.label} permissions`}
        />
      </div>

      <CollapsibleContent>
        <ul className="divide-y border-t">
          {group.permissions.map((permission) => (
            <li key={permission.key} className="flex items-center justify-between gap-4 px-4 py-3">
              <label htmlFor={permission.key} className="min-w-0 flex-1 cursor-pointer">
                <span className="block text-sm font-medium">{permission.label}</span>
                <span className="block text-xs text-muted-foreground">{permission.description}</span>
              </label>
              <Switch
                id={permission.key}
                checked={matrix.has(permission.key)}
                onCheckedChange={() => matrix.toggle(permission.key)}
                disabled={readOnly}
              />
            </li>
          ))}
        </ul>
      </CollapsibleContent>
    </Collapsible>
  )
}