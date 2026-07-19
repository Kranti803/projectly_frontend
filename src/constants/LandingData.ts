import type { LucideIcon } from "lucide-react";
import {
  KanbanSquare,
  Users,
  ShieldCheck,
  Bell,
  BarChart3,
  Building2,
} from "lucide-react";

export interface Feature {
  icon: LucideIcon;
  title: string;
  description: string;
}

export const FEATURES: Feature[] = [
  {
    icon: KanbanSquare,
    title: "Kanban boards that keep up",
    description:
      "Drag-and-drop tasks across custom workflows, with subtasks, labels, priorities, and due dates built in.",
  },
  {
    icon: Building2,
    title: "True multi-tenant workspaces",
    description:
      "Every organization gets fully isolated projects, teams, and data — switch between workspaces in one click.",
  },
  {
    icon: ShieldCheck,
    title: "Granular custom roles",
    description:
      "Build unlimited roles per organization from a shared permission catalog — no rigid, one-size-fits-all access levels.",
  },
  {
    icon: Users,
    title: "Teams built for collaboration",
    description:
      "Group members into teams, assign them across projects, and keep everyone aligned on what matters now.",
  },
  {
    icon: Bell,
    title: "Real-time notifications",
    description:
      "WebSocket-powered updates the moment a task is assigned, a comment lands, or a role changes.",
  },
  {
    icon: BarChart3,
    title: "Dashboards that tell the story",
    description:
      "Project stats, task charts, and a live activity feed so you always know where things stand.",
  },
];

export interface Step {
  number: string;
  title: string;
  description: string;
}

export const HOW_IT_WORKS: Step[] = [
  {
    number: "01",
    title: "Create your workspace",
    description: "Spin up an organization in seconds and invite your team by email.",
  },
  {
    number: "02",
    title: "Set up roles & projects",
    description:
      "Use the default roles or build your own, then create your first project and board.",
  },
  {
    number: "03",
    title: "Ship, together",
    description:
      "Assign tasks, track progress on the dashboard, and stay in sync with real-time updates.",
  },
];

export interface PricingPlan {
  name: string;
  price: string;
  period: string;
  description: string;
  features: string[];
  highlighted?: boolean;
  cta: string;
}

export const PRICING_PLANS: PricingPlan[] = [
  {
    name: "Free",
    price: "$0",
    period: "/month",
    description: "For small teams getting started.",
    features: [
      "Up to 3 projects",
      "Up to 5 team members",
      "Basic Kanban boards",
      "Community support",
    ],
    cta: "Get Started",
  },
  {
    name: "Pro",
    price: "$12",
    period: "/user/month",
    description: "For growing teams that need more control.",
    features: [
      "Unlimited projects",
      "Unlimited team members",
      "Custom roles & permissions",
      "Real-time notifications",
      "Priority support",
    ],
    highlighted: true,
    cta: "Start Free Trial",
  },
  {
    name: "Enterprise",
    price: "Custom",
    period: "",
    description: "For organizations with advanced needs.",
    features: [
      "Everything in Pro",
      "SSO & advanced security",
      "Dedicated onboarding",
      "SLA & uptime guarantee",
      "Custom integrations",
    ],
    cta: "Contact Sales",
  },
];

export interface Testimonial {
  quote: string;
  name: string;
  role: string;
  avatarColor: string;
}

export const TESTIMONIALS: Testimonial[] = [
  {
    quote:
      "We moved four separate tools into Projectly and finally have one place where roles actually make sense across teams.",
    name: "Maya Chen",
    role: "Head of Ops, Fenwick Labs",
    avatarColor: "bg-indigo-400",
  },
  {
    quote:
      "The custom roles system alone was worth switching for — every client workspace needs different permissions and this just works.",
    name: "Daniel Osei",
    role: "Founder, Northlane Studio",
    avatarColor: "bg-violet-400",
  },
  {
    quote:
      "Real-time notifications and the activity log make it obvious what happened while I was away. No more status-update meetings.",
    name: "Priya Patel",
    role: "Product Lead, Ridgeview",
    avatarColor: "bg-purple-400",
  },
];

