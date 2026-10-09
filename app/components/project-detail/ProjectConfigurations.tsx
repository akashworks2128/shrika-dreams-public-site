import type { Project } from "@/lib/data/projects";
import FadeIn from "@/components/motion/FadeIn";
import SectionEyebrow from "@/components/ui/SectionEyebrow";

const AVAILABILITY_STYLES: Record<string, string> = {
  Available: "text-green-700 bg-green-50 border-green-200",
  "Limited Units": "text-gold bg-gold/[0.1] border-gold/25",
  "Sold Out": "text-gray-400 bg-gray-50 border-gray-200",
};

export default function ProjectConfigurations({ project }: { project: Project }) {
  if (!project.configurations || project.configurations.length === 0) return null;

  return (
    <section className="py-8 lg:py-10 bg-white border-t border-black/[0.05]">
      <div className="max-w-7xl mx-auto px-4 sm:px-5 lg:px-8">
        <FadeIn className="mb-6 lg:mb-8">
          <SectionEyebrow className="mb-2.5">
            Pricing
          </SectionEyebrow>
          <h2 className="font-serif text-2xl md:text-3xl lg:text-[2.25rem] font-bold text-navy">
            {project.propertyType === "Plot" ? "Plot Sizes & Pricing" : "Price & Configurations"}
          </h2>
        </FadeIn>

        <FadeIn delay={0.1} className="overflow-hidden rounded-xl border border-black/[0.06]">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-offwhite text-left">
                  <th className="px-4 py-3 font-semibold text-navy text-xs uppercase tracking-wide">
                    {project.propertyType === "Plot" ? "Plot Size" : "Configuration"}
                  </th>
                  <th className="px-4 py-3 font-semibold text-navy text-xs uppercase tracking-wide">
                    {project.propertyType === "Plot" ? "Plot Area" : "Area"}
                  </th>
                  <th className="px-4 py-3 font-semibold text-navy text-xs uppercase tracking-wide">
                    Starting Price
                  </th>
                  <th className="px-4 py-3 font-semibold text-navy text-xs uppercase tracking-wide">
                    Availability
                  </th>
                </tr>
              </thead>
              <tbody>
                {project.configurations.map((config, index) => (
                  <tr
                    key={
                      config.id ??
                      `${config.bhk}-${config.areaSqft}-${config.priceLabel}-${index}`
                    }
                    className="border-t border-black/[0.06]"
                  >
                    <td className="px-4 py-3.5 font-semibold text-navy whitespace-nowrap">
                      {config.bhk}
                    </td>
                    <td className="px-4 py-3.5 text-gray-500 whitespace-nowrap">
                      {config.areaSqft}
                    </td>
                    <td className="px-4 py-3.5 font-medium text-navy whitespace-nowrap">
                      {config.priceLabel}
                    </td>
                    <td className="px-4 py-3.5">
                      <span
                        className={`inline-block px-2.5 py-1 rounded-full text-[11px] font-semibold border whitespace-nowrap ${
                          AVAILABILITY_STYLES[config.availability]
                        }`}
                      >
                        {config.availability}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </FadeIn>

        <p className="text-xs text-gray-400 mt-3">
          * Prices are indicative and subject to change. Contact us for the latest pricing and offers.
        </p>
      </div>
    </section>
  );
}
