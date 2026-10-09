import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Building2 } from "lucide-react";
import type { PartnerBuilder } from "@/lib/data/builders";

interface BuilderCardProps {
  builder: PartnerBuilder;
  /** Alternates a very subtle logo-tile tint so the six cards aren't visually identical. */
  accent: "navy" | "gold";
}

export default function BuilderCard({ builder, accent }: BuilderCardProps) {
  const { name, logo, image, tagline, description, yearsExperience, projectsCount } = builder;

  return (
    <article className="group h-full bg-white rounded-xl p-6 border border-black/[0.06] shadow-[0_1px_4px_rgba(0,0,0,0.04)] transition-all duration-500 hover:shadow-[0_16px_36px_rgba(0,0,0,0.10)] hover:-translate-y-1 flex flex-col">
      {/* Builder image + name */}
      <div className="flex items-start gap-3.5 mb-4">
        <div className="relative w-20 h-14 rounded-lg overflow-hidden flex-shrink-0 border border-black/[0.06] bg-surface">
          <Image
            src={image}
            alt={`${name} builder`}
            fill
            sizes="80px"
            className="object-cover transition-transform duration-500 group-hover:scale-110"
          />
          {logo ? (
            <div className="absolute left-1 top-1 w-7 h-7 rounded bg-white/95 flex items-center justify-center">
              <Image src={logo} alt={`${name} logo`} width={22} height={22} className="object-contain w-5 h-5" />
            </div>
          ) : null}
        </div>
        <div className="pt-0.5">
          <h3 className="font-serif font-bold text-lg leading-snug text-navy">
            {name}
          </h3>
          <p className="text-[10px] font-bold tracking-[0.14em] uppercase text-gold mt-0.5">
            {tagline}
          </p>
        </div>
      </div>

      {/* Description */}
      <p className="text-sm text-gray-500 leading-relaxed mb-6">{description}</p>

      {/* Stats — pinned above the CTA regardless of description length. */}
      <div className="mt-auto flex items-center gap-6 pt-5 border-t border-black/[0.06]">
        <div>
          <p className="text-lg font-bold text-gold leading-none">
            {yearsExperience} Years
          </p>
          <p className="text-[9px] uppercase tracking-wide text-gray-400 mt-1">
            Experience
          </p>
        </div>
        <div>
          <p className="text-lg font-bold text-gold leading-none">
            {projectsCount} Projects
          </p>
          <p className="text-[9px] uppercase tracking-wide text-gray-400 mt-1">
            Projects
          </p>
        </div>
      </div>

      {/* CTA — separate full-width bottom section, matching the
          Locality card's "View Locality Details" placement below its
          own stats row, rather than sitting inline beside the stats. */}
      <Link
        href={`/builders/${builder.slug}`}
        scroll={false}
        className="mt-4 pt-4 border-t border-black/[0.06] inline-flex items-center gap-1 text-sm font-semibold text-navy group"
      >
        View Projects
        <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
      </Link>
    </article>
  );
}
