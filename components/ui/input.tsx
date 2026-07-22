import * as React from "react";
import { cn } from "@/lib/utils";

export const Input = React.forwardRef<
  HTMLInputElement,
  React.InputHTMLAttributes<HTMLInputElement>
>(({ className, ...props }, ref) => (
  <input
    ref={ref}
    className={cn(
      "focus-ring flex h-11 w-full rounded-lg border bg-background px-3 py-2 text-sm transition placeholder:text-muted-foreground",
      className
    )}
    {...props}
  />
));
Input.displayName = "Input";
