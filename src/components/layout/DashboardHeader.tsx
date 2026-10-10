import { Bell, Search } from "lucide-react";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { NotificationBell } from "@/features/notifications/components/NotificationBell";

interface DashboardHeaderProps {
  user: {
    name: string;
    role: string;
    avatar?: string;
  };
  hasUnreadNotifications?: boolean;
  onSearch?: (value: string) => void;
}

export function DashboardHeader({
  user,
  hasUnreadNotifications = false,
  onSearch,
}: DashboardHeaderProps) {
  const initials = user.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  return (
    <header className="flex h-16 shrink-0 items-center justify-between gap-4 border-b bg-white px-4">
      <div className="flex items-center gap-3">
        <SidebarTrigger className="-ml-1" />
      </div>
      <div className="flex-1 max-w-md">
        <div className="relative">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <Input
            type="text"
            placeholder="Search projects, tasks..."
            onChange={(e) => onSearch?.(e.target.value)}
            className="h-9 rounded-lg border-slate-200 bg-slate-50 pl-9 pr-14 text-sm placeholder:text-slate-400 focus-visible:bg-white"
          />
          <kbd className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 rounded border border-slate-200 bg-white px-1.5 py-0.5 text-[10px] font-medium text-slate-400">
            ⌘K
          </kbd>
        </div>
      </div>
      <div className="flex items-center gap-4">
        <button
          type="button"
          className="relative flex h-9 w-9 items-center justify-center rounded-full text-slate-500 hover:bg-slate-100"
          aria-label="Notifications"
        >
          <NotificationBell/>
          {hasUnreadNotifications && (
            <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-indigo-600 ring-2 ring-white" />
          )}
        </button>
        <div className="flex items-center gap-2.5">
          <Avatar className="h-8 w-8">
            <AvatarImage src={user.avatar} alt={user.name} />
            <AvatarFallback className="bg-indigo-100 text-xs font-medium text-indigo-700">
              {initials}
            </AvatarFallback>
          </Avatar>
          <div className="hidden leading-tight sm:block">
            <p className="text-sm font-medium text-slate-800">{user.name}</p>
            <p className="text-xs text-slate-400">{user.role}</p>
          </div>
        </div>
      </div>
    </header>
  );
}
