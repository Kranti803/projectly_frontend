import { Card } from "@/components/ui/card";
import { FEATURES } from "@/constants/LandingData";

export function FeaturesSection() {
  return (
    <section id="features" className="max-w-6xl mx-auto px-6 py-24">
      <div className="text-center max-w-xl mx-auto mb-14">
        <span className="text-[12.5px] font-semibold text-indigo-600 uppercase tracking-wide">
          Features
        </span>
        <h2 className="text-3xl md:text-4xl font-bold text-slate-900 tracking-tight mt-2 mb-4">
          Everything your team needs, nothing it doesn't
        </h2>
        <p className="text-slate-500 text-[15px]">
          From multi-tenant workspaces to real-time updates, Projectly is built around how
          teams actually work.
        </p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {FEATURES.map((feature) => {
          const Icon = feature.icon;
          return (
            <Card
              key={feature.title}
              className="p-6 border-slate-100 hover:border-indigo-200 hover:shadow-md transition-shadow gap-3"
            >
              <div className="w-10 h-10 rounded-lg bg-indigo-50 flex items-center justify-center">
                <Icon className="w-5 h-5 text-indigo-600" />
              </div>
              <h3 className="text-[15px] font-semibold text-slate-900">{feature.title}</h3>
              <p className="text-[13.5px] text-slate-500 leading-relaxed">
                {feature.description}
              </p>
            </Card>
          );
        })}
      </div>
    </section>
  );
}