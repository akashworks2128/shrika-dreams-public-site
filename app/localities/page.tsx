import type { Metadata } from "next";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import FloatingWhatsApp from "@/components/layout/FloatingWhatsApp";
import { getLocalitiesFromSupabase } from "@/lib/data/localitiesSupabase";
import { LOCALITIES } from "@/lib/data/localities";
import LocalitiesHero from "@/components/localities/LocalitiesHero";
import LocalityGrid from "@/components/localities/LocalityGrid";
import LocalitiesCTA from "@/components/localities/LocalitiesCTA";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Explore Bangalore Localities | Shrika Dreams Real Estate Consultant",
  description:
    "Compare price trends, popular BHK configurations, and project options across Bangalore's premier residential corridors — Whitefield, Sarjapur Road, Hebbal, Electronic City, Yelahanka, and Devanahalli.",
};

interface PageProps {
  searchParams: Promise<{ q?: string }>;
}

export default async function LocalitiesPage({ searchParams }: PageProps) {
  const { q } = await searchParams;
  const query = q?.trim().toLowerCase();

  let localities = LOCALITIES;
  try {
    localities = await getLocalitiesFromSupabase();
  } catch (error) {
    console.error("Failed to load public localities from Supabase:", error);
  }
  const filteredLocalities = query
    ? localities.filter((locality) =>
        locality.name.toLowerCase().includes(query),
      )
    : localities;

  return (
    <div className="min-h-screen bg-offwhite">
      <Header variant="solid" />
      <main>
        <LocalitiesHero />
        <LocalityGrid localities={filteredLocalities} />
        <LocalitiesCTA />
      </main>
      <Footer />
      <FloatingWhatsApp />
    </div>
  );
}
