import { NextResponse } from "next/server";

type LeadEmailPayload = {
  leadId?: string;
  name: string;
  phone: string;
  email?: string;
  whatsapp?: string;
  preferred_contact?: string;
  message?: string;
  projectName?: string;
  builderName?: string;
  localityName?: string;
  property_type?: string;
  bhk?: string;
  budget?: string;
  source?: string;
  createdAt?: string;
};

function escapeHtml(value: unknown): string {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

export async function POST(request: Request) {
  let body: LeadEmailPayload;

  try {
    body = (await request.json()) as LeadEmailPayload;
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  if (!body.name?.trim() || !body.phone?.trim()) {
    return NextResponse.json({ error: "Name and phone are required." }, { status: 400 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const recipient = process.env.LEAD_NOTIFICATION_EMAIL;
  const from = process.env.RESEND_FROM_EMAIL;

  // The lead is already safely stored in Supabase by the public form.
  // Email notification is best-effort so a mail-provider outage never loses a lead.
  if (!apiKey || !recipient || !from) {
    console.warn(
      "Lead email is not configured. Set RESEND_API_KEY, LEAD_NOTIFICATION_EMAIL and RESEND_FROM_EMAIL.",
    );
    return NextResponse.json({ emailSent: false, reason: "email_not_configured" });
  }

  const subject = body.projectName
    ? `New Lead — ${body.projectName}`
    : "New Lead — Shrika Dreams";

  const rows = [
    ["Name", body.name],
    ["Phone", body.phone],
    ["Email", body.email],
    ["WhatsApp", body.whatsapp],
    ["Preferred contact", body.preferred_contact],
    ["Project", body.projectName],
    ["Builder", body.builderName],
    ["Locality", body.localityName],
    ["Property type", body.property_type],
    ["BHK / configuration", body.bhk],
    ["Budget", body.budget],
    ["Source", body.source || "Website"],
    ["Message", body.message],
  ].filter(([, value]) => value);

  const html = `
    <div style="font-family:Arial,sans-serif;line-height:1.6;color:#172235;max-width:680px">
      <h2 style="margin-bottom:20px">New Lead — Shrika Dreams</h2>
      <table cellpadding="8" cellspacing="0" style="border-collapse:collapse;width:100%">
        ${rows
          .map(
            ([label, value]) =>
              `<tr><td style="font-weight:600;border-bottom:1px solid #eee;width:180px">${escapeHtml(label)}</td><td style="border-bottom:1px solid #eee">${escapeHtml(value)}</td></tr>`,
          )
          .join("")}
      </table>
    </div>
  `;

  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from,
        to: [recipient],
        subject,
        html,
      }),
    });

    if (!response.ok) {
      const detail = await response.text();
      console.error("Lead email provider error:", detail);
      return NextResponse.json({ emailSent: false, reason: "email_provider_error" });
    }

    return NextResponse.json({ emailSent: true });
  } catch (error) {
    console.error("Lead email request failed:", error);
    return NextResponse.json({ emailSent: false, reason: "email_request_failed" });
  }
}
