import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface CTASectionProps {
  onPrimaryClick?: () => void;
}

export function CTASection({ onPrimaryClick }: CTASectionProps) {
  return (
    <section className="max-w-6xl mx-auto px-6 py-20">
      <div className="relative overflow-hidden rounded-3xl bg-indigo-600 px-8 py-16 text-center">
        <div
          className="absolute inset-0 opacity-[0.15]"
          style={{
            backgroundImage:
              "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)",
            backgroundSize: "32px 32px",
          }}
        />
        <div className="relative z-10">
          <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight mb-4">
            Bring your team into one workspace
          </h2>
          <p className="text-indigo-100 text-[15px] max-w-md mx-auto mb-8">
            No credit card required. Set up your organization in under two minutes.
          </p>
          <Button
            size="lg"
            className="bg-white text-indigo-700 hover:bg-indigo-50 gap-1.5 font-medium"
            onClick={onPrimaryClick}
          >
            Start Free Trial
            <ArrowRight className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </section>
  );
}