import type { Metadata } from "next";
import { notFound } from "next/navigation";

import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import FloatingWhatsApp from "@/components/layout/FloatingWhatsApp";

import { getProjectBySlugFromSupabase } from "@/lib/data/projectsSupabase";

import ProjectDetailHero from "@/components/project-detail/ProjectDetailHero";
import ProjectOverview from "@/components/project-detail/ProjectOverview";
import ProjectHighlights from "@/components/project-detail/ProjectHighlights";
import ProjectConfigurations from "@/components/project-detail/ProjectConfigurations";
import ProjectAmenities from "@/components/project-detail/ProjectAmenities";
import ProjectGallery from "@/components/project-detail/ProjectGallery";
import ProjectLocation from "@/components/project-detail/ProjectLocation";
import EmiCalculator from "@/components/project-detail/EmiCalculator";
import ProjectBrochureCTA from "@/components/project-detail/ProjectBrochureCTA";
import SimilarProjects from "@/components/project-detail/SimilarProjects";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;

  const project = await getProjectBySlugFromSupabase(slug);

  if (!project) {
    return {
      title: "Project Not Found | Shrika Dreams",
    };
  }

  return {
    title: `${project.name} by ${project.builder} | Shrika Dreams Real Estate Consultant`,
    description:
      project.description ??
      `${project.name} — ${project.bhk} homes in ${project.locality}, Bangalore. Starting at ${project.price}.`,
  };
}

export default async function ProjectDetailPage({ params }: PageProps) {
  const { slug } = await params;

  const project = await getProjectBySlugFromSupabase(slug);

  if (!project) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-offwhite">
      <Header variant="solid" />

      <main>
        <ProjectDetailHero project={project} />
        <ProjectOverview project={project} />
        <ProjectHighlights project={project} />
        <ProjectConfigurations project={project} />
        <ProjectAmenities project={project} />
        <ProjectGallery project={project} />
        <ProjectLocation project={project} />
        <EmiCalculator defaultLoanLakh={project.priceMinLakh} />
        <ProjectBrochureCTA project={project} />
        <SimilarProjects project={project} />
      </main>

      <Footer />
      <FloatingWhatsApp />
    </div>
  );
}
