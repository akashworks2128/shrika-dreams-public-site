import { PARTNER_BUILDERS } from "@/lib/data/builders";
import FadeIn from "@/components/motion/FadeIn";
import SectionEyebrow from "@/components/ui/SectionEyebrow";

/**
 * Reuses the builder names already defined in lib/data/builders.ts (the
 * same list that powers the /builders page) so this strip never drifts
 * out of sync with the actual partner roster.
 */
export default function TrustedBuilderPartnerships() {
  return (
    <section className="py-12 lg:py-12 lg:py-16 bg-navy">
      <div className="max-w-5xl mx-auto px-4 sm:px-5 lg:px-8 text-center">
        <FadeIn>
          <SectionEyebrow className="mb-3">
            Developer Ecosystem
          </SectionEyebrow>
          <h2 className="font-serif text-2xl md:text-3xl font-bold text-white mb-3">
            Trusted Builder Partnerships
          </h2>
          <p className="text-white/45 max-w-xl mx-auto leading-relaxed mb-10">
            We work with established developers across Bangalore to give
            homebuyers access to carefully selected residential projects.
          </p>
        </FadeIn>

        <FadeIn
          delay={0.1}
          className="grid grid-cols-2 sm:grid-cols-3 gap-3"
        >
          {PARTNER_BUILDERS.map(({ id, name }) => (
            <div
              key={id}
              className="py-3.5 px-4 rounded-lg text-sm font-medium text-white/70 bg-white/[0.05] border border-white/[0.08]"
            >
              {name}
            </div>
          ))}
        </FadeIn>
      </div>
    </section>
  );
}
