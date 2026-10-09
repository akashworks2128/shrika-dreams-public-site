"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { Search } from "lucide-react";

export default function LocalitySearch() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [value, setValue] = useState(searchParams.get("q") ?? "");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const trimmed = value.trim();
    router.push(trimmed ? `/localities?q=${encodeURIComponent(trimmed)}` : "/localities");
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col sm:flex-row items-stretch gap-2.5 max-w-xl mx-auto"
    >
      <div className="relative flex-1">
        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
        <input
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Search by locality..."
          aria-label="Search by locality"
          className="w-full pl-10 pr-3 py-3 text-sm bg-white rounded-lg outline-none focus:ring-2 focus:ring-amber-300 placeholder:text-gray-400 text-navy"
        />
      </div>
      <button
        type="submit"
        className="px-6 py-3 rounded-lg text-sm font-semibold text-white transition-opacity hover:opacity-90 bg-gold whitespace-nowrap"
      >
        Search
      </button>
    </form>
  );
}
