import { useState, type FormEvent } from "react";
import { Mail, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Link } from "@tanstack/react-router";

interface ForgotPasswordCardProps {
  onSubmit?: (email: string) => void;
}

const ForgotPasswordCard = ({ onSubmit }: ForgotPasswordCardProps) => {
  const [email, setEmail] = useState("");

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit?.(email);
  };

  return (
    <Card className="w-full max-w-md p-8 rounded-2xl shadow-xl shadow-indigo-200/40 border-slate-100 gap-0 ">
      <div className="w-11 h-11 rounded-full bg-indigo-50 flex items-center justify-center mb-5">
        <Mail className="w-5 h-5 text-indigo-600" />
      </div>

      <h1 className="text-2xl font-bold text-slate-900 mb-2">
        Reset your password
      </h1>
      <p className="text-slate-500 text-[13.5px] leading-relaxed mb-6">
        Enter the email address associated with your account and we'll send you
        a link to reset your password.
      </p>

      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="email">Email address</Label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
            <Input
              id="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="jane@company.com"
              className="pl-9"
            />
          </div>
        </div>

        <Button
          type="submit"
          className="w-full bg-indigo-600 hover:bg-indigo-700 font-semibold"
        >
          Send Reset Link
        </Button>
      </form>

      <Separator className="my-6" />

      <Link
        to="/login"
        type="button"
        className="w-full flex items-center justify-center gap-1.5 text-[13px] font-medium text-slate-600 hover:text-slate-900 transition"
      >
        <ArrowLeft className="w-3.5 h-3.5" />
        Back to Login
      </Link>
    </Card>
  );
};

export default ForgotPasswordCard;
