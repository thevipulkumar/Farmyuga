"use client";

import * as React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm, useWatch } from "react-hook-form";
import { Building2, CircleCheckBig, Home, Loader2, Send } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { WhatsAppButton } from "@/components/shared/whatsapp-button";
import { localityOptions } from "@/lib/areas";
import {
  businessTypeOptions,
  deliveryTimeOptions,
  inquirySchema,
  monthlyVolumeOptions,
  type InquiryPayload,
} from "@/lib/inquiry-schema";
import { cn } from "@/lib/utils";

type Variant = "general" | "bulk" | "home";

type QuoteFormProps = {
  variant?: Variant;
  className?: string;
  /** Pre-fills the requirement box, e.g. from a product card's "Ask Price". */
  defaultRequirement?: string;
};

const copy: Record<Variant, { submit: string; success: string }> = {
  general: {
    submit: "Send Inquiry",
    success:
      "Thanks — your inquiry is with our team. We reply to every message the same day, usually within two hours during business hours.",
  },
  bulk: {
    submit: "Request Bulk Quote",
    success:
      "Thanks — your bulk requirement is in. Our account desk will call you today with a written rate card and delivery slot options.",
  },
  home: {
    submit: "Request My Basket",
    success:
      "Thanks — we've got your list. We'll WhatsApp you today's rate and confirm your delivery slot shortly.",
  },
};

function FieldError({ message }: { message?: string }) {
  if (!message) return null;
  return (
    <p role="alert" className="text-sm font-medium text-tomato">
      {message}
    </p>
  );
}

