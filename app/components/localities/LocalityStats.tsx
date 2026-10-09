import { Building2, IndianRupee, LayoutGrid, TrendingUp } from "lucide-react";
import type { Locality } from "@/lib/data/localities";

export default function LocalityStats({ locality }: { locality: Locality }) {
  const stats = [
    { label: "Avg Price", value: locality.averagePrice, icon: TrendingUp },
    { label: "Price Range", value: locality.priceRange, icon: IndianRupee },
    { label: "Popular BHK", value: locality.popularBhk, icon: LayoutGrid },
    { label: "Active Projects", value: `${locality.activeProjects}+ Projects`, icon: Building2 },
  ];

  return (
    <div className="relative z-10 -mt-2 pb-10 bg-offwhite">
      <div className="max-w-7xl mx-auto px-4 sm:px-5 lg:px-8 pt-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {stats.map(({ label, value, icon: Icon }, index) => (
            <div
              key={`${label}-${index}`}
              className="flex items-center gap-3 bg-white rounded-lg p-3.5 border border-black/[0.06] shadow-[0_1px_4px_rgba(0,0,0,0.04)]"
            >
              <div className="w-8 h-8 rounded-md flex items-center justify-center flex-shrink-0 bg-gold/[0.12]">
                <Icon className="w-4 h-4 text-gold" />
              </div>
              <div className="min-w-0">
                <p className="text-[9px] font-bold uppercase tracking-wide text-gray-400">
                  {label}
                </p>
                <p className="text-sm font-bold text-navy truncate">{value}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
