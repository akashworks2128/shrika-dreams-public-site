import Image from "next/image";
import Link from "next/link";
import { ChevronRight, Download, Phone } from "lucide-react";
import type { Project } from "@/lib/data/projects";
import FadeIn from "@/components/motion/FadeIn";

export default function ProjectDetailHero({ project }: { project: Project }) {
  const heroImage = project.heroImage ?? project.image;

  return (
    <div className="relative pt-28 pb-10 lg:pt-32 lg:pb-12">
      {/* Background image */}
      <div className="absolute inset-0 overflow-hidden bg-[#0B1525]">
        <Image
          src={heroImage}
          alt={`${project.name} exterior`}
          fill
          priority
          className="object-cover opacity-[0.5] hero-image-zoom"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-[#0B1525]/65" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-5 lg:px-8">
        {/* Breadcrumb */}
        <FadeIn>
          <nav
            aria-label="Breadcrumb"
            className="flex items-center gap-1.5 text-sm text-white/50 mb-6"
          >
          <Link href="/" className="hover:text-white transition-colors">
            Home
          </Link>
          <ChevronRight className="w-3 h-3" />
          <Link href="/projects" className="hover:text-white transition-colors">
            Projects
          </Link>
          <ChevronRight className="w-3 h-3" />
            <span className="text-white/80 font-medium">{project.name}</span>
          </nav>
        </FadeIn>

        <FadeIn delay={0.08}>
        <div className="inline-flex items-center gap-2 mb-4 px-3.5 py-1.5 rounded-full text-[10px] font-bold tracking-[0.14em] uppercase border border-gold/30 bg-gold/[0.12] text-gold">
          {project.tag}
        </div>
        </FadeIn>

        <FadeIn delay={0.16}>
        <h1 className="font-serif text-3xl md:text-4xl lg:text-[3.25rem] font-bold text-white leading-tight mb-3 max-w-2xl">
          {project.name}
        </h1>
        </FadeIn>

        <FadeIn delay={0.22}>
        <p className="text-white/60 mb-6">
          By <span className="text-white/85 font-medium">{project.builder}</span> &middot;{" "}
          {project.locality}, Bangalore
        </p>
        </FadeIn>

        {/* Key facts row — plots use land-specific terminology instead of BHK/construction status. */}
        <FadeIn delay={0.28} className="max-w-2xl">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
          {(project.propertyType === "Plot"
            ? [
                { label: "Property Type", value: "Plot" },
                { label: "Plot Sizes", value: project.bhk },
                { label: "Availability", value: project.possession ?? "Available" },
                { label: "Starting Price", value: project.price },
              ]
            : [
                { label: "Property Type", value: project.propertyType },
                { label: "Configuration", value: project.bhk },
                { label: "Status", value: project.status },
                { label: "Starting Price", value: project.price },
              ]
          ).map(({ label, value }, index) => (
            <div
              key={`${label}-${index}`}
              className="rounded-lg border border-white/15 bg-white/[0.06] p-3"
            >
              <p className="text-[9px] font-bold uppercase tracking-wide text-white/45 mb-1">
                {label}
              </p>
              <p className="text-sm font-semibold text-white truncate">{value}</p>
            </div>
          ))}
        </div>
        </FadeIn>

        {/* CTAs */}
        <FadeIn delay={0.36}>
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
          <Link
            href="/contact"
            className="px-6 py-3 rounded-lg text-sm font-semibold text-white transition-opacity hover:opacity-90 flex items-center justify-center gap-2 bg-gold w-full sm:w-auto"
          >
            <Phone className="w-4 h-4" />
            Get a Callback
          </Link>
          <a
            href={project.brochure ?? "#"}
            download
            className="px-6 py-3 rounded-lg text-sm font-semibold border-2 border-white/25 text-white transition-colors hover:border-white/50 flex items-center justify-center gap-2 w-full sm:w-auto"
          >
            <Download className="w-4 h-4" />
            View Brochure
          </a>
        </div>
        </FadeIn>
      </div>
    </div>
  );
}
