import Link from "next/link";
import {
  Building2,
  ChevronRight,
  Facebook,
  Instagram,
  Linkedin,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  Youtube,
} from "lucide-react";
import { BRAND } from "@/lib/constants";

const SOCIAL_LINKS = [
  { Icon: Facebook, label: "Facebook" },
  { Icon: Instagram, label: "Instagram" },
  { Icon: Youtube, label: "YouTube" },
  { Icon: Linkedin, label: "LinkedIn" },
];

const QUICK_LINKS = [
  "Home",
  "Featured Projects",
  "Builder Partners",
  "About",
  "Contact",
];

const OUR_BUILDERS = [
  "Prestige Group",
  "Sattva Group",
  "Century Real Estate",
  "Brigade Group",
  "Godrej Properties",
];

const CONTACT_ITEMS = [
  { Icon: Phone, text: BRAND.phone, href: BRAND.phoneHref },
  {
    Icon: MessageCircle,
    text: "Chat on WhatsApp",
    href: BRAND.whatsappChatHref,
  },
  { Icon: Mail, text: BRAND.email, href: `mailto:${BRAND.email}` },
  { Icon: MapPin, text: "Koramangala, Bangalore 560034", href: "#" },
];

export default function Footer() {
  return (
    <footer className="pt-16 pb-8 bg-dark">
      <div className="max-w-7xl mx-auto px-4 sm:px-5 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link href="#hero" className="flex items-center gap-3 mb-5">
              <div className="w-9 h-9 rounded flex items-center justify-center flex-shrink-0 bg-gold">
                <Building2 className="w-5 h-5 text-white" />
              </div>
              <div>
                <div className="font-serif text-base font-bold text-white leading-tight">
                  {BRAND.name}
                </div>
                <div className="text-[9px] tracking-[0.18em] uppercase text-white/35">
                  {BRAND.title}
                </div>
              </div>
            </Link>
            <p className="text-sm leading-relaxed mb-6 text-white/[0.38]">
              Independent real estate consultant helping Bangalore home buyers
              find verified properties from Prestige, Sattva, Century, Brigade,
              and Godrej since 2013.
            </p>
            <div className="flex gap-2.5">
              {SOCIAL_LINKS.map(({ Icon, label }) => (
                <a
                  key={label}
                  href="#"
                  aria-label={label}
                  className="w-8 h-8 rounded-lg flex items-center justify-center bg-white/[0.055] hover:bg-gold/20 transition-colors"
                >
                  <Icon className="w-3.5 h-3.5 text-white/50" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-serif text-white text-sm font-semibold mb-5 tracking-wide">
              Quick Links
            </h4>
            <ul className="space-y-3">
              {QUICK_LINKS.map((link, index) => (
                <li key={`${link}-${index}`}>
                  <a
                    href="#"
                    className="text-sm transition-colors flex items-center gap-1.5 group text-white/[0.38] hover:text-white/80"
                  >
                    <ChevronRight className="w-3 h-3 opacity-0 group-hover:opacity-100 -ml-1 transition-opacity" />
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Our Builders */}
          <div>
            <h4 className="font-serif text-white text-sm font-semibold mb-5 tracking-wide">
              Our Builders
            </h4>
            <ul className="space-y-3">
              {OUR_BUILDERS.map((builder, index) => (
                <li key={`${builder}-${index}`}>
                  <a
                    href="#"
                    className="text-sm transition-colors text-white/[0.38] hover:text-white/80"
                  >
                    {builder}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-serif text-white text-sm font-semibold mb-5 tracking-wide">
              Contact
            </h4>
            <ul className="space-y-4">
              {CONTACT_ITEMS.map(({ Icon, text, href }, index) => (
                <li key={`${text}-${index}`}>
                  <a
                    href={href}
                    className="flex items-start gap-2.5 text-sm transition-colors text-white/[0.38] hover:text-white/75"
                  >
                    <Icon className="w-3.5 h-3.5 flex-shrink-0 mt-0.5" />
                    {text}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* RERA disclaimer */}
        <div className="rounded-xl p-5 mb-8 text-xs leading-relaxed bg-white/[0.025] border border-white/[0.055] text-white/[0.28]">
          <span className="text-white/45 font-semibold">RERA Disclaimer:</span>{" "}
          Shrika Dreams Real Estate Consultancy is a RERA registered channel
          partner (Reg. No.: {BRAND.reraNumber}). All project information on
          this website is for general informational purposes only. Prices,
          availability, and specifications are subject to change without notice.
          Buyers are advised to verify all details independently with the
          respective developers before making any purchase decision. This
          website does not constitute an offer or solicitation for any property
          transaction.
        </div>

        {/* Copyright bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-3 pt-6 border-t border-white/5">
          <p className="text-xs text-white/[0.22]">
            © {new Date().getFullYear()} Shrika Dreams Real Estate Consultancy.
            All rights reserved.
          </p>
          <p className="text-xs text-white/[0.22]">
            Serving Bangalore home buyers with honesty and care.
          </p>
        </div>
      </div>
    </footer>
  );
}
