/**
 * Static dropdown option lists for the Projects page filters.
 * Kept separate from PROJECTS so filter UI options don't depend on
 * which projects happen to exist in mock data.
 */

export const PROPERTY_TYPES = ["All", "Apartments", "Plots"] as const;
export type PropertyTypeFilter = (typeof PROPERTY_TYPES)[number];

export const LOCALITIES = [
  "Whitefield",
  "Hebbal",
  "Sarjapur Road",
  "Devanahalli",
  "Yelahanka",
  "Marathahalli",
  "Electronic City",
  "Bannerghatta Road",
  "Kanakapura Road",
];

export const BUILDERS = [
  "Prestige Group",
  "Sattva Group",
  "Century Real Estate",
  "Brigade Group",
  "Godrej Properties",
  "Sobha Limited",
];

export interface BudgetRange {
  label: string;
  minLakh: number;
  maxLakh: number;
}

export const BUDGET_RANGES: BudgetRange[] = [
  { label: "Under \u20b950L", minLakh: 0, maxLakh: 50 },
  { label: "\u20b950L \u2013 \u20b980L", minLakh: 50, maxLakh: 80 },
  { label: "\u20b980L \u2013 \u20b91.2Cr", minLakh: 80, maxLakh: 120 },
  { label: "\u20b91.2Cr \u2013 \u20b92Cr", minLakh: 120, maxLakh: 200 },
  { label: "Above \u20b92Cr", minLakh: 200, maxLakh: Infinity },
];

export const BHK_OPTIONS = [1, 2, 3, 4];

export const POSSESSION_OPTIONS = ["Ready to Move", "Under Construction"] as const;

export const SORT_OPTIONS = [
  "Relevance",
  "Price: Low to High",
  "Price: High to Low",
  "Newest First",
] as const;
export type SortOption = (typeof SORT_OPTIONS)[number];
