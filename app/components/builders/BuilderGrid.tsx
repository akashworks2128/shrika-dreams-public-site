import type { PartnerBuilder } from "@/lib/data/builders";
import FadeIn from "@/components/motion/FadeIn";
import BuilderCard from "./BuilderCard";

export default function BuilderGrid({ builders }: { builders: PartnerBuilder[] }) {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-5 lg:px-8 pb-14 lg:pb-16">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 min-w-0">
        {builders.map((builder, idx) => (
          <FadeIn key={builder.id} delay={idx * 0.06} className="h-full">
            <BuilderCard builder={builder} accent={idx % 2 === 0 ? "navy" : "gold"} />
          </FadeIn>
        ))}
      </div>
    </div>
  );
}
