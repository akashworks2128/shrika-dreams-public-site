import { TESTIMONIALS } from "@/lib/data/testimonials";
import FadeIn from "@/components/motion/FadeIn";
import TestimonialCard from "./TestimonialCard";
import SectionEyebrow from "@/components/ui/SectionEyebrow";

export default function TestimonialsSection() {
  return (
    <section className="py-14 lg:py-18 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-5 lg:px-8">
        <FadeIn className="text-center mb-14">
          <SectionEyebrow className="mb-3">
            Client Stories
          </SectionEyebrow>
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-navy">
            What Our Clients Say
          </h2>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {TESTIMONIALS.map((testimonial, idx) => (
            <FadeIn key={testimonial.id} delay={idx * 0.1}>
              <TestimonialCard testimonial={testimonial} />
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
