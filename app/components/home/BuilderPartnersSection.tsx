import { BUILDERS } from "@/lib/data/builders";
import FadeIn from "@/components/motion/FadeIn";
import SectionEyebrow from "@/components/ui/SectionEyebrow";

export default function BuilderPartnersSection() {
  return (
    <section id="builders" className="py-12 lg:py-16 bg-navy">
      <div className="max-w-7xl mx-auto px-4 sm:px-5 lg:px-8">
        <SectionEyebrow className="text-center mb-10" colorClassName="text-gray-400">
          Authorized Channel Partner — Trusted Builder Network
        </SectionEyebrow>

        <FadeIn className="flex flex-wrap items-center justify-center gap-x-12 gap-y-8 md:gap-x-16">
          {BUILDERS.map(({ id, name, sub }, idx) => (
            <div key={id} className="flex items-center gap-3 group cursor-pointer">
              {idx > 0 && (
                <div className="hidden md:block w-px h-8 self-center bg-black/[0.08]" />
              )}
              <div className="flex flex-col items-center gap-0.5">
                <span className="font-serif text-xl font-bold tracking-tight text-[#D1D0CD] transition-colors duration-200 group-hover:text-gold group-focus-within:text-gold">
                  {name}
                </span>
                <span className="text-[8px] tracking-[0.22em] uppercase font-medium text-[#D1D0CD]">
                  {sub}
                </span>
              </div>
            </div>
          ))}
        </FadeIn>
      </div>
    </section>
  );
}
