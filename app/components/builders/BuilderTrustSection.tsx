import { ShieldCheck, Sparkles, Users } from "lucide-react";
import FadeIn from "@/components/motion/FadeIn";

const TRUST_ITEMS = [
  {
    title: "Trusted Developers",
    desc: "We partner exclusively with background-checked builders with immaculate compliance track records.",
    icon: ShieldCheck,
  },
  {
    title: "Quality Projects",
    desc: "Rigorous quality assessment of construction, materials, location growth, and overall architectural value.",
    icon: Sparkles,
  },
  {
    title: "Expert Guidance",
    desc: "End-to-end consulting, unbiased advisory, legal vetting, and clear documentation support.",
    icon: Users,
  },
];

export default function BuilderTrustSection() {
  return (
    <section className="py-14 lg:py-18 bg-white border-t border-black/[0.05]">
      <div className="max-w-5xl mx-auto px-4 sm:px-5 lg:px-8">
        <FadeIn className="text-center mb-14">
          <h2 className="font-serif text-2xl md:text-3xl font-bold text-navy mb-3">
            Partnering With Trusted Names
          </h2>
          <p className="text-gray-500 max-w-xl mx-auto leading-relaxed">
            Our builder partnerships help us offer carefully selected premium
            residential projects across prime locations of Bangalore.
          </p>
        </FadeIn>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          {TRUST_ITEMS.map(({ title, desc, icon: Icon }, idx) => (
            <FadeIn
              key={`${title}-${idx}`}
              delay={idx * 0.08}
              className="rounded-xl p-6 bg-offwhite border border-black/[0.06] text-center"
            >
              <div className="w-10 h-10 rounded-full mx-auto mb-4 flex items-center justify-center bg-gold/[0.12]">
                <Icon className="w-5 h-5 text-gold" />
              </div>
              <h3 className="font-serif text-navy font-semibold text-sm mb-2">
                {title}
              </h3>
              <p className="text-xs leading-relaxed text-gray-500">{desc}</p>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
