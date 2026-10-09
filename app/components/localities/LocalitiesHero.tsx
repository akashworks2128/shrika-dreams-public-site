import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";
import { ChevronRight } from "lucide-react";
import LocalitySearch from "./LocalitySearch";
import SectionEyebrow from "@/components/ui/SectionEyebrow";

export default function LocalitiesHero() {
  return (
    <div className="relative pt-24 pb-12 lg:pt-28 lg:pb-16">
      {/* Background */}
      <div className="absolute inset-0 bg-[#0B1525]">
        <Image
          src="https://images.unsplash.com/photo-1580746738099-1b2f971d1959?w=1920&h=900&fit=crop&auto=format"
          alt="Bangalore city skyline"
          fill
          priority
          className="object-cover opacity-40"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-[#0B1525]/60" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-5 lg:px-8 text-center">
        {/* Breadcrumb */}
        <nav
          aria-label="Breadcrumb"
          className="flex items-center justify-center gap-1.5 text-xs text-white/50 mb-6"
        >
          <Link href="/" className="hover:text-white transition-colors">
            Home
          </Link>
          <ChevronRight className="w-3 h-3" />
          <span className="text-white/80 font-medium">Localities</span>
        </nav>

        <SectionEyebrow className="mb-3">
          Explore Bangalore
        </SectionEyebrow>
        <h1 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight mb-4">
          Find the Right Locality for Your New Home
        </h1>
        <p className="text-white/60 leading-relaxed max-w-2xl mx-auto mb-8">
          Analyze price trends, popular residential layouts, project options
          and neighborhood insights across Bangalore&apos;s premier growth
          corridors.
        </p>

        <Suspense
          fallback={
            <div className="h-[50px] max-w-xl mx-auto rounded-lg bg-white/10" />
          }
        >
          <LocalitySearch />
        </Suspense>
      </div>
    </div>
  );
}
