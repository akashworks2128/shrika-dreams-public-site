import { supabase } from "../supabase";
import {
  PROJECTS,
  type Project,
  type ProjectAmenity,
  type ProjectConfiguration,
  type ProjectHighlight,
  type ProjectLandmark,
} from "./projects";

export type SupabaseProjectImage = {
  id: string;
  image_url: string;
  image_type: string;
  alt_text: string | null;
  sort_order: number;
};

export type SupabaseProjectConfiguration = {
  id: string;
  configuration: string;
  area: string | null;
  price: string | null;
  availability: string | null;
  sort_order: number;
};

export type SupabaseBuilder = {
  id: string;
  name: string;
  logo_url?: string | null;
};

export type SupabaseLocality = {
  id: string;
  name: string;
  slug?: string | null;
};

export type SupabaseProject = {
  id: string;
  name: string;
  slug: string;

  builder_id: string | null;
  locality_id: string | null;

  property_type: "Apartment" | "Plot";
  status: string;

  short_description: string | null;
  description: string | null;

  price_type: string;
  price_min: number | null;
  price_max: number | null;
  price_display: string | null;
  price_unit: string | null;
  price_per_sqft: string | null;
  price_note: string | null;

  bhk_options: string[] | null;
  configuration: string | null;
  area_range: string | null;

  total_units: number | null;
  available_units: number | null;

  plot_sizes: string[] | null;

  area: string | null;
  area_unit: string | null;
  project_size: string | null;
  total_plots: number | null;
  project_size_text: string | null;

  possession_date: string | null;
  availability: string | null;

  highlights: unknown;
  amenities: unknown;
  nearby_landmarks: unknown;
  connectivity: unknown;

  address: string | null;
  city: string | null;
  pincode: number | null;

  latitude: number | null;
  longitude: number | null;

  google_maps_url: string | null;
  map_embed_url: string | null;

  brochure_url: string | null;
  brochure_title: string | null;
  brochure_size: string | null;
  brochure_gated: boolean;

  is_featured: boolean;
  is_published: boolean;

  sort_order: number;
  created_at: string;
  updated_at: string;

  builders: SupabaseBuilder | null;
  localities: SupabaseLocality | null;

  project_configurations: SupabaseProjectConfiguration[];
  project_images: SupabaseProjectImage[];
};

const PROJECT_SELECT = `
  *,
  builders (
    id,
    name,
    logo_url
  ),
  localities (
    id,
    name,
    slug
  ),
  project_configurations (
    id,
    configuration,
    area,
    price,
    availability,
    sort_order
  ),
  project_images (
    id,
    image_url,
    image_type,
    alt_text,
    sort_order
  )
`;

function toNumber(value: unknown, fallback = 0): number {
  const number = Number(value);

  return Number.isFinite(number) ? number : fallback;
}

function toNumberArray(value: unknown): number[] {
  if (!Array.isArray(value)) {
    return [];
  }

  return value
    .map((item) => Number(item))
    .filter((item) => Number.isFinite(item));
}

function toAvailability(
  value: string | null,
): ProjectConfiguration["availability"] {
  if (value === "Limited Units" || value === "Sold Out") {
    return value;
  }

  return "Available";
}

function getStaticFallback(
  row: SupabaseProject,
): Project | undefined {
  return PROJECTS.find(
    (project) =>
      project.name.toLowerCase() ===
      String(row.name ?? "").toLowerCase(),
  );
}

function getFallbackImage(
  row: SupabaseProject,
  fallback?: Project,
): string {
  const heroImage = row.project_images?.find(
    (image) => image.image_type.toLowerCase() === "hero",
  )?.image_url;

  const firstImage = row.project_images?.[0]?.image_url;

  return (
    heroImage ||
    firstImage ||
    fallback?.image ||
    "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=900&h=650&fit=crop&auto=format"
  );
}

function getIconForAmenity(
  label: string,
): ProjectAmenity["icon"] {
  const value = label.toLowerCase();

  if (value.includes("pool")) return "pool";
  if (value.includes("gym") || value.includes("fitness")) return "gym";
  if (value.includes("garden") || value.includes("green")) return "garden";
  if (value.includes("security") || value.includes("cctv")) return "security";
  if (value.includes("parking")) return "parking";
  if (value.includes("play")) return "playground";
  if (value.includes("sport")) return "sports";
  if (value.includes("power")) return "power";
  if (value.includes("lift") || value.includes("elevator")) return "lift";
  if (value.includes("walk") || value.includes("jog")) return "walking";
  if (value.includes("hall") || value.includes("banquet")) return "hall";
  if (value.includes("club")) return "clubhouse";

  return "security";
}

