import { PROJECTS } from "@/lib/data/projects";
import type { Locality } from "@/lib/data/localities";
import FadeIn from "@/components/motion/FadeIn";
import ProjectCard from "@/components/home/ProjectCard";
import SectionEyebrow from "@/components/ui/SectionEyebrow";

export default function LocalityFeaturedProjects({ locality }: { locality: Locality }) {
  const projects = PROJECTS.filter((project) => project.locality === locality.name);

  if (projects.length === 0) return null;

  return (
    <section className="py-8 lg:py-10 bg-white border-t border-black/[0.05]">
      <div className="max-w-7xl mx-auto px-4 sm:px-5 lg:px-8">
        <FadeIn className="mb-6 lg:mb-8">
          <SectionEyebrow className="mb-2.5">
            Featured Listings
          </SectionEyebrow>
          <h2 className="font-serif text-2xl md:text-3xl font-bold text-navy">
            Projects in {locality.name}
          </h2>
        </FadeIn>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {projects.map((project, idx) => (
            <FadeIn key={project.id} delay={idx * 0.08}>
              <ProjectCard project={project} />
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
