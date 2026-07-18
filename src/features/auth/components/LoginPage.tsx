import { BrandMark } from "@/features/auth/components/SocialIcons";
import { BrandPanel } from "@/features/auth/components/BrandPanel";
import { LoginForm } from "@/features/auth/components/LoginForm";

export default function LoginPage() {
  return (
    <div className="min-h-screen w-full flex bg-white">
      <BrandPanel />

      <div className="w-full md:w-1/2 flex flex-col items-center justify-center px-6 py-12">
        <div className="flex items-center gap-2 mb-8 md:hidden">
          <div className="w-7 h-7 rounded-lg bg-indigo-600 flex items-center justify-center">
            <BrandMark className="w-3.5 h-3.5 text-white" />
          </div>
          <span className="font-semibold text-slate-800 text-[14px]">Projectly</span>
        </div>

        <LoginForm
          onSubmit={({ email, password, remember }) => {
            console.log("login submit", { email, password, remember });
          }}
        />
      </div>
    </div>
  );
}