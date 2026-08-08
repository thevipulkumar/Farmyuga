import { NextResponse } from "next/server";

import { inquirySchema } from "@/lib/inquiry-schema";
import { deliverLead, type Lead } from "@/lib/notify";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * Lead capture endpoint.
 *
 * Validates with the same zod schema the form uses, drops obvious spam,
 * then emails the lead and fires a WhatsApp alert (see lib/notify.ts).
 * There is no database and no payment step anywhere on this site — every
 * path ends in a lead.
 */
export async function POST(request: Request) {
  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { ok: false, error: "Invalid JSON body" },
      { status: 400 },
    );
  }

  const parsed = inquirySchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      {
        ok: false,
        error: "Validation failed",
        issues: parsed.error.issues.map((issue) => ({
          path: issue.path.join("."),
          message: issue.message,
        })),
      },
      { status: 422 },
    );
  }

  const { website, ...inquiry } = parsed.data;

  // Honeypot tripped — a bot filled the hidden field. Look successful, do nothing.
  if (website) {
    return NextResponse.json({ ok: true });
  }

  const lead: Lead = {
    ...inquiry,
    receivedAt: new Date().toISOString(),
    source: "farmyuga.com",
  };

  // Always log first. If both delivery channels fail, the lead still exists
  // in the cPanel application log and can be recovered.
  console.log("[farmyuga] new inquiry:", JSON.stringify(lead, null, 2));

  // Email + WhatsApp alert. deliverLead never throws; a delivery failure
  // must not show the visitor an error after they have already typed
  // everything out. Configure credentials in cPanel → Setup Node.js App →
  // Environment variables (see .env.example).
  const delivery = await deliverLead(lead);

  if (!delivery.email.ok && !delivery.whatsapp.ok) {
    console.error(
      "[farmyuga] LEAD NOT DELIVERED — check SMTP / WhatsApp settings. Payload logged above.",
    );
  }

  return NextResponse.json({ ok: true });
}

/** Anything other than POST is a mistake — say so clearly. */
export async function GET() {
  return NextResponse.json(
    { ok: false, error: "Use POST to submit an inquiry." },
    { status: 405 },
  );
}
