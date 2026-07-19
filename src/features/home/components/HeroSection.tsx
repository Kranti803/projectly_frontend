import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { KanbanPreviewWidget } from "./KanbanPreviewWidget";
import { SOCIAL_PROOF_TEXT } from "@/constants/ProgressData";
import { AvatarStack } from "@/components/common/AvatarStack";

interface HeroSectionProps {
  onPrimaryClick?: () => void;
}

export function HeroSection({ onPrimaryClick }: HeroSectionProps) {
  return (
    <section className="relative overflow-hidden bg-linear-to-b from-indigo-50/60 via-white to-white">
      <div
        className="absolute inset-0 opacity-[0.35]"
        style={{
          backgroundImage:
            "linear-gradient(#e0e0f8 1px, transparent 1px), linear-gradient(90deg, #e0e0f8 1px, transparent 1px)",
          backgroundSize: "32px 32px",
          maskImage: "linear-gradient(to bottom, black, transparent)",
        }}
      />

      <div className="relative z-10 max-w-6xl mx-auto px-6 pt-20 pb-24 text-center">
        <div className="inline-flex items-center gap-1.5 bg-indigo-50 text-indigo-700 text-[12px] font-medium px-3 py-1.5 rounded-full mb-6">
          Now with real-time notifications
        </div>

        <h1 className="text-4xl md:text-5xl font-bold text-slate-900 tracking-tight leading-tight max-w-2xl mx-auto mb-5">
          Manage projects with clarity.
        </h1>
        <p className="text-slate-500 text-[16px] md:text-[17px] max-w-xl mx-auto mb-9">
          One workspace for every organization, team, and project — with custom
          roles that actually fit how your company works.
        </p>

        <div className="flex items-center justify-center gap-3 mb-10">
          <Button
            size="lg"
            className="bg-indigo-600 hover:bg-indigo-700 gap-1.5 font-medium"
            onClick={onPrimaryClick}
          >
            Start Free Trial
            <ArrowRight className="w-4 h-4" />
          </Button>
          <Button size="lg" variant="outline" className="font-medium">
            View Demo
          </Button>
        </div>

        <div className="flex items-center justify-center gap-3 mb-16">
          <AvatarStack count={4} />
          <span className="text-[13px] text-slate-500">
            <span className="font-medium text-slate-700">
              {" "}
              {SOCIAL_PROOF_TEXT.count}
            </span>{" "}
            already onboard
          </span>
        </div>

        <div className="max-w-4xl mx-auto">
          <KanbanPreviewWidget />
        </div>
      </div>
    </section>
  );
}
