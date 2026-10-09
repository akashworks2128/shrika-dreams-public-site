import Image from "next/image";
import Link from "next/link";
import { MapPin } from "lucide-react";
import type { Project } from "@/lib/data/projects";

export default function ProjectCard({ project }: { project: Project }) {
  const isPlot = project.propertyType === "Plot";

  return (
    <article className="w-full min-w-0 max-w-full bg-white rounded-xl overflow-hidden border border-black/[0.06] shadow-[0_1px_4px_rgba(0,0,0,0.04)] transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_16px_36px_rgba(0,0,0,0.10)] group">
      {/* Image */}
      <div className="relative w-full h-48 min-w-0 bg-gray-100 overflow-hidden">
        <Image
          src={project.image}
          alt={project.name}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {/* Tag */}
        <div className="absolute top-3 left-3">
          <span
            className={`px-2.5 py-1 text-[10px] font-bold tracking-wide text-white rounded ${
              project.tagDark ? "bg-navy" : "bg-gold"
            }`}
          >
            {project.tag}
          </span>
        </div>
        {/* Status badge — plots intentionally do not show apartment-style construction status. */}
        {!isPlot && (
          <div className="absolute bottom-3 right-3">
            <span className="px-2.5 py-1 text-[10px] font-medium bg-white/95 rounded text-gray-600">
              {project.status}
            </span>
          </div>
        )}
      </div>

      {/* Card body */}
      <div className="p-4">
        <p className="text-[10px] font-semibold tracking-[0.12em] uppercase mb-1 text-gray-400">
          {project.builder}
        </p>
        <h3 className="font-serif font-bold text-base leading-snug mb-2 text-navy">
          {project.name}
        </h3>
        <div className="flex items-center gap-1.5 text-xs text-gray-400 mb-4">
          <span className="font-semibold text-gray-500">
            {isPlot ? "Plot" : "Apartment"}
          </span>
          <span className="text-gray-300">&bull;</span>
          <MapPin className="w-3 h-3" />
          {project.locality}, Bangalore
        </div>

        <div className="flex items-center justify-between py-3 mb-4 border-y border-black/[0.06]">
          <div>
            <p className="text-[9px] text-gray-400 uppercase tracking-wide font-medium mb-0.5">
              {isPlot ? "Fixed Price" : "Price Range"}
            </p>
            <p className="text-sm font-bold text-navy">{project.price}</p>
          </div>
          <div className="text-right">
            <p className="text-[9px] text-gray-400 uppercase tracking-wide font-medium mb-0.5">
              {isPlot ? "Acres" : "Config"}
            </p>
            <p className="text-sm font-semibold text-gray-700">
              {isPlot ? project.acres : project.bhk}
            </p>
          </div>
        </div>

        <Link
          href={`/projects/${project.slug}`}
          className="block w-full py-2.5 text-sm font-semibold rounded border-2 border-navy text-navy text-center transition-all duration-300 hover:bg-navy hover:text-white hover:-translate-y-px"
        >
          {isPlot ? "View Plot Details" : "View Details"}
        </Link>
      </div>
    </article>
  );
}
