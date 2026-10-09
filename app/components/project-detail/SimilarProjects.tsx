import type { Project } from "@/lib/data/projects";
import { getSimilarProjects } from "@/lib/data/projects";
import FadeIn from "@/components/motion/FadeIn";
import ProjectCard from "@/components/home/ProjectCard";
import SectionEyebrow from "@/components/ui/SectionEyebrow";

export default function SimilarProjects({ project }: { project: Project }) {
  const similar = getSimilarProjects(project, 3);

  if (similar.length === 0) return null;

  return (
    <section className="py-8 lg:py-10 bg-white border-t border-black/[0.05]">
      <div className="max-w-7xl mx-auto px-4 sm:px-5 lg:px-8">
        <FadeIn className="mb-6 lg:mb-8">
          <SectionEyebrow className="mb-2.5">
            You May Also Like
          </SectionEyebrow>
          <h2 className="font-serif text-2xl md:text-3xl lg:text-[2.25rem] font-bold text-navy">
            Similar Projects
          </h2>
        </FadeIn>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 min-w-0">
          {similar.map((p, idx) => (
            <FadeIn key={p.id} delay={idx * 0.08}>
              <ProjectCard project={p} />
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
