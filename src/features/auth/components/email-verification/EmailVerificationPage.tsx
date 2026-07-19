import { BrandMark } from "@/components/common/BrandMark";
import { EmailVerificationCard } from "./EmailVerificationCard";

interface EmailVerificationPageProps {
  email?: string;
}

export default function EmailVerificationPage({
  email = "user@email.com",
}: EmailVerificationPageProps) {
  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-slate-50 px-6 py-16">
      <div className="flex items-center gap-2 mb-8">
        <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center">
          <BrandMark className="w-4 h-4 text-white" />
        </div>
        <span className="font-semibold text-slate-800 text-[15px]">
          Projectly
        </span>
      </div>

      <EmailVerificationCard
        email={email}
        onResend={() => console.log("resend verification email to", email)}
      />

      <div className="flex items-center gap-2 text-[12px] text-slate-400 mt-8">
        <a href="#" className="hover:text-slate-600 transition">
          Privacy Policy
        </a>
        <span>·</span>
        <a href="#" className="hover:text-slate-600 transition">
          Terms of Service
        </a>
        <span>·</span>
        <a href="#" className="hover:text-slate-600 transition">
          Help
        </a>
      </div>
    </div>
  );
}
