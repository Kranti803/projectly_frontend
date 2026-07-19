import { useState } from "react";
import { Eye, EyeOff, Mail, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import { SocialAuthButtons } from "../shared/SocialAuthButtons";
import { Link } from "@tanstack/react-router";

const LoginForm = ({
  onSubmit,
}: {
  onSubmit?: (data: {
    email: string;
    password: string;
    remember: boolean;
  }) => void;
}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(true);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    onSubmit?.({ email, password, remember });
  }

  return (
    <div className="w-full max-w-sm">
      <h2 className="text-2xl font-bold text-slate-900 mb-1">
        Log in to your account
      </h2>
      <p className="text-slate-500 text-[13px] mb-6">
        Good to see you again. Enter your details below.
      </p>

      <SocialAuthButtons
        onGoogleClick={() => console.log("google login")}
        onGitHubClick={() => console.log("github login")}
      />

      <div className="flex items-center gap-3 my-5">
        <Separator className="flex-1" />
        <span className="text-[12px] text-slate-400 whitespace-nowrap">
          or continue with email
        </span>
        <Separator className="flex-1" />
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="email">Email</Label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="jane@company.com"
              className="pl-9"
            />
          </div>
        </div>

        <div className="flex flex-col gap-1.5">
          <div className="flex items-center justify-between">
            <Label htmlFor="password">Password</Label>
            <Link
              to="/auth/forgot-password"
              type="button"
              className="text-[12px] text-indigo-600 hover:underline underline-offset-2"
            >
              Forgot password?
            </Link>
          </div>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
            <Input
              id="password"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••••"
              className="pl-9 pr-9"
            />
            <button
              type="button"
              onClick={() => setShowPassword((s) => !s)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
              tabIndex={-1}
            >
              {showPassword ? (
                <EyeOff className="w-4 h-4" />
              ) : (
                <Eye className="w-4 h-4" />
              )}
            </button>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Checkbox
            id="remember"
            checked={remember}
            onCheckedChange={(checked) => setRemember(checked === true)}
          />
          <Label
            htmlFor="remember"
            className="text-[12.5px] text-slate-500 font-normal cursor-pointer"
          >
            Remember me for 30 days
          </Label>
        </div>

        <Button
          type="submit"
          className="w-full bg-indigo-600 hover:bg-indigo-700"
        >
          Log In
        </Button>
      </form>

      <p className="text-center text-[13px] text-slate-500 mt-5">
        Don't have an account?{" "}
        <Link
          to="/auth/register"
          className="text-indigo-600 font-medium underline underline-offset-2 cursor-pointer"
        >
          Sign up free
        </Link>
      </p>

      <p className="text-center text-[11px] text-slate-300 mt-8">
        © 2026 Projectly, Inc.
      </p>
    </div>
  );
};
export default LoginForm;
