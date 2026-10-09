import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import FloatingWhatsApp from "@/components/layout/FloatingWhatsApp";
import HeroSection from "@/components/home/HeroSection";
import BuilderPartnersSection from "@/components/home/BuilderPartnersSection";
import FeaturedProjectsSection from "@/components/home/FeaturedProjectsSection";
import TrustSection from "@/components/home/TrustSection";
import TestimonialsSection from "@/components/home/TestimonialsSection";
import CTASection from "@/components/home/CTASection";
import OfficeLocationSection from "@/components/home/OfficeLocationSection";

export default function Home() {
  return (
    <div className="min-h-screen bg-offwhite">
      <Header />
      <main>
        <HeroSection />
        <BuilderPartnersSection />
        <FeaturedProjectsSection />
        <TrustSection />
        <TestimonialsSection />
        <CTASection />
        <OfficeLocationSection />
      </main>
      <Footer />
      <FloatingWhatsApp />
    </div>
  );
}
