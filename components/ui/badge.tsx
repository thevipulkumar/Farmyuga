import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1 text-xs font-semibold leading-tight",
  {
    variants: {
      variant: {
        mint: "bg-mint text-forest",
        green: "bg-brand-green text-white",
        amber: "bg-amber-tint text-amber-deep",
        outline: "border border-border bg-white text-muted",
        onDark: "bg-white/10 text-white",
        alert: "bg-tomato-tint text-tomato",
      },
    },
    defaultVariants: { variant: "mint" },
  },
);

export type BadgeProps = React.ComponentProps<"span"> &
  VariantProps<typeof badgeVariants>;

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <span
      data-slot="badge"
      className={cn(badgeVariants({ variant }), className)}
      {...props}
    />
  );
}

export { Badge, badgeVariants };
