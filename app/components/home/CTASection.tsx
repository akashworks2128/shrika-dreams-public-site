import Link from "next/link";
import { Phone } from "lucide-react";
import FadeIn from "@/components/motion/FadeIn";
import SectionEyebrow from "@/components/ui/SectionEyebrow";

export default function CTASection() {
  return (
    <section className="py-20 lg:py-24 relative overflow-hidden bg-dark">
      {/* Subtle texture lines */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg, transparent, transparent 79px, rgba(255,255,255,0.018) 79px, rgba(255,255,255,0.018) 80px)",
        }}
      />

      <FadeIn className="relative z-10 max-w-4xl mx-auto px-4 sm:px-5 lg:px-8 text-center">
        <SectionEyebrow className="mb-5">
          Ready to Begin?
        </SectionEyebrow>
        <h2 className="font-serif text-3xl md:text-5xl text-white font-bold leading-[1.15] mb-6">
          Looking for the Right
          <br />
          Property in Bangalore?
        </h2>
        <p className="text-lg max-w-xl mx-auto mb-10 leading-relaxed text-white/45">
          Let me help you find the perfect home — with no pressure, no
          commissions from you, and complete transparency throughout.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/projects"
            className="px-8 py-4 rounded-lg text-base font-semibold border-2 border-white/20 text-white transition-colors hover:border-white/45 w-full sm:w-auto text-center"
          >
            Explore Projects
          </Link>
          <a
            href="/contact"
            className="px-8 py-4 rounded-lg text-base font-semibold text-white transition-opacity hover:opacity-90 w-full sm:w-auto text-center flex items-center justify-center gap-2 bg-gold"
          >
            <Phone className="w-4 h-4" />
            Get a Callback
          </a>
        </div>
      </FadeIn>
    </section>
  );
}
