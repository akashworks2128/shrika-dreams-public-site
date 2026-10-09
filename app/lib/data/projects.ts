/**
 * Featured / listed project data.
 * Mirrors the shape a future `projects` table in Supabase would have,
 * so this can later be replaced with a server-side fetch with no
 * changes needed in the components that consume it.
 */
export interface ProjectAmenity {
  icon:
    | "clubhouse"
    | "pool"
    | "gym"
    | "garden"
    | "security"
    | "parking"
    | "playground"
    | "sports"
    | "power"
    | "lift"
    | "walking"
    | "hall";
  label: string;
}

export interface ProjectHighlight {
  icon: "location" | "clubhouse" | "pool" | "gym" | "garden" | "security";
  title: string;
  description: string;
}

export interface ProjectConfiguration {
  /** Supabase configuration row ID, when available. */
  id?: string;
  bhk: string;
  areaSqft: string;
  priceLabel: string;
  availability: "Available" | "Limited Units" | "Sold Out";
}

export interface ProjectLandmark {
  label: string;
  distance: string;
}

export interface Project {
  id: string;
  /** Supabase relation IDs, available for CMS-backed projects. */
  builderId?: string;
  localityId?: string;
  /** URL-safe identifier used for the /projects/[slug] route. */
  slug: string;
  name: string;
  locality: string;
  builder: string;
  price: string;
  /** Numeric price bounds (in \u20b9 lakh) used for budget filtering/sorting. */
  priceMinLakh: number;
  priceMaxLakh: number;
  bhk: string;
  /** Numeric BHK configurations this project offers, used for filtering. */
  bhkValues: number[];
  image: string;
  status: "Ready to Move" | "Under Construction";
  propertyType: "Apartment" | "Plot";
  tag: string;
  tagDark: boolean;
  /** Shown on the Home Page's Featured Projects section. */
  featured: boolean;

  // --- Project Detail page fields. Optional so existing projects that
  // haven't been fleshed out yet keep working -- the detail page and
  // its sub-components fall back gracefully when these are missing.
  /** Longer marketing description for the Overview section. */
  description?: string;
  /** Hero background image -- falls back to `image` when not set. */
  heroImage?: string;
  /** Supporting gallery images (in addition to the hero image). */
  gallery?: string[];
  possession?: string;
  totalUnits?: number;
  /** e.g. "12 Acres". */
  projectSize?: string;
  highlights?: ProjectHighlight[];
  configurations?: ProjectConfiguration[];
  amenities?: ProjectAmenity[];
  nearbyLandmarks?: ProjectLandmark[];
  /** Free-text connectivity summary for the Location section. */
  connectivitySummary?: string;
  /** Mock/placeholder brochure link -- not a real gated download yet. */
  brochure?: string;
  /** Plot size, e.g. "1.5 Acres". Only set for propertyType: "Plot". */
  acres?: string;
}

