import { Star } from "lucide-react";
import type { Testimonial } from "@/lib/data/testimonials";

export default function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  const { name, location, project, text, rating, initials, accentColor } = testimonial;

  return (
    <div className="rounded-2xl p-7 flex flex-col bg-offwhite border border-black/[0.05]">
      {/* Open quote */}
      <div className="font-serif text-5xl leading-none mb-4 select-none text-gold opacity-45">
        &ldquo;
      </div>

      <p className="text-gray-600 text-sm leading-relaxed flex-1 mb-4">{text}</p>

      <p className="text-xs italic mb-6 text-gray-400">{project}</p>

      {/* Author row */}
      <div className="flex items-center gap-3 pt-4 border-t border-black/[0.07]">
        <div
          className="w-10 h-10 rounded-full flex items-center justify-center text-white text-sm font-bold flex-shrink-0"
          style={{ background: accentColor }}
        >
          {initials}
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-semibold truncate text-navy">{name}</p>
          <p className="text-xs text-gray-400">{location}</p>
        </div>
        <div className="flex gap-0.5 flex-shrink-0">
          {Array.from({ length: rating }).map((_, i) => (
            <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
          ))}
        </div>
      </div>
    </div>
  );
}
