import type { ActivityIconType } from "@/features/auth/components/shared/SocialIcons";
interface ActivityItem {
  icon: ActivityIconType;
  text: string;
  time: string;
}

export const PROJECT_PROGRESS = {
  name: "Q3 Product Roadmap",
  members: 3,
  extraMembers: 4,
  tasks: [
    { label: "Design System", percent: 80 },
    { label: "API Integration", percent: 55 },
    { label: "Mobile App", percent: 35 },
    { label: "QA & Testing", percent: 20 },
  ],
};

export const RECENT_ACTIVITY: ActivityItem[] = [
  { icon: "merge", text: 'Alex merged "Auth redesign" PR', time: "2m ago" },
  { icon: "check", text: "Sara moved 3 tasks to Done", time: "14m ago" },
  { icon: "comment", text: 'New comment on "Sprint planning"', time: "1h ago" },
];
export const AVATAR_COLORS = [
  "bg-violet-400",
  "bg-indigo-400",
  "bg-purple-400",
  "bg-blue-400",
];

export const SOCIAL_PROOF_TEXT = {
  count: "4,200+ teams",
  suffix: "already onboard",
};

export const BRAND_COPY = {
  heading: ["Welcome back.", "Pick up where", "you left off."],
  subheading: "Your projects, tasks, and team — all in one place.",
};
