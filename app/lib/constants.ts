/**
 * Site-wide constants: brand info and navigation.
 * Kept separate from mock data so it's easy to find/update independently
 * of anything that will eventually be Supabase-backed.
 */

export const BRAND = {
  name: "Shrika Dreams",
  title: "Real Estate Consultant",
  phone: "+91 98765 43210",
  phoneHref: "tel:+919876543210",
  whatsappHref:
    "https://wa.me/919876543210?text=Hi%2C%20I%27m%20looking%20for%20a%20property%20in%20Bangalore.%20Can%20you%20help%3F",
  whatsappChatHref: "https://wa.me/919876543210",
  email: "rajesh@bangalorehomes.in",
  address: "Koramangala, Bangalore \u2014 560034",
  reraNumber: "PRM/KA/RERA/1251/446/AG/180510/003456",
};

export const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "Localities", href: "/localities" },
  { label: "Projects", href: "/#projects" },
  { label: "Builders", href: "/builders" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
  { label: "Blog", href: "/blog" },
] as const;
