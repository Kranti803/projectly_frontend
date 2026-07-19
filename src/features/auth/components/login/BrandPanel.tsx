import { BrandMark } from "@/features/auth/components/shared/SocialIcons";
import { ProgressPreviewCard } from "@/features/auth/components/login/ProgressPreviewCard";
import { AvatarStack } from "@/features/auth/components/shared/AvatarStack";
import { BRAND_COPY, SOCIAL_PROOF_TEXT } from "@/constants/ProgressData";

export function BrandPanel() {
  return (
    <div className="hidden md:flex md:w-1/2 relative bg-linear-to-br from-indigo-50 via-violet-50 to-indigo-100 items-center justify-center p-10 overflow-hidden">
      <div
        className="absolute inset-0 opacity-[0.4]"
        style={{
          backgroundImage:
            "linear-gradient(#e0e0f8 1px, transparent 1px), linear-gradient(90deg, #e0e0f8 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />
      <div className="relative z-10 max-w-md w-full">
        <div className="flex items-center gap-2 mb-14">
          <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center">
            <BrandMark className="w-4 h-4 text-white" />
          </div>
          <span className="font-semibold text-slate-800 text-[15px]">
            Projectly
          </span>
        </div>

        <h1 className="text-4xl font-bold text-slate-900 leading-tight mb-4 tracking-tight">
          {BRAND_COPY.heading.map((line, i) => (
            <span key={i}>
              {line}
              {i < BRAND_COPY.heading.length - 1 && <br />}
            </span>
          ))}
        </h1>
        <p className="text-slate-500 text-[15px] mb-8 max-w-sm">
          {BRAND_COPY.subheading}
        </p>

        <ProgressPreviewCard />

        <div className="flex items-center gap-3 mt-6">
          <AvatarStack count={4} />
          <span className="text-[13px] text-slate-500">
            <span className="font-medium text-slate-700">
              {SOCIAL_PROOF_TEXT.count}
            </span>{" "}
            {SOCIAL_PROOF_TEXT.suffix}
          </span>
        </div>
      </div>
    </div>
  );
}
