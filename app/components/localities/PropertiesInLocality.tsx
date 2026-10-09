"use client";

import { useEffect, useMemo, useState } from "react";
import { PROJECTS, type Project } from "@/lib/data/projects";
import { getProjectsByLocalityIdFromSupabase } from "@/lib/data/projectsSupabase";
import { PROPERTY_TYPES, type PropertyTypeFilter } from "@/lib/data/filters";
import type { Locality } from "@/lib/data/localities";
import FadeIn from "@/components/motion/FadeIn";
import ProjectCard from "@/components/home/ProjectCard";
import SectionEyebrow from "@/components/ui/SectionEyebrow";

/**
 * "Properties in [Locality]" section for the Locality Detail page.
 *
 * Data flow (mirrors the future Supabase shape described in the brief):
 *   PROJECTS (central data) -> filter by locality.name -> filter by
 *   property type -> render with the existing ProjectCard.
 *
 * No locality-specific project lists are created here — everything is
 * derived from the single PROJECTS array at render time, so a new
 * project automatically shows up on its locality's page.
 */
export default function PropertiesInLocality({ locality }: { locality: Locality }) {
  const [propertyType, setPropertyType] = useState<PropertyTypeFilter>("All");
  const [projects, setProjects] = useState<Project[]>(() =>
    PROJECTS.filter((project) => project.locality === locality.name),
  );

  useEffect(() => {
    if (!locality.id) return;
    let cancelled = false;

    getProjectsByLocalityIdFromSupabase(locality.id)
      .then((rows) => {
        if (!cancelled) setProjects(rows);
      })
      .catch((error) => {
        console.error("Failed to load locality projects from Supabase:", error);
      });

    return () => {
      cancelled = true;
    };
  }, [locality.id]);

  const localityProjects = useMemo(() => projects, [projects]);

  const filteredProjects = useMemo(() => {
    if (propertyType === "All") return localityProjects;
    // Data uses the singular form ("Apartment" | "Plot"); the filter UI
    // uses the plural labels shared with the Projects listing page —
    // same mapping ProjectsExplorer uses, kept consistent rather than
    // introducing a second property-type vocabulary.
    const singular = propertyType === "Apartments" ? "Apartment" : "Plot";
    return localityProjects.filter((project) => project.propertyType === singular);
  }, [localityProjects, propertyType]);

  // Nothing to show for this locality at all yet — hide the section
  // entirely rather than show an empty shell (same convention as the
  // existing LocalityFeaturedProjects section).
  if (localityProjects.length === 0) return null;

  return (
    <section id="properties" className="py-8 lg:py-10 bg-offwhite border-t border-black/[0.05]">
      <div className="max-w-7xl mx-auto px-4 sm:px-5 lg:px-8">
        <FadeIn className="mb-6 lg:mb-8">
          <SectionEyebrow className="mb-2.5">
            Properties in {locality.name}
          </SectionEyebrow>
          <h2 className="font-serif text-2xl md:text-3xl lg:text-[2.25rem] font-bold text-navy mb-3">
            Find Your Home in {locality.name}
          </h2>
          <p className="text-gray-500 max-w-xl">
            Find your ideal home from projects available in {locality.name}.
          </p>
        </FadeIn>

        {/* Property type filter — same pill-tab styling as the Projects
            listing page's filter bar. */}
        <FadeIn delay={0.05} className="mb-6 lg:mb-8">
          <div
            role="tablist"
            aria-label="Property type"
            className="inline-flex items-center gap-1 bg-white rounded-lg p-1 border border-black/[0.06] max-w-full overflow-x-auto"
          >
            {PROPERTY_TYPES.map((type) => (
              <button
                key={type}
                type="button"
                role="tab"
                aria-selected={propertyType === type}
                onClick={() => setPropertyType(type)}
                className={`px-4 py-2 rounded-md text-sm font-semibold transition-colors whitespace-nowrap ${
                  propertyType === type
                    ? "bg-navy text-white"
                    : "text-gray-500 hover:text-navy"
                }`}
              >
                {type}
              </button>
            ))}
          </div>
        </FadeIn>

        {filteredProjects.length === 0 ? (
          <div className="py-10 text-center">
            <p className="text-gray-400 text-sm">
              {propertyType === "All"
                ? `No properties currently available in ${locality.name}.`
                : `No ${propertyType.toLowerCase()} currently available in ${locality.name}.`}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 items-stretch min-w-0">
            {filteredProjects.map((project, idx) => (
              <FadeIn key={project.id} delay={idx * 0.08} className="h-full">
                <ProjectCard project={project} />
              </FadeIn>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
