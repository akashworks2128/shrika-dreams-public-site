import { HeartHandshake, ShieldCheck, Sparkles, Users } from "lucide-react";
import FadeIn from "@/components/motion/FadeIn";
import SectionEyebrow from "@/components/ui/SectionEyebrow";

const TRUST_ITEMS = [
  {
    title: "RERA Registered",
    desc: "Fully compliant and professional guidance backed by verified registration and transparent practices.",
    icon: ShieldCheck,
  },
  {
    title: "10+ Years Experience",
    desc: "Deep understanding of Bangalore's residential real estate market and its evolving neighborhoods.",
    icon: Sparkles,
  },
  {
    title: "500+ Happy Families",
    desc: "Helping families find homes that genuinely match their needs and budget.",
    icon: Users,
  },
  {
    title: "Personalized Guidance",
    desc: "One-on-one support at every step, from shortlisting to the final decision.",
    icon: HeartHandshake,
  },
];

export default function TrustSection() {
  return (
    <section className="py-14 lg:py-18 bg-white border-t border-black/[0.05]">
      <div className="max-w-7xl mx-auto px-4 sm:px-5 lg:px-8">
        <FadeIn className="mb-10 lg:mb-14">
          <SectionEyebrow className="mb-3">
            Core Pillars
          </SectionEyebrow>
          <h2 className="font-serif text-2xl md:text-3xl font-bold text-navy">
            Why Homebuyers Trust Us
          </h2>
        </FadeIn>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {TRUST_ITEMS.map(({ title, desc, icon: Icon }, idx) => (
            <FadeIn
              key={`${title}-${idx}`}
              delay={idx * 0.08}
              className="rounded-xl p-6 bg-offwhite border border-black/[0.06] flex items-start gap-4"
            >
              <div className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 bg-gold/[0.12]">
                <Icon className="w-5 h-5 text-gold" />
              </div>
              <div>
                <h3 className="font-serif text-navy font-semibold text-base mb-1.5">
                  {title}
                </h3>
                <p className="text-sm leading-relaxed text-gray-500">{desc}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
