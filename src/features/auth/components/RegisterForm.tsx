import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Eye, EyeOff } from "lucide-react"
import { Link } from "@tanstack/react-router"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { cn } from "@/lib/utils"

import {
  registerSchema,
  type RegisterFormValues,
} from "../schemas/register.schema"

// ─── Password strength helpers ────────────────────────────────────────────────

function getStrength(password: string): number {
  let s = 0
  if (password.length >= 8) s++
  if (/[A-Z]/.test(password)) s++
  if (/[0-9]/.test(password)) s++
  if (/[^A-Za-z0-9]/.test(password)) s++
  return s
}

const STRENGTH_LABELS = ["Weak", "Fair", "Good", "Strong", "Strong"]
const STRENGTH_COLORS = [
  "bg-slate-200",
  "bg-rose-400",
  "bg-amber-400",
  "bg-emerald-400",
  "bg-emerald-500",
]

// ─── Sub-components ───────────────────────────────────────────────────────────

function PasswordStrengthBar({ password }: { password: string }) {
  const strength = getStrength(password)
  if (!password) return null
  return (
    <div className="flex items-center gap-2 mt-1.5">
      <div className="flex-1 flex gap-1">
        {[0, 1, 2, 3].map((i) => (
          <div
            key={i}
            className={cn(
              "h-1 flex-1 rounded-full transition-colors",
              i < strength ? STRENGTH_COLORS[strength] : "bg-slate-100"
            )}
          />
        ))}
      </div>
      <span className="text-[11px] text-slate-400 whitespace-nowrap">
        {STRENGTH_LABELS[strength]}
      </span>
    </div>
  )
}

function OAuthButton({
  children,
  icon,
}: {
  children: React.ReactNode
  icon: React.ReactNode
}) {
  return (
    <Button
      type="button"
      variant="outline"
      size="lg"
      className="flex items-center justify-center gap-2 w-full text-[13px] font-medium text-slate-700 border-slate-200 hover:bg-slate-50 h-10"
    >
      {icon}
      {children}
    </Button>
  )
}

// ─── Main Register Form ───────────────────────────────────────────────────────

