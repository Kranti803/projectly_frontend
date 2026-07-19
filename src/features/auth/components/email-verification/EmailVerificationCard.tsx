import { useEffect, useState } from "react";
import { Mail, RotateCw, Clock, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Link } from "@tanstack/react-router";

const RESEND_COOLDOWN_SECONDS = 47;

interface EmailVerificationCardProps {
  email: string;
  onResend?: () => void;
}

function formatTime(seconds: number) {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m}:${s.toString().padStart(2, "0")}`;
}

export function EmailVerificationCard({
  email,
  onResend,
}: EmailVerificationCardProps) {
  const [secondsLeft, setSecondsLeft] = useState(RESEND_COOLDOWN_SECONDS);

  useEffect(() => {
    if (secondsLeft <= 0) return;
    const id = setInterval(() => {
      setSecondsLeft((s) => Math.max(0, s - 1));
    }, 1000);
    return () => clearInterval(id);
  }, [secondsLeft > 0]);

  const canResend = secondsLeft === 0;

  function handleResend() {
    if (!canResend) return;
    onResend?.();
    setSecondsLeft(RESEND_COOLDOWN_SECONDS);
  }

  return (
    <Card className="w-full max-w-md p-8 rounded-2xl shadow-xl shadow-indigo-200/40 border-slate-100 gap-0 text-center">
      <div className="w-14 h-14 rounded-2xl bg-indigo-50 flex items-center justify-center mx-auto mb-3">
        <Mail className="w-6 h-6 text-indigo-600" />
      </div>

      <div className="flex items-center justify-center gap-1 mb-6">
        <span className="w-1.5 h-1.5 rounded-full bg-indigo-400" />
        <span className="w-1.5 h-1.5 rounded-full bg-indigo-300" />
        <span className="w-1.5 h-1.5 rounded-full bg-indigo-100" />
      </div>

      <h1 className="text-2xl font-bold text-slate-900 mb-2">Verify your email</h1>
      <p className="text-slate-500 text-[13.5px]">We've sent a verification link to</p>
      <p className="text-slate-900 text-[13.5px] font-semibold mb-4">{email}</p>
      <p className="text-slate-500 text-[13.5px] leading-relaxed mb-6">
        Click the link in the email to verify your account and get started.
      </p>

      <Button
        variant="outline"
        disabled={!canResend}
        onClick={handleResend}
        className="w-full gap-2 font-medium disabled:opacity-100 disabled:text-slate-400"
      >
        <RotateCw className="w-4 h-4" />
        Resend Email
      </Button>

      <p className="flex items-center justify-center gap-1.5 text-[12.5px] text-slate-500 mt-3">
        <Clock className="w-3.5 h-3.5" />
        {canResend ? (
          "You can resend now"
        ) : (
          <>
            You can resend in{" "}
            <span className="font-semibold text-slate-700">{formatTime(secondsLeft)}</span>
          </>
        )}
      </p>

      <Separator className="my-6" />

      <div className="flex items-start gap-2.5 bg-slate-50 rounded-lg px-4 py-3 text-left mb-5">
        <Info className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
        <p className="text-[12.5px] text-slate-500 leading-relaxed">
          Can't find the email? Check your spam or junk folder.
        </p>
      </div>

      <p className="text-[13px] text-slate-500">
        Wrong address?{" "}
        <Link
        to='/auth/forgot-password'
          className="text-indigo-600 font-medium hover:underline underline-offset-2"
        >
          Change email address
        </Link>
      </p>
    </Card>
  );
}