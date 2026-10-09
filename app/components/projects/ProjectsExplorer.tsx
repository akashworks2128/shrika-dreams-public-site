"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { ArrowUpDown, Check, ChevronDown, X } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { PROJECTS, type Project } from "@/lib/data/projects";
import {
  getProjectsFromSupabase,
  mapSupabaseProject,
} from "@/lib/data/projectsSupabase";
import {
  BUDGET_RANGES,
  SORT_OPTIONS,
  type PropertyTypeFilter,
  type SortOption,
} from "@/lib/data/filters";
import ProjectFilters, {
  DEFAULT_FILTERS,
  type FilterValues,
} from "./ProjectFilters";
import ProjectGrid from "./ProjectGrid";
import ProjectPagination from "./ProjectPagination";

const PAGE_SIZE = 6;

/**
 * Custom premium dropdown for the results sort control, replacing the
 * native <select> (which rendered as an unstyled browser dropdown).
 * Kept local to this file since it's only ever used here.
 */
function SortDropdown({
  value,
  onChange,
}: {
  value: SortOption;
  onChange: (option: SortOption) => void;
}) {
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(() =>
    SORT_OPTIONS.indexOf(value),
  );
  const containerRef = useRef<HTMLDivElement>(null);
  const optionRefs = useRef<(HTMLButtonElement | null)[]>([]);

  // Click-outside to close.
  useEffect(() => {
    if (!open) return;
    function handleClickOutside(e: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [open]);

  // Focus the active option whenever the menu opens or the active index changes.
  useEffect(() => {
    if (open) optionRefs.current[activeIndex]?.focus();
  }, [open, activeIndex]);

  function openMenu() {
    setActiveIndex(SORT_OPTIONS.indexOf(value));
    setOpen(true);
  }

  function selectOption(option: SortOption) {
    onChange(option);
    setOpen(false);
    containerRef.current?.querySelector("button")?.focus();
  }

  function handleTriggerKeyDown(e: React.KeyboardEvent) {
    if (e.key === "ArrowDown" || e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      openMenu();
    }
  }

  function handleOptionKeyDown(e: React.KeyboardEvent, index: number) {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIndex((index + 1) % SORT_OPTIONS.length);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex((index - 1 + SORT_OPTIONS.length) % SORT_OPTIONS.length);
    } else if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      selectOption(SORT_OPTIONS[index]);
    } else if (e.key === "Escape") {
      e.preventDefault();
      setOpen(false);
      containerRef.current?.querySelector("button")?.focus();
    } else if (e.key === "Tab") {
      setOpen(false);
    }
  }

  return (
    <div ref={containerRef} className="relative">
      <button
        type="button"
        onClick={() => (open ? setOpen(false) : openMenu())}
        onKeyDown={handleTriggerKeyDown}
        aria-haspopup="listbox"
        aria-expanded={open}
        className="flex items-center gap-2 pl-3.5 pr-3 py-2.5 rounded-lg border border-black/[0.08] bg-white text-sm text-navy font-medium transition-colors hover:border-gold/40 focus:outline-none focus:ring-2 focus:ring-gold/30"
      >
        <ArrowUpDown className="w-3.5 h-3.5 text-gray-400 flex-shrink-0" />
        <span>{value}</span>
        <ChevronDown
          className={`w-3.5 h-3.5 text-gray-400 flex-shrink-0 transition-transform duration-200 ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>

      {open && (
        <ul
          role="listbox"
          aria-label="Sort projects"
          className="absolute right-0 z-20 mt-2 w-56 py-1.5 bg-white rounded-lg border border-black/[0.06] shadow-[0_12px_32px_rgba(0,0,0,0.12)] overflow-hidden"
        >
          {SORT_OPTIONS.map((option, index) => {
            const selected = option === value;
            return (
              <li key={`${option}-${index}`} role="presentation">
                <button
                  type="button"
                  role="option"
                  aria-selected={selected}
                  ref={(el) => {
                    optionRefs.current[index] = el;
                  }}
                  tabIndex={index === activeIndex ? 0 : -1}
                  onClick={() => selectOption(option)}
                  onKeyDown={(e) => handleOptionKeyDown(e, index)}
                  onMouseEnter={() => setActiveIndex(index)}
                  className={`w-full flex items-center justify-between gap-2 px-4 py-2.5 text-sm text-left transition-colors focus:outline-none ${
                    selected
                      ? "bg-gold/[0.12] text-navy font-semibold"
                      : "text-gray-600 hover:bg-offwhite hover:text-navy"
                  }`}
                >
                  {option}
                  {selected && (
                    <Check className="w-3.5 h-3.5 text-gold flex-shrink-0" />
                  )}
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}

export default function ProjectsExplorer() {
  const searchParams = useSearchParams();
  const [projects, setProjects] = useState<Project[]>(PROJECTS);

  useEffect(() => {
    let cancelled = false;

    async function loadProjects() {
      try {
        const rows = await getProjectsFromSupabase();

        const mappedProjects = rows.map((row) => mapSupabaseProject(row));

        if (!cancelled && mappedProjects.length > 0) {
          setProjects(mappedProjects);
        }
      } catch (error) {
        console.error("Failed to load public projects from Supabase:", error);
      }
    }

    loadProjects();

    return () => {
      cancelled = true;
    };
  }, []);
  const builderParam = searchParams.get("builder") ?? "";
  const localityParam = searchParams.get("locality") ?? "";
  const budgetParam = searchParams.get("budget") ?? "";
  const bhkParam = searchParams.get("bhk") ?? "";
  // A single string that changes whenever any of the incoming search
  // filters change, so one sync effect/check can react to all of them
  // together instead of duplicating the same logic four times.
  const combinedParams = `${builderParam}|${localityParam}|${budgetParam}|${bhkParam}`;
  const hasIncomingFilters = Boolean(
    builderParam || localityParam || budgetParam || bhkParam,
  );

  const initialFilters: FilterValues = hasIncomingFilters
    ? {
        ...DEFAULT_FILTERS,
        builder: builderParam,
        locality: localityParam,
        budget: budgetParam,
        bhk: bhkParam,
      }
    : DEFAULT_FILTERS;

  const [draft, setDraft] = useState<FilterValues>(initialFilters);
  const [applied, setApplied] = useState<FilterValues>(initialFilters);
  const [sort, setSort] = useState<SortOption>("Relevance");
  const [page, setPage] = useState(1);

  // Tracks the last combination of incoming URL filters we've already
  // applied, so we only re-sync filter state when those params actually
  // change after mount (e.g. navigating from the Home search, or from
  // one Builder card's "View Projects" link to another, without a full
  // page reload) rather than on every render. Using state (not a ref)
  // here is the React-recommended pattern for "adjust state during
  // render in response to a changing prop."
  const [lastSyncedParams, setLastSyncedParams] = useState(combinedParams);
  if (lastSyncedParams !== combinedParams) {
    setLastSyncedParams(combinedParams);
    if (hasIncomingFilters) {
      setDraft((prev) => ({
        ...prev,
        builder: builderParam,
        locality: localityParam,
        budget: budgetParam,
        bhk: bhkParam,
      }));
      setApplied((prev) => ({
        ...prev,
        builder: builderParam,
        locality: localityParam,
        budget: budgetParam,
        bhk: bhkParam,
      }));
      setPage(1);
    }
  }

  // DOM anchor: the "Properties Found" results-header element itself
  // (not the filters above it, not the page as a whole). All
  // scroll-to-listing behavior — pagination AND builder-filter arrival
  // — targets this one element via scrollIntoView, so both behave
  // identically and there is exactly one scroll implementation.
  const propertiesFoundRef = useRef<HTMLDivElement>(null);

  function scrollToPropertiesFound() {
    propertiesFoundRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }

  function goToPage(nextPage: number) {
    setPage(nextPage);
    // Wait a tick so the new page's cards are in the DOM before we
    // measure/scroll, then scroll the "Properties Found" anchor into
    // view rather than the very top of the page.
    requestAnimationFrame(scrollToPropertiesFound);
  }

  // When arriving here via the Home page search, or via a Builders page
  // card's "View Projects" link, land on the exact same "Properties
  // Found" anchor pagination uses — not the top of the page, not the
  // filter panel. Reuses scrollToPropertiesFound() directly; this is
  // not a second scroll implementation.
  //
  // A mount effect racing against a fresh page navigation is
  // inherently less deterministic than a click handler (Suspense
  // resolution, fonts/images still loading, the browser's own
  // navigation scroll behavior). To make it as reliable as pagination:
  //   1. The Links/redirects that send the user here use scroll={false}
  //      (or router.push with { scroll: false }), so Next.js never
  //      performs its own competing scroll-to-top.
  //   2. This effect polls (via rAF) until BOTH the anchor element
  //      exists in the DOM by its stable id AND the applied filters
  //      actually match the incoming params — i.e. the filters have
  //      genuinely been applied (not just requested) and the filtered
  //      results reflect them — before calling the shared scroll
  //      function. Filtering here is synchronous client-side array
  //      filtering, so once `applied` matches, the results below the
  //      anchor are already correct in that same commit.
  const hasScrolledForArrival = useRef(false);
  useEffect(() => {
    if (!hasIncomingFilters || hasScrolledForArrival.current) return;
    const filtersMatch =
      applied.builder === builderParam &&
      applied.locality === localityParam &&
      applied.budget === budgetParam &&
      applied.bhk === bhkParam;
    if (!filtersMatch) return;

    let attempts = 0;
    let frameId: number;
    const tryScroll = () => {
      attempts += 1;
      const anchor = document.getElementById("projects-results");
      if (anchor) {
        hasScrolledForArrival.current = true;
        scrollToPropertiesFound();
      } else if (attempts < 60) {
        frameId = requestAnimationFrame(tryScroll);
      }
    };
    frameId = requestAnimationFrame(tryScroll);
    return () => cancelAnimationFrame(frameId);
  }, [
    hasIncomingFilters,
    applied.builder,
    applied.locality,
    applied.budget,
    applied.bhk,
    builderParam,
    localityParam,
    budgetParam,
    bhkParam,
  ]);

  function handlePropertyTypeChange(type: PropertyTypeFilter) {
    const next = { ...draft, propertyType: type };
    setDraft(next);
    setApplied(next);
    setPage(1);
  }

  function handleApply() {
    setApplied(draft);
    setPage(1);
  }

  function handleClear() {
    setDraft(DEFAULT_FILTERS);
    setApplied(DEFAULT_FILTERS);
    setPage(1);
  }

  function clearBuilderFilter() {
    const next = { ...applied, builder: "" };
    setDraft(next);
    setApplied(next);
    setPage(1);
  }

  const filtered = useMemo(() => {
    let results = [...projects];

    if (applied.propertyType !== "All") {
      const singular =
        applied.propertyType === "Apartments" ? "Apartment" : "Plot";
      results = results.filter((p) => p.propertyType === singular);
    }

    if (applied.search.trim()) {
      const q = applied.search.trim().toLowerCase();
      results = results.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.locality.toLowerCase().includes(q) ||
          p.builder.toLowerCase().includes(q),
      );
    }

    if (applied.locality) {
      results = results.filter((p) => p.locality === applied.locality);
    }

    if (applied.builder) {
      results = results.filter((p) => p.builder === applied.builder);
    }

    if (applied.budget) {
      const range = BUDGET_RANGES.find((b) => b.label === applied.budget);
      if (range) {
        results = results.filter(
          (p) =>
            p.priceMaxLakh >= range.minLakh && p.priceMinLakh <= range.maxLakh,
        );
      }
    }

    if (applied.bhk) {
      const bhkNum = Number(applied.bhk);
      results = results.filter((p) => p.bhkValues.includes(bhkNum));
    }

    if (applied.possession) {
      results = results.filter((p) => p.status === applied.possession);
    }

    if (sort === "Price: Low to High") {
      results.sort((a, b) => a.priceMinLakh - b.priceMinLakh);
    } else if (sort === "Price: High to Low") {
      results.sort((a, b) => b.priceMaxLakh - a.priceMaxLakh);
    } else if (sort === "Newest First") {
      results = [...results].reverse();
    }

    return results;
  }, [projects, applied, sort]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const currentPage = Math.min(page, totalPages);
  const pageItems = filtered.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE,
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-5 lg:px-8 pb-14 lg:pb-16">
      <ProjectFilters
        draft={draft}
        onDraftChange={setDraft}
        onPropertyTypeChange={handlePropertyTypeChange}
        onApply={handleApply}
        onClear={handleClear}
      />

      {/* Results header — this is the "Properties Found" DOM anchor
          scrollIntoView targets (see propertiesFoundRef above). The
          id gives the anchor a stable, directly queryable identity
          (used by the builder-arrival scroll effect to confirm this
          element — and the results below it — actually exist before
          scrolling). scroll-mt-24 keeps it clear of the fixed header
          when scrolled into view. */}
      <div
        id="projects-results"
        ref={propertiesFoundRef}
        className="flex flex-wrap items-center justify-between gap-3 mt-8 mb-6 scroll-mt-24"
      >
        <div className="flex flex-wrap items-center gap-2.5">
          <p className="text-sm text-gray-500">
            <span className="font-bold text-navy">{filtered.length}</span>{" "}
            {filtered.length === 1 ? "Property" : "Properties"} Found
          </p>

          {/* Active builder filter — clearly shown so it's obvious why
              results are narrowed, e.g. after arriving here via a
              Builders page card's "View Projects" link. */}
          {applied.builder && (
            <span className="inline-flex items-center gap-1.5 pl-3 pr-2 py-1 rounded-full bg-navy text-white text-xs font-semibold">
              {applied.builder}
              <button
                type="button"
                onClick={clearBuilderFilter}
                aria-label={`Remove ${applied.builder} filter`}
                className="rounded-full p-0.5 hover:bg-white/20 transition-colors"
              >
                <X className="w-3 h-3" />
              </button>
            </span>
          )}
        </div>

        <SortDropdown value={sort} onChange={setSort} />
      </div>

      <ProjectGrid projects={pageItems} />

      <ProjectPagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={goToPage}
      />
    </div>
  );
}
