"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";
import PremiumDropdown from "@/components/ui/PremiumDropdown";
import { BHK_OPTIONS, BUDGET_RANGES, BUILDERS, LOCALITIES } from "@/lib/data/filters";

const POPULAR_AREAS = [
  "Whitefield",
  "Hebbal",
  "Sarjapur Road",
  "Devanahalli",
  "Yelahanka",
];

export default function PropertySearchForm() {
  const router = useRouter();
  const [form, setForm] = useState({
    locality: "",
    budget: "",
    bhk: "",
    builder: "",
  });

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    // Build the query string from whichever filters are actually set,
    // reusing the exact same filter keys/values the Projects page's own
    // filter bar reads (locality, budget, bhk, builder) — no separate
    // filtering vocabulary.
    const params = new URLSearchParams();
    if (form.locality) params.set("locality", form.locality);
    if (form.budget) params.set("budget", form.budget);
    if (form.bhk) params.set("bhk", form.bhk);
    if (form.builder) params.set("builder", form.builder);

    const query = params.toString();
    // scroll: false so Next.js doesn't perform its own scroll-to-top on
    // navigation — ProjectsExplorer scrolls to the "Properties Found"
    // results anchor itself once the filtered results are ready.
    router.push(query ? `/projects?${query}` : "/projects", { scroll: false });
  }

  return (
    <div>
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-2xl p-3 shadow-2xl w-full"
        style={{ boxShadow: "0 24px 60px rgba(0,0,0,0.35)" }}
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-2">
          {/* Locality */}
          <PremiumDropdown
            aria-label="Locality"
            options={["", ...LOCALITIES]}
            value={form.locality}
            onChange={(locality) => setForm({ ...form, locality })}
            placeholder="All Localities"
          />

          {/* Budget */}
          <PremiumDropdown
            aria-label="Budget"
            options={["", ...BUDGET_RANGES.map(({ label }) => label)]}
            value={form.budget}
            onChange={(budget) => setForm({ ...form, budget })}
            placeholder="Any Budget"
          />

          {/* BHK */}
          <PremiumDropdown
            aria-label="BHK configuration"
            options={[
              { value: "", label: "Any BHK" },
              ...BHK_OPTIONS.map((bhk) => ({ value: String(bhk), label: `${bhk} BHK` })),
            ]}
            value={form.bhk}
            onChange={(bhk) => setForm({ ...form, bhk })}
            placeholder="Any BHK"
          />

          {/* Builder */}
          <PremiumDropdown
            aria-label="Builder"
            options={["", ...BUILDERS]}
            value={form.builder}
            onChange={(builder) => setForm({ ...form, builder })}
            placeholder="All Builders"
          />

          {/* Search button */}
          <button
            type="submit"
            className="py-3.5 rounded-lg text-white font-semibold text-sm whitespace-nowrap transition-all duration-300 hover:-translate-y-px hover:shadow-[0_8px_20px_rgba(201,160,75,0.25)] flex items-center justify-center gap-2 bg-gold"
          >
            <Search className="w-4 h-4" />
            Search
          </button>
        </div>
      </form>

      {/* Quick area tags */}
      <div className="mt-5 flex flex-wrap gap-2">
        <span className="text-xs font-medium text-white/40">Popular:</span>
        {POPULAR_AREAS.map((area) => (
          <button
            key={area}
            type="button"
            onClick={() => setForm((prev) => ({ ...prev, locality: area }))}
            className="px-3 py-1 text-xs rounded-full border border-white/[0.14] text-white/60 transition-all duration-300 hover:border-gold/60 hover:bg-gold/10 hover:text-white hover:-translate-y-px"
          >
            {area}
          </button>
        ))}
      </div>
    </div>
  );
}
