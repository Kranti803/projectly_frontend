// REPLACES the previous settings-navigation.ts. New: the "Account" group (Profile and Security).
import { Building2, Lock, ShieldCheck, User, type LucideIcon } from "lucide-react"

export interface SettingsNavItem {
  label: string
  href: string
  icon: LucideIcon
}

export interface SettingsNavGroup {
  title: string
  items: SettingsNavItem[]
}

export const settingsNavGroups: SettingsNavGroup[] = [
  {
    title: "Organization",
    items: [
      { label: "General", href: "/settings/general", icon: Building2 },
      { label: "Roles", href: "/settings/roles", icon: ShieldCheck },
    ],
  },
  {
    title: "Account",
    items: [
      { label: "Profile", href: "/settings/profile", icon: User },
      { label: "Security", href: "/settings/security", icon: Lock },
    ],
  },
]