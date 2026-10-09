import Image from "next/image";
import type { Locality } from "@/lib/data/localities";
import FadeIn from "@/components/motion/FadeIn";
import SectionEyebrow from "@/components/ui/SectionEyebrow";

export default function LocalityAbout({ locality }: { locality: Locality }) {
  return (
    <section className="py-8 lg:py-10 bg-offwhite">
      <div className="max-w-7xl mx-auto px-4 sm:px-5 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          <FadeIn>
            <SectionEyebrow className="mb-2.5">
              About the Locality
            </SectionEyebrow>
            <h2 className="font-serif text-2xl md:text-3xl font-bold text-navy mb-4">
              {locality.aboutTitle}
            </h2>
            <p className="text-gray-500 leading-relaxed">{locality.about}</p>
          </FadeIn>

          <FadeIn delay={0.1} className="group relative aspect-[6/5] rounded-xl overflow-hidden">
            <Image
              src={locality.aboutImage}
              alt={`${locality.name} residential skyline`}
              fill
              sizes="(max-width: 1024px) 90vw, 45vw"
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            />
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
