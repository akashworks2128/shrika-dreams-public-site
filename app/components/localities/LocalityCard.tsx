import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Building2 } from "lucide-react";
import type { Locality } from "@/lib/data/localities";

export default function LocalityCard({ locality }: { locality: Locality }) {
  const { name, slug, image, shortDescription, averagePrice, startingPrice, activeProjects } =
    locality;

  return (
    <article className="group h-full flex flex-col bg-white rounded-xl overflow-hidden border border-black/[0.06] shadow-[0_1px_4px_rgba(0,0,0,0.04)] transition-all duration-500 hover:shadow-[0_16px_36px_rgba(0,0,0,0.10)] hover:-translate-y-1">
      {/* Image */}
      <div className="relative h-44 bg-gray-100 overflow-hidden flex-shrink-0">
        <Image
          src={image}
          alt={`${name}, Bangalore`}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />
        <div className="absolute top-3 right-3">
          <span className="px-2.5 py-1 text-[10px] font-bold bg-white/95 rounded text-navy">
            {averagePrice}
          </span>
        </div>
      </div>

      {/* Body */}
      <div className="p-5 flex flex-col flex-1">
        <h3 className="font-serif font-bold text-lg text-navy mb-1.5">{name}</h3>
        <p className="text-sm text-gray-500 leading-relaxed mb-4">
          {shortDescription}
        </p>

        <div className="mt-auto">
          <div className="flex items-center justify-between py-3.5 border-y border-black/[0.06] mb-4">
            <div>
              <p className="text-[9px] font-bold uppercase tracking-wide text-gray-400 mb-0.5">
                Starting Price
              </p>
              <p className="text-sm font-bold text-gold">{startingPrice}</p>
            </div>
            <div className="text-right">
              <p className="text-[9px] font-bold uppercase tracking-wide text-gray-400 mb-0.5">
                Projects
              </p>
              <p className="text-sm font-bold text-gold flex items-center justify-end gap-1">
                <Building2 className="w-3 h-3" />
                {activeProjects}
              </p>
            </div>
          </div>

          <Link
            href={`/localities/${slug}`}
            className="inline-flex items-center gap-1 text-sm font-semibold text-navy group"
          >
            View Locality Details
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </article>
  );
}
