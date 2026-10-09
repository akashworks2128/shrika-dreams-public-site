import { supabase } from "../supabase";
const DEFAULT_LOCALITY_IMAGE =
  "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1600&h=900&fit=crop&auto=format";

import { LOCALITIES } from "./localities";
import type {
  ConnectivityItem,
  NearbyLandmark,
  Locality,
  PriceTrendPoint,
  WhyBuyPoint,
} from "./localities";

export type SupabaseLocality = {
  id: string;
  name: string;
  slug: string;
  city: string | null;
  short_description: string | null;
  full_description: string | null;
  hero_image_url: string | null;
  main_image_url: string | null;
  average_price: string | null;
  price_range: string | null;
  popular_bhk: string | null;
  active_projects: number | null;
  about_title: string | null;
  about_description: string | null;
  about_image_url: string | null;
  connectivity: unknown;
  infrastructure: unknown;
  price_trends: unknown;
  why_buy: unknown;
  is_published: boolean;
  created_at: string;
  updated_at: string;
};

function asRecord(value: unknown): Record<string, unknown> | null {
  return value && typeof value === "object" && !Array.isArray(value)
    ? (value as Record<string, unknown>)
    : null;
}

function asArray(value: unknown): unknown[] {
  if (Array.isArray(value)) return value;
  if (typeof value === "string") {
    try {
      const parsed = JSON.parse(value);
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  }
  return [];
}

function getConnectivityIcon(label: string): ConnectivityItem["icon"] {
  const value = label.toLowerCase();
  if (value.includes("airport")) return "airport";
  if (value.includes("school") || value.includes("college")) return "schools";
  if (value.includes("hospital")) return "hospitals";
  if (value.includes("mall") || value.includes("shopping")) return "shopping";
  if (value.includes("it park") || value.includes("itpl") || value.includes("it corridor")) return "itParks";
  return "metro";
}

function mapConnectivity(value: unknown): ConnectivityItem[] {
  return asArray(value).flatMap((item) => {
    const record = asRecord(item);
    if (!record) return [];

    const label = String(record.label ?? record.name ?? "").trim();
    const detail = String(record.detail ?? record.info ?? record.distance ?? "").trim();
    if (!label || !detail) return [];

    const rawIcon = String(record.icon ?? "");
    const allowed: ConnectivityItem["icon"][] = [
      "metro", "airport", "itParks", "schools", "hospitals", "shopping",
    ];
    const icon = allowed.includes(rawIcon as ConnectivityItem["icon"])
      ? rawIcon as ConnectivityItem["icon"]
      : getConnectivityIcon(label);

    return [{ icon, label, detail }];
  });
}

function mapNearbyLandmarks(value: unknown): NearbyLandmark[] {
  return asArray(value).flatMap((item) => {
    const record = asRecord(item);
    if (!record) return [];
    const name = String(record.label ?? record.name ?? "").trim();
    const distance = String(record.info ?? record.distance ?? "").trim();
    return name && distance ? [{ name, distance }] : [];
  });
}

function mapPriceTrends(value: unknown): PriceTrendPoint[] {
  return asArray(value).flatMap((item) => {
    const record = asRecord(item);
    if (!record) return [];
    const period = String(record.year ?? record.period ?? "").trim();
    const yearMatch = period.match(/(19|20)\d{2}/);
    const year = Number(record.year ?? yearMatch?.[0]);
    const rawPrice = String(record.pricePerSqft ?? record.price_per_sqft ?? record.price ?? "");
    const pricePerSqft = Number(rawPrice.replace(/[^0-9.]/g, ""));
    return Number.isFinite(year) && Number.isFinite(pricePerSqft)
      ? [{ year, pricePerSqft }]
      : [];
  });
}

function mapWhyBuy(value: unknown): WhyBuyPoint[] {
  return asArray(value).flatMap((item) => {
    const record = asRecord(item);
    if (!record) return [];

    // Admin stores these rows as { label, info }, while older/static data
    // uses { title, desc }. Support both so existing localities continue
    // rendering without requiring a database migration.
    const title = String(record.title ?? record.label ?? "").trim();
    const desc = String(
      record.desc ?? record.description ?? record.info ?? ""
    ).trim();

    return title && desc ? [{ title, desc }] : [];
  });
}

function formatAveragePrice(value: string | null): string {
  const raw = String(value ?? "").trim();
  if (!raw) return "Price on request";

  // Preserve an already formatted value and avoid duplicate suffixes.
  if (/\/\s*sq\.?\s*ft\.?/i.test(raw)) return raw;

  const numeric = raw.replace(/[^0-9.]/g, "");
  if (!numeric) return raw;

  const amount = Number(numeric);
  if (!Number.isFinite(amount)) return raw;

  const formatted = amount.toLocaleString("en-IN", {
    maximumFractionDigits: 2,
  });
  return `₹${formatted}/sq.ft`;
}

export function mapSupabaseLocality(row: SupabaseLocality): Locality {
  const image = row.main_image_url || row.hero_image_url || DEFAULT_LOCALITY_IMAGE;
  const aboutImage = row.about_image_url || image;
  const description = row.full_description || row.short_description || "";

  return {
    id: row.id,
    name: row.name,
    slug: row.slug,
    city: row.city || "Bangalore",
    image,
    heroImage: row.hero_image_url || image,
    aboutImage,
    aboutTitle: row.about_title || `Discover ${row.name}`,
    description,
    shortDescription: row.short_description || description,
    averagePrice: formatAveragePrice(row.average_price),
    priceRange: row.price_range || "Price on request",
    popularBhk: row.popular_bhk || "—",
    startingPrice: row.price_range || "Price on request",
    activeProjects: row.active_projects ?? 0,
    about: row.about_description || description,
    nearbyLandmarks: mapNearbyLandmarks(row.infrastructure),
    connectivity: mapConnectivity(row.connectivity),
    priceTrends: mapPriceTrends(row.price_trends),
    whyBuy: mapWhyBuy(row.why_buy),
  };
}

export async function getLocalitiesFromSupabase(): Promise<Locality[]> {
  const { data, error } = await supabase
    .from("localities")
    .select("*")
    .eq("is_published", true)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Supabase localities error:", error);
    throw new Error(error.message);
  }

  return ((data ?? []) as unknown as SupabaseLocality[]).map(mapSupabaseLocality);
}

export async function getLocalityBySlugFromSupabase(
  slug: string,
): Promise<Locality | null> {
  const { data, error } = await supabase
    .from("localities")
    .select("*")
    .eq("slug", slug)
    .eq("is_published", true)
    .single();

  if (error || !data) {
    if (error) console.error("Supabase locality detail error:", error);
    return LOCALITIES.find((locality) => locality.slug === slug) ?? null;
  }

  return mapSupabaseLocality(data as unknown as SupabaseLocality);
}
