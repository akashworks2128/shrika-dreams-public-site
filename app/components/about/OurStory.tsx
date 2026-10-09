import FadeIn from "@/components/motion/FadeIn";

const STATS = [
  { value: "10+", label: "Years Experience" },
  { value: "500+", label: "Happy Families" },
  { value: "50+", label: "Residential Projects" },
  { value: "10+", label: "Trusted Builders" },
];

export default function OurStory() {
  return (
    <section className="bg-offwhite">
      <div className="max-w-7xl mx-auto px-4 sm:px-5 lg:px-8 pb-12 lg:pb-16">
        <FadeIn>
          <h2 className="font-serif text-2xl md:text-3xl font-bold text-navy mb-8 lg:mb-10">
            Our Story
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
            <p className="text-gray-500 leading-relaxed">
              With over 10 years of experience in Bangalore&apos;s real estate
              market, we have helped homebuyers navigate one of the most
              important decisions of their lives — finding a home that fits
              their needs, lifestyle and budget.
            </p>
            <p className="text-gray-500 leading-relaxed">
              From understanding a buyer&apos;s requirements to shortlisting
              suitable projects and guiding them through the buying process,
              our focus is on providing clear and practical advice at every
              step.
            </p>
          </div>
        </FadeIn>
      </div>

      {/* Stats bar */}
      <FadeIn className="bg-navy">
        <div className="max-w-7xl mx-auto px-4 sm:px-5 lg:px-8 py-8 lg:py-10">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {STATS.map(({ value, label }, index) => (
              <div key={`${label}-${index}`} className="text-center">
                <div className="font-serif text-3xl md:text-4xl font-bold text-gold mb-1.5">
                  {value}
                </div>
                <div className="text-xs md:text-sm text-white/45">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </FadeIn>
    </section>
  );
}
