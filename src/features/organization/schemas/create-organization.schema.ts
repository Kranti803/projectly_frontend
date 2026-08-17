import { z } from "zod";

export const createOrganizationSchema = z.object({
  name: z
    .string()
    .min(1, "Organization name is required")
    .min(2, "Organization name must be at least 2 characters")
    .max(100, "Organization name must be no more than 100 characters"),
  slug: z
    .string()
    .min(1, "Organization URL is required")
    .min(3, "URL must be at least 3 characters")
    .max(50, "URL must be no more than 50 characters")
    .regex(/^[a-z0-9-]+$/, "URL can only contain lowercase letters, numbers, and hyphens"),
  teamSize: z
    .string()
    .min(1, "Please select a team size"),
  industry: z
    .string()
    .optional()
    .or(z.literal("")),
});

export type CreateOrganizationFormValues = z.infer<typeof createOrganizationSchema>;

export const teamSizeOptions = [
  { value: "1-5", label: "1-5 people" },
  { value: "6-25", label: "6-25 people" },
  { value: "26-100", label: "26-100 people" },
  { value: "101-500", label: "101-500 people" },
  { value: "500+", label: "500+ people" },
];

export const industryOptions = [
  { value: "technology", label: "Technology" },
  { value: "finance", label: "Finance" },
  { value: "healthcare", label: "Healthcare" },
  { value: "retail", label: "Retail" },
  { value: "manufacturing", label: "Manufacturing" },
  { value: "education", label: "Education" },
  { value: "media", label: "Media & Entertainment" },
  { value: "energy", label: "Energy" },
  { value: "other", label: "Other" },
];
