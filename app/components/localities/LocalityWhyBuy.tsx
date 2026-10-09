import { Sparkles } from "lucide-react";
import type { Locality } from "@/lib/data/localities";
import FadeIn from "@/components/motion/FadeIn";
import SectionEyebrow from "@/components/ui/SectionEyebrow";

export default function LocalityWhyBuy({ locality }: { locality: Locality }) {
  return (
    <section className="py-8 lg:py-10 bg-offwhite">
      <div className="max-w-7xl mx-auto px-4 sm:px-5 lg:px-8">
        <FadeIn className="mb-6 lg:mb-8">
          <SectionEyebrow className="mb-2.5">
            Why Buy Here
          </SectionEyebrow>
          <h2 className="font-serif text-2xl md:text-3xl font-bold text-navy">
            Why Buy in {locality.name}
          </h2>
        </FadeIn>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {locality.whyBuy.map(({ title, desc }, idx) => (
            <FadeIn
              key={`${title}-${idx}`}
              delay={idx * 0.06}
              className="flex items-start gap-3.5 p-5 rounded-xl bg-white border border-black/[0.06]"
            >
              <div className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 bg-gold/[0.12]">
                <Sparkles className="w-4.5 h-4.5 text-gold" />
              </div>
              <div>
                <h3 className="font-serif text-navy font-semibold text-sm mb-1.5">
                  {title}
                </h3>
                <p className="text-xs leading-relaxed text-gray-500">{desc}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
