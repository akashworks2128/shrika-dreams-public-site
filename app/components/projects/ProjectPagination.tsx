"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";

interface ProjectPaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

/**
 * Builds a page-number list with ellipses for large page counts, e.g.
 * 1 2 3 … 8 9
 */
function getPageList(current: number, total: number): (number | "ellipsis")[] {
  if (total <= 7) {
    return Array.from({ length: total }, (_, i) => i + 1);
  }

  const pages = new Set<number>([1, 2, total - 1, total, current - 1, current, current + 1]);
  const sorted = [...pages].filter((p) => p >= 1 && p <= total).sort((a, b) => a - b);

  const result: (number | "ellipsis")[] = [];
  let prev = 0;
  for (const page of sorted) {
    if (prev && page - prev > 1) result.push("ellipsis");
    result.push(page);
    prev = page;
  }
  return result;
}

export default function ProjectPagination({
  currentPage,
  totalPages,
  onPageChange,
}: ProjectPaginationProps) {
  if (totalPages <= 1) return null;

  const pages = getPageList(currentPage, totalPages);
  const btnBase =
    "min-w-9 h-9 px-2 rounded-lg text-sm font-medium transition-colors flex items-center justify-center";

  return (
    <nav aria-label="Project results pages" className="flex items-center justify-center gap-1.5 mt-10">
      <button
        type="button"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        aria-label="Previous page"
        className={`${btnBase} border border-black/[0.08] text-gray-500 hover:text-navy hover:border-navy/30 disabled:opacity-40 disabled:hover:text-gray-500 disabled:hover:border-black/[0.08] disabled:cursor-not-allowed`}
      >
        <ChevronLeft className="w-4 h-4" />
      </button>

      {pages.map((page, idx) =>
        page === "ellipsis" ? (
          <span key={`ellipsis-${idx}`} className="px-1.5 text-sm text-gray-400">
            …
          </span>
        ) : (
          <button
            key={page}
            type="button"
            onClick={() => onPageChange(page)}
            aria-current={page === currentPage ? "page" : undefined}
            className={`${btnBase} ${
              page === currentPage
                ? "bg-navy text-white"
                : "border border-black/[0.08] text-gray-600 hover:text-navy hover:border-navy/30"
            }`}
          >
            {page}
          </button>
        )
      )}

      <button
        type="button"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        aria-label="Next page"
        className={`${btnBase} border border-black/[0.08] text-gray-500 hover:text-navy hover:border-navy/30 disabled:opacity-40 disabled:hover:text-gray-500 disabled:hover:border-black/[0.08] disabled:cursor-not-allowed`}
      >
        <ChevronRight className="w-4 h-4" />
      </button>
    </nav>
  );
}
