import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff, LockKeyhole, Mail, UserRound } from "lucide-react";
import { Link } from "@tanstack/react-router";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";

import {
  registerSchema,
  type RegisterFormValues,
} from "@/features/auth/schemas/register.schema";
import { PasswordStrengthBar } from "./PasswordStrengthBar";
import { SocialAuthButtons } from "../shared/SocialAuthButtons";
import { BrandMark } from "../shared/SocialIcons";

export function RegisterForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

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
  });

  const passwordValue = watch("password");
  const agreedToTerms = watch("agreedToTerms");

  const onSubmit = async (data: RegisterFormValues) => {
    console.log("Register:", data);
  };

  const handleGoogleClick = () => {};
  const handleGitHubClick = () => {};

  return (
    <div className="w-full md:w-1/2 flex flex-col items-center justify-center px-6 py-12">
      <div className="w-full max-w-sm">
        {/* Mobile logo */}
        <div className="flex items-center gap-2 mb-8 md:hidden">
          <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center">
            <BrandMark className="w-4 h-4 text-white" />
          </div>
          <span className="font-semibold text-slate-800 text-[14px]">
            Projectly
          </span>
        </div>

        <h2 className="text-2xl font-bold text-slate-900 mb-1">
          Create your account
        </h2>
        <p className="text-slate-500 text-[13px] mb-6">
          Start your 14-day free trial. No credit card required.
        </p>

        <SocialAuthButtons
          onGoogleClick={handleGoogleClick}
          onGitHubClick={handleGitHubClick}
        />

        <div className="flex items-center gap-3 mb-5 mt-3">
          <div className="flex-1 h-px bg-slate-200" />
          <span className="text-[12px] text-slate-400">
            or continue with email
          </span>
          <div className="flex-1 h-px bg-slate-200" />
        </div>

        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <div className="mb-4">
            <Label
              htmlFor="fullName"
              className="text-[13px] text-slate-700 mb-1.5 block"
            >
              Full Name
            </Label>
            <div className="relative">
              <UserRound className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
              <Input
                id="fullName"
                placeholder="Jane Doe"
                className={cn(
                  "pl-9 bg-slate-50 focus:bg-white border-slate-200 focus-visible:border-indigo-400 focus-visible:ring-indigo-100",
                  errors.fullName &&
                    "border-red-400 focus-visible:border-red-400 focus-visible:ring-red-100",
                )}
                aria-invalid={!!errors.fullName}
                {...register("fullName")}
              />
            </div>
            {errors.fullName && (
              <p className="mt-1 text-[11px] text-red-500">
                {errors.fullName.message}
              </p>
            )}
          </div>

          <div className="mb-4">
            <Label
              htmlFor="email"
              className="text-[13px] text-slate-700 mb-1.5 block"
            >
              Work Email
            </Label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
              <Input
                id="email"
                type="email"
                placeholder="jane@company.com"
                className={cn(
                  "pl-9 bg-slate-50 focus:bg-white border-slate-200 focus-visible:border-indigo-400 focus-visible:ring-indigo-100",
                  errors.email &&
                    "border-red-400 focus-visible:border-red-400 focus-visible:ring-red-100",
                )}
                aria-invalid={!!errors.email}
                {...register("email")}
              />
            </div>
            {errors.email && (
              <p className="mt-1 text-[11px] text-red-500">
                {errors.email.message}
              </p>
            )}
          </div>

          <div className="mb-4">
            <Label
              htmlFor="password"
              className="text-[13px] text-slate-700 mb-1.5 block"
            >
              Password
            </Label>
            <div className="relative">
              <LockKeyhole className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="••••••••••"
                className={cn(
                  "pl-9 pr-9 bg-slate-50 focus:bg-white border-slate-200 focus-visible:border-indigo-400 focus-visible:ring-indigo-100",
                  errors.password &&
                    "border-red-400 focus-visible:border-red-400 focus-visible:ring-red-100",
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
                {showPassword ? (
                  <EyeOff className="w-4 h-4" />
                ) : (
                  <Eye className="w-4 h-4" />
                )}
              </button>
            </div>
            <PasswordStrengthBar password={passwordValue} />
            {errors.password && (
              <p className="mt-1 text-[11px] text-red-500">
                {errors.password.message}
              </p>
            )}
          </div>

          <div className="mb-5">
            <Label
              htmlFor="confirmPassword"
              className="text-[13px] text-slate-700 mb-1.5 block"
            >
              Confirm Password
            </Label>
            <div className="relative">
              <LockKeyhole className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
              <Input
                id="confirmPassword"
                type={showConfirm ? "text" : "password"}
                placeholder="••••••••••"
                className={cn(
                  "pl-9 pr-9 bg-slate-50 focus:bg-white border-slate-200 focus-visible:border-indigo-400 focus-visible:ring-indigo-100",
                  errors.confirmPassword &&
                    "border-red-400 focus-visible:border-red-400 focus-visible:ring-red-100",
                )}
                aria-invalid={!!errors.confirmPassword}
                {...register("confirmPassword")}
              />
              <button
                type="button"
                tabIndex={-1}
                onClick={() => setShowConfirm((s) => !s)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 focus:outline-none"
                aria-label={
                  showConfirm
                    ? "Hide confirm password"
                    : "Show confirm password"
                }
              >
                {showConfirm ? (
                  <EyeOff className="w-4 h-4" />
                ) : (
                  <Eye className="w-4 h-4" />
                )}
              </button>
            </div>
            {errors.confirmPassword && (
              <p className="mt-1 text-[11px] text-red-500">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>

          <div className="flex items-start gap-2 mb-5">
            <Checkbox
              id="agreedToTerms"
              checked={agreedToTerms}
              onCheckedChange={(checked) =>
                setValue("agreedToTerms", checked, { shouldValidate: true })
              }
            />
            <label
              htmlFor="agreedToTerms"
              className="text-[12.5px] text-slate-500 leading-snug cursor-pointer select-none"
            >
              I agree to the{" "}
              <span className="text-indigo-600 underline underline-offset-2">
                Terms of Service
              </span>{" "}
              and{" "}
              <span className="text-indigo-600 underline underline-offset-2">
                Privacy Policy
              </span>
            </label>
          </div>
          {errors.agreedToTerms && (
            <p className="-mt-3 mb-4 text-[11px] text-red-500">
              {errors.agreedToTerms.message}
            </p>
          )}

          <Button
            type="submit"
            size="lg"
            disabled={isSubmitting}
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium text-[13.5px] h-10 rounded-lg shadow-sm shadow-indigo-200"
          >
            {isSubmitting ? "Creating account…" : "Create Account"}
          </Button>
        </form>

        <p className="text-center text-[13px] text-slate-500 mt-5">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-indigo-600 font-medium underline underline-offset-2"
          >
            Log in
          </Link>
        </p>

        <p className="text-center text-[11px] text-slate-300 mt-8">
          © 2026 Projectly, Inc.
        </p>
      </div>
    </div>
  );
}
