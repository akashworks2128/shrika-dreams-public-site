import Image from "next/image";
import Link from "next/link";
import { ChevronRight, ShieldCheck } from "lucide-react";
import SectionEyebrow from "@/components/ui/SectionEyebrow";

export default function AboutHero() {
  return (
    <div className="pt-24 pb-12 lg:pt-28 lg:pb-16 bg-offwhite">
      <div className="max-w-7xl mx-auto px-4 sm:px-5 lg:px-8">
        {/* Breadcrumb */}
        <nav
          aria-label="Breadcrumb"
          className="flex items-center gap-1.5 text-sm text-gray-400 mb-8 lg:mb-10"
        >
          <Link href="/" className="hover:text-navy transition-colors">
            Home
          </Link>
          <ChevronRight className="w-3 h-3" />
          <span className="text-gray-500 font-medium">About</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          {/* Text */}
          <div>
            <SectionEyebrow className="mb-3">
              About Us
            </SectionEyebrow>
            <h1 className="font-serif text-3xl md:text-4xl lg:text-[2.75rem] font-bold leading-tight text-navy mb-5">
              Your Trusted Real Estate Partner in Bangalore
            </h1>
            <p className="text-gray-500 leading-relaxed mb-6 max-w-lg">
              With years of experience in Bangalore&apos;s real estate market,
              we help homebuyers discover the right property with honest
              guidance, local expertise and a personalized approach.
            </p>

            <div className="inline-flex items-center gap-2 px-3.5 py-2 rounded-full border border-gold/30 bg-gold/[0.08]">
              <ShieldCheck className="w-3.5 h-3.5 text-gold flex-shrink-0" />
              <span className="text-[10px] font-bold tracking-[0.1em] uppercase text-gold">
                RERA Registered Consultant
              </span>
            </div>
          </div>

          {/* Image */}
          <div className="relative aspect-[4/5] sm:aspect-[6/5] lg:aspect-[4/5] rounded-2xl overflow-hidden max-w-md mx-auto lg:mx-0 lg:ml-auto w-full">
            <Image
              src="https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=800&h=1000&fit=crop&auto=format"
              alt="A real estate consultant in a modern Bangalore office"
              fill
              priority
              sizes="(max-width: 1024px) 90vw, 40vw"
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
