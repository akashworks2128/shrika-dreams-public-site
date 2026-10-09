import { TrendingUp } from "lucide-react";
import type { Locality } from "@/lib/data/localities";
import FadeIn from "@/components/motion/FadeIn";
import PriceTrendChart from "./PriceTrendChart";
import SectionEyebrow from "@/components/ui/SectionEyebrow";

export default function LocalityPriceTrends({ locality }: { locality: Locality }) {
  const { priceTrends } = locality;
  const first = priceTrends[0];
  const last = priceTrends[priceTrends.length - 1];
  const growthPct =
    first && last && first.pricePerSqft > 0 && priceTrends.length > 1
      ? Math.round(((last.pricePerSqft - first.pricePerSqft) / first.pricePerSqft) * 1000) / 10
      : 0;

  return (
    <section className="py-8 lg:py-10 bg-offwhite">
      <div className="max-w-7xl mx-auto px-4 sm:px-5 lg:px-8">
        <FadeIn className="mb-6 lg:mb-8">
          <SectionEyebrow className="mb-2.5">
            Market Insights
          </SectionEyebrow>
          <h2 className="font-serif text-2xl md:text-3xl font-bold text-navy">
            Price Trends in {locality.name}
          </h2>
        </FadeIn>

        <FadeIn
          delay={0.1}
          className="grid grid-cols-1 lg:grid-cols-3 gap-6 min-w-0 bg-white rounded-xl border border-black/[0.06] shadow-[0_1px_4px_rgba(0,0,0,0.04)] p-5 lg:p-7"
        >
          {/* Chart */}
          <div className="lg:col-span-2">
            <PriceTrendChart trends={priceTrends} />
          </div>

          {/* Insight panel */}
          <div className="flex flex-col justify-between border-t lg:border-t-0 lg:border-l border-black/[0.06] pt-5 lg:pt-0 lg:pl-6">
            <div>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-gold/[0.12] text-gold text-xs font-bold mb-4">
                <TrendingUp className="w-3.5 h-3.5" />
                {priceTrends.length > 1
                  ? `${growthPct > 0 ? "+" : ""}${growthPct}% YoY Growth`
                  : "Trend data pending"}
              </div>
              <p className="text-sm text-gray-500 leading-relaxed">
                {locality.name} properties have demonstrated strong, resilient
                value appreciation driven by metro connectivity, growing IT
                infrastructure, and rising demand from investors.
              </p>
            </div>

            <div className="mt-6 pt-5 border-t border-black/[0.06]">
              <p className="text-[10px] font-bold uppercase tracking-wide text-gray-400 mb-1">
                Current Average Price
              </p>
              <p className="font-serif text-2xl font-bold text-navy">
                {locality.averagePrice}
              </p>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
