import FadeIn from "@/components/motion/FadeIn";
import SectionEyebrow from "@/components/ui/SectionEyebrow";

const PROCESS_STEPS = [
  {
    number: "01",
    title: "Understand Your Needs",
    desc: "Budget, preferred location, lifestyle and requirements.",
  },
  {
    number: "02",
    title: "Shortlist the Right Projects",
    desc: "Compare suitable projects from trusted builders.",
  },
  {
    number: "03",
    title: "Guide Your Decision",
    desc: "Understand pricing, amenities, location and important details.",
  },
  {
    number: "04",
    title: "Support You Through the Process",
    desc: "Guidance from site visit through the final decision.",
  },
];

export default function ProcessSection() {
  return (
    <section className="py-12 lg:py-16 bg-offwhite">
      <div className="max-w-7xl mx-auto px-4 sm:px-5 lg:px-8">
        <FadeIn className="mb-10 lg:mb-14">
          <SectionEyebrow className="mb-3">
            Our Process
          </SectionEyebrow>
          <h2 className="font-serif text-2xl md:text-3xl font-bold text-navy">
            How We Help You
          </h2>
        </FadeIn>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {PROCESS_STEPS.map(({ number, title, desc }, idx) => (
            <FadeIn
              key={`${number}-${idx}`}
              delay={idx * 0.08}
              className="rounded-xl p-6 bg-white border border-black/[0.06] shadow-[0_1px_4px_rgba(0,0,0,0.04)]"
            >
              <div className="font-serif text-3xl font-bold text-gold/40 mb-4">
                {number}
              </div>
              <h3 className="font-serif text-navy font-semibold text-base mb-2 leading-snug">
                {title}
              </h3>
              <p className="text-sm leading-relaxed text-gray-500">{desc}</p>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
