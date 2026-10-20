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
    <section id="contact" className="py-12 lg:py-16 bg-offwhite overflow-x-clip">
      <div className="max-w-7xl mx-auto px-4 sm:px-5 lg:px-8">
        {/* min-w-0 on both columns lets long text (email/address) wrap instead of
            stretching the grid track past the viewport. */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start">
          <FadeIn className="min-w-0">
            <SectionEyebrow className="mb-3">Get In Touch</SectionEyebrow>
            <h2 className="font-serif text-3xl md:text-4xl font-bold mb-5 text-navy break-words">
              Request a Callback
            </h2>
            <p className="text-gray-500 leading-relaxed mb-8 lg:mb-10 max-w-xl">
              Leave your details and we&apos;ll call you back within 2 hours on
              working days. No spam, no pressure — just an honest conversation
              about your property requirement.
            </p>

            <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-x-6 gap-y-4 lg:gap-y-5">
              {CONTACT_METHODS.map(({ Icon, text, href }, index) => (
                <li key={`${text}-${index}`} className="min-w-0">
                  <a href={href} className="flex items-start gap-3.5 group min-w-0">
                    <span className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 bg-gold/10">
                      <Icon className="w-4 h-4 text-gold" />
                    </span>
                    {/* min-h-10 + self-center keeps single-line text vertically aligned
                        with the icon tile while multi-line text grows downward. */}
                    <span className="min-w-0 min-h-10 flex items-center text-sm leading-snug text-gray-600 group-hover:text-gray-900 transition-colors break-words [overflow-wrap:anywhere]">
                      {text}
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </FadeIn>

          <FadeIn
            delay={0.1}
            className="min-w-0 bg-white rounded-2xl p-5 sm:p-8 border border-black/[0.06] shadow-[0_4px_24px_rgba(0,0,0,0.06)]"
          >
            <LeadForm />
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
