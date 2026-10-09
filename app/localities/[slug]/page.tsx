import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import FloatingWhatsApp from "@/components/layout/FloatingWhatsApp";
import { getLocalityBySlugFromSupabase } from "@/lib/data/localitiesSupabase";
import LocalityHero from "@/components/localities/LocalityHero";
import LocalityAbout from "@/components/localities/LocalityAbout";
import LocalityConnectivity from "@/components/localities/LocalityConnectivity";
import LocalityPriceTrends from "@/components/localities/LocalityPriceTrends";
import PropertiesInLocality from "@/components/localities/PropertiesInLocality";
import LocalityWhyBuy from "@/components/localities/LocalityWhyBuy";
import LocalityCTA from "@/components/localities/LocalityCTA";

export const dynamic = "force-dynamic";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const locality = await getLocalityBySlugFromSupabase(slug);
  if (!locality) return { title: "Locality Not Found" };

  return {
    title: `${locality.name}, ${locality.city} — Real Estate Guide | Shrika Dreams`,
    description: locality.description,
  };
}

export default async function LocalityPage({ params }: PageProps) {
  const { slug } = await params;
  const locality = await getLocalityBySlugFromSupabase(slug);

  if (!locality) notFound();

  return (
    <div className="min-h-screen bg-offwhite">
      <Header variant="solid" />
      <main>
        <LocalityHero locality={locality} />
        <LocalityAbout locality={locality} />
        <LocalityConnectivity locality={locality} />
        <LocalityPriceTrends locality={locality} />
        <PropertiesInLocality locality={locality} />
        <LocalityWhyBuy locality={locality} />
        <LocalityCTA locality={locality} />
      </main>
      <Footer />
      <FloatingWhatsApp />
    </div>
  );
}
