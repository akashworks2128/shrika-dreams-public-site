"use client";

import { Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { BRAND } from "@/lib/constants";
import FadeIn from "@/components/motion/FadeIn";
import SectionEyebrow from "@/components/ui/SectionEyebrow";
import LeadForm from "@/components/home/LeadForm";

const CONTACT_METHODS = [
  { Icon: Phone, text: BRAND.phone, href: BRAND.phoneHref },
  { Icon: MessageCircle, text: "Chat on WhatsApp", href: BRAND.whatsappChatHref },
  { Icon: Mail, text: BRAND.email, href: `mailto:${BRAND.email}` },
  { Icon: MapPin, text: BRAND.address, href: "#" },
];

export default function ContactSection() {
  return (
    <section id="contact" className="py-12 lg:py-16 bg-offwhite">
      <div className="max-w-7xl mx-auto px-4 sm:px-5 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          <FadeIn>
            <SectionEyebrow className="mb-3">Get In Touch</SectionEyebrow>
            <h2 className="font-serif text-3xl md:text-4xl font-bold mb-5 text-navy">
              Request a Callback
            </h2>
            <p className="text-gray-500 leading-relaxed mb-10">
              Leave your details and we&apos;ll call you back within 2 hours on
              working days. No spam, no pressure — just an honest conversation
              about your property requirement.
            </p>

            <div className="space-y-5">
              {CONTACT_METHODS.map(({ Icon, text, href }, index) => (
                <a key={`${text}-${index}`} href={href} className="flex items-center gap-3.5 group">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 bg-gold/10">
                    <Icon className="w-4 h-4 text-gold" />
                  </div>
                  <span className="text-sm text-gray-600 group-hover:text-gray-900 transition-colors">
                    {text}
                  </span>
                </a>
              ))}
            </div>
          </FadeIn>

          <FadeIn
            delay={0.1}
            className="bg-white rounded-2xl p-8 border border-black/[0.06] shadow-[0_4px_24px_rgba(0,0,0,0.06)]"
          >
            <LeadForm />
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
