import { z } from "zod";
import { localityOptions } from "@/lib/areas";

/** Indian mobile: 10 digits starting 6–9, with an optional +91 / 0 prefix. */
const PHONE_RE = /^(?:\+?91[\s-]?|0)?[6-9]\d{9}$/;

export const deliveryTimeOptions = [
  "Bulk morning slot (5:00 – 8:00 AM)",
  "Home morning slot (7:00 – 11:00 AM)",
  "Evening slot (4:00 – 7:00 PM)",
  "Flexible — whatever suits your route",
] as const;

export const businessTypeOptions = [
  "Hotel / banquet",
  "Restaurant / café",
  "Cloud kitchen",
  "Caterer",
  "Hostel / PG",
  "Hospital or corporate canteen",
  "Kirana / retail store",
  "Mandi reseller",
  "Other",
] as const;

export const monthlyVolumeOptions = [
  "Under 250 kg",
  "250 – 750 kg",
  "750 – 2,000 kg",
  "2,000 – 5,000 kg",
  "Over 5,000 kg",
  "Not sure yet",
] as const;

export const inquirySchema = z
  .object({
    /** Which form the visitor filled in — helps route the lead. */
    variant: z.enum(["general", "bulk", "home"]),

    name: z
      .string()
      .trim()
      .min(2, "Please enter your name")
      .max(80, "That name looks too long"),

    // Spaces, dashes and brackets are stripped before validating, so
    // "+91 98765 43210" and "9876543210" are both accepted.
    phone: z
      .string()
      .trim()
      .transform((value) => value.replace(/[\s\-().]/g, ""))
      .refine(
        (value) => PHONE_RE.test(value),
        "Enter a valid 10-digit Indian mobile number",
      ),

    email: z
      .union([z.literal(""), z.email("Enter a valid email address")])
      .optional(),

    audience: z.enum(["business", "household"], {
      message: "Tell us who we're supplying",
    }),

    businessName: z.string().trim().max(120).optional(),

    locality: z
      .string()
      .trim()
      .min(1, "Choose your locality")
      .refine((v) => localityOptions.includes(v), "Choose a locality from the list"),

    requirement: z
      .string()
      .trim()
      .min(10, "A line or two about what you need helps us quote accurately")
      .max(1200, "Please keep this under 1200 characters"),

    deliveryTime: z.enum(deliveryTimeOptions, {
      message: "Pick a delivery window",
    }),

    // --- Bulk-only fields (required when variant === "bulk") ---
    businessType: z.enum(businessTypeOptions).optional(),
    monthlyVolume: z.enum(monthlyVolumeOptions).optional(),

    /**
     * Honeypot. Hidden from real users, so anything in it means a bot.
     * Deliberately permissive here — the route handler silently discards
     * a filled honeypot rather than returning an error a bot could learn from.
     */
    website: z.string().optional(),
  })
  .superRefine((data, ctx) => {
    if (data.audience === "business" && !data.businessName?.trim()) {
      ctx.addIssue({
        code: "custom",
        path: ["businessName"],
        message: "Please add your business name",
      });
    }
    if (data.variant === "bulk") {
      if (!data.businessType) {
        ctx.addIssue({
          code: "custom",
          path: ["businessType"],
          message: "Select the kind of business you run",
        });
      }
      if (!data.monthlyVolume) {
        ctx.addIssue({
          code: "custom",
          path: ["monthlyVolume"],
          message: "An approximate monthly volume helps us quote",
        });
      }
    }
  });

export type InquiryInput = z.input<typeof inquirySchema>;
export type InquiryPayload = z.output<typeof inquirySchema>;
