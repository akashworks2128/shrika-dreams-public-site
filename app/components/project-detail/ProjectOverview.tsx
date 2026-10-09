import { Building2, Calendar, Home, LayoutGrid, MapPin, Ruler, Users, type LucideIcon } from "lucide-react";
import type { Project } from "@/lib/data/projects";
import FadeIn from "@/components/motion/FadeIn";
import SectionEyebrow from "@/components/ui/SectionEyebrow";

export default function ProjectOverview({ project }: { project: Project }) {
  const isPlot = project.propertyType === "Plot";

  // All overview facts as a single flat list. Previously this was split
  // into a rigid 5-column "core" row plus a separate 5-column "extras"
  // row — when a project only had 1–2 extras, that second row left 3–4
  // empty grid columns of blank space on the right. Now every fact
  // flows into one responsive grid sized to however many cards actually
  // exist, so the available width is always used.
  const facts = [
    { icon: Building2, label: "Developer", value: project.builder },
    { icon: MapPin, label: "Location", value: `${project.locality}, Bangalore` },
    { icon: Home, label: "Property Type", value: project.propertyType },
    {
      icon: isPlot ? Ruler : LayoutGrid,
      label: isPlot ? "Plot Sizes" : "BHK Options",
      value: project.bhk,
    },
    ...(isPlot
      ? [{ icon: Calendar, label: "Availability", value: project.possession ?? project.status }]
      : [{ icon: Calendar, label: "Possession", value: project.possession ?? project.status }]),
    ...(project.totalUnits
      ? [{ icon: Users, label: "Total Units", value: `${project.totalUnits} Units` }]
      : []),
    ...(project.projectSize
      ? [{ icon: Ruler, label: "Project Size", value: project.projectSize }]
      : []),
  ];

  return (
    <section className="py-8 lg:py-10 bg-white border-t border-black/[0.05]">
      <div className="max-w-7xl mx-auto px-4 sm:px-5 lg:px-8">
        <FadeIn className="mb-6 lg:mb-8">
          <SectionEyebrow className="mb-2.5">
            Project Overview
          </SectionEyebrow>
          <h2 className="font-serif text-2xl md:text-3xl lg:text-[2.25rem] font-bold text-navy mb-4">
            About {project.name}
          </h2>
          <p className="text-gray-500 leading-relaxed max-w-none">
            {project.description ??
              (isPlot
                ? `${project.name} by ${project.builder} offers residential plots in ${project.locality}, Bangalore, with a starting price of ${project.price}.`
                : `${project.name} by ${project.builder} offers ${project.bhk} homes in ${project.locality}, Bangalore, with a starting price of ${project.price}.`)}
          </p>
        </FadeIn>

        {/* Overview fact cards — one responsive grid using every fact
            available for this project, so the row always fills the
            content width instead of leaving empty columns.
            Mobile: 1 column, stacked.
            Tablet (sm/md): 2 then 3 columns, reflows naturally.
            Small desktop (lg+): 4 columns.
            Large desktop (xl+): 5 columns when there are enough cards
            to fill them (grid collapses back down otherwise, so a
            4-card apartment overview and a 7-card plot overview both
            fill their row instead of leaving blank space). */}
        <FadeIn
          delay={0.1}
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 items-stretch gap-3 lg:gap-4"
        >
          {facts.map((fact, index) => (
            <OverviewCard key={`${fact.label}-${index}`} {...fact} />
          ))}
        </FadeIn>
      </div>
    </section>
  );
}

function OverviewCard({
  icon: Icon,
  label,
  value,
}: {
  icon: LucideIcon;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-start gap-3 p-3.5 lg:flex-col lg:items-start lg:gap-2.5 lg:p-4 rounded-lg bg-offwhite border border-black/[0.06] h-full transition-all duration-300 hover:-translate-y-0.5 hover:border-gold/25 hover:shadow-[0_8px_24px_rgba(0,0,0,0.06)]">
      <div className="w-8 h-8 rounded-md flex items-center justify-center flex-shrink-0 bg-navy/[0.06]">
        <Icon className="w-4 h-4 text-navy" />
      </div>
      <div className="min-w-0">
        <p className="text-[9px] font-bold uppercase tracking-wide text-gray-400 mb-0.5">
          {label}
        </p>
        <p className="text-sm font-semibold text-navy lg:whitespace-normal lg:break-words truncate">
          {value}
        </p>
      </div>
    </div>
  );
}
