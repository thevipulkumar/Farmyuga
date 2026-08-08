import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full font-semibold transition-all duration-200 ease-out disabled:pointer-events-none disabled:opacity-60 [&_svg]:shrink-0 [&_svg]:size-[1.15em]",
  {
    variants: {
      variant: {
        /** Primary conversion action. */
        primary:
          "bg-brand-green text-white shadow-soft hover:bg-forest hover:-translate-y-0.5 hover:shadow-lift active:translate-y-0",
        /** Quiet companion to primary on light backgrounds. */
        secondary:
          "bg-white text-brand-green border border-brand-green hover:bg-mint hover:-translate-y-0.5 hover:shadow-soft active:translate-y-0",
        /** Reserved for the B2B / bulk path. Never white text on amber. */
        amber:
          "bg-amber text-charcoal shadow-soft hover:bg-amber-deep hover:-translate-y-0.5 hover:shadow-lift active:translate-y-0",
        /** Sits on the forest / gradient dark bands. */
        onDark:
          "bg-white text-forest hover:bg-mint hover:-translate-y-0.5 hover:shadow-lift active:translate-y-0",
        outlineOnDark:
          "border border-leaf/60 text-white hover:bg-white/10 hover:-translate-y-0.5 active:translate-y-0",
        ghost: "text-forest hover:bg-mint",
      },
      size: {
        sm: "h-10 px-4 text-sm",
        md: "h-12 px-6 text-[0.95rem]",
        lg: "h-14 px-8 text-base",
        icon: "size-11 p-0",
      },
    },
    defaultVariants: { variant: "primary", size: "md" },
  },
);

export type ButtonProps = React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & { asChild?: boolean };

function Button({ className, variant, size, asChild = false, ...props }: ButtonProps) {
  const Comp = asChild ? Slot : "button";
  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size }), className)}
      {...props}
    />
  );
}

export { Button, buttonVariants };
