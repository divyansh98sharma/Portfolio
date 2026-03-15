import * as React from "react";
import { Slot } from "@radix-ui/react-slot@1.1.2";
import { cva, type VariantProps } from "class-variance-authority@0.7.1";

import { cn } from "./utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md font-medium transition-all duration-200 disabled:pointer-events-none disabled:opacity-50 disabled:cursor-not-allowed [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:outline-none aria-invalid:ring-destructive/50 aria-invalid:border-destructive active:scale-[0.98] active:transition-transform active:duration-75",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90 active:bg-primary/95 shadow-sm hover:shadow-md focus-visible:shadow-lg",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90 active:bg-destructive/95 shadow-sm hover:shadow-md focus-visible:shadow-lg focus-visible:ring-destructive/50",
        outline:
          "border-2 border-primary/20 bg-background text-foreground hover:bg-primary/5 hover:border-primary/30 active:bg-primary/10 shadow-sm hover:shadow-md focus-visible:shadow-lg focus-visible:border-primary/50",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80 active:bg-secondary/90 shadow-sm hover:shadow-md focus-visible:shadow-lg",
        ghost:
          "hover:bg-accent hover:text-accent-foreground active:bg-accent/80 focus-visible:bg-accent/50",
        link: "text-primary underline-offset-4 hover:underline focus-visible:underline focus-visible:decoration-2",
      },
      size: {
        default: "h-11 px-6 py-3 text-sm min-w-[88px] has-[>svg]:px-4",
        sm: "h-9 px-4 py-2 text-sm min-w-[72px] has-[>svg]:px-3",
        lg: "h-12 px-8 py-4 text-base min-w-[120px] has-[>svg]:px-6",
        icon: "size-11 min-w-[44px] min-h-[44px]",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

function Button({
  className,
  variant,
  size,
  asChild = false,
  disabled,
  children,
  type = "button",
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  }) {
  const Comp = asChild ? Slot : "button";

  // Enhanced accessibility props
  const accessibilityProps = {
    "data-slot": "button",
    "aria-disabled": disabled ? "true" : undefined,
    type: asChild ? undefined : type,
    disabled: asChild ? undefined : disabled,
    role: asChild ? undefined : "button",
    tabIndex: disabled ? -1 : undefined,
    ...props,
  };

  return (
    <Comp
      className={cn(buttonVariants({ variant, size, className }))}
      {...accessibilityProps}
    >
      {children}
    </Comp>
  );
}

export { Button, buttonVariants };
