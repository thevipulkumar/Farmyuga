import "server-only";

import nodemailer from "nodemailer";

import { siteConfig } from "@/lib/site-config";
import type { InquiryPayload } from "@/lib/inquiry-schema";

/**
 * Lead delivery: email over cPanel SMTP + an optional WhatsApp alert.
 *
 * Both channels are BEST EFFORT. If credentials are missing or a provider is
 * down we log the failure and still return success to the visitor — a lead
 * that reached the server log is far better than an error screen that makes
 * someone abandon the form. Check the app's stderr in cPanel if a lead never
 * arrives.
 *
 * All configuration comes from environment variables. See .env.example, and
 * set them in cPanel → Setup Node.js App → Environment variables.
 */

export type Lead = Omit<InquiryPayload, "website"> & {
  receivedAt: string;
  source: string;
};

const LABELS: Record<string, string> = {
  variant: "Form",
  name: "Name",
  phone: "Phone / WhatsApp",
  email: "Email",
  audience: "Customer type",
  businessName: "Business name",
  businessType: "Business type",
  monthlyVolume: "Monthly volume",
  locality: "Locality",
  deliveryTime: "Preferred delivery",
  requirement: "Requirement",
  receivedAt: "Received at",
};

const FIELD_ORDER: (keyof Lead)[] = [
  "name",
  "phone",
  "email",
  "audience",
  "businessName",
  "businessType",
  "monthlyVolume",
  "locality",
  "deliveryTime",
  "requirement",
  "variant",
  "receivedAt",
];

function istTimestamp(iso: string) {
  return new Date(iso).toLocaleString("en-IN", {
    timeZone: "Asia/Kolkata",
    dateStyle: "medium",
    timeStyle: "short",
  });
}

function rows(lead: Lead) {
  return FIELD_ORDER.map((key) => {
    const value = lead[key];
    if (value === undefined || value === null || value === "") return null;
    const label = LABELS[key] ?? key;
    const shown = key === "receivedAt" ? istTimestamp(String(value)) : String(value);
    return { label, value: shown };
  }).filter((row): row is { label: string; value: string } => row !== null);
}

function toPlainText(lead: Lead) {
  return rows(lead)
    .map((row) => `${row.label}: ${row.value}`)
    .join("\n");
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function toHtml(lead: Lead) {
  const body = rows(lead)
    .map(
      (row) =>
        `<tr><td style="padding:10px 16px;border-bottom:1px solid #E3EAE4;font-weight:600;color:#14532D;white-space:nowrap;vertical-align:top">${escapeHtml(
          row.label,
        )}</td><td style="padding:10px 16px;border-bottom:1px solid #E3EAE4;color:#14181A">${escapeHtml(
          row.value,
        ).replace(/\n/g, "<br>")}</td></tr>`,
    )
    .join("");

  const heading =
    lead.variant === "bulk"
      ? "New BULK inquiry"
      : lead.variant === "home"
        ? "New home delivery inquiry"
        : "New inquiry";

  return `<div style="font-family:system-ui,-apple-system,'Segoe UI',sans-serif;background:#F7F9F4;padding:24px">
  <div style="max-width:640px;margin:0 auto;background:#fff;border:1px solid #E3EAE4;border-radius:16px;overflow:hidden">
    <div style="background:#16A34A;color:#fff;padding:20px 24px">
      <div style="font-size:12px;letter-spacing:.18em;text-transform:uppercase;opacity:.85">${escapeHtml(siteConfig.name)} website</div>
      <div style="font-size:22px;font-weight:800;margin-top:4px">${heading}</div>
    </div>
    <table style="width:100%;border-collapse:collapse;font-size:15px">${body}</table>
    <div style="padding:16px 24px;background:#F7F9F4;font-size:13px;color:#5C6B60">
      Reply to this email, or call ${escapeHtml(lead.phone)} directly.
    </div>
  </div>
</div>`;
}

/** Short line for the WhatsApp alert — kept under a couple of hundred chars. */
function toWhatsAppText(lead: Lead) {
  const kind = lead.variant === "bulk" ? "BULK" : lead.variant === "home" ? "HOME" : "NEW";
  const who = lead.businessName ? `${lead.name} (${lead.businessName})` : lead.name;
  return [
    `${kind} inquiry — ${siteConfig.name}`,
    `${who} · ${lead.phone}`,
    `${lead.locality} · ${lead.deliveryTime}`,
    lead.monthlyVolume ? `Volume: ${lead.monthlyVolume}` : null,
    `"${lead.requirement.slice(0, 220)}"`,
  ]
    .filter(Boolean)
    .join("\n");
}

/* ------------------------------------------------------------------ */
/* Email — cPanel SMTP via nodemailer                                  */
/* ------------------------------------------------------------------ */

async function sendEmail(lead: Lead) {
  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, LEAD_TO_EMAIL } = process.env;

  if (!SMTP_HOST || !SMTP_USER || !SMTP_PASS) {
    console.warn("[farmyuga] SMTP not configured — email skipped");
    return { ok: false, skipped: true };
  }

  const port = Number(SMTP_PORT ?? 465);

  const transporter = nodemailer.createTransport({
    host: SMTP_HOST,
    port,
    // 465 is implicit TLS; 587 upgrades with STARTTLS.
    secure: port === 465,
    auth: { user: SMTP_USER, pass: SMTP_PASS },
  });

  const subject =
    lead.variant === "bulk"
      ? `Bulk inquiry — ${lead.businessName || lead.name} (${lead.locality})`
      : `Website inquiry — ${lead.name} (${lead.locality})`;

  await transporter.sendMail({
    from: `"${siteConfig.name} website" <${SMTP_USER}>`,
    to: LEAD_TO_EMAIL || siteConfig.email,
    replyTo: lead.email ? `${lead.name} <${lead.email}>` : undefined,
    subject,
    text: toPlainText(lead),
    html: toHtml(lead),
  });

  return { ok: true };
}

