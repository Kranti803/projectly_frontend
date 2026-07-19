import { HOW_IT_WORKS } from "@/constants/LandingData";

export function HowItWorksSection() {
  return (
    <section id="how-it-works" className="bg-slate-50/70 py-24">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center max-w-xl mx-auto mb-16">
          <span className="text-[12.5px] font-semibold text-indigo-600 uppercase tracking-wide">
            How it works
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 tracking-tight mt-2">
            Up and running in minutes
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-10 relative">
          {HOW_IT_WORKS.map((step) => (
            <div key={step.number} className="relative">
              <span className="text-[13px] font-bold text-indigo-300 block mb-3">
                {step.number}
              </span>
              <h3 className="text-[16px] font-semibold text-slate-900 mb-2">{step.title}</h3>
              <p className="text-[13.5px] text-slate-500 leading-relaxed">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}