import * as React from "react";

import { Reveal } from "@/components/shared/reveal";
import { cn } from "@/lib/utils";

type SectionHeadingProps = {
  eyebrow?: string;
  title: React.ReactNode;
  description?: React.ReactNode;
  /** id of the heading — pair with aria-labelledby on the parent <section>. */
  id?: string;
  align?: "left" | "center";
  tone?: "light" | "dark";
  className?: string;
  /** Renders as h2 by default; the hero uses its own h1. */
  as?: "h2" | "h3";
};

export function SectionHeading({
  eyebrow,
  title,
  description,
  id,
  align = "center",
  tone = "light",
  className,
  as: Tag = "h2",
}: SectionHeadingProps) {
  return (
    <Reveal
      className={cn(
        "flex max-w-3xl flex-col gap-4",
        align === "center" && "mx-auto items-center text-center",
        className,
      )}
    >
      {eyebrow ? (
        <span
          className={cn(
            "type-eyebrow",
            tone === "light" ? "text-brand-green" : "text-leaf",
          )}
        >
          {eyebrow}
        </span>
      ) : null}
      <Tag
        id={id}
        className={cn(
          Tag === "h2" ? "type-h2" : "type-h3",
          tone === "dark" && "text-white",
        )}
      >
        {title}
      </Tag>
      {description ? (
        <p className={cn("type-lead", tone === "light" ? "text-muted" : "text-mint/85")}>
          {description}
        </p>
      ) : null}
    </Reveal>
  );
}
