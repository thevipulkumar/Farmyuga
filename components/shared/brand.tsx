import Link from "next/link";

import { siteConfig } from "@/lib/site-config";
import { cn } from "@/lib/utils";

/** The Farmyuga leaf mark — a sprout curling out of a seed. */
export function LeafMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 40 40"
      aria-hidden="true"
      focusable="false"
      className={cn("size-9", className)}
    >
      <circle cx="20" cy="20" r="20" className="fill-current" opacity="0.12" />
      <path
        d="M29.5 10.5c0 8.6-5.6 14.4-13.4 14.4-1.6 0-3-.2-4.2-.6.6-6.6 5.4-11.5 12-12.8 1.9-.4 3.8-.7 5.6-1Z"
        className="fill-current"
      />
      <path
        d="M10.6 30.2c0-6.6 3.5-11.8 9.3-15.1"
        className="stroke-current"
        strokeWidth="2.6"
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  );
}

type WordmarkProps = {
  tone?: "light" | "dark";
  className?: string;
  /** Renders a plain span instead of a link (used inside the mobile drawer). */
  asLink?: boolean;
};

export function Wordmark({ tone = "light", className, asLink = true }: WordmarkProps) {
  const content = (
    <>
      <LeafMark className={tone === "light" ? "text-brand-green" : "text-leaf"} />
      <span className="flex flex-col leading-none">
        <span
          className={cn(
            "text-xl font-extrabold tracking-tight",
            tone === "light" ? "text-forest" : "text-white",
          )}
        >
          {siteConfig.name}
        </span>
        <span
          className={cn(
            "mt-0.5 text-[0.62rem] font-semibold uppercase tracking-[0.18em]",
            tone === "light" ? "text-brand-green" : "text-leaf",
          )}
        >
          Ratu Road · Ranchi
        </span>
      </span>
    </>
  );

  if (!asLink) {
    return <span className={cn("flex items-center gap-2.5", className)}>{content}</span>;
  }

  return (
    <Link
      href="/"
      aria-label={`${siteConfig.name} — home`}
      className={cn("flex items-center gap-2.5", className)}
    >
      {content}
    </Link>
  );
}
