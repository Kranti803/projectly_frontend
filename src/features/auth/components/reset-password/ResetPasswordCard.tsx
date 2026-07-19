import { useMemo, useState, type FormEvent } from "react";
import { Eye, EyeOff, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { PasswordStrengthBar } from "@/components/common/PasswordStrengthBar";
import { ChecklistItem } from "./ChecklistItem";
import { Link } from "@tanstack/react-router";


interface ResetPasswordCardProps {
  onSubmit?: (password: string) => void;
}

export function ResetPasswordCard({ onSubmit }: ResetPasswordCardProps) {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const rules = useMemo(
    () => ({
      length: password.length >= 8,
      uppercase: /[A-Z]/.test(password),
      numberOrSymbol: /[0-9]/.test(password) || /[^A-Za-z0-9]/.test(password),
    }),
    [password]
  );

  const passwordsMatch = confirmPassword.length > 0 && confirmPassword === password;
  const canSubmit =
    rules.length && rules.uppercase && rules.numberOrSymbol && passwordsMatch;

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!canSubmit) return;
    onSubmit?.(password);
  }

  return (
    <Card className="w-full max-w-md p-8 rounded-2xl shadow-xl shadow-indigo-200/40 border-slate-100 gap-0 text-center">
      <h1 className="text-2xl font-bold text-slate-900 mb-2">Set a new password</h1>
      <p className="text-slate-500 text-[13.5px] leading-relaxed mb-6">
        Your new password must be at least 8 characters long.
      </p>

      <form onSubmit={handleSubmit} className="flex flex-col gap-5 text-left">
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="new-password">New Password</Label>
          <div className="relative">
            <Input
              id="new-password"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••••"
              className="pr-9"
            />
            <button
              type="button"
              onClick={() => setShowPassword((s) => !s)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
              tabIndex={-1}
            >
              {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>

          <PasswordStrengthBar password={password} />

          <div className="flex flex-col gap-1.5 mt-2">
            <ChecklistItem label="At least 8 characters" met={rules.length} />
            <ChecklistItem label="One uppercase letter" met={rules.uppercase} />
            <ChecklistItem label="One number or symbol" met={rules.numberOrSymbol} />
          </div>
        </div>

        <div className="flex flex-col gap-1.5">
          <Label htmlFor="confirm-password">Confirm Password</Label>
          <div className="relative">
            <Input
              id="confirm-password"
              type={showConfirm ? "text" : "password"}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="••••••••••"
              className="pr-9"
            />
            <button
              type="button"
              onClick={() => setShowConfirm((s) => !s)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
              tabIndex={-1}
            >
              {showConfirm ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
          {confirmPassword.length > 0 && (
            <div className="flex items-center gap-1.5">
              {passwordsMatch ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-500" strokeWidth={3} />
                  <span className="text-[12.5px] text-emerald-600">Passwords match</span>
                </>
              ) : (
                <span className="text-[12.5px] text-rose-500">Passwords do not match</span>
              )}
            </div>
          )}
        </div>

        <Button
          type="submit"
          disabled={!canSubmit}
          className="w-full bg-indigo-600 hover:bg-indigo-700 font-semibold disabled:opacity-50"
        >
          Reset Password
        </Button>
      </form>

      <p className="text-[13px] text-slate-500 mt-5">
        Remember your password?{" "}
        <Link
          to="/auth/login"
          className="text-indigo-600 font-medium hover:underline underline-offset-2"
        >
          Sign in
        </Link>
      </p>
    </Card>
  );
}