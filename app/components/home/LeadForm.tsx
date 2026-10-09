"use client";

import { useState } from "react";
import { CheckCircle, Phone } from "lucide-react";
import PremiumDropdown from "@/components/ui/PremiumDropdown";
import { createPublicLead, type PublicLeadPayload } from "@/lib/data/leadsSupabase";

const BUDGETS = [
  "Under ₹50L",
  "₹50L – ₹80L",
  "₹80L – ₹1.2Cr",
  "₹1.2Cr – ₹2Cr",
  "Above ₹2Cr",
];

export type LeadFormContext = Pick<
  PublicLeadPayload,
  "project_id" | "builder_id" | "locality_id" | "property_type" | "bhk"
> & {
  projectName?: string;
  builderName?: string;
  localityName?: string;
};

export default function LeadForm({ context }: { context?: LeadFormContext }) {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    preferredContact: "Phone",
    budget: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const inputClass =
    "w-full px-4 py-3 text-sm rounded-lg border border-black/[0.08] outline-none focus:ring-2 focus:ring-amber-300 transition-shadow bg-offwhite text-navy";

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (submitting) return;

    setSubmitting(true);
    setError(null);

    const payload: PublicLeadPayload = {
      name: form.name.trim(),
      phone: form.phone.trim(),
      email: form.email.trim() || undefined,
      preferred_contact: form.preferredContact,
      budget: form.budget || undefined,
      message: form.message.trim() || undefined,
      project_id: context?.project_id,
      builder_id: context?.builder_id,
      locality_id: context?.locality_id,
      property_type: context?.property_type,
      bhk: context?.bhk,
      source: context?.project_id ? "Project Enquiry" : "Website",
    };

    try {
      await createPublicLead(payload);

      // Email is intentionally best-effort. A missing mail configuration must
      // never make the customer lose a successfully stored lead.
      void fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...payload,
          projectName: context?.projectName,
          builderName: context?.builderName,
          localityName: context?.localityName,
          createdAt: new Date().toISOString(),
        }),
      }).catch((mailError) => {
        console.error("Lead email notification failed:", mailError);
      });

      setSubmitted(true);
    } catch (submitError) {
      console.error("Lead form submission failed:", submitError);
      setError("Something went wrong. Please try again or contact us directly.");
    } finally {
      setSubmitting(false);
    }
  }

  if (submitted) {
    return (
      <div className="text-center py-10">
        <div className="w-14 h-14 rounded-full mx-auto mb-5 flex items-center justify-center bg-gold/[0.12]">
          <CheckCircle className="w-7 h-7 text-gold" />
        </div>
        <h3 className="font-serif text-xl font-bold mb-2 text-navy">Request Received!</h3>
        <p className="text-gray-500 text-sm">
          Thank you. We&apos;ll get back to you within 2 hours on working days.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {context?.projectName ? (
        <div className="rounded-lg border border-gold/20 bg-gold/[0.06] px-4 py-3 text-sm text-navy">
          Enquiring about <span className="font-semibold">{context.projectName}</span>
        </div>
      ) : null}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="lead-name" className="block text-[10px] font-bold text-gray-400 uppercase tracking-[0.12em] mb-1.5">
            Full Name *
          </label>
          <input suppressHydrationWarning id="lead-name" type="text" required placeholder="Your name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className={inputClass} />
        </div>
        <div>
          <label htmlFor="lead-phone" className="block text-[10px] font-bold text-gray-400 uppercase tracking-[0.12em] mb-1.5">
            Phone Number *
          </label>
          <input suppressHydrationWarning id="lead-phone" type="tel" required placeholder="+91 XXXXX XXXXX" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className={inputClass} />
        </div>
        <div className="sm:col-span-2">
          <label htmlFor="lead-email" className="block text-[10px] font-bold text-gray-400 uppercase tracking-[0.12em] mb-1.5">
            Email Address
          </label>
          <input suppressHydrationWarning id="lead-email" type="email" placeholder="your@email.com" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className={inputClass} />
        </div>
        <div className="sm:col-span-2">
          <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-[0.12em] mb-1.5">
            Preferred Contact
          </label>
          <PremiumDropdown
            aria-label="Preferred Contact"
            options={["Phone", "WhatsApp", "Email"]}
            value={form.preferredContact}
            onChange={(preferredContact) => setForm({ ...form, preferredContact })}
            placeholder="Choose contact method…"
            triggerClassName="border-black/[0.08] bg-offwhite"
            triggerPaddingClassName="px-4 py-3"
          />
        </div>
        <div className="sm:col-span-2">
          <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-[0.12em] mb-1.5">
            Budget Range
          </label>
          <PremiumDropdown aria-label="Budget Range" options={["", ...BUDGETS]} value={form.budget} onChange={(budget) => setForm({ ...form, budget })} placeholder="Select your budget…" triggerClassName="border-black/[0.08] bg-offwhite" triggerPaddingClassName="px-4 py-3" />
        </div>
        <div className="sm:col-span-2">
          <label htmlFor="lead-message" className="block text-[10px] font-bold text-gray-400 uppercase tracking-[0.12em] mb-1.5">
            Message (Optional)
          </label>
          <textarea suppressHydrationWarning id="lead-message" rows={3} placeholder="Tell us what you are looking for…" value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} className={`${inputClass} resize-none`} />
        </div>
      </div>

      {error ? <p role="alert" className="text-center text-xs text-red-500">{error}</p> : null}

      <button type="submit" suppressHydrationWarning disabled={submitting} className="w-full py-4 rounded-xl text-white font-semibold text-sm transition-opacity hover:opacity-90 disabled:opacity-60 flex items-center justify-center gap-2 bg-gold">
        <Phone className="w-4 h-4" />
        {submitting ? "Sending…" : "Request a Callback"}
      </button>
      <p className="text-center text-xs text-gray-400">Your details are used only to respond to your enquiry.</p>
    </form>
  );
}
