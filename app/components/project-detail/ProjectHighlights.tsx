import { Building2, Dumbbell, MapPin, Shield, Trees, Waves } from "lucide-react";
import type { Project, ProjectHighlight } from "@/lib/data/projects";
import FadeIn from "@/components/motion/FadeIn";
import SectionEyebrow from "@/components/ui/SectionEyebrow";

const ICON_MAP: Record<ProjectHighlight["icon"], typeof MapPin> = {
  location: MapPin,
  clubhouse: Building2,
  pool: Waves,
  gym: Dumbbell,
  garden: Trees,
  security: Shield,
};

export default function ProjectHighlights({ project }: { project: Project }) {
  if (!project.highlights || project.highlights.length === 0) return null;

  return (
    <section className="py-8 lg:py-10 bg-offwhite border-t border-black/[0.05]">
      <div className="max-w-7xl mx-auto px-4 sm:px-5 lg:px-8">
        <FadeIn className="mb-6 lg:mb-8">
          <SectionEyebrow className="mb-2.5">
            Why Choose This Project
          </SectionEyebrow>
          <h2 className="font-serif text-2xl md:text-3xl lg:text-[2.25rem] font-bold text-navy">
            Key Highlights
          </h2>
        </FadeIn>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {project.highlights.map(({ icon, title, description }, idx) => {
            const Icon = ICON_MAP[icon];
            return (
              <FadeIn
                key={`${title}-${idx}`}
                delay={idx * 0.06}
                className="p-5 rounded-xl bg-white border border-black/[0.06] shadow-[0_1px_4px_rgba(0,0,0,0.04)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_12px_30px_rgba(0,0,0,0.08)]"
              >
                <div className="w-10 h-10 rounded-lg flex items-center justify-center mb-3 bg-gold/[0.12]">
                  <Icon className="w-5 h-5 text-gold" />
                </div>
                <h3 className="font-serif text-lg lg:text-xl font-bold text-navy mb-1.5">{title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{description}</p>
              </FadeIn>
            );
          })}
        </div>
      </div>
    </section>
  );
}