function mapAmenities(
  value: unknown,
  fallback?: ProjectAmenity[],
): ProjectAmenity[] | undefined {
  if (!Array.isArray(value) || value.length === 0) {
    return fallback;
  }

  const result: ProjectAmenity[] = [];

  for (const item of value) {
    if (typeof item === "string" && item.trim()) {
      result.push({
        icon: getIconForAmenity(item),
        label: item.trim(),
      });

      continue;
    }

    if (
      item &&
      typeof item === "object" &&
      "label" in item
    ) {
      const record = item as Record<string, unknown>;
      const label = String(record.label ?? "").trim();

      if (!label) continue;

      result.push({
        icon:
          typeof record.icon === "string"
            ? (record.icon as ProjectAmenity["icon"])
            : getIconForAmenity(label),
        label,
      });
    }
  }

  return result.length ? result : fallback;
}

function mapHighlights(
  value: unknown,
  fallback?: ProjectHighlight[],
): ProjectHighlight[] | undefined {
  if (!Array.isArray(value) || value.length === 0) {
    return fallback;
  }

  const result: ProjectHighlight[] = [];

  for (const item of value) {
    if (typeof item === "string" && item.trim()) {
      result.push({
        icon: "location",
        title: item.trim(),
        description: "",
      });

      continue;
    }

    if (
      item &&
      typeof item === "object"
    ) {
      const record = item as Record<string, unknown>;

      const title = String(
        record.title ?? record.label ?? "",
      ).trim();

      if (!title) continue;

      result.push({
        icon:
          typeof record.icon === "string"
            ? (record.icon as ProjectHighlight["icon"])
            : "location",
        title,
        description: String(
          record.description ?? "",
        ).trim(),
      });
    }
  }

  return result.length ? result : fallback;
}

function mapLandmarks(
  value: unknown,
  fallback?: ProjectLandmark[],
): ProjectLandmark[] | undefined {
  if (!Array.isArray(value) || value.length === 0) {
    return fallback;
  }

  const result: ProjectLandmark[] = [];

  for (const item of value) {
    if (
      item &&
      typeof item === "object"
    ) {
      const record = item as Record<string, unknown>;

      // Admin saves landmarks as { name, distance }.
      const label = String(
        record.label ?? record.name ?? "",
      ).trim();

      const distance = String(
        record.distance ?? "",
      ).trim();

      if (label) {
        result.push({
          label,
          distance,
        });
      }
    }
  }

  return result.length ? result : fallback;
}

function getConnectivitySummary(
  value: unknown,
  fallback?: string,
): string | undefined {
  if (!Array.isArray(value) || value.length === 0) {
    return fallback;
  }

  const parts = value
    .map((item) => {
      if (typeof item === "string") {
        return item.trim();
      }

      if (
        item &&
        typeof item === "object"
      ) {
        const record = item as Record<string, unknown>;

        const label = String(
          record.label ?? "",
        ).trim();

        // Admin saves connectivity as { label, info }.
        const distance = String(
          record.distance ?? record.value ?? record.info ?? "",
        ).trim();

        if (label && distance) {
          return `${label}: ${distance}`;
        }

        return label || distance;
      }

      return "";
    })
    .filter(Boolean);

  return parts.length
    ? parts.join(" • ")
    : fallback;
}

