
export type Priority = "low" | "medium" | "high" | "urgent";

export interface DashboardStats {
  totalProjects: number;
  activeTasks: number;
  completedTasks: number;
  teamMembers: number;
}

export interface CompletionPoint {
  day: string;
  completed: number;
}

export interface PriorityPoint {
  priority: Priority;
  tasks: number;
  fill: string;
}

export interface ActivityEntry {
  id: string;
  actor: string;
  avatarUrl?: string;
  action: string;
  target: string;
  timestamp: string;
}

export const stats: DashboardStats = {
  totalProjects: 12,
  activeTasks: 48,
  completedTasks: 126,
  teamMembers: 9,
};

export const completionData: CompletionPoint[] = [
  { day: "Week 1", completed: 21 },
  { day: "Week 2", completed: 34 },
  { day: "Week 3", completed: 28 },
  { day: "Week 4", completed: 43 },
];

export const priorityData: PriorityPoint[] = [
  { priority: "low", tasks: 14, fill: "var(--color-low)" },
  { priority: "medium", tasks: 22, fill: "var(--color-medium)" },
  { priority: "high", tasks: 9, fill: "var(--color-high)" },
  { priority: "urgent", tasks: 3, fill: "var(--color-urgent)" },
];

export const recentActivity: ActivityEntry[] = [
  {
    id: "1",
    actor: "Sarah Chen",
    action: "completed task",
    target: "Fix login bug",
    timestamp: "12m ago",
  },
  {
    id: "2",
    actor: "Marcus Lee",
    action: "commented on",
    target: "Checkout redesign",
    timestamp: "1h ago",
  },
  {
    id: "3",
    actor: "Priya Nair",
    action: "created project",
    target: "Mobile app v2",
    timestamp: "3h ago",
  },
  {
    id: "4",
    actor: "Daniel Ortiz",
    action: "invited",
    target: "jane@acme.com",
    timestamp: "5h ago",
  },
  {
    id: "5",
    actor: "Sarah Chen",
    action: "changed role of",
    target: "Marcus Lee to Admin",
    timestamp: "Yesterday",
  },
];
