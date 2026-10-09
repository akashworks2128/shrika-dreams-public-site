/**
 * Client testimonials. Shape mirrors a future `testimonials` table.
 */
export interface Testimonial {
  id: string;
  name: string;
  location: string;
  project: string;
  text: string;
  rating: number;
  initials: string;
  accentColor: string;
}

export const TESTIMONIALS: Testimonial[] = [
  {
    id: "priya-sharma",
    name: "Priya Sharma",
    location: "Whitefield, Bangalore",
    project: "Prestige Lakeside Habitat",
    text: "Rajesh helped us find our 3BHK in Whitefield within our exact budget. His knowledge of the Prestige portfolio is unmatched \u2014 and the entire process from site visit to registration was seamless.",
    rating: 5,
    initials: "PS",
    accentColor: "#1E4A7A",
  },
  {
    id: "vikram-deepa-nair",
    name: "Vikram & Deepa Nair",
    location: "HSR Layout, Bangalore",
    project: "Sattva Lumina, Hebbal",
    text: "We were overwhelmed with options in Hebbal. One conversation with Rajesh and we had complete clarity. He laid out pros and cons honestly and helped us make a confident decision.",
    rating: 5,
    initials: "VN",
    accentColor: "#1A5C45",
  },
  {
    id: "anand-krishnamurthy",
    name: "Anand Krishnamurthy",
    location: "NRI \u2014 Singapore",
    project: "Brigade Orchards, Devanahalli",
    text: "As an NRI investor I needed someone I could trust remotely. Rajesh handled everything \u2014 site visits, documentation, builder coordination. Exceptional professionalism and zero surprises.",
    rating: 5,
    initials: "AK",
    accentColor: "#7A4518",
  },
];
