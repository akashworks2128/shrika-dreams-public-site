import type { Metadata } from "next";
import { Suspense } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import FloatingWhatsApp from "@/components/layout/FloatingWhatsApp";
import ProjectsHero from "@/components/projects/ProjectsHero";
import ProjectsExplorer from "@/components/projects/ProjectsExplorer";
import ProjectsCTA from "@/components/projects/ProjectsCTA";

export const metadata: Metadata = {
  title: "Projects | Shrika Dreams Real Estate Consultant",
  description:
    "Browse verified residential projects across Bangalore from Prestige, Sattva, Century, Brigade, and Godrej. Filter by locality, budget, BHK, and possession status.",
};

export default function ProjectsPage() {
  return (
    <div className="min-h-screen bg-offwhite">
      <Header variant="solid" />
      <main>
        <ProjectsHero />
        <Suspense fallback={null}>
          <ProjectsExplorer />
        </Suspense>
        <ProjectsCTA />
      </main>
      <Footer />
      <FloatingWhatsApp />
    </div>
  );
}
