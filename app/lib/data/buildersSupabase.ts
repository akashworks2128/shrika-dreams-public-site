import { supabase } from "../supabase";
import { PARTNER_BUILDERS } from "./builders";
import type { PartnerBuilder } from "./builders";

const DEFAULT_BUILDER_IMAGE =
  "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=900&h=650&fit=crop&auto=format";

export type SupabaseBuilder = {
  id: string;
  name: string;
  slug: string;
  logo_url: string | null;
  image_url: string | null;
  short_description: string | null;
  about: string | null;
  website_url: string | null;
  founded_year: number | null;
  headquarters: string | null;
  tagline?: string | null;
  years_experience?: string | null;
  projects_count?: string | null;
  is_published: boolean;
  created_at: string;
  updated_at: string;
};

function yearsExperience(foundedYear: number | null): string {
  if (!foundedYear) return "—";
  const years = new Date().getFullYear() - foundedYear;
  return years > 0 ? `${years}+` : "—";
}

export function mapSupabaseBuilder(row: SupabaseBuilder): PartnerBuilder {
  return {
    id: row.id,
    slug: row.slug,
    name: row.name,
    logo: row.logo_url || "",
    image: row.image_url || DEFAULT_BUILDER_IMAGE,
    tagline: row.tagline || "Premium Partner",
    description: row.short_description || row.about || "",
    yearsExperience: row.years_experience || yearsExperience(row.founded_year),
    projectsCount: row.projects_count || "—",
  };
}

export async function getBuildersFromSupabase(): Promise<PartnerBuilder[]> {
  const { data, error } = await supabase
    .from("builders")
    .select("*")
    .eq("is_published", true)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Supabase builders error:", error);
    throw new Error(error.message);
  }

  return ((data ?? []) as unknown as SupabaseBuilder[]).map(mapSupabaseBuilder);
}

export async function getBuilderBySlugFromSupabase(
  slug: string,
): Promise<SupabaseBuilder | null> {
  const { data, error } = await supabase
    .from("builders")
    .select("*")
    .eq("slug", slug)
    .eq("is_published", true)
    .single();

  if (error || !data) {
    if (error) console.error("Supabase builder detail error:", error);
    const fallback = PARTNER_BUILDERS.find((builder) => builder.slug === slug);
    if (!fallback) return null;
    return {
      id: fallback.id,
      name: fallback.name,
      slug: fallback.slug,
      logo_url: fallback.logo || null,
      image_url: fallback.image || null,
      short_description: fallback.description || null,
      about: fallback.description || null,
      website_url: null,
      founded_year: null,
      headquarters: null,
      tagline: fallback.tagline,
      years_experience: fallback.yearsExperience,
      projects_count: fallback.projectsCount,
      is_published: true,
      created_at: "",
      updated_at: "",
    };
  }

  return data as unknown as SupabaseBuilder;
}