export function QuoteForm({
  variant = "general",
  className,
  defaultRequirement = "",
}: QuoteFormProps) {
  const [submitted, setSubmitted] = React.useState(false);
  const [serverError, setServerError] = React.useState<string | null>(null);

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<InquiryPayload>({
    resolver: zodResolver(inquirySchema),
    defaultValues: {
      variant,
      name: "",
      phone: "",
      email: "",
      audience: variant === "home" ? "household" : "business",
      businessName: "",
      locality: "",
      requirement: defaultRequirement,
      deliveryTime:
        variant === "home" ? deliveryTimeOptions[1] : deliveryTimeOptions[0],
      website: "",
    },
  });

  const audience = useWatch({ control, name: "audience" });

  const onSubmit = handleSubmit(async (values) => {
    setServerError(null);
    try {
      const res = await fetch("/api/inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      if (!res.ok) throw new Error("Request failed");
      const data: { ok?: boolean } = await res.json();
      if (!data.ok) throw new Error("Request failed");
      setSubmitted(true);
      reset();
    } catch {
      setServerError(
        "We couldn't send that just now. Please try again, or reach us on WhatsApp — we're quicker there anyway.",
      );
    }
  });

  if (submitted) {
    return (
      <div
        className={cn(
          "flex flex-col items-start gap-5 rounded-2xl border border-brand-green/30 bg-mint p-7 md:p-9",
          className,
        )}
      >
        <span className="flex size-14 items-center justify-center rounded-2xl bg-brand-green text-white">
          <CircleCheckBig className="size-7" />
        </span>
        <div className="space-y-2">
          <h3 className="type-h3 text-forest">Inquiry received</h3>
          <p className="text-forest/80">{copy[variant].success}</p>
        </div>
        <div className="flex flex-wrap gap-3">
          <WhatsAppButton
            context={variant === "bulk" ? "bulk" : variant === "home" ? "home" : "general"}
            label="Message us now"
            variant="primary"
          />
          <Button variant="secondary" onClick={() => setSubmitted(false)}>
            Send another inquiry
          </Button>
        </div>
      </div>
    );
  }

  return (
    <form
      onSubmit={onSubmit}
      noValidate
      className={cn(
        "rounded-2xl border border-border bg-white p-6 shadow-soft md:p-8",
        className,
      )}
    >
      <input type="hidden" {...register("variant")} />

      {/* Honeypot — hidden from people, catnip for bots. */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label htmlFor={`website-${variant}`}>Website</label>
        <input
          id={`website-${variant}`}
          tabIndex={-1}
          autoComplete="off"
          {...register("website")}
        />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor={`name-${variant}`}>
            Your name <span className="text-tomato">*</span>
          </Label>
          <Input
            id={`name-${variant}`}
            placeholder="e.g. Rajeev Prasad"
            autoComplete="name"
            aria-invalid={Boolean(errors.name)}
            {...register("name")}
          />
          <FieldError message={errors.name?.message} />
        </div>

        <div className="space-y-2">
          <Label htmlFor={`phone-${variant}`}>
            Phone / WhatsApp <span className="text-tomato">*</span>
          </Label>
          <Input
            id={`phone-${variant}`}
            type="tel"
            inputMode="tel"
            placeholder="98765 43210"
            autoComplete="tel"
            aria-invalid={Boolean(errors.phone)}
            {...register("phone")}
          />
          <FieldError message={errors.phone?.message} />
        </div>

        <div className="space-y-2 sm:col-span-2">
          <Label htmlFor={`email-${variant}`}>
            Email <span className="font-normal text-muted">(optional)</span>
          </Label>
          <Input
            id={`email-${variant}`}
            type="email"
            placeholder="you@example.com"
            autoComplete="email"
            aria-invalid={Boolean(errors.email)}
            {...register("email")}
          />
          <FieldError message={errors.email?.message} />
        </div>

        <fieldset className="space-y-2 sm:col-span-2">
          <legend className="mb-2 text-sm font-semibold text-charcoal">
            I am a <span className="text-tomato">*</span>
          </legend>
          <Controller
            control={control}
            name="audience"
            render={({ field }) => (
              <div className="grid grid-cols-2 gap-3">
                {(
                  [
                    { value: "business", label: "Business", icon: Building2 },
                    { value: "household", label: "Household", icon: Home },
                  ] as const
                ).map((option) => {
                  const active = field.value === option.value;
                  const Icon = option.icon;
                  return (
                    <button
                      key={option.value}
                      type="button"
                      aria-pressed={active}
                      onClick={() => field.onChange(option.value)}
                      className={cn(
                        "flex items-center justify-center gap-2 rounded-lg border px-4 py-3 text-sm font-semibold transition-all duration-200 ease-out",
                        active
                          ? "border-brand-green bg-mint text-forest shadow-soft"
                          : "border-border bg-white text-muted hover:border-leaf hover:text-forest",
                      )}
                    >
                      <Icon className="size-4" />
                      {option.label}
                    </button>
                  );
                })}
              </div>
            )}
          />
          <FieldError message={errors.audience?.message} />
        </fieldset>

        {audience === "business" ? (
          <div className="space-y-2 sm:col-span-2">
            <Label htmlFor={`businessName-${variant}`}>
              Business name <span className="text-tomato">*</span>
            </Label>
            <Input
              id={`businessName-${variant}`}
              placeholder="e.g. Hotel Kanke Residency"
              autoComplete="organization"
              aria-invalid={Boolean(errors.businessName)}
              {...register("businessName")}
            />
            <FieldError message={errors.businessName?.message} />
          </div>
        ) : null}

        {variant === "bulk" ? (
          <>
            <div className="space-y-2">
              <Label htmlFor={`businessType-${variant}`}>
                Type of business <span className="text-tomato">*</span>
              </Label>
              <Controller
                control={control}
                name="businessType"
                render={({ field }) => (
                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger
                      id={`businessType-${variant}`}
                      aria-invalid={Boolean(errors.businessType)}
                    >
                      <SelectValue placeholder="Select your business type" />
                    </SelectTrigger>
                    <SelectContent>
                      {businessTypeOptions.map((option) => (
                        <SelectItem key={option} value={option}>
                          {option}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />
              <FieldError message={errors.businessType?.message} />
            </div>

            <div className="space-y-2">
              <Label htmlFor={`monthlyVolume-${variant}`}>
                Expected monthly volume <span className="text-tomato">*</span>
              </Label>
              <Controller
                control={control}
                name="monthlyVolume"
                render={({ field }) => (
                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger
                      id={`monthlyVolume-${variant}`}
                      aria-invalid={Boolean(errors.monthlyVolume)}
                    >
                      <SelectValue placeholder="Approximate kg per month" />
                    </SelectTrigger>
                    <SelectContent>
                      {monthlyVolumeOptions.map((option) => (
                        <SelectItem key={option} value={option}>
                          {option}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />
              <FieldError message={errors.monthlyVolume?.message} />
            </div>
          </>
        ) : null}

        <div className="space-y-2">
          <Label htmlFor={`locality-${variant}`}>
            Locality in Ranchi <span className="text-tomato">*</span>
          </Label>
          <Controller
            control={control}
            name="locality"
            render={({ field }) => (
              <Select value={field.value} onValueChange={field.onChange}>
                <SelectTrigger
                  id={`locality-${variant}`}
                  aria-invalid={Boolean(errors.locality)}
                >
                  <SelectValue placeholder="Where do we deliver?" />
                </SelectTrigger>
                <SelectContent>
                  {localityOptions.map((option) => (
                    <SelectItem key={option} value={option}>
                      {option}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          />
          <FieldError message={errors.locality?.message} />
        </div>

        <div className="space-y-2">
          <Label htmlFor={`deliveryTime-${variant}`}>
            Preferred delivery time <span className="text-tomato">*</span>
          </Label>
          <Controller
            control={control}
            name="deliveryTime"
            render={({ field }) => (
              <Select value={field.value} onValueChange={field.onChange}>
                <SelectTrigger
                  id={`deliveryTime-${variant}`}
                  aria-invalid={Boolean(errors.deliveryTime)}
                >
                  <SelectValue placeholder="Choose a slot" />
                </SelectTrigger>
                <SelectContent>
                  {deliveryTimeOptions.map((option) => (
                    <SelectItem key={option} value={option}>
                      {option}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          />
          <FieldError message={errors.deliveryTime?.message} />
        </div>

        <div className="space-y-2 sm:col-span-2">
          <Label htmlFor={`requirement-${variant}`}>
            What do you need? <span className="text-tomato">*</span>
          </Label>
          <Textarea
            id={`requirement-${variant}`}
            placeholder={
              variant === "bulk"
                ? "e.g. 40 kg aloo, 25 kg pyaaz, 15 kg tamatar and 10 kg palak daily for a 60-cover restaurant."
                : "e.g. Weekly basket for a family of four — no karela please. Palak, aloo, pyaaz, tamatar, dhaniya every week."
            }
            aria-invalid={Boolean(errors.requirement)}
            {...register("requirement")}
          />
          <FieldError message={errors.requirement?.message} />
        </div>
      </div>

      {serverError ? (
        <p
          role="alert"
          className="mt-5 rounded-lg border border-tomato/30 bg-tomato-tint px-4 py-3 text-sm font-medium text-tomato"
        >
          {serverError}
        </p>
      ) : null}

      <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center">
        <Button
          type="submit"
          size="lg"
          variant={variant === "bulk" ? "amber" : "primary"}
          disabled={isSubmitting}
          className="w-full sm:w-auto"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="animate-spin" />
              Sending…
            </>
          ) : (
            <>
              <Send />
              {copy[variant].submit}
            </>
          )}
        </Button>
        <p className="text-sm text-muted">
          No payment, no obligation. We reply the same day.
        </p>
      </div>
    </form>
  );
}
