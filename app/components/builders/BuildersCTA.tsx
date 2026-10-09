import Link from "next/link";
import { MessageCircle, Phone } from "lucide-react";
import { BRAND } from "@/lib/constants";

export default function BuildersCTA() {
  return (
    <section className="py-12 lg:py-16 relative overflow-hidden bg-dark">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg, transparent, transparent 79px, rgba(255,255,255,0.018) 79px, rgba(255,255,255,0.018) 80px)",
        }}
      />

      <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-5 lg:px-8 text-center">
        <h2 className="font-serif text-2xl md:text-3xl text-white font-bold leading-tight mb-4">
          Looking for the Right Builder?
        </h2>
        <p className="text-white/45 leading-relaxed mb-8 max-w-xl mx-auto">
          Tell us what you&apos;re looking for and we&apos;ll help you explore
          the best options.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/contact"
            className="px-7 py-3.5 rounded-lg text-sm font-semibold text-white transition-opacity hover:opacity-90 w-full sm:w-auto text-center flex items-center justify-center gap-2 bg-gold"
          >
            <Phone className="w-4 h-4" />
            Get a Callback
          </Link>
          <a
            href={BRAND.whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            className="px-7 py-3.5 rounded-lg text-sm font-semibold border-2 border-white/20 text-white transition-colors hover:border-white/45 w-full sm:w-auto text-center flex items-center justify-center gap-2"
          >
            <MessageCircle className="w-4 h-4" />
            WhatsApp Us
          </a>
        </div>
      </div>
    </section>
  );
}
