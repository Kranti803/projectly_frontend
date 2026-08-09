import type { ReactNode } from "react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarInset,
  useSidebar,
} from "@/components/ui/sidebar";
import { NavUser } from "@/components/nav-user";
import { BrandMark } from "@/components/common/BrandMark";
import { DashboardHeader } from "@/components/layout/DashboardHeader";
import {
  LayoutDashboard,
  Folder,
  CheckSquare,
  Calendar,
  Users,
  BarChart3,
} from "lucide-react";
import { Link } from "@tanstack/react-router";

interface DashboardLayoutProps {
  children: ReactNode;
}

const menuItems = [
  {
    title: "Dashboard",
    icon: LayoutDashboard,
    href: "/dashboard",
  },
  {
    title: "Projects",
    icon: Folder,
    href: "/projects",
  },
  {
    title: "My Tasks",
    icon: CheckSquare,
    href: "/tasks",
  },
  {
    title: "Calendar",
    icon: Calendar,
    href: "/calendar",
  },
  {
    title: "Team",
    icon: Users,
    href: "/team",
  },
  {
    title: "Reports",
    icon: BarChart3,
    href: "/reports",
  },
] as const;

// TODO: replace with real auth state (e.g. useAuth() from features/auth)
const currentUser = {
  name: "John Doe",
  email: "john@example.com",
  avatar: "",
  role: "Project Manager",
};

const SidebarHeaderContent = () => {
  const { state } = useSidebar();
  const isCollapsed = state === "collapsed";

  return (
    <SidebarHeader>
      <div className={`flex items-center ${isCollapsed ? "justify-center" : "gap-2"} px-2`}>
        <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center flex-shrink-0">
          <BrandMark className="w-5 h-5 text-white" />
        </div>
        {!isCollapsed && (
          <span className="font-semibold text-slate-800 text-[15px] whitespace-nowrap">
            Projectly
          </span>
        )}
      </div>
    </SidebarHeader>
  );
};

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  return (
    <SidebarProvider>
      <Sidebar collapsible="icon">
        <SidebarHeaderContent />
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>MENU</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {menuItems.map((item) => (
                  <SidebarMenuItem key={item.href}>
                    <Link
                      to={item.href}
                      activeProps={{
                        className:
                          "bg-purple-100 text-purple-600 font-medium rounded-md",
                      }}
                      activeOptions={{ exact: item.href === "/dashboard" }}
                    >
                      <SidebarMenuButton>
                        <item.icon />
                        <span>{item.title}</span>
                      </SidebarMenuButton>
                    </Link>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
        <SidebarFooter>
          <NavUser user={currentUser} />
        </SidebarFooter>
      </Sidebar>
      <SidebarInset>
        <DashboardHeader
          user={currentUser}
          hasUnreadNotifications={false}
          onSearch={(value) => {
            // TODO: Implement search functionality
            console.log("Search:", value);
          }}
        />
        {children}
      </SidebarInset>
    </SidebarProvider>
  );
};

export default DashboardLayout;