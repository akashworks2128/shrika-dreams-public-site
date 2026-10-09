import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { PROJECTS } from "@/lib/data/projects";
import FadeIn from "@/components/motion/FadeIn";
import ProjectCard from "./ProjectCard";
import SectionEyebrow from "@/components/ui/SectionEyebrow";

export default function FeaturedProjectsSection() {
  return (
    <section id="projects" className="py-12 lg:py-16 bg-offwhite">
      <div className="max-w-7xl mx-auto px-4 sm:px-5 lg:px-8">
        {/* Section header */}
        <FadeIn className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-14">
          <div>
            <SectionEyebrow className="mb-3">
              Featured Listings
            </SectionEyebrow>
            <h2 className="font-serif text-3xl md:text-4xl font-bold leading-tight text-navy">
              Handpicked Projects
              <br />
              Across Bangalore
            </h2>
          </div>
          <Link
            href="/projects"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-navy group"
          >
            View All Projects
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </FadeIn>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {PROJECTS.filter((project) => project.featured).map((project, idx) => (
            <FadeIn key={project.id} delay={idx * 0.08}>
              <ProjectCard project={project} />
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
