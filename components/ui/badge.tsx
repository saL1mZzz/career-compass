import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold tracking-[0.18em] uppercase",
  {
    variants: {
      variant: {
        default: "bg-[color:var(--badge-blue)] text-[color:var(--badge-blue-ink)]",
        credible: "bg-[color:var(--badge-green)] text-[color:var(--badge-green-ink)]",
        caution: "bg-[color:var(--badge-yellow)] text-[color:var(--badge-yellow-ink)]",
        weak: "bg-[color:var(--badge-orange)] text-[color:var(--badge-orange-ink)]",
        destructive: "bg-[color:var(--badge-red)] text-[color:var(--badge-red-ink)]",
        outline: "bg-white/60 text-[color:var(--ink)] ring-1 ring-[color:var(--line)]",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return <div className={cn(badgeVariants({ variant }), className)} {...props} />;
}

export { Badge, badgeVariants };
