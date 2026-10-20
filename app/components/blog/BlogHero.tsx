import Link from "next/link";
import { ChevronRight } from "lucide-react";
import SectionEyebrow from "@/components/ui/SectionEyebrow";

export default function BlogHero() {
  return (
    <div className="pt-24 pb-8 lg:pt-28 lg:pb-10 bg-offwhite">
      <div className="max-w-7xl mx-auto px-4 sm:px-5 lg:px-8">
        {/* Breadcrumb */}
        <nav
          aria-label="Breadcrumb"
          className="flex items-center gap-1.5 text-sm text-gray-400 mb-6"
        >
          <Link href="/" className="hover:text-navy transition-colors">
            Home
          </Link>
          <ChevronRight className="w-3 h-3" />
          <span className="text-gray-500 font-medium">Blog</span>
        </nav>

        <SectionEyebrow className="mb-3">Insights &amp; Guides</SectionEyebrow>
        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
          <h1 className="font-serif text-3xl md:text-4xl font-bold leading-tight text-navy max-w-lg">
            Property Insights
            <br />
            From Bangalore.
          </h1>
          <p className="text-gray-500 leading-relaxed max-w-md lg:text-right">
            Honest market notes, locality guides, and buying advice to help you
            make a confident property decision.
          </p>
        </div>
      </div>
    </div>
  );
}
