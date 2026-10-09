import Image from "next/image";
import FadeIn from "@/components/motion/FadeIn";
import PropertySearchForm from "./PropertySearchForm";

export default function HeroSection() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col justify-center"
    >
      {/* Background */}
      <div className="absolute inset-0 overflow-hidden bg-[#0B1525]">
        <Image
          src="https://images.unsplash.com/photo-1564486593523-38d62206e706?w=1920&h=1080&fit=crop&auto=format"
          alt="Premium residential apartments in Bangalore"
          fill
          priority
          className="object-cover opacity-[0.38] hero-image-zoom"
          sizes="100vw"
        />
        {/* Uniform dark overlay so content is readable across full width */}
        <div className="absolute inset-0 bg-[#0B1525]/[0.52]" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-5 lg:px-8 pt-28 pb-12 w-full">
        <FadeIn>
          <div className="inline-flex items-center gap-2 mb-6 px-4 py-1.5 rounded-full text-xs font-medium tracking-[0.14em] uppercase border border-white/[0.18] text-white/65">
            <span className="w-1.5 h-1.5 rounded-full bg-gold animate-pulse" />
            Bangalore&apos;s Trusted Real Estate Consultant
          </div>
        </FadeIn>

        <FadeIn delay={0.08}>
          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-white font-bold leading-[1.12] mb-5 max-w-3xl">
            Find Your Dream Home in Bangalore
          </h1>
        </FadeIn>

        <FadeIn delay={0.16}>
          <p className="text-lg leading-relaxed mb-10 max-w-2xl text-white/60">
            I help home buyers navigate Bangalore&apos;s property market —
            sourcing verified projects from Prestige, Sattva, Century, Brigade,
            and Godrej with honest guidance at every step.
          </p>
        </FadeIn>

        <FadeIn delay={0.24}>
          <PropertySearchForm />
        </FadeIn>
      </div>

      {/* Scroll hint */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
        <div className="w-px h-10 animate-pulse bg-white/20" />
        <span className="text-[9px] tracking-[0.2em] uppercase text-white/30">
          Scroll
        </span>
      </div>
    </section>
  );
}
