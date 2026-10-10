"use client"


import { settingsNavGroups } from "@/constants/SettingsNav"
import { cn } from "@/lib/utils"
import { Link, useLocation } from "@tanstack/react-router";

export function SettingsNav() {
  const { pathname } = useLocation()
  const isActive = (href: string) => pathname === href || pathname.startsWith(`${href}/`)

  return (
    // A horizontal scrolling row on small screens, a vertical list on large ones.
    <nav aria-label="Settings" className="flex gap-6 overflow-x-auto lg:flex-col lg:gap-6 lg:overflow-visible">
      {settingsNavGroups.map((group) => (
        <div key={group.title} className="flex shrink-0 gap-1 lg:flex-col">
          <p className="hidden px-3 pb-1 text-xs font-medium uppercase tracking-wide text-muted-foreground lg:block">
            {group.title}
          </p>
          {group.items.map((item) => {
            const Icon = item.icon
            const active = isActive(item.href)
            return (
              <Link
                key={item.href}
                to={item.href}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "flex items-center gap-3 whitespace-nowrap rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                  active
                    ? "bg-primary/10 text-primary"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                )}
              >
                <Icon className="size-4" />
                {item.label}
              </Link>
            )
          })}
        </div>
      ))}
    </nav>
  )
}