export function mapSupabaseProject(
  row: SupabaseProject,
): Project {
  const fallback = getStaticFallback(row);

  const propertyType: Project["propertyType"] =
    row.property_type === "Plot"
      ? "Plot"
      : "Apartment";

  const priceMinLakh = toNumber(row.price_min);
  const priceMaxLakh = toNumber(
    row.price_max,
    priceMinLakh,
  );

  const bhkValues = toNumberArray(
    row.bhk_options,
  );

  const plotSizes = Array.isArray(row.plot_sizes)
    ? row.plot_sizes
    : [];

  const status: Project["status"] =
    row.status === "Under Construction"
      ? "Under Construction"
      : "Ready to Move";

  const price =
    row.price_display?.trim() ||
    (propertyType === "Plot"
      ? priceMinLakh
        ? `₹${priceMinLakh}L onwards`
        : "Price on request"
      : priceMinLakh && priceMaxLakh
        ? `₹${priceMinLakh}L – ₹${priceMaxLakh}L`
        : "Price on request");

  const bhk =
    row.configuration?.trim() ||
    (bhkValues.length
      ? bhkValues
          .map((value) => `${value} BHK`)
          .join(" & ")
      : propertyType === "Plot"
        ? "Plot"
        : "—");

  const acres =
    row.area?.trim() ||
    row.project_size_text?.trim() ||
    (plotSizes.length
      ? plotSizes.join(", ")
      : undefined);

  const image = getFallbackImage(
    row,
    fallback,
  );

  const gallery =
    row.project_images?.length
      ? [...row.project_images]
          .sort(
            (a, b) =>
              Number(a.sort_order ?? 0) -
              Number(b.sort_order ?? 0),
          )
          .map((item) => item.image_url)
      : fallback?.gallery;

  const configurations =
    row.project_configurations?.length
      ? [...row.project_configurations]
          .sort(
            (a, b) =>
              Number(a.sort_order ?? 0) -
              Number(b.sort_order ?? 0),
          )
          .map((config) => ({
            id: config.id,
            bhk: config.configuration ?? "",
            areaSqft: config.area ?? "",
            priceLabel: config.price ?? "",
            availability: toAvailability(
              config.availability,
            ),
          }))
      : fallback?.configurations;

  return {
    id: row.id,
    builderId: row.builder_id ?? undefined,
    localityId: row.locality_id ?? undefined,
    slug: row.slug,
    name: row.name,

    locality:
      row.localities?.name ||
      row.address ||
      "Bangalore",

    builder:
      row.builders?.name || "",

    price,
    priceMinLakh,
    priceMaxLakh,

    bhk,
    bhkValues,

    image,

    status,
    propertyType,

    tag: row.is_featured
      ? "Featured"
      : propertyType === "Plot"
        ? "Plot"
        : "Property",

    tagDark: !row.is_featured,

    featured: Boolean(row.is_featured),

    description:
      row.description ??
      row.short_description ??
      fallback?.description,

    heroImage: image,

    gallery,

    possession:
      row.possession_date ??
      fallback?.possession,

    totalUnits:
      row.total_units ??
      fallback?.totalUnits,

    projectSize:
      row.project_size ??
      row.project_size_text ??
      fallback?.projectSize,

    highlights: mapHighlights(
      row.highlights,
      fallback?.highlights,
    ),

    configurations,

    amenities: mapAmenities(
      row.amenities,
      fallback?.amenities,
    ),

    nearbyLandmarks: mapLandmarks(
      row.nearby_landmarks,
      fallback?.nearbyLandmarks,
    ),

    connectivitySummary:
      getConnectivitySummary(
        row.connectivity,
        fallback?.connectivitySummary,
      ),

    brochure:
      row.brochure_url ??
      fallback?.brochure,

    acres,
  };
}

export async function getProjectsFromSupabase(): Promise<
  SupabaseProject[]
> {
  const { data, error } = await supabase
    .from("projects")
    .select(PROJECT_SELECT)
    .eq("is_published", true)
    .order("sort_order", {
      ascending: true,
    })
    .order("created_at", {
      ascending: false,
    });

  if (error) {
    console.error(
      "Supabase projects error:",
      {
        message: error.message,
        code: error.code,
        details: error.details,
        hint: error.hint,
      },
    );

    throw new Error(error.message);
  }

  return (data ?? []) as unknown as SupabaseProject[];
}

export async function getProjectBySlugFromSupabase(
  slug: string,
): Promise<Project | null> {
  // Database only: a project page exists only if a published row with this
  // slug exists in Supabase.
  const { data, error } = await supabase
    .from("projects")
    .select(PROJECT_SELECT)
    .eq("slug", slug)
    .eq("is_published", true)
    .limit(1)
    .maybeSingle();

  if (error) {
    console.error(
      "Supabase project detail error:",
      {
        message: error.message,
        code: error.code,
        details: error.details,
        hint: error.hint,
      },
    );

    return null;
  }

  if (!data) {
    return null;
  }

  return mapSupabaseProject(
    data as unknown as SupabaseProject,
  );
}
export async function getProjectsByBuilderIdFromSupabase(
  builderId: string,
): Promise<Project[]> {
  const { data, error } = await supabase
    .from("projects")
    .select(PROJECT_SELECT)
    .eq("builder_id", builderId)
    .eq("is_published", true)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Supabase builder projects error:", error);
    return [];
  }

  return ((data ?? []) as unknown as SupabaseProject[]).map(mapSupabaseProject);
}

export async function getProjectsByLocalityIdFromSupabase(
  localityId: string,
): Promise<Project[]> {
  const { data, error } = await supabase
    .from("projects")
    .select(PROJECT_SELECT)
    .eq("locality_id", localityId)
    .eq("is_published", true)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Supabase locality projects error:", error);
    return [];
  }

  return ((data ?? []) as unknown as SupabaseProject[]).map(mapSupabaseProject);
}