/* ------------------------------------------------------------------ */
/* WhatsApp — Meta Cloud API                                           */
/* ------------------------------------------------------------------ */

async function sendWhatsApp(lead: Lead) {
  const {
    WHATSAPP_TOKEN,
    WHATSAPP_PHONE_NUMBER_ID,
    WHATSAPP_ALERT_TO,
    WHATSAPP_TEMPLATE_NAME,
  } = process.env;

  if (!WHATSAPP_TOKEN || !WHATSAPP_PHONE_NUMBER_ID || !WHATSAPP_ALERT_TO) {
    console.warn("[farmyuga] WhatsApp alert not configured — skipped");
    return { ok: false, skipped: true };
  }

  const url = `https://graph.facebook.com/v21.0/${WHATSAPP_PHONE_NUMBER_ID}/messages`;
  const summary = toWhatsAppText(lead);

  /**
   * Meta only allows free-form text inside a 24-hour customer service window.
   * A business-initiated alert therefore needs an APPROVED TEMPLATE with one
   * body variable. Set WHATSAPP_TEMPLATE_NAME once your template is live;
   * without it we attempt a plain text message, which works only if you have
   * messaged the business number from the alert number in the last 24 hours.
   */
  const body = WHATSAPP_TEMPLATE_NAME
    ? {
        messaging_product: "whatsapp",
        to: WHATSAPP_ALERT_TO,
        type: "template",
        template: {
          name: WHATSAPP_TEMPLATE_NAME,
          language: { code: "en" },
          components: [
            { type: "body", parameters: [{ type: "text", text: summary }] },
          ],
        },
      }
    : {
        messaging_product: "whatsapp",
        to: WHATSAPP_ALERT_TO,
        type: "text",
        text: { body: summary },
      };

  const res = await fetch(url, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${WHATSAPP_TOKEN}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    throw new Error(`WhatsApp API ${res.status}: ${await res.text()}`);
  }

  return { ok: true };
}

/* ------------------------------------------------------------------ */

/** Fire both channels. Never throws — the caller must not fail on this. */
export async function deliverLead(lead: Lead) {
  const [email, whatsapp] = await Promise.allSettled([
    sendEmail(lead),
    sendWhatsApp(lead),
  ]);

  if (email.status === "rejected") {
    console.error("[farmyuga] email delivery failed:", email.reason);
  }
  if (whatsapp.status === "rejected") {
    console.error("[farmyuga] whatsapp alert failed:", whatsapp.reason);
  }

  return {
    email: email.status === "fulfilled" ? email.value : { ok: false },
    whatsapp: whatsapp.status === "fulfilled" ? whatsapp.value : { ok: false },
  };
}
