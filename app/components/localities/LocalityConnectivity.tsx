import { Building2, GraduationCap, Plane, ShoppingBag, Stethoscope, TrainFront } from "lucide-react";
import type { ConnectivityItem, Locality } from "@/lib/data/localities";
import FadeIn from "@/components/motion/FadeIn";
import SectionEyebrow from "@/components/ui/SectionEyebrow";

const ICON_MAP: Record<ConnectivityItem["icon"], typeof TrainFront> = {
  metro: TrainFront,
  airport: Plane,
  itParks: Building2,
  schools: GraduationCap,
  hospitals: Stethoscope,
  shopping: ShoppingBag,
};

export default function LocalityConnectivity({ locality }: { locality: Locality }) {
  return (
    <section className="py-8 lg:py-10 bg-white border-t border-black/[0.05]">
      <div className="max-w-7xl mx-auto px-4 sm:px-5 lg:px-8">
        <FadeIn className="mb-6 lg:mb-8">
          <SectionEyebrow className="mb-2.5">
            Connectivity
          </SectionEyebrow>
          <h2 className="font-serif text-2xl md:text-3xl font-bold text-navy">
            Well-Connected Living
          </h2>
        </FadeIn>

        {locality.nearbyLandmarks.length > 0 ? (
          <div className="mb-6">
            <h3 className="text-sm font-semibold text-navy mb-3">Nearby Landmarks</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {locality.nearbyLandmarks.map(({ name, distance }, idx) => (
                <FadeIn key={`${name}-${idx}`} delay={idx * 0.04} className="flex items-start gap-3 p-4 rounded-lg bg-offwhite border border-black/[0.06]">
                  <div className="w-8 h-8 rounded-md flex items-center justify-center flex-shrink-0 bg-navy/[0.06]">
                    <Building2 className="w-4 h-4 text-navy" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-navy mb-0.5">{name}</p>
                    <p className="text-xs text-gray-500 leading-relaxed">{distance}</p>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        ) : null}

        <h3 className="text-sm font-semibold text-navy mb-3">Connectivity</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {locality.connectivity.map(({ icon, label, detail }, idx) => {
            const Icon = ICON_MAP[icon];
            return (
              <FadeIn
                key={`${label}-${idx}`}
                delay={idx * 0.05}
                className="flex items-start gap-3 p-4 rounded-lg bg-offwhite border border-black/[0.06]"
              >
                <div className="w-8 h-8 rounded-md flex items-center justify-center flex-shrink-0 bg-navy/[0.06]">
                  <Icon className="w-4 h-4 text-navy" />
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-navy mb-0.5">{label}</p>
                  <p className="text-xs text-gray-500 leading-relaxed">{detail}</p>
                </div>
              </FadeIn>
            );
          })}
        </div>
      </div>
    </section>
  );
}
