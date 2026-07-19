import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { PRICING_PLANS } from "@/constants/LandingData";

interface PricingSectionProps {
  onSelectPlan?: (planName: string) => void;
}

export function PricingSection({ onSelectPlan }: PricingSectionProps) {
  return (
    <section id="pricing" className="max-w-6xl mx-auto px-6 py-24">
      <div className="text-center max-w-xl mx-auto mb-14">
        <span className="text-[12.5px] font-semibold text-indigo-600 uppercase tracking-wide">
          Pricing
        </span>
        <h2 className="text-3xl md:text-4xl font-bold text-slate-900 tracking-tight mt-2 mb-4">
          Simple pricing that scales with you
        </h2>
        <p className="text-slate-500 text-[15px]">
          Start free. Upgrade when your team is ready for more.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-6 items-start">
        {PRICING_PLANS.map((plan) => (
          <Card
            key={plan.name}
            className={`p-7 gap-5 relative ${
              plan.highlighted
                ? "border-indigo-400 border-2 shadow-lg shadow-indigo-100"
                : "border-slate-100"
            }`}
          >
            {plan.highlighted && (
              <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-indigo-600 text-white text-[11px] font-medium px-3 py-1 rounded-full">
                Most Popular
              </span>
            )}

            <div>
              <h3 className="text-[15px] font-semibold text-slate-900 mb-1">{plan.name}</h3>
              <p className="text-[13px] text-slate-500">{plan.description}</p>
            </div>

            <div className="flex items-baseline gap-1">
              <span className="text-3xl font-bold text-slate-900">{plan.price}</span>
              <span className="text-[13px] text-slate-400">{plan.period}</span>
            </div>

            <Button
              className={`w-full font-medium ${
                plan.highlighted
                  ? "bg-indigo-600 hover:bg-indigo-700"
                  : "bg-white border border-slate-200 text-slate-700 hover:bg-slate-50"
              }`}
              onClick={() => onSelectPlan?.(plan.name)}
            >
              {plan.cta}
            </Button>

            <ul className="flex flex-col gap-2.5 pt-2 border-t border-slate-100">
              {plan.features.map((feature) => (
                <li key={feature} className="flex items-start gap-2 text-[13.5px] text-slate-600">
                  <Check className="w-4 h-4 text-indigo-500 shrink-0 mt-0.5" />
                  {feature}
                </li>
              ))}
            </ul>
          </Card>
        ))}
      </div>
    </section>
  );
}