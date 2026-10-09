import type { Metadata } from "next";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import FloatingWhatsApp from "@/components/layout/FloatingWhatsApp";
import AboutHero from "@/components/about/AboutHero";
import OurStory from "@/components/about/OurStory";
import TrustSection from "@/components/about/TrustSection";
import ProcessSection from "@/components/about/ProcessSection";
import TrustedBuilderPartnerships from "@/components/about/TrustedBuilderPartnerships";
import AboutCTA from "@/components/about/AboutCTA";

export const metadata: Metadata = {
  title: "About Us | Shrika Dreams Real Estate Consultant",
  description:
    "Your trusted real estate partner in Bangalore — honest guidance, local expertise, and a personalized approach to finding the right home.",
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-offwhite">
      <Header variant="solid" />
      <main>
        <AboutHero />
        <OurStory />
        <TrustSection />
        <ProcessSection />
        <TrustedBuilderPartnerships />
        <AboutCTA />
      </main>
      <Footer />
      <FloatingWhatsApp />
    </div>
  );
}
