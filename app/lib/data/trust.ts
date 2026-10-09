/**
 * Stats and value-proposition content for the trust/credibility section.
 * These are editorial/content data (not user records), so they're kept
 * as static typed arrays rather than modeled for a Supabase table.
 */
import type { LucideIcon } from "lucide-react";
import { Clock, Users, Building2, Shield, CheckCircle, Award } from "lucide-react";

export interface Stat {
  value: string;
  label: string;
  icon: LucideIcon;
}

export const STATS: Stat[] = [
  { value: "10+", label: "Years of Experience", icon: Clock },
  { value: "500+", label: "Happy Families Served", icon: Users },
  { value: "10+", label: "Builder Partners", icon: Building2 },
  { value: "RERA", label: "Registered Consultant", icon: Shield },
];

export interface TrustProp {
  title: string;
  desc: string;
  icon: LucideIcon;
}

export const TRUST_PROPS: TrustProp[] = [
  {
    title: "Zero Cost to You",
    desc: "My service is completely free for home buyers. I earn a referral fee directly from the builder \u2014 you pay only what the builder quotes.",
    icon: CheckCircle,
  },
  {
    title: "Authorized Channel Partner",
    desc: "Officially registered channel partner for Prestige, Sattva, Century, Brigade, and Godrej in Bangalore.",
    icon: Award,
  },
  {
    title: "End-to-End Support",
    desc: "From site visits and floor plan selection to home loan assistance and registration \u2014 I guide you through every step.",
    icon: Shield,
  },
];
