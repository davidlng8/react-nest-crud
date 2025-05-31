import { cn } from "@/lib/utils";
import { forwardRef, type HTMLAttributes } from "react";

const baseClasses = "rounded-lg border bg-white text-card-foreground shadow-sm";
const Card = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn(baseClasses, className)} {...props} />
  )
);
Card.displayName = "Card";

export { Card };
