import { FileText } from "lucide-react";
import type { Project } from "@/lib/data/projects";
import LeadForm from "@/components/home/LeadForm";

export default function ProjectBrochureCTA({ project }: { project: Project }) {
  return (
    <section className="py-8 lg:py-10 bg-offwhite border-t border-black/[0.05]">
      <div className="max-w-4xl mx-auto px-4 sm:px-5 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.15fr] gap-8 items-start rounded-xl border border-black/[0.06] bg-white p-6 lg:p-8">
          <div>
            <div className="w-14 h-14 rounded-xl flex items-center justify-center mb-5 bg-gold/[0.12]">
              <FileText className="w-7 h-7 text-gold" />
            </div>
            <h3 className="font-serif text-xl lg:text-2xl font-bold text-navy mb-2">
              Interested in {project.name}?
            </h3>
            <p className="text-sm text-gray-500 leading-relaxed">
              Share your details and we&apos;ll help with the latest pricing, availability,
              floor plans and brochure for this project.
            </p>
          </div>

          <LeadForm
            context={{
              project_id: project.id,
              builder_id: project.builderId,
              locality_id: project.localityId,
              projectName: project.name,
              builderName: project.builder,
              localityName: project.locality,
              property_type: project.propertyType,
              bhk: project.bhk,
            }}
          />
        </div>
      </div>
    </section>
  );
}
