import * as React from "react";

import { cn } from "@/lib/utils";

export function Container({ className, ...props }: React.ComponentProps<"div">) {
  return <div className={cn("mx-auto w-full max-w-7xl px-5 md:px-8", className)} {...props} />;
}

type SectionProps = React.ComponentProps<"section"> & {
  /** Background rhythm: white → cream → white → forest → white. */
  tone?: "white" | "cream" | "mint" | "forest";
};

export function Section({ className, tone = "white", ...props }: SectionProps) {
  return (
    <section
      className={cn(
        // overflow-hidden keeps the decorative glow blobs from widening the page
        "relative overflow-hidden py-20 md:py-28",
        tone === "white" && "bg-white",
        tone === "cream" && "bg-cream",
        tone === "mint" && "bg-mint",
        tone === "forest" && "bg-forest text-mint",
        className,
      )}
      {...props}
    />
  );
}
