import { MapPin, Navigation } from "lucide-react";
import type { Project } from "@/lib/data/projects";
import FadeIn from "@/components/motion/FadeIn";
import SectionEyebrow from "@/components/ui/SectionEyebrow";

export default function ProjectLocation({ project }: { project: Project }) {
  if (!project.nearbyLandmarks || project.nearbyLandmarks.length === 0) return null;

  return (
    <section className="py-8 lg:py-10 bg-offwhite border-t border-black/[0.05]">
      <div className="max-w-7xl mx-auto px-4 sm:px-5 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 min-w-0">
          <FadeIn>
            <SectionEyebrow className="mb-2.5">
              Location
            </SectionEyebrow>
            <h2 className="font-serif text-2xl md:text-3xl lg:text-[2.25rem] font-bold text-navy mb-4">
              {project.locality}, Bangalore
            </h2>

            {project.connectivitySummary && (
              <p className="text-gray-500 leading-relaxed mb-6">
                {project.connectivitySummary}
              </p>
            )}

            {/* Simple location card in place of an embedded map — no
                third-party map API credentials are used here. */}
            <div className="flex items-center gap-3 p-4 rounded-lg bg-white border border-black/[0.06]">
              <div className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 bg-navy/[0.06]">
                <MapPin className="w-5 h-5 text-navy" />
              </div>
              <div>
                <p className="text-sm font-semibold text-navy">
                  {project.name}
                </p>
                <p className="text-xs text-gray-500">
                  {project.locality}, Bangalore
                </p>
              </div>
            </div>
          </FadeIn>

          <FadeIn delay={0.1}>
            <SectionEyebrow className="mb-2.5">
              Nearby Landmarks
            </SectionEyebrow>
            <div className="space-y-2.5">
              {project.nearbyLandmarks.map(({ label, distance }, index) => (
                <div
                  key={`${label}-${index}`}
                  className="flex items-center justify-between gap-3 p-3.5 rounded-lg bg-white border border-black/[0.06]"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <Navigation className="w-4 h-4 text-gold flex-shrink-0" />
                    <span className="text-sm text-gray-600 truncate">{label}</span>
                  </div>
                  <span className="text-sm font-semibold text-navy flex-shrink-0">
                    {distance}
                  </span>
                </div>
              ))}
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
