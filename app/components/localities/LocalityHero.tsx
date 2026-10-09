import Image from "next/image";
import Link from "next/link";
import { ChevronRight, Phone, ArrowRight } from "lucide-react";
import type { Locality } from "@/lib/data/localities";
import FadeIn from "@/components/motion/FadeIn";

export default function LocalityHero({ locality }: { locality: Locality }) {
  const stats = [
    { label: "Avg Price", value: locality.averagePrice },
    { label: "Price Range", value: locality.priceRange },
    { label: "Popular BHK", value: locality.popularBhk },
    { label: "Active Projects", value: `${locality.activeProjects}+ Projects` },
  ];

  return (
    <div className="relative min-h-[594px] pt-28 pb-10 lg:pt-32 lg:pb-12 flex items-start">
      {/* Background image — same height, overlay and visual treatment as Project Detail */}
      <div className="absolute inset-0 overflow-hidden bg-[#0B1525]">
        <Image
          src={locality.heroImage}
          alt={`${locality.name}, ${locality.city} skyline`}
          fill
          priority
          className="object-cover opacity-[0.5] hero-image-zoom"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-[#0B1525]/65" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-5 lg:px-8 w-full">
        {/* Breadcrumb — same structure as Project Detail */}
        <FadeIn>
          <nav
            aria-label="Breadcrumb"
            className="flex items-center gap-1.5 text-sm text-white/50 mb-6"
          >
          <Link href="/" className="hover:text-white transition-colors">
            Home
          </Link>
          <ChevronRight className="w-3 h-3" />
          <Link href="/localities" className="hover:text-white transition-colors">
            Localities
          </Link>
          <ChevronRight className="w-3 h-3" />
            <span className="text-white/80 font-medium">{locality.name}</span>
          </nav>
        </FadeIn>

        <FadeIn delay={0.08}>
        <div className="inline-flex items-center gap-2 mb-4 px-3.5 py-1.5 rounded-full text-[10px] font-bold tracking-[0.14em] uppercase border border-gold/30 bg-gold/[0.12] text-gold">
          Explore Locality
        </div>
        </FadeIn>

        <FadeIn delay={0.16}>
        <h1 className="font-serif text-3xl md:text-4xl lg:text-[3.25rem] font-bold text-white leading-tight mb-3 max-w-2xl">
          {locality.name}, {locality.city}
        </h1>
        </FadeIn>

        <FadeIn delay={0.22}>
        <p className="text-white/60 mb-6 max-w-2xl leading-relaxed">
          {locality.description}
        </p>
        </FadeIn>

        {/* Locality facts — same placement and card treatment as Project Detail.
            Values come directly from the current locality data. */}
        <FadeIn delay={0.28} className="max-w-2xl">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
          {stats.map(({ label, value }, index) => (
            <div
              key={`${label}-${index}`}
              className="rounded-lg border border-white/15 bg-white/[0.06] p-3"
            >
              <p className="text-[9px] font-bold uppercase tracking-wide text-white/45 mb-1">
                {label}
              </p>
              <p className="text-sm font-semibold text-white truncate">{value}</p>
            </div>
          ))}
        </div>
        </FadeIn>

        {/* Same CTA treatment as Project Detail */}
        <FadeIn delay={0.36}>
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
          <Link
            href="#properties"
            className="px-6 py-3 rounded-lg text-sm font-semibold text-white transition-opacity hover:opacity-90 flex items-center justify-center gap-2 bg-gold w-full sm:w-auto"
          >
            View Projects
            <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            href="/contact"
            className="px-6 py-3 rounded-lg text-sm font-semibold border-2 border-white/25 text-white transition-colors hover:border-white/50 flex items-center justify-center gap-2 w-full sm:w-auto"
          >
            <Phone className="w-4 h-4" />
            Get a Callback
          </Link>
        </div>
        </FadeIn>
      </div>
    </div>
  );
}
