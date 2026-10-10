import { Lock, Pencil, Trash2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import type { Role } from "@/constants/RolesData"
import type { Member } from "@/constants/ProjectData"
import { Link } from "@tanstack/react-router"
import { AvatarStack } from "@/components/common/AvatarStack"


interface RoleCardProps {
  role: Role
  members: Member[]
  onDelete: (role: Role) => void
}

export function RoleCard({ role, members, onDelete }: RoleCardProps) {
  return (
    <Card className="h-full">
      <CardContent className="flex h-full flex-col gap-4 p-5">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <h3 className="flex items-center gap-2 font-semibold">
              {role.name}
              {role.isDefault && (
                <span className="rounded-md bg-muted px-1.5 py-0.5 text-[11px] font-medium text-muted-foreground">
                  Default
                </span>
              )}
            </h3>
            <p className="mt-1 text-sm text-muted-foreground">{role.description}</p>
          </div>

          <div className="flex shrink-0 gap-1">
            <Button  variant="ghost" size="icon" className="size-8">
              <Link
                to="/settings/roles/$roleId"
                params={{ roleId: role.id }}
                aria-label={`Edit ${role.name}`}
              >
                <Pencil className="size-4" />
              </Link>
            </Button>
            {role.isDefault ? (
              <Button
                variant="ghost"
                size="icon"
                className="size-8"
                disabled
                title="Default roles can't be deleted"
                aria-label={`${role.name} can't be deleted`}
              >
                <Lock className="size-4" />
              </Button>
            ) : (
              <Button
                variant="ghost"
                size="icon"
                className="size-8 text-destructive hover:text-destructive"
                onClick={() => onDelete(role)}
                aria-label={`Delete ${role.name}`}
              >
                <Trash2 className="size-4" />
              </Button>
            )}
          </div>
        </div>

        <div className="mt-auto flex items-center justify-between">
          <AvatarStack members={members} />
          <span className="text-xs text-muted-foreground">
            {members.length} {members.length === 1 ? "member" : "members"} · {role.permissions.length}{" "}
            permissions
          </span>
        </div>
      </CardContent>
    </Card>
  )
}