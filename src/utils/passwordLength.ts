export const MIN_PASSWORD_LENGTH = 8

export interface PasswordStrength {
  score: 0 | 1 | 2 | 3 | 4 // 0 means nothing typed yet
  label: string
}

// A simple rule-based estimate. For stricter checks, add a library such as zxcvbn later.
export function getPasswordStrength(password: string): PasswordStrength {
  if (!password) return { score: 0, label: "" }
  if (password.length < MIN_PASSWORD_LENGTH) return { score: 1, label: "Too short" }

  let points = 1 // long enough
  if (password.length >= 12) points++
  if (/[a-z]/.test(password) && /[A-Z]/.test(password)) points++
  if (/\d/.test(password)) points++
  if (/[^A-Za-z0-9]/.test(password)) points++

  if (points <= 2) return { score: 1, label: "Weak" }
  if (points === 3) return { score: 2, label: "Fair" }
  if (points === 4) return { score: 3, label: "Good" }
  return { score: 4, label: "Strong" }
}