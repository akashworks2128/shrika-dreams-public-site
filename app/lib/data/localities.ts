/**
 * Locality data — powers both the /localities listing page and the
 * /localities/[slug] detail pages. Shape mirrors a future `localities`
 * table in Supabase so this can later be replaced with a server-side
 * fetch without touching any of the components that consume it.
 *
 * `connectivity` items reference an icon by key (see ICON_MAP in
 * LocalityConnectivity.tsx) rather than storing a component, so this stays
 * plain, serializable data.
 */
export interface NearbyLandmark {
  name: string;
  distance: string;
}

export interface ConnectivityItem {
  icon: "metro" | "airport" | "itParks" | "schools" | "hospitals" | "shopping";
  label: string;
  detail: string;
}

export interface PriceTrendPoint {
  year: number;
  pricePerSqft: number;
}

export interface WhyBuyPoint {
  title: string;
  desc: string;
}

export interface Locality {
  id?: string;
  name: string;
  slug: string;
  city: string;
  /** Thumbnail used on the /localities listing card. */
  image: string;
  heroImage: string;
  aboutImage: string;
  /** Custom heading configured in Admin for the locality About section. */
  aboutTitle: string;
  description: string;
  /** One or two sentence blurb shown on the listing card. */
  shortDescription: string;
  averagePrice: string;
  priceRange: string;
  popularBhk: string;
  /** Short "From ₹55L onwards" style figure for the listing card. */
  startingPrice: string;
  activeProjects: number;
  about: string;
  nearbyLandmarks: NearbyLandmark[];
  connectivity: ConnectivityItem[];
  priceTrends: PriceTrendPoint[];
  whyBuy: WhyBuyPoint[];
}

export const LOCALITIES: Locality[] = [
  {
    name: "Whitefield",
    slug: "whitefield",
    city: "Bangalore",
    image:
      "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=700&h=520&fit=crop&auto=format",
    heroImage:
      "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=1600&h=900&fit=crop&auto=format",
    aboutImage:
      "https://images.unsplash.com/photo-1745301558339-44eb3217d5da?w=700&h=560&fit=crop&auto=format",
    aboutTitle: "Discover Whitefield",
    description:
      "One of Bangalore's most sought-after tech corridors — where modern living meets world-class infrastructure.",
    shortDescription:
      "Premier IT hub featuring upscale gated communities, integrated townships, and top-tier social infrastructure.",
    averagePrice: "\u20b96,850/sq.ft",
    priceRange: "\u20b985L \u2013 \u20b92.5Cr",
    popularBhk: "2 BHK, 3 BHK",
    startingPrice: "From \u20b955L onwards",
    activeProjects: 42,
    about:
      "Whitefield has evolved from a quiet colonial settlement into one of Bangalore's most dynamic real estate hubs. Home to ITPL, numerous tech parks, and a thriving social infrastructure, this locality offers an ideal blend of work-life balance. With excellent schools, hospitals, shopping malls, and upcoming metro connectivity, Whitefield continues to attract homebuyers and investors alike.",
    nearbyLandmarks: [],
    connectivity: [
      { icon: "metro", label: "Metro", detail: "Purple Line Extension \u2014 Whitefield Metro Station (upcoming)" },
      { icon: "airport", label: "Airport", detail: "KIA \u2014 45 min via NH-44" },
      { icon: "itParks", label: "IT Parks", detail: "ITPL, Prestige Tech Park, RMZ Ecoworld \u2014 all within 10 min" },
      { icon: "schools", label: "Schools", detail: "Vydehi School, Ryan International, Deens Academy nearby" },
      { icon: "hospitals", label: "Hospitals", detail: "Columbia Asia, Narayana Health, Cloudnine within 15 min" },
      { icon: "shopping", label: "Shopping", detail: "Phoenix Marketcity, Forum Shantiniketan nearby" },
    ],
    priceTrends: [
      { year: 2019, pricePerSqft: 4900 },
      { year: 2020, pricePerSqft: 5100 },
      { year: 2021, pricePerSqft: 5400 },
      { year: 2022, pricePerSqft: 5950 },
      { year: 2023, pricePerSqft: 6300 },
      { year: 2024, pricePerSqft: 6850 },
    ],
    whyBuy: [
      { title: "Strong Rental Demand", desc: "A dense concentration of IT professionals keeps rental occupancy and yields consistently high." },
      { title: "Excellent Connectivity", desc: "Well linked to ORR, KR Puram, and the upcoming Metro Purple Line extension." },
      { title: "Premium Social Infrastructure", desc: "Reputed schools, hospitals, and malls are all within a short drive." },
      { title: "Consistent Price Appreciation", desc: "Steady year-on-year growth backed by continuous infrastructure development." },
    ],
  },
  {
    name: "Sarjapur Road",
    slug: "sarjapur-road",
    city: "Bangalore",
    image:
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=700&h=520&fit=crop&auto=format",
    heroImage:
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1600&h=900&fit=crop&auto=format",
    aboutImage:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=700&h=560&fit=crop&auto=format",
    aboutTitle: "Discover Sarjapur Road",
    description:
      "A rapidly expanding residential corridor with excellent connectivity to major tech parks and educational institutions.",
    shortDescription:
      "Rapidly expanding residential corridor with excellent connectivity to major tech parks and retail hubs.",
    averagePrice: "\u20b96,100/sq.ft",
    priceRange: "\u20b975L \u2013 \u20b92.1Cr",
    popularBhk: "2 BHK, 3 BHK",
    startingPrice: "From \u20b945L onwards",
    activeProjects: 35,
    about:
      "Sarjapur Road has emerged as one of Bangalore's fastest-growing residential belts, driven by its proximity to the ORR IT corridor, HSR Layout, and Electronic City. A mix of gated communities, plotted developments, and premium apartments cater to a wide range of homebuyers, while ongoing road-widening and infrastructure projects continue to boost long-term appreciation potential.",
    nearbyLandmarks: [],
    connectivity: [
      { icon: "metro", label: "Metro", detail: "Proposed extension via Outer Ring Road corridor" },
      { icon: "airport", label: "Airport", detail: "KIA \u2014 65 min via ORR and NH-44" },
      { icon: "itParks", label: "IT Parks", detail: "Wipro SEZ, RGA Tech Park, Cessna Business Park nearby" },
      { icon: "schools", label: "Schools", detail: "Greenwood High, Oakridge International nearby" },
      { icon: "hospitals", label: "Hospitals", detail: "Motherhood Hospital, Cloudnine within 15 min" },
      { icon: "shopping", label: "Shopping", detail: "Forum Shantiniketan, Decathlon nearby" },
    ],
    priceTrends: [
      { year: 2019, pricePerSqft: 4200 },
      { year: 2020, pricePerSqft: 4450 },
      { year: 2021, pricePerSqft: 4800 },
      { year: 2022, pricePerSqft: 5300 },
      { year: 2023, pricePerSqft: 5700 },
      { year: 2024, pricePerSqft: 6100 },
    ],
    whyBuy: [
      { title: "Fastest-Growing Corridor", desc: "Consistent double-digit demand growth backed by IT expansion along ORR." },
      { title: "Diverse Housing Options", desc: "Everything from plotted developments to premium high-rises available." },
      { title: "Improving Infrastructure", desc: "Ongoing road-widening and civic upgrades are boosting connectivity." },
      { title: "Strong Long-Term Upside", desc: "Early-stage pricing relative to neighboring established corridors." },
    ],
  },
  {
    name: "Hebbal",
    slug: "hebbal",
    city: "Bangalore",
    image:
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=700&h=520&fit=crop&auto=format",
    heroImage:
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1600&h=900&fit=crop&auto=format",
    aboutImage:
      "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=700&h=560&fit=crop&auto=format",
    aboutTitle: "Discover Hebbal",
    description:
      "Scenic lake-side living featuring premium sky-rises, with seamless access to the airport and north Bangalore.",
    shortDescription:
      "Scenic lake-side living featuring premium sky-rises, with seamless access to the airport and north Bangalore.",
    averagePrice: "\u20b98,300/sq.ft",
    priceRange: "\u20b91.2Cr \u2013 \u20b93.2Cr",
    popularBhk: "3 BHK, 4 BHK",
    startingPrice: "From \u20b985L onwards",
    activeProjects: 18,
    about:
      "Hebbal is one of North Bangalore's most desirable addresses, anchored by its picturesque lake, flyover connectivity, and proximity to Kempegowda International Airport. The locality has attracted several premium high-rise developments, drawing buyers who value both green surroundings and quick access to the airport and central business districts.",
    nearbyLandmarks: [],
    connectivity: [
      { icon: "metro", label: "Metro", detail: "Blue Line \u2014 Hebbal Metro Station (upcoming)" },
      { icon: "airport", label: "Airport", detail: "KIA \u2014 25 min via Bellary Road" },
      { icon: "itParks", label: "IT Parks", detail: "Manyata Tech Park \u2014 10 min away" },
      { icon: "schools", label: "Schools", detail: "Vidyashilp Academy, Canadian International School nearby" },
      { icon: "hospitals", label: "Hospitals", detail: "Baptist Hospital, Aster CMI within 10 min" },
      { icon: "shopping", label: "Shopping", detail: "Elements Mall, RMZ Galleria nearby" },
    ],
    priceTrends: [
      { year: 2019, pricePerSqft: 6100 },
      { year: 2020, pricePerSqft: 6400 },
      { year: 2021, pricePerSqft: 6900 },
      { year: 2022, pricePerSqft: 7500 },
      { year: 2023, pricePerSqft: 7900 },
      { year: 2024, pricePerSqft: 8300 },
    ],
    whyBuy: [
      { title: "Airport Proximity", desc: "One of the shortest commutes to KIA among premium Bangalore localities." },
      { title: "Manyata Tech Park Access", desc: "Minutes from one of the city's largest IT employment hubs." },
      { title: "Lake-View Living", desc: "A rare mix of green, scenic surroundings within city limits." },
      { title: "High-End Developments", desc: "A concentration of premium, well-amenitized high-rise projects." },
    ],
  },
  {
    name: "Electronic City",
    slug: "electronic-city",
    city: "Bangalore",
    image:
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=700&h=520&fit=crop&auto=format",
    heroImage:
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=1600&h=900&fit=crop&auto=format",
    aboutImage:
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=700&h=560&fit=crop&auto=format",
    aboutTitle: "Discover Electronic City",
    description:
      "The established electronics powerhouse, offering well-priced apartments amid a mature, family-friendly setting.",
    shortDescription:
      "The established electronics powerhouse, offering well-priced apartments amid a mature, family-friendly setting.",
    averagePrice: "\u20b94,650/sq.ft",
    priceRange: "\u20b945L \u2013 \u20b91.1Cr",
    popularBhk: "1 BHK, 2 BHK",
    startingPrice: "From \u20b935L onwards",
    activeProjects: 27,
    about:
      "Electronic City has long been one of Bangalore's most established IT and industrial hubs, home to Infosys, Wipro, and several other major campuses. Decades of development have resulted in mature social infrastructure, dependable civic amenities, and comparatively affordable pricing — making it a consistent favorite among first-time buyers and long-term investors.",
    nearbyLandmarks: [],
    connectivity: [
      { icon: "metro", label: "Metro", detail: "Yellow Line \u2014 Electronic City Metro Station (upcoming)" },
      { icon: "airport", label: "Airport", detail: "KIA \u2014 75 min via NICE Road" },
      { icon: "itParks", label: "IT Parks", detail: "Infosys, Wipro, TCS campuses within the locality" },
      { icon: "schools", label: "Schools", detail: "Delhi Public School, Treamis World School nearby" },
      { icon: "hospitals", label: "Hospitals", detail: "Narayana Health City, Sparsh Hospital nearby" },
      { icon: "shopping", label: "Shopping", detail: "Neotown Mall, Big Bazaar nearby" },
    ],
    priceTrends: [
      { year: 2019, pricePerSqft: 3600 },
      { year: 2020, pricePerSqft: 3800 },
      { year: 2021, pricePerSqft: 4050 },
      { year: 2022, pricePerSqft: 4300 },
      { year: 2023, pricePerSqft: 4480 },
      { year: 2024, pricePerSqft: 4650 },
    ],
    whyBuy: [
      { title: "Affordable Entry Point", desc: "Among the most accessible price points for a well-established IT corridor." },
      { title: "Major IT Campuses", desc: "Home to Infosys, Wipro, and TCS — strong tenant and buyer demand." },
      { title: "Mature Infrastructure", desc: "Decades-old civic infrastructure means fewer construction-era disruptions." },
      { title: "NICE Road Access", desc: "Quick expressway connectivity to South and West Bangalore." },
    ],
  },
  {
    name: "Yelahanka",
    slug: "yelahanka",
    city: "Bangalore",
    image:
      "https://images.unsplash.com/photo-1600566752355-35792bedcfea?w=700&h=520&fit=crop&auto=format",
    heroImage:
      "https://images.unsplash.com/photo-1600566752355-35792bedcfea?w=1600&h=900&fit=crop&auto=format",
    aboutImage:
      "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=700&h=560&fit=crop&auto=format",
    aboutTitle: "Discover Yelahanka",
    description:
      "Quiet, green northern suburb known for peaceful residential communities, defense institutions, and airport access.",
    shortDescription:
      "Quiet, green northern suburb known for peaceful residential communities, defense institutions, and airport access.",
    averagePrice: "\u20b95,400/sq.ft",
    priceRange: "\u20b960L \u2013 \u20b91.6Cr",
    popularBhk: "2 BHK, 3 BHK",
    startingPrice: "From \u20b940L onwards",
    activeProjects: 22,
    about:
      "Yelahanka offers a quieter, greener alternative to Bangalore's busier corridors, while still enjoying strong connectivity thanks to its proximity to Kempegowda International Airport. With a strong presence of defense establishments, reputed schools, and steadily growing residential development, the locality appeals to families seeking a calmer pace of city living.",
    nearbyLandmarks: [],
    connectivity: [
      { icon: "metro", label: "Metro", detail: "Blue Line extension \u2014 planned stations nearby" },
      { icon: "airport", label: "Airport", detail: "KIA \u2014 20 min via Bellary Road" },
      { icon: "itParks", label: "IT Parks", detail: "Manyata Tech Park \u2014 20 min away" },
      { icon: "schools", label: "Schools", detail: "Vidyaniketan Public School, Air Force School nearby" },
      { icon: "hospitals", label: "Hospitals", detail: "Yelahanka Government Hospital, nearby private clinics" },
      { icon: "shopping", label: "Shopping", detail: "Esteem Mall nearby" },
    ],
    priceTrends: [
      { year: 2019, pricePerSqft: 4200 },
      { year: 2020, pricePerSqft: 4400 },
      { year: 2021, pricePerSqft: 4700 },
      { year: 2022, pricePerSqft: 5000 },
      { year: 2023, pricePerSqft: 5200 },
      { year: 2024, pricePerSqft: 5400 },
    ],
    whyBuy: [
      { title: "Airport-Adjacent", desc: "One of the shortest, most reliable commutes to KIA." },
      { title: "Quieter Pace of Living", desc: "Lower density and greener surroundings than central corridors." },
      { title: "Defense & Institutional Presence", desc: "Stable, established neighborhoods with long-term residents." },
      { title: "Room to Grow", desc: "Still-developing pricing relative to nearby Hebbal." },
    ],
  },
  {
    name: "Devanahalli",
    slug: "devanahalli",
    city: "Bangalore",
    image:
      "https://images.unsplash.com/photo-1682662046610-fbdb3db4bd74?w=700&h=520&fit=crop&auto=format",
    heroImage:
      "https://images.unsplash.com/photo-1682662046610-fbdb3db4bd74?w=1600&h=900&fit=crop&auto=format",
    aboutImage:
      "https://images.unsplash.com/photo-1682662046457-74fd5b199b92?w=700&h=560&fit=crop&auto=format",
    aboutTitle: "Discover Devanahalli",
    description:
      "Sought-after airport investment zone near the international airport, poised for immense future growth.",
    shortDescription:
      "Sought-after airport investment zone near the international airport, poised for immense future growth.",
    averagePrice: "\u20b94,100/sq.ft",
    priceRange: "\u20b955L \u2013 \u20b91.3Cr",
    popularBhk: "2 BHK, 3 BHK",
    startingPrice: "From \u20b938L onwards",
    activeProjects: 19,
    about:
      "Devanahalli's fortunes are closely tied to Kempegowda International Airport and the broader Bangalore Aerospace and Business Park initiatives nearby. With large-scale infrastructure investment underway — including the upcoming Devanahalli Business Park — the locality is increasingly viewed as a long-term growth bet by investors and homebuyers looking ahead of the curve.",
    nearbyLandmarks: [],
    connectivity: [
      { icon: "metro", label: "Metro", detail: "Blue Line extension planned through the airport corridor" },
      { icon: "airport", label: "Airport", detail: "KIA \u2014 10 min via NH-44" },
      { icon: "itParks", label: "IT Parks", detail: "Devanahalli Business Park \u2014 upcoming" },
      { icon: "schools", label: "Schools", detail: "Vidya Niketan, Global Public School nearby" },
      { icon: "hospitals", label: "Hospitals", detail: "Akash Hospital, government facilities nearby" },
      { icon: "shopping", label: "Shopping", detail: "Local retail markets, upcoming mall developments" },
    ],
    priceTrends: [
      { year: 2019, pricePerSqft: 2900 },
      { year: 2020, pricePerSqft: 3100 },
      { year: 2021, pricePerSqft: 3400 },
      { year: 2022, pricePerSqft: 3700 },
      { year: 2023, pricePerSqft: 3900 },
      { year: 2024, pricePerSqft: 4100 },
    ],
    whyBuy: [
      { title: "Airport-Driven Growth", desc: "Direct beneficiary of continued KIA expansion and business park development." },
      { title: "Early-Stage Pricing", desc: "Among the most affordable entry points in North Bangalore today." },
      { title: "Major Infrastructure Pipeline", desc: "Upcoming business parks and highway upgrades in progress." },
      { title: "Strong Investment Upside", desc: "Favored by investors positioning ahead of long-term appreciation." },
    ],
  },
];

export function getLocalityBySlug(slug: string): Locality | undefined {
  return LOCALITIES.find((locality) => locality.slug === slug);
}
