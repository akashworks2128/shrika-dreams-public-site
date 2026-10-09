import { ArrowUpRight, MapPin } from "lucide-react";
import { BRAND } from "@/lib/constants";
import FadeIn from "@/components/motion/FadeIn";

/**
 * Uses Google's key-less query embed (maps.google.com/maps?q=...&output=embed)
 * so the map works out of the box with no API key or billing setup.
 * Swap MAP_EMBED_SRC for the client's actual Google Maps embed URL
 * (Google Maps > Share > Embed a map) whenever they provide one —
 * everything else in this section stays the same.
 */
const MAP_EMBED_SRC =
  "https://maps.google.com/maps?q=Koramangala%2C%20Bangalore%2C%20560034&t=&z=14&ie=UTF8&iwloc=&output=embed";

const DIRECTIONS_HREF =
  "https://www.google.com/maps/dir/?api=1&destination=Koramangala%2C+Bangalore+560034";

export default function OfficeLocationSection() {
  return (
    <section className="py-14 lg:py-18 bg-white border-t border-black/[0.05]">
      <div className="max-w-5xl mx-auto px-4 sm:px-5 lg:px-8">
        <FadeIn className="text-center mb-10">
          <h2 className="font-serif text-2xl md:text-3xl font-bold text-navy mb-3">
            Our Office
          </h2>
          <p className="text-gray-500 leading-relaxed max-w-xl mx-auto">
            Visit us or get in touch to discuss your property requirements.
          </p>
        </FadeIn>

        <FadeIn delay={0.1}>
          {/* Map */}
          <div className="relative rounded-2xl overflow-hidden border border-black/[0.08] shadow-[0_4px_24px_rgba(0,0,0,0.06)] h-[280px] sm:h-[320px] lg:h-[420px]">
            <iframe
              title="Office location map"
              src={MAP_EMBED_SRC}
              className="w-full h-full border-0 grayscale-[15%] contrast-[1.02]"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />

            {/* Overlay card */}
            <div className="absolute top-4 left-4 right-auto max-w-[calc(100%-2rem)] sm:max-w-xs bg-white/95 backdrop-blur-sm rounded-xl px-4 py-3.5 shadow-[0_4px_16px_rgba(0,0,0,0.12)] border border-black/[0.06] pointer-events-none">
              <div className="flex items-start gap-2.5">
                <div className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 bg-gold/[0.12]">
                  <MapPin className="w-3.5 h-3.5 text-gold" />
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-serif font-bold text-navy leading-tight truncate">
                    {BRAND.name}
                  </p>
                  <p className="text-xs text-gray-500 mt-0.5">
                    Koramangala, Bangalore
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Directions button */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-5">
            <p className="text-sm text-gray-500 flex items-center gap-2">
              <MapPin className="w-3.5 h-3.5 text-gold flex-shrink-0" />
              {BRAND.address}
            </p>
            <a
              href={DIRECTIONS_HREF}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-lg text-sm font-semibold border-2 border-navy text-navy transition-colors hover:bg-navy hover:text-white flex-shrink-0"
            >
              Get Directions
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
