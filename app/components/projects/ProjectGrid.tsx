import ProjectCard from "@/components/home/ProjectCard";
import type { Project } from "@/lib/data/projects";

/**
 * Reuses the exact card design from the Home Page's Featured Projects
 * section so listings look like the same website, per design requirements.
 */
export default function ProjectGrid({ projects }: { projects: Project[] }) {
  if (projects.length === 0) {
    return (
      <div className="py-12 text-center">
        <p className="text-gray-400 text-sm">
          No properties match your filters. Try adjusting or clearing them.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 min-w-0">
      {projects.map((project) => (
        <ProjectCard key={project.id} project={project} />
      ))}
    </div>
  );
}
