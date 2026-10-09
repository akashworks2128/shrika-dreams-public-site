/**
 * Builder / developer partner logos shown in the Home Page trust strip.
 * Shape mirrors a future `builders` table in Supabase so this
 * array can be swapped for a fetch without touching the section.
 */
export interface Builder {
  id: string;
  name: string;
  sub: string;
}

export const BUILDERS: Builder[] = [
  { id: "prestige", name: "Prestige", sub: "EST. 1986" },
  { id: "sattva", name: "Sattva", sub: "GROUP" },
  { id: "century", name: "Century", sub: "REAL ESTATE" },
  { id: "brigade", name: "Brigade", sub: "GROUP" },
  { id: "godrej", name: "Godrej", sub: "PROPERTIES" },
];

/**
 * Detailed builder partner profiles for the /builders page.
 * `logo` is left empty for now since real brand logo assets have not
 * been supplied yet — BuilderCard falls back to a neutral icon placeholder
 * rather than fabricating a letter-based logo. Once real assets exist,
 * just set `logo` to their path (e.g. "/images/builders/prestige.png")
 * and BuilderCard will render them automatically.
 *
 * These are placeholder values for development/design and should be
 * replaced with verified client-provided information before launch.
 */
export interface PartnerBuilder {
  id: string;
  slug: string;
  name: string;
  logo: string;
  image: string;
  tagline: string;
  description: string;
  yearsExperience: string;
  projectsCount: string;
}

export const PARTNER_BUILDERS: PartnerBuilder[] = [
  {
    id: "prestige-group",
    slug: "prestige-group",
    name: "Prestige Group",
    logo: "",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=900&h=650&fit=crop&auto=format",
    tagline: "Premium Partner",
    description:
      "One of Bangalore's leading real estate developers, known for premium residential communities and large-scale developments.",
    yearsExperience: "30+",
    projectsCount: "12+",
  },
  {
    id: "sattva-group",
    slug: "sattva-group",
    name: "Sattva Group",
    logo: "",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=900&h=650&fit=crop&auto=format",
    tagline: "Premium Partner",
    description:
      "A trusted name in Bangalore real estate, delivering quality residential and commercial spaces for over two decades.",
    yearsExperience: "25+",
    projectsCount: "8+",
  },
  {
    id: "brigade-group",
    slug: "brigade-group",
    name: "Brigade Group",
    logo: "",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=900&h=650&fit=crop&auto=format",
    tagline: "Premium Partner",
    description:
      "One of India's leading property developers with a strong legacy of quality construction and timely delivery.",
    yearsExperience: "35+",
    projectsCount: "10+",
  },
  {
    id: "godrej-properties",
    slug: "godrej-properties",
    name: "Godrej Properties",
    logo: "",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=900&h=650&fit=crop&auto=format",
    tagline: "Premium Partner",
    description:
      "Backed by the Godrej legacy, delivering innovative and sustainable residential developments across Bangalore.",
    yearsExperience: "30+",
    projectsCount: "6+",
  },
  {
    id: "century-real-estate",
    slug: "century-real-estate",
    name: "Century Real Estate",
    logo: "",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=900&h=650&fit=crop&auto=format",
    tagline: "Premium Partner",
    description:
      "One of Bangalore's oldest and most experienced developers, known for landmark residential projects.",
    yearsExperience: "45+",
    projectsCount: "5+",
  },
  {
    id: "sobha-limited",
    slug: "sobha-limited",
    name: "Sobha Limited",
    logo: "",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=900&h=650&fit=crop&auto=format",
    tagline: "Premium Partner",
    description:
      "Renowned for superior quality construction and attention to detail in every residential project.",
    yearsExperience: "40+",
    projectsCount: "7+",
  },
];
