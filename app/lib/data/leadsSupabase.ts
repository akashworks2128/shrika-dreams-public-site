import { supabase } from "../supabase";

export type PublicLeadPayload = {
  name: string;
  phone: string;
  email?: string;
  whatsapp?: string;
  preferred_contact?: string;
  message?: string;
  project_id?: string;
  builder_id?: string;
  locality_id?: string;
  property_type?: string;
  bhk?: string;
  budget?: string;
  source?: string;
};

export async function createPublicLead(payload: PublicLeadPayload): Promise<void> {
  const clean = Object.fromEntries(
    Object.entries({
      ...payload,
      source: payload.source || "Website",
      status: "New",
    }).filter(([, value]) => value !== undefined && value !== ""),
  );

  const { error } = await supabase
    .from("leads")
    .insert(clean);

  if (error) {
    console.error("Supabase lead submission error:", {
      message: error.message,
      code: error.code,
      details: error.details,
      hint: error.hint,
    });
    throw new Error(error.message);
  }
}