export function RegisterForm() {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
      confirmPassword: "",
      agreedToTerms: false,
    },
  })

  const passwordValue = watch("password")
  const agreedToTerms = watch("agreedToTerms")

  const onSubmit = async (data: RegisterFormValues) => {
    // TODO: wire up to API mutation
    console.log("Register:", data)
  }

  return (
    <div className="w-full md:w-1/2 flex flex-col items-center justify-center px-6 py-12">
      <div className="w-full max-w-sm">
        {/* Mobile logo */}
        <div className="flex items-center gap-2 mb-8 md:hidden">
          <div className="w-7 h-7 rounded-lg bg-indigo-600 flex items-center justify-center">
            <svg
              className="w-3.5 h-3.5 text-white"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
            </svg>
          </div>
          <span className="font-semibold text-slate-800 text-[14px]">Projectly</span>
        </div>

        <h2 className="text-2xl font-bold text-slate-900 mb-1">Create your account</h2>
        <p className="text-slate-500 text-[13px] mb-6">
          Start your 14-day free trial. No credit card required.
        </p>

        {/* OAuth buttons */}
        <div className="grid grid-cols-2 gap-3 mb-5">
          <OAuthButton
            icon={
              <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden="true">
                <path fill="#4285F4" d="M23.52 12.27c0-.85-.08-1.66-.22-2.44H12v4.62h6.47a5.54 5.54 0 01-2.4 3.63v3h3.88c2.27-2.09 3.57-5.17 3.57-8.81z" />
                <path fill="#34A853" d="M12 24c3.24 0 5.95-1.07 7.93-2.92l-3.88-3c-1.08.72-2.45 1.15-4.05 1.15-3.11 0-5.75-2.1-6.69-4.92H1.3v3.09A12 12 0 0012 24z" />
                <path fill="#FBBC05" d="M5.31 14.31A7.2 7.2 0 014.9 12c0-.8.14-1.58.4-2.31V6.6H1.3A12 12 0 000 12c0 1.94.46 3.77 1.3 5.4z" />
                <path fill="#EA4335" d="M12 4.77c1.76 0 3.34.6 4.58 1.79l3.44-3.44C17.94 1.19 15.24 0 12 0 7.31 0 3.26 2.69 1.3 6.6l4 3.1c.94-2.83 3.58-4.93 6.7-4.93z" />
              </svg>
            }
          >
            Google
          </OAuthButton>
          <OAuthButton
            icon={
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M12 .3a12 12 0 00-3.79 23.4c.6.11.82-.26.82-.58v-2.02c-3.34.72-4.04-1.61-4.04-1.61-.55-1.39-1.34-1.76-1.34-1.76-1.1-.75.08-.73.08-.73 1.2.09 1.84 1.24 1.84 1.24 1.08 1.84 2.83 1.31 3.52 1 .11-.78.42-1.31.76-1.61-2.67-.31-5.47-1.33-5.47-5.93 0-1.31.47-2.38 1.24-3.22-.13-.31-.54-1.52.12-3.18 0 0 1.01-.32 3.3 1.23a11.5 11.5 0 016 0c2.28-1.55 3.29-1.23 3.29-1.23.66 1.66.25 2.87.12 3.18.77.84 1.24 1.91 1.24 3.22 0 4.61-2.8 5.62-5.48 5.92.43.37.81 1.1.81 2.22v3.29c0 .32.22.7.83.58A12 12 0 0012 .3z" />
              </svg>
            }
          >
            GitHub
          </OAuthButton>
        </div>

        {/* Divider */}
        <div className="flex items-center gap-3 mb-5">
          <div className="flex-1 h-px bg-slate-200" />
          <span className="text-[12px] text-slate-400">or continue with email</span>
          <div className="flex-1 h-px bg-slate-200" />
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          {/* Full Name */}
          <div className="mb-4">
            <Label htmlFor="fullName" className="text-[13px] text-slate-700 mb-1.5 block">
              Full Name
            </Label>
            <div className="relative">
              <svg
                className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
              <Input
                id="fullName"
                placeholder="Jane Doe"
                className={cn(
                  "pl-9 bg-slate-50 focus:bg-white border-slate-200 focus-visible:border-indigo-400 focus-visible:ring-indigo-100",
                  errors.fullName && "border-red-400 focus-visible:border-red-400 focus-visible:ring-red-100"
                )}
                aria-invalid={!!errors.fullName}
                {...register("fullName")}
              />
            </div>
            {errors.fullName && (
              <p className="mt-1 text-[11px] text-red-500">{errors.fullName.message}</p>
            )}
          </div>

          {/* Work Email */}
          <div className="mb-4">
            <Label htmlFor="email" className="text-[13px] text-slate-700 mb-1.5 block">
              Work Email
            </Label>
            <div className="relative">
              <svg
                className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
              <Input
                id="email"
                type="email"
                placeholder="jane@company.com"
                className={cn(
                  "pl-9 bg-slate-50 focus:bg-white border-slate-200 focus-visible:border-indigo-400 focus-visible:ring-indigo-100",
                  errors.email && "border-red-400 focus-visible:border-red-400 focus-visible:ring-red-100"
                )}
                aria-invalid={!!errors.email}
                {...register("email")}
              />
            </div>
            {errors.email && (
              <p className="mt-1 text-[11px] text-red-500">{errors.email.message}</p>
            )}
          </div>

          {/* Password */}
          <div className="mb-4">
            <Label htmlFor="password" className="text-[13px] text-slate-700 mb-1.5 block">
              Password
            </Label>
            <div className="relative">
              <svg
                className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                />
              </svg>
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="••••••••••"
                className={cn(
                  "pl-9 pr-9 bg-slate-50 focus:bg-white border-slate-200 focus-visible:border-indigo-400 focus-visible:ring-indigo-100",
                  errors.password && "border-red-400 focus-visible:border-red-400 focus-visible:ring-red-100"
                )}
                aria-invalid={!!errors.password}
                {...register("password")}
              />
              <button
                type="button"
                tabIndex={-1}
                onClick={() => setShowPassword((s) => !s)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 focus:outline-none"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
            <PasswordStrengthBar password={passwordValue} />
            {errors.password && (
              <p className="mt-1 text-[11px] text-red-500">{errors.password.message}</p>
            )}
          </div>

          {/* Confirm Password */}
          <div className="mb-5">
            <Label htmlFor="confirmPassword" className="text-[13px] text-slate-700 mb-1.5 block">
              Confirm Password
            </Label>
            <div className="relative">
              <svg
                className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                />
              </svg>
              <Input
                id="confirmPassword"
                type={showConfirm ? "text" : "password"}
                placeholder="••••••••••"
                className={cn(
                  "pl-9 pr-9 bg-slate-50 focus:bg-white border-slate-200 focus-visible:border-indigo-400 focus-visible:ring-indigo-100",
                  errors.confirmPassword && "border-red-400 focus-visible:border-red-400 focus-visible:ring-red-100"
                )}
                aria-invalid={!!errors.confirmPassword}
                {...register("confirmPassword")}
              />
              <button
                type="button"
                tabIndex={-1}
                onClick={() => setShowConfirm((s) => !s)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 focus:outline-none"
                aria-label={showConfirm ? "Hide confirm password" : "Show confirm password"}
              >
                {showConfirm ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
            {errors.confirmPassword && (
              <p className="mt-1 text-[11px] text-red-500">{errors.confirmPassword.message}</p>
            )}
          </div>

          {/* Terms & Conditions */}
          <div className="flex items-start gap-2 mb-5">
            <Checkbox
              id="agreedToTerms"
              checked={agreedToTerms}
              onCheckedChange={(checked) => setValue("agreedToTerms", checked, { shouldValidate: true })}
            />
            <label
              htmlFor="agreedToTerms"
              className="text-[12.5px] text-slate-500 leading-snug cursor-pointer select-none"
            >
              I agree to the{" "}
              <span className="text-indigo-600 underline underline-offset-2">Terms of Service</span>{" "}
              and{" "}
              <span className="text-indigo-600 underline underline-offset-2">Privacy Policy</span>
            </label>
          </div>
          {errors.agreedToTerms && (
            <p className="-mt-3 mb-4 text-[11px] text-red-500">{errors.agreedToTerms.message}</p>
          )}

          {/* Submit */}
          <Button
            type="submit"
            size="lg"
            disabled={isSubmitting}
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium text-[13.5px] h-10 rounded-lg shadow-sm shadow-indigo-200"
          >
            {isSubmitting ? "Creating account…" : "Create Account"}
          </Button>
        </form>

        {/* Login link */}
        <p className="text-center text-[13px] text-slate-500 mt-5">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-indigo-600 font-medium underline underline-offset-2"
          >
            Log in
          </Link>
        </p>

        <p className="text-center text-[11px] text-slate-300 mt-8">© 2026 Projectly, Inc.</p>
      </div>
    </div>
  )
}
