import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Building2, ExternalLink } from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import FloatingWhatsApp from "@/components/layout/FloatingWhatsApp";
import FadeIn from "@/components/motion/FadeIn";
import SectionEyebrow from "@/components/ui/SectionEyebrow";
import ProjectCard from "@/components/home/ProjectCard";
import { getBuilderBySlugFromSupabase } from "@/lib/data/buildersSupabase";
import { getProjectsByBuilderIdFromSupabase } from "@/lib/data/projectsSupabase";

const DEFAULT_BUILDER_IMAGE =
  "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1600&h=1000&fit=crop&auto=format";

export const dynamic = "force-dynamic";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const builder = await getBuilderBySlugFromSupabase(slug);
  if (!builder) return { title: "Builder Not Found" };

  return {
    title: `${builder.name} | Shrika Dreams Real Estate Consultant`,
    description: builder.short_description || builder.about || undefined,
  };
}

export default async function BuilderPage({ params }: PageProps) {
  const { slug } = await params;
  const builder = await getBuilderBySlugFromSupabase(slug);
  if (!builder) notFound();

  const projects = await getProjectsByBuilderIdFromSupabase(builder.id);

  return (
    <div className="min-h-screen bg-offwhite">
      <Header variant="solid" />
      <main>
        <section className="relative min-h-[594px] overflow-hidden bg-[#0B1525] pt-28 pb-12 lg:pt-32 lg:pb-14 flex items-start">
          {/* Builder image as the full hero background, matching the Project/Locality detail pattern. */}
          <div className="absolute inset-0 overflow-hidden bg-[#0B1525]">
            <Image
              src={builder.image_url || DEFAULT_BUILDER_IMAGE}
              alt={`${builder.name} residential development`}
              fill
              priority
              sizes="100vw"
              className="object-cover opacity-[0.84] hero-image-zoom"
            />
            <div className="absolute inset-0 bg-[#0B1525]/28" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#0B1525]/68 via-[#0B1525]/28 to-[#0B1525]/8" />
          </div>

          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-5 lg:px-8 w-full">
            <FadeIn>
              <Link
                href="/builders"
                className="inline-flex items-center gap-1.5 text-sm text-white/50 hover:text-white transition-colors mb-7"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                Builders
              </Link>
            </FadeIn>

            <div className="max-w-3xl">
              <FadeIn delay={0.06}>
                <SectionEyebrow className="mb-3">Builder Partner</SectionEyebrow>

                {/* Builder logo sits directly above the builder title, matching the client-approved detail-page pattern. */}
                {builder.logo_url ? (
                  <FadeIn delay={0.1}>
                    <div className="mb-5 w-32 h-32 md:w-36 md:h-36 rounded-xl bg-white flex items-center justify-center border border-white/15 shadow-sm">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={builder.logo_url}
                        alt={`${builder.name} logo`}
                        className="object-contain w-[6.75rem] h-[6.75rem] md:w-28 md:h-28"
                      />
                    </div>
                  </FadeIn>
                ) : null}

                <h1 className="font-serif text-3xl md:text-4xl lg:text-[3.25rem] font-bold text-white leading-tight mb-4">
                  {builder.name}
                </h1>
                <p className="text-white/60 leading-relaxed max-w-2xl">
                  {builder.short_description ||
                    builder.about ||
                    "Explore residential projects from this builder."}
                </p>
              </FadeIn>
            </div>
          </div>
        </section>
        {builder.about ? (
          <section className="py-8 lg:py-10 bg-offwhite">
            <div className="max-w-7xl mx-auto px-4 sm:px-5 lg:px-8">
              <FadeIn className="max-w-3xl">
                <SectionEyebrow className="mb-2.5">About the Builder</SectionEyebrow>
                <h2 className="font-serif text-2xl md:text-3xl font-bold text-navy mb-4">About {builder.name}</h2>
                <p className="text-gray-500 leading-relaxed">{builder.about}</p>
                {builder.website_url ? (
                  <a href={builder.website_url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 mt-5 text-sm font-semibold text-navy hover:text-gold transition-colors">
                    Visit website <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                ) : null}
              </FadeIn>
            </div>
          </section>
        ) : null}

        <section className="py-8 lg:py-10 bg-white border-t border-black/[0.05]">
          <div className="max-w-7xl mx-auto px-4 sm:px-5 lg:px-8">
            <FadeIn className="mb-6 lg:mb-8">
              <SectionEyebrow className="mb-2.5">Projects</SectionEyebrow>
              <h2 className="font-serif text-2xl md:text-3xl font-bold text-navy">Projects by {builder.name}</h2>
            </FadeIn>

            {projects.length ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 items-stretch min-w-0">
                {projects.map((project, idx) => (
                  <FadeIn key={project.id} delay={idx * 0.06} className="h-full">
                    <ProjectCard project={project} />
                  </FadeIn>
                ))}
              </div>
            ) : (
              <p className="text-sm text-gray-400">No published projects are currently available for this builder.</p>
            )}

            <Link href={`/projects?builder=${encodeURIComponent(builder.name)}`} scroll={false} className="mt-7 inline-flex items-center gap-1 text-sm font-semibold text-navy">
              View all projects <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </section>
      </main>
      <Footer />
      <FloatingWhatsApp />
    </div>
  );
}
