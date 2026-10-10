// Mock data. Replace with the logged-in user's profile from your API or session.

export interface UserProfile {
  id: string
  fullName: string
  username: string
  email: string
  emailVerified: boolean
  bio: string
  timezone: string
  avatarUrl?: string
}

// Matches member m1 (Sarah Chen) in the members mock data.
export const currentUserProfile: UserProfile = {
  id: "m1",
  fullName: "Sarah Chen",
  username: "sarah",
  email: "sarah@acme.com",
  emailVerified: true,
  bio: "Product-minded engineer. Coffee first, standups second.",
  timezone: "Asia/Kathmandu",
}