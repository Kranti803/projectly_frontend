import { PageHeader } from "@/components/common/PageHeader"
import { roles } from "@/constants/RolesData"
import type { ReactNode } from "react"
import { RolesProvider } from "./RolesProvider"
import { SettingsNav } from "./SettingsNav"



export default function SettingsLayout({ children }: { children: ReactNode }) {
  // TODO: fetch roles on the server here and pass them in.
  return (
    <RolesProvider initialRoles={roles}>
      <div className="mx-auto max-w-6xl space-y-6">
        <PageHeader title="Settings" description="Manage your organization." />

        <div className="flex flex-col gap-6 lg:flex-row lg:gap-10">
          <aside className="lg:w-52 lg:shrink-0">
            <SettingsNav />
          </aside>
          <div className="min-w-0 flex-1">{children}</div>
        </div>
      </div>
    </RolesProvider>
  )
}