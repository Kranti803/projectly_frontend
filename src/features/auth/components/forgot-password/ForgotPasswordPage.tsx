import { BrandMark } from "@/features/auth/components/shared/SocialIcons";
import ForgotPasswordCard from "@/features/auth/components/forgot-password/ForgotPasswordCard";

const ForgotPasswordPage = () => {
  return (
    <div className="relative min-h-screen w-full flex flex-col items-center justify-center bg-indigo-50/40 px-6 py-16 overflow-hidden">
      <div
        className="absolute inset-0 opacity-[0.5]"
        style={{
          backgroundImage:
            "linear-gradient(#e0e0f8 1px, transparent 1px), linear-gradient(90deg, #e0e0f8 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />

      <div className="relative z-10 flex items-center gap-2 mb-8">
        <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center">
          <BrandMark className="w-4 h-4 text-white" />
        </div>
        <span className="font-semibold text-slate-800 text-[15px]">
          Projectly
        </span>
      </div>

      <div className="relative z-10">
        <ForgotPasswordCard
          onSubmit={(email) => {
            console.log("send reset link to", email);
          }}
        />
      </div>

      <p className="relative z-10 text-[11.5px] text-slate-400 mt-8">
        © 2026 Projectly, Inc. ·{" "}
        <span className="hover:text-slate-600 cursor-pointer">Privacy</span> ·{" "}
        <span className="hover:text-slate-600 cursor-pointer">Terms</span>
      </p>
    </div>
  );
};

export default ForgotPasswordPage;
