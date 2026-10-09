import type { Metadata } from "next";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import FloatingWhatsApp from "@/components/layout/FloatingWhatsApp";
import BuildersHero from "@/components/builders/BuildersHero";
import BuilderGrid from "@/components/builders/BuilderGrid";
import BuilderTrustSection from "@/components/builders/BuilderTrustSection";
import BuildersCTA from "@/components/builders/BuildersCTA";
import { getBuildersFromSupabase } from "@/lib/data/buildersSupabase";
import { PARTNER_BUILDERS } from "@/lib/data/builders";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Builder Partners | Shrika Dreams Real Estate Consultant",
  description:
    "Explore Bangalore's most trusted real estate developers we partner with — Prestige, Sattva, Brigade, Godrej, Century, and Sobha.",
};

export default async function BuildersPage() {
  let builders = PARTNER_BUILDERS;
  try {
    builders = await getBuildersFromSupabase();
  } catch (error) {
    console.error("Failed to load public builders from Supabase:", error);
  }

  return (
    <div className="min-h-screen bg-offwhite">
      <Header variant="solid" />
      <main>
        <BuildersHero />
        <BuilderGrid builders={builders} />
        <BuilderTrustSection />
        <BuildersCTA />
      </main>
      <Footer />
      <FloatingWhatsApp />
    </div>
  );
}
