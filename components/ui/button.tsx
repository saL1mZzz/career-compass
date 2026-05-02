"use client";

import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full text-sm font-semibold transition-all duration-200 disabled:pointer-events-none disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--ring)] focus-visible:ring-offset-2 focus-visible:ring-offset-[color:var(--background)]",
  {
    variants: {
      variant: {
        default:
          "bg-[color:var(--ink)] text-white shadow-[0_14px_30px_rgba(24,39,75,0.18)] hover:-translate-y-0.5 hover:bg-[color:var(--ink-strong)]",
        secondary:
          "bg-white/70 text-[color:var(--ink)] ring-1 ring-black/6 hover:-translate-y-0.5 hover:bg-white",
        outline:
          "bg-transparent text-[color:var(--ink)] ring-1 ring-[color:var(--line)] hover:-translate-y-0.5 hover:bg-white/80",
        ghost:
          "bg-transparent text-[color:var(--ink)] hover:bg-white/70",
        credible:
          "bg-[color:var(--success)] text-white shadow-[0_12px_24px_rgba(88,155,117,0.28)] hover:-translate-y-0.5 hover:bg-[color:var(--success-strong)]",
        caution:
          "bg-[color:var(--warning)] text-[color:var(--ink)] shadow-[0_12px_24px_rgba(227,181,89,0.28)] hover:-translate-y-0.5 hover:bg-[color:var(--warning-strong)]",
        destructive:
          "bg-[color:var(--danger)] text-white shadow-[0_12px_24px_rgba(211,102,74,0.26)] hover:-translate-y-0.5 hover:bg-[color:var(--danger-strong)]",
      },
      size: {
        default: "h-11 px-5",
        sm: "h-9 px-4 text-sm",
        lg: "h-12 px-6 text-base",
        icon: "size-10 rounded-full",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";

    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  },
);

Button.displayName = "Button";

export { Button, buttonVariants };
