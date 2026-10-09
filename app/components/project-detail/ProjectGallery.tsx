import Image from "next/image";
import type { Project } from "@/lib/data/projects";
import FadeIn from "@/components/motion/FadeIn";
import SectionEyebrow from "@/components/ui/SectionEyebrow";

export default function ProjectGallery({ project }: { project: Project }) {
  const primary = project.heroImage ?? project.image;
  const supporting = project.gallery ?? [];

  if (supporting.length === 0) return null;

  return (
    <section className="py-8 lg:py-10 bg-white border-t border-black/[0.05]">
      <div className="max-w-7xl mx-auto px-4 sm:px-5 lg:px-8">
        <FadeIn className="mb-6 lg:mb-8">
          <SectionEyebrow className="mb-2.5">
            Gallery
          </SectionEyebrow>
          <h2 className="font-serif text-2xl md:text-3xl lg:text-[2.25rem] font-bold text-navy">
            Project Gallery
          </h2>
        </FadeIn>

        <FadeIn delay={0.1} className="grid grid-cols-1 lg:grid-cols-2 gap-3 min-w-0">
          {/* Large primary image */}
          <div className="group relative aspect-[4/3] lg:aspect-auto lg:h-full min-h-[260px] rounded-xl overflow-hidden">
            <Image
              src={primary}
              alt={`${project.name} main view`}
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            />
          </div>

          {/* Supporting images grid */}
          <div className="grid grid-cols-2 gap-3 min-w-0">
            {supporting.slice(0, 4).map((src, idx) => (
              <div
                key={`${src}-${idx}`}
                className="group relative aspect-[4/3] rounded-xl overflow-hidden"
              >
                <Image
                  src={src}
                  alt={`${project.name} view ${idx + 1}`}
                  fill
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 25vw, 25vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
              </div>
            ))}
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
