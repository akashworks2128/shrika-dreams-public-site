import type { Metadata } from "next";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import FloatingWhatsApp from "@/components/layout/FloatingWhatsApp";
import ContactSection from "@/components/contact/ContactSection";

export const metadata: Metadata = {
  title: "Contact Us | Shrika Dreams Real Estate Consultant",
  description:
    "Request a callback from Shrika Dreams. Share your property requirement and we'll call you back within 2 hours on working days.",
};

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-offwhite">
      <Header variant="solid" />
      {/* Offset for the fixed header (h-16 / lg:h-20) — there is no hero on this page. */}
      <main className="pt-16 lg:pt-20">
        <ContactSection />
      </main>
      <Footer />
      <FloatingWhatsApp />
    </div>
  );
}
