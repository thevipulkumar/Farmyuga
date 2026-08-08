import { NextResponse } from "next/server";

import { inquirySchema } from "@/lib/inquiry-schema";

export const runtime = "nodejs";

/**
 * Lead capture endpoint.
 *
 * Validates with the same zod schema the form uses, drops obvious spam,
 * logs the payload and returns { ok: true }. There is no database and no
 * payment step anywhere on this site — every path ends in a lead.
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

  const lead = {
    ...inquiry,
    receivedAt: new Date().toISOString(),
    source: "farmyuga.com",
  };

  // Visible in the server console / hosting logs until a provider is wired up.
  console.log("[farmyuga] new inquiry:", JSON.stringify(lead, null, 2));

  /* --------------------------------------------------------------------
     TODO: wire to email provider / CRM
     --------------------------------------------------------------------
     Replace the console.log above with a real delivery step. Examples:

       1. Email (Resend):
            const resend = new Resend(process.env.RESEND_API_KEY);
            await resend.emails.send({
              from: "Farmyuga site <no-reply@farmyuga.com>",
              to: "hello@farmyuga.com",
              subject: `New ${lead.variant} inquiry — ${lead.name}`,
              text: JSON.stringify(lead, null, 2),
            });

       2. Google Sheets / CRM webhook:
            await fetch(process.env.LEADS_WEBHOOK_URL!, {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(lead),
            });

       3. WhatsApp Business API notification to the dispatch desk.

     Keep the response shape as { ok: true } so the form keeps working.
     Add any secrets to .env.local — never commit them.
  -------------------------------------------------------------------- */

  return NextResponse.json({ ok: true });
}

/** Anything other than POST is a mistake — say so clearly. */
export async function GET() {
  return NextResponse.json(
    { ok: false, error: "Use POST to submit an inquiry." },
    { status: 405 },
  );
}
