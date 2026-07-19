import { BrandMark } from "@/components/common/BrandMark";
import { ResetPasswordCard } from "./ResetPasswordCard";

export default function ResetPasswordPage() {
  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-slate-50 px-6 py-16">
      <div className="flex items-center gap-2 mb-8">
        <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center">
          <BrandMark className="w-4 h-4 text-white" />
        </div>
        <span className="font-semibold text-slate-800 text-[15px]">Projectly</span>
      </div>

      <ResetPasswordCard
        onSubmit={(password) => {
          console.log("submit new password", password);
        }}
      />
    </div>
  );
}