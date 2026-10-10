// Mock data. Replace with a real fetch of the current organization.

export interface Organization {
  id: string
  name: string
  slug: string
  logoUrl?: string
  timezone: string
}

export const organization: Organization = {
  id: "org1",
  name: "Acme Inc.",
  slug: "acme",
  timezone: "Asia/Kathmandu",
}