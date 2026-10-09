import Link from "next/link";
import { ChevronRight } from "lucide-react";
import SectionEyebrow from "@/components/ui/SectionEyebrow";

export default function ProjectsHero() {
  return (
    <div className="pt-24 pb-8 lg:pt-28 lg:pb-10 bg-offwhite">
      <div className="max-w-7xl mx-auto px-4 sm:px-5 lg:px-8">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-sm text-gray-400 mb-6">
          <Link href="/" className="hover:text-navy transition-colors">
            Home
          </Link>
          <ChevronRight className="w-3 h-3" />
          <span className="text-gray-500 font-medium">Projects</span>
        </nav>

        <SectionEyebrow className="mb-3">
          Explore Properties
        </SectionEyebrow>
        <h1 className="font-serif text-3xl md:text-4xl font-bold leading-tight text-navy mb-4 max-w-2xl">
          Find Your Perfect Home in Bangalore
        </h1>
        <p className="text-gray-500 leading-relaxed max-w-2xl">
          Explore our handpicked selection of residential projects from
          trusted builders across Bangalore.
        </p>
      </div>
    </div>
  );
}
