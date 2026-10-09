"use client";

import {
  BHK_OPTIONS,
  BUDGET_RANGES,
  BUILDERS,
  LOCALITIES,
  POSSESSION_OPTIONS,
  PROPERTY_TYPES,
  type PropertyTypeFilter,
} from "@/lib/data/filters";
import PremiumDropdown from "@/components/ui/PremiumDropdown";

export interface FilterValues {
  propertyType: PropertyTypeFilter;
  search: string;
  locality: string;
  builder: string;
  budget: string;
  bhk: string;
  possession: string;
}

export const DEFAULT_FILTERS: FilterValues = {
  propertyType: "All",
  search: "",
  locality: "",
  builder: "",
  budget: "",
  bhk: "",
  possession: "",
};

interface ProjectFiltersProps {
  draft: FilterValues;
  onDraftChange: (next: FilterValues) => void;
  onPropertyTypeChange: (type: PropertyTypeFilter) => void;
  onApply: () => void;
  onClear: () => void;
}

export default function ProjectFilters({
  draft,
  onDraftChange,
  onPropertyTypeChange,
  onApply,
  onClear,
}: ProjectFiltersProps) {
  const labelClass =
    "block text-[10px] font-bold text-gray-400 uppercase tracking-[0.1em] mb-1.5";

  function update<K extends keyof FilterValues>(key: K, value: FilterValues[K]) {
    onDraftChange({ ...draft, [key]: value });
  }

  return (
    <div className="bg-white rounded-2xl p-5 md:p-6 border border-black/[0.06] shadow-[0_4px_24px_rgba(0,0,0,0.06)]">
      {/* Property type tabs + clear filters */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-5">
        <div
          role="tablist"
          aria-label="Property type"
          className="inline-flex items-center gap-1 bg-offwhite rounded-lg p-1"
        >
          {PROPERTY_TYPES.map((type, index) => (
            <button
              key={`${type}-${index}`}
              type="button"
              role="tab"
              aria-selected={draft.propertyType === type}
              onClick={() => onPropertyTypeChange(type)}
              className={`px-4 py-2 rounded-md text-sm font-semibold transition-colors ${
                draft.propertyType === type
                  ? "bg-navy text-white"
                  : "text-gray-500 hover:text-navy"
              }`}
            >
              {type}
            </button>
          ))}
        </div>

        <button
          type="button"
          onClick={onClear}
          className="text-xs font-semibold text-gray-400 hover:text-navy transition-colors underline underline-offset-2"
        >
          Clear Filters
        </button>
      </div>

      {/* Filter fields */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Locality */}
        <div>
          <label className={labelClass}>Locality</label>
          <PremiumDropdown
            aria-label="Locality"
            options={LOCALITIES}
            value={draft.locality}
            onChange={(locality) => update("locality", locality)}
            placeholder="All Localities"
            triggerClassName="border-black/[0.08] bg-offwhite"
            triggerPaddingClassName="py-2.5 px-3.5"
          />
        </div>

        {/* Builder */}
        <div>
          <label className={labelClass}>Builder</label>
          <PremiumDropdown
            aria-label="Builder"
            options={BUILDERS}
            value={draft.builder}
            onChange={(builder) => update("builder", builder)}
            placeholder="All Builders"
            triggerClassName="border-black/[0.08] bg-offwhite"
            triggerPaddingClassName="py-2.5 px-3.5"
          />
        </div>

        {/* Budget */}
        <div>
          <label className={labelClass}>Budget</label>
          <PremiumDropdown
            aria-label="Budget"
            options={BUDGET_RANGES.map(({ label }) => label)}
            value={draft.budget}
            onChange={(budget) => update("budget", budget)}
            placeholder="Any Budget"
            triggerClassName="border-black/[0.08] bg-offwhite"
            triggerPaddingClassName="py-2.5 px-3.5"
          />
        </div>

        {/* BHK */}
        <div>
          <label className={labelClass}>BHK Configuration</label>
          <PremiumDropdown
            aria-label="BHK Configuration"
            options={BHK_OPTIONS.map((bhk) => ({
              value: String(bhk),
              label: `${bhk} BHK`,
            }))}
            value={draft.bhk}
            onChange={(bhk) => update("bhk", bhk)}
            placeholder="Any BHK"
            triggerClassName="border-black/[0.08] bg-offwhite"
            triggerPaddingClassName="py-2.5 px-3.5"
          />
        </div>

        {/* Possession status */}
        <div>
          <label className={labelClass}>Possession Status</label>
          <PremiumDropdown
            aria-label="Possession Status"
            options={POSSESSION_OPTIONS}
            value={draft.possession}
            onChange={(possession) => update("possession", possession)}
            placeholder="Any Status"
            triggerClassName="border-black/[0.08] bg-offwhite"
            triggerPaddingClassName="py-2.5 px-3.5"
          />
        </div>
      </div>

      {/* Apply */}
      <div className="mt-5 flex justify-end">
        <button
          type="button"
          onClick={onApply}
          className="w-full sm:w-auto px-8 py-2.5 rounded-lg text-white font-semibold text-sm transition-opacity hover:opacity-90 bg-gold"
        >
          Apply Filters
        </button>
      </div>
    </div>
  );
}
