import {
  ArrowUpDown,
  Building2,
  Car,
  Dumbbell,
  Footprints,
  PartyPopper,
  Shield,
  Trees,
  Volleyball,
  Waves,
  Zap,
} from "lucide-react";
import type { Project, ProjectAmenity } from "@/lib/data/projects";
import FadeIn from "@/components/motion/FadeIn";
import SectionEyebrow from "@/components/ui/SectionEyebrow";

const ICON_MAP: Record<ProjectAmenity["icon"], typeof Waves> = {
  clubhouse: Building2,
  pool: Waves,
  gym: Dumbbell,
  garden: Trees,
  security: Shield,
  parking: Car,
  playground: PartyPopper,
  sports: Volleyball,
  power: Zap,
  lift: ArrowUpDown,
  walking: Footprints,
  hall: Building2,
};

export default function ProjectAmenities({ project }: { project: Project }) {
  if (!project.amenities || project.amenities.length === 0) return null;

  return (
    <section className="py-8 lg:py-10 bg-offwhite border-t border-black/[0.05]">
      <div className="max-w-7xl mx-auto px-4 sm:px-5 lg:px-8">
        <FadeIn className="mb-6 lg:mb-8">
          <SectionEyebrow className="mb-2.5">
            Lifestyle
          </SectionEyebrow>
          <h2 className="font-serif text-2xl md:text-3xl lg:text-[2.25rem] font-bold text-navy">Amenities</h2>
        </FadeIn>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
          {project.amenities.map(({ icon, label }, idx) => {
            const Icon = ICON_MAP[icon];
            return (
              <FadeIn
                key={`${label}-${idx}`}
                delay={idx * 0.03}
                className="flex flex-col items-center text-center gap-2.5 p-4 rounded-lg bg-white border border-black/[0.06]"
              >
                <div className="w-10 h-10 rounded-full flex items-center justify-center bg-navy/[0.06]">
                  <Icon className="w-4 h-4 text-navy" />
                </div>
                <p className="text-xs font-medium text-gray-600 leading-snug">{label}</p>
              </FadeIn>
            );
          })}
        </div>
      </div>
    </section>
  );
}
