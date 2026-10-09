import { STATS, TRUST_PROPS } from "@/lib/data/trust";
import FadeIn from "@/components/motion/FadeIn";
import SectionEyebrow from "@/components/ui/SectionEyebrow";

export default function TrustSection() {
  return (
    <section id="about" className="py-12 lg:py-12 lg:py-16 bg-navy">
      <div className="max-w-7xl mx-auto px-4 sm:px-5 lg:px-8">
        {/* Header */}
        <FadeIn className="text-center mb-16">
          <SectionEyebrow className="mb-4">
            Why Work With Me
          </SectionEyebrow>
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-white leading-tight">
            Trusted by Hundreds of
            <br />
            Bangalore Home Buyers
          </h2>
        </FadeIn>

        {/* Stats row */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {STATS.map(({ value, label, icon: Icon }, idx) => (
            <FadeIn key={`${label}-${idx}`} delay={idx * 0.08} className="text-center">
              <div className="w-14 h-14 rounded-xl mx-auto mb-4 flex items-center justify-center bg-gold/[0.12] border border-gold/25">
                <Icon className="w-6 h-6 text-gold" />
              </div>
              <div className="font-serif text-4xl font-bold text-white mb-1">
                {value}
              </div>
              <div className="text-sm leading-snug text-white/45">{label}</div>
            </FadeIn>
          ))}
        </div>

        {/* Divider */}
        <div className="w-full h-px mb-14 bg-white/[0.06]" />

        {/* Value props */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {TRUST_PROPS.map(({ title, desc, icon: Icon }, idx) => (
            <FadeIn
              key={`${title}-${idx}`}
              delay={idx * 0.1}
              className="rounded-xl p-6 bg-white/[0.035] border border-white/[0.07]"
            >
              <div className="w-9 h-9 rounded-lg flex items-center justify-center mb-4 bg-gold/[0.15]">
                <Icon className="w-5 h-5 text-gold" />
              </div>
              <h3 className="font-serif text-white font-semibold text-base mb-2">
                {title}
              </h3>
              <p className="text-sm leading-relaxed text-white/45">{desc}</p>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
