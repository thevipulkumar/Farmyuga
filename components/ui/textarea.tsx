import * as React from "react";

import { cn } from "@/lib/utils";

function Textarea({ className, ...props }: React.ComponentProps<"textarea">) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        "flex min-h-32 w-full rounded-lg border border-border bg-white px-4 py-3 text-[0.95rem] font-medium text-charcoal transition-colors duration-200 ease-out",
        "placeholder:font-normal placeholder:text-muted/70",
        "hover:border-leaf focus:border-brand-green focus:outline-none",
        "aria-invalid:border-tomato aria-invalid:bg-tomato-tint/40",
        "disabled:cursor-not-allowed disabled:opacity-60",
        className,
      )}
      {...props}
    />
  );
}

export { Textarea };
