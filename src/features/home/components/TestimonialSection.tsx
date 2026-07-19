import { Card } from "@/components/ui/card";
import { TESTIMONIALS } from "@/constants/LandingData";

export function TestimonialSection() {
  return (
    <section className="bg-slate-50/70 py-24">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center max-w-xl mx-auto mb-14">
          <span className="text-[12.5px] font-semibold text-indigo-600 uppercase tracking-wide">
            Testimonials
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 tracking-tight mt-2">
            Trusted by teams that ship
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {TESTIMONIALS.map((t) => (
            <Card key={t.name} className="p-6 border-slate-100 gap-4">
              <p className="text-[13.5px] text-slate-600 leading-relaxed">“{t.quote}”</p>
              <div className="flex items-center gap-3 pt-2 border-t border-slate-100">
                <div className={`w-9 h-9 rounded-full ${t.avatarColor}`} />
                <div>
                  <p className="text-[13px] font-semibold text-slate-900">{t.name}</p>
                  <p className="text-[12px] text-slate-500">{t.role}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}