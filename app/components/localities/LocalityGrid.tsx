import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { Locality } from "@/lib/data/localities";
import LocalityCard from "./LocalityCard";
import SectionEyebrow from "@/components/ui/SectionEyebrow";

export default function LocalityGrid({ localities }: { localities: Locality[] }) {
  return (
    <section className="py-8 lg:py-10 bg-offwhite">
      <div className="max-w-7xl mx-auto px-4 sm:px-5 lg:px-8">
        <div className="flex flex-wrap items-end justify-between gap-3 mb-6 lg:mb-8">
          <div>
            <SectionEyebrow className="mb-2.5">
              Popular Localities
            </SectionEyebrow>
            <h2 className="font-serif text-2xl md:text-3xl font-bold text-navy">
              Explore Popular Localities
            </h2>
          </div>
          <Link
            href="/localities"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-navy group"
          >
            View All Areas
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {localities.length === 0 ? (
          <div className="py-12 text-center">
            <p className="text-gray-400 text-sm">
              No localities match your search. Try a different name.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 min-w-0">
            {localities.map((locality) => (
              <div key={locality.slug} className="h-full">
                <LocalityCard locality={locality} />
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