export const PROJECTS: Project[] = [
  {
    id: "prestige-lakeside-habitat",
    slug: "prestige-lakeside-habitat",
    name: "Prestige Lakeside Habitat",
    locality: "Whitefield",
    builder: "Prestige Group",
    price: "\u20b985L \u2013 \u20b91.2Cr",
    priceMinLakh: 85,
    priceMaxLakh: 120,
    bhk: "2 & 3 BHK",
    bhkValues: [2, 3],
    image:
      "https://images.unsplash.com/photo-1745301558339-44eb3217d5da?w=600&h=420&fit=crop&auto=format",
    status: "Ready to Move",
    propertyType: "Apartment",
    tag: "Premium",
    tagDark: false,
    featured: true,

    description:
      "Prestige Lakeside Habitat is a large, ready-to-move gated community set beside a landscaped lake in the heart of Whitefield. Spread across a generously planted campus, the project pairs spacious 2 & 3 BHK homes with resort-style amenities and dependable everyday connectivity to ITPL, EPIP Zone, and the wider Whitefield IT corridor.",
    heroImage:
      "https://images.unsplash.com/photo-1745301558339-44eb3217d5da?w=1600&h=900&fit=crop&auto=format",
    gallery: [
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=900&h=650&fit=crop&auto=format",
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=700&h=500&fit=crop&auto=format",
      "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=700&h=500&fit=crop&auto=format",
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=700&h=500&fit=crop&auto=format",
      "https://images.unsplash.com/photo-1613977257363-707ba9348227?w=700&h=500&fit=crop&auto=format",
    ],
    possession: "Ready to Move \u2014 Dec 2024",
    totalUnits: 620,
    projectSize: "12.5 Acres",
    highlights: [
      {
        icon: "location",
        title: "Prime Location",
        description: "Minutes from ITPL and the Whitefield IT corridor, with easy access to ORR.",
      },
      {
        icon: "clubhouse",
        title: "Grand Clubhouse",
        description: "A 25,000 sq.ft. clubhouse with indoor games, a banquet hall, and a lounge.",
      },
      {
        icon: "pool",
        title: "Swimming Pool",
        description: "A temperature-controlled main pool plus a dedicated children's pool.",
      },
      {
        icon: "gym",
        title: "Modern Gym",
        description: "A fully equipped, air-conditioned fitness center overlooking the lake.",
      },
      {
        icon: "garden",
        title: "Landscaped Gardens",
        description: "Over 3 acres of central green space with jogging and cycling trails.",
      },
      {
        icon: "security",
        title: "24x7 Security",
        description: "Multi-tier security with CCTV surveillance and video door phones.",
      },
    ],
    configurations: [
      { bhk: "2 BHK", areaSqft: "1,180 \u2013 1,240 sq.ft.", priceLabel: "\u20b985L onwards", availability: "Available" },
      { bhk: "2 BHK + Study", areaSqft: "1,320 sq.ft.", priceLabel: "\u20b995L onwards", availability: "Limited Units" },
      { bhk: "3 BHK", areaSqft: "1,580 \u2013 1,650 sq.ft.", priceLabel: "\u20b91.05Cr onwards", availability: "Available" },
      { bhk: "3 BHK Premium", areaSqft: "1,820 sq.ft.", priceLabel: "\u20b91.2Cr onwards", availability: "Limited Units" },
    ],
    amenities: [
      { icon: "clubhouse", label: "Clubhouse" },
      { icon: "pool", label: "Swimming Pool" },
      { icon: "gym", label: "Gymnasium" },
      { icon: "garden", label: "Landscaped Gardens" },
      { icon: "security", label: "24x7 Security" },
      { icon: "parking", label: "Covered Parking" },
      { icon: "playground", label: "Kids' Play Area" },
      { icon: "sports", label: "Sports Courts" },
      { icon: "power", label: "Power Backup" },
      { icon: "lift", label: "High-Speed Elevators" },
      { icon: "walking", label: "Jogging Track" },
      { icon: "hall", label: "Banquet Hall" },
    ],
    nearbyLandmarks: [
      { label: "ITPL (International Tech Park)", distance: "3.2 km" },
      { label: "Phoenix Marketcity", distance: "5.5 km" },
      { label: "Vydehi Institute of Medical Sciences", distance: "4.1 km" },
      { label: "Whitefield Railway Station", distance: "2.8 km" },
      { label: "Kempegowda International Airport", distance: "38 km" },
    ],
    connectivitySummary:
      "Located just off Whitefield Main Road, the project offers quick access to ITPL, EPIP Zone, and the Outer Ring Road, with the upcoming Whitefield Metro extension expected to further improve connectivity.",
    brochure: "/brochures/prestige-lakeside-habitat.pdf",
  },
  {
    id: "sattva-lumina",
    slug: "sattva-lumina",
    name: "Sattva Lumina",
    locality: "Hebbal",
    builder: "Sattva Group",
    price: "\u20b91.2Cr \u2013 \u20b91.8Cr",
    priceMinLakh: 120,
    priceMaxLakh: 180,
    bhk: "3 & 4 BHK",
    bhkValues: [3, 4],
    image:
      "https://images.unsplash.com/photo-1785402231092-859d0a6c4397?w=600&h=420&fit=crop&auto=format",
    status: "Under Construction",
    propertyType: "Apartment",
    tag: "New Launch",
    tagDark: true,
    featured: true,
  },
  {
    id: "brigade-orchards",
    slug: "brigade-orchards",
    name: "Brigade Orchards",
    locality: "Devanahalli",
    builder: "Brigade Group",
    price: "\u20b965L \u2013 \u20b995L",
    priceMinLakh: 65,
    priceMaxLakh: 95,
    bhk: "2 & 3 BHK",
    bhkValues: [2, 3],
    image:
      "https://images.unsplash.com/photo-1682662046610-fbdb3db4bd74?w=600&h=420&fit=crop&auto=format",
    status: "Ready to Move",
    propertyType: "Apartment",
    tag: "Best Seller",
    tagDark: false,
    featured: true,
  },
  {
    id: "godrej-woodscapes",
    slug: "godrej-woodscapes",
    name: "Godrej Woodscapes",
    locality: "Whitefield",
    builder: "Godrej Properties",
    price: "\u20b995L \u2013 \u20b91.4Cr",
    priceMinLakh: 95,
    priceMaxLakh: 140,
    bhk: "2 & 3 BHK",
    bhkValues: [2, 3],
    image:
      "https://images.unsplash.com/photo-1682662046457-74fd5b199b92?w=600&h=420&fit=crop&auto=format",
    status: "Under Construction",
    propertyType: "Apartment",
    tag: "Limited Units",
    tagDark: true,
    featured: true,
  },
  {
    id: "century-dream-acres",
    slug: "century-dream-acres",
    name: "Century Dream Acres",
    locality: "Sarjapur Road",
    builder: "Century Real Estate",
    price: "\u20b970L \u2013 \u20b91.05Cr",
    priceMinLakh: 70,
    priceMaxLakh: 105,
    bhk: "1, 2 & 3 BHK",
    bhkValues: [1, 2, 3],
    image:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&h=420&fit=crop&auto=format",
    status: "Ready to Move",
    propertyType: "Apartment",
    tag: "Best Seller",
    tagDark: false,
    featured: false,
  },
  {
    id: "purvankara-zenia",
    slug: "purvankara-zenia",
    name: "Purvankara Zenia",
    locality: "Marathahalli",
    builder: "Prestige Group",
    price: "\u20b978L onwards",
    priceMinLakh: 78,
    priceMaxLakh: 78,
    bhk: "30 × 40 & 30 × 50 Plots",
    bhkValues: [],
    image:
      "https://images.unsplash.com/photo-1774697443203-0f54409d1613?auto=format&fit=crop&q=85&w=1200",
    heroImage:
      "https://images.unsplash.com/photo-1774697443203-0f54409d1613?auto=format&fit=crop&q=85&w=1800",
    status: "Ready to Move",
    propertyType: "Plot",
    tag: "New Launch",
    tagDark: true,
    featured: false,
    acres: "1.5 Acres",
    description:
      "Purvankara Zenia is presented as a premium residential plotted development in Marathahalli, Bangalore, with planned internal roads, landscaped open spaces and well-defined plot parcels for buyers who want to design and build their own home.",
    gallery: [
      "https://images.unsplash.com/photo-1773299567657-a4bf83503ce5?auto=format&fit=crop&q=85&w=1200",
      "https://images.unsplash.com/photo-1774697443203-0f54409d1613?auto=format&fit=crop&q=85&w=1200",
      "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=900&h=650&fit=crop&auto=format",
    ],
    possession: "Available for Registration",
    totalUnits: 96,
    projectSize: "1.5 Acres",
    highlights: [
      { icon: "location", title: "Connected Location", description: "Well connected to Marathahalli, Whitefield and the Outer Ring Road for everyday commuting." },
      { icon: "garden", title: "Planned Green Spaces", description: "Landscaped pockets and open areas are planned to give the layout a calmer residential character." },
      { icon: "security", title: "Gated Community", description: "Controlled entry and planned internal circulation provide a more secure community setting." },
      { icon: "clubhouse", title: "Community Spaces", description: "Dedicated common areas create room for neighbourhood activities and family time." },
      { icon: "location", title: "Flexible Home Planning", description: "Plot ownership gives buyers the freedom to plan a future home around their own requirements." },
      { icon: "garden", title: "Internal Road Network", description: "Organised internal roads connect the plot parcels with the main access route." },
    ],
    configurations: [
      { bhk: "30 × 40 Plot", areaSqft: "1,200 sq.ft.", priceLabel: "₹78L onwards", availability: "Available" },
      { bhk: "30 × 50 Plot", areaSqft: "1,500 sq.ft.", priceLabel: "₹92L onwards", availability: "Limited Units" },
      { bhk: "40 × 60 Plot", areaSqft: "2,400 sq.ft.", priceLabel: "₹1.35Cr onwards", availability: "Available" },
    ],
    amenities: [
      { icon: "security", label: "Gated Entry" },
      { icon: "garden", label: "Landscaped Greens" },
      { icon: "walking", label: "Walking Paths" },
      { icon: "parking", label: "Visitor Parking" },
      { icon: "power", label: "Power Infrastructure" },
      { icon: "hall", label: "Community Space" },
      { icon: "playground", label: "Kids' Play Area" },
      { icon: "security", label: "Security" },
    ],
    nearbyLandmarks: [
      { label: "Marathahalli Bridge", distance: "3.5 km" },
      { label: "ITPL", distance: "7.8 km" },
      { label: "Phoenix Marketcity", distance: "6.2 km" },
      { label: "Outer Ring Road", distance: "4.2 km" },
      { label: "Kempegowda International Airport", distance: "42 km" },
    ],
    connectivitySummary:
      "The development is positioned in the Marathahalli corridor with access to Whitefield, ITPL and the Outer Ring Road, making it suitable for buyers looking for a planned residential plot close to established employment hubs.",
  },
  {
    id: "sattva-greens",
    slug: "sattva-greens",
    name: "Sattva Greens",
    locality: "Electronic City",
    builder: "Sattva Group",
    price: "\u20b945L onwards",
    priceMinLakh: 45,
    priceMaxLakh: 45,
    bhk: "30 × 40 & 40 × 60 Plots",
    bhkValues: [],
    image:
      "https://images.unsplash.com/photo-1773299567657-a4bf83503ce5?auto=format&fit=crop&q=85&w=1200",
    heroImage:
      "https://images.unsplash.com/photo-1773299567657-a4bf83503ce5?auto=format&fit=crop&q=85&w=1800",
    status: "Ready to Move",
    propertyType: "Plot",
    tag: "Affordable",
    tagDark: false,
    featured: false,
    acres: "2 Acres",
    description:
      "Sattva Greens is presented as an accessible residential plotted development in Electronic City, Bangalore, with organised plot sizes, internal roads, landscaped areas and community infrastructure for buyers planning a future home or long-term land investment.",
    gallery: [
      "https://images.unsplash.com/photo-1774697443203-0f54409d1613?auto=format&fit=crop&q=85&w=1200",
      "https://images.unsplash.com/photo-1773299567657-a4bf83503ce5?auto=format&fit=crop&q=85&w=1200",
      "https://images.unsplash.com/photo-1500076656116-558758c991c1?w=900&h=650&fit=crop&auto=format",
    ],
    possession: "Available for Registration",
    totalUnits: 128,
    projectSize: "2 Acres",
    highlights: [
      { icon: "location", title: "Electronic City Address", description: "Located within the established Electronic City corridor with access to major employment and social infrastructure." },
      { icon: "garden", title: "Green Community", description: "Planned landscaping and open areas create a more welcoming setting for future homeowners." },
      { icon: "security", title: "Secure Layout", description: "Controlled access and an organised internal road network support a comfortable community environment." },
      { icon: "location", title: "Flexible Plot Sizes", description: "Multiple plot dimensions allow buyers to choose a parcel that fits their home-building plans." },
      { icon: "clubhouse", title: "Community Facilities", description: "Shared spaces are planned to encourage a practical and connected neighbourhood experience." },
      { icon: "garden", title: "Planned Infrastructure", description: "Roads, lighting and utility provisions are planned around the residential plot layout." },
    ],
    configurations: [
      { bhk: "30 × 40 Plot", areaSqft: "1,200 sq.ft.", priceLabel: "₹45L onwards", availability: "Available" },
      { bhk: "30 × 50 Plot", areaSqft: "1,500 sq.ft.", priceLabel: "₹58L onwards", availability: "Available" },
      { bhk: "40 × 60 Plot", areaSqft: "2,400 sq.ft.", priceLabel: "₹82L onwards", availability: "Limited Units" },
    ],
    amenities: [
      { icon: "security", label: "Gated Entry" },
      { icon: "garden", label: "Landscaped Greens" },
      { icon: "walking", label: "Walking Paths" },
      { icon: "parking", label: "Visitor Parking" },
      { icon: "power", label: "Power Infrastructure" },
      { icon: "hall", label: "Community Space" },
      { icon: "playground", label: "Kids' Play Area" },
      { icon: "security", label: "24x7 Security" },
    ],
    nearbyLandmarks: [
      { label: "Electronic City Metro", distance: "4.5 km" },
      { label: "Electronic City Phase 1", distance: "3.2 km" },
      { label: "Hosur Road", distance: "4.8 km" },
      { label: "Bommasandra Industrial Area", distance: "7.5 km" },
      { label: "Kempegowda International Airport", distance: "48 km" },
    ],
    connectivitySummary:
      "The development is positioned in the Electronic City corridor with convenient access to Hosur Road, employment hubs and expanding metro connectivity, making it suitable for both end users and long-term land buyers.",
  },
  {
    id: "brigade-meadows",
    slug: "brigade-meadows",
    name: "Brigade Meadows",
    locality: "Kanakapura Road",
    builder: "Brigade Group",
    price: "\u20b955L \u2013 \u20b982L",
    priceMinLakh: 55,
    priceMaxLakh: 82,
    bhk: "2 & 3 BHK",
    bhkValues: [2, 3],
    image:
      "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=600&h=420&fit=crop&auto=format",
    status: "Ready to Move",
    propertyType: "Apartment",
    tag: "Best Seller",
    tagDark: false,
    featured: false,
  },
  {
    id: "godrej-air-nxt",
    slug: "godrej-air-nxt",
    name: "Godrej Air NXT",
    locality: "Yelahanka",
    builder: "Godrej Properties",
    price: "\u20b962L \u2013 \u20b990L",
    priceMinLakh: 62,
    priceMaxLakh: 90,
    bhk: "2 & 3 BHK",
    bhkValues: [2, 3],
    image:
      "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=600&h=420&fit=crop&auto=format",
    status: "Under Construction",
    propertyType: "Apartment",
    tag: "New Launch",
    tagDark: true,
    featured: false,
  },
  {
    id: "sobha-windsor",
    slug: "sobha-windsor",
    name: "Sobha Windsor",
    locality: "Kanakapura Road",
    builder: "Sobha Limited",
    price: "\u20b975L \u2013 \u20b91.05Cr",
    priceMinLakh: 75,
    priceMaxLakh: 105,
    bhk: "2 & 3 BHK",
    bhkValues: [2, 3],
    image:
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=600&h=420&fit=crop&auto=format",
    status: "Ready to Move",
    propertyType: "Apartment",
    tag: "Premium",
    tagDark: false,
    featured: false,
  },
];

export function getProjectBySlug(slug: string): Project | undefined {
  return PROJECTS.find((project) => project.slug === slug);
}

/**
 * Related projects for the Similar Projects section on the Project
 * Detail page: same locality first, then same builder, excluding the
 * current project, capped at `limit`.
 */
export function getSimilarProjects(project: Project, limit = 3): Project[] {
  const sameLocality = PROJECTS.filter(
    (p) => p.slug !== project.slug && p.locality === project.locality
  );
  const sameBuilder = PROJECTS.filter(
    (p) =>
      p.slug !== project.slug &&
      p.builder === project.builder &&
      !sameLocality.some((sl) => sl.slug === p.slug)
  );
  const samePropertyType = PROJECTS.filter(
    (p) =>
      p.slug !== project.slug &&
      p.propertyType === project.propertyType &&
      !sameLocality.some((sl) => sl.slug === p.slug) &&
      !sameBuilder.some((sb) => sb.slug === p.slug)
  );
  return [...sameLocality, ...sameBuilder, ...samePropertyType].slice(0, limit);
}
