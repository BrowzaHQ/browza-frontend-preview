// components/ui/button.tsx
import { ButtonHTMLAttributes, forwardRef } from "react";
import { cn } from "@/lib/cn";

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "ghost" | "destructive" | "outline" | "secondary";
  size?: "sm" | "default" | "lg" | "icon";
};

const variantStyles = {
  primary: "bg-primary hover:bg-primary/90 text-primary-foreground shadow",
  ghost: "bg-transparent hover:bg-accent hover:text-accent-foreground",
  destructive: "bg-destructive hover:bg-destructive/90 text-destructive-foreground shadow-sm",
  outline: "border border-input bg-background hover:bg-accent hover:text-accent-foreground shadow-sm",
  secondary: "bg-secondary hover:bg-secondary/80 text-secondary-foreground shadow-sm",
};

const sizeStyles = {
  sm: "h-8 px-3 text-xs rounded-md",
  default: "h-9 px-4 py-2 rounded-md",
  lg: "h-10 px-8 rounded-md",
  icon: "h-9 w-9 rounded-md",
};

export const Button = forwardRef<HTMLButtonElement, Props>(function Button(
  { className, variant = "primary", size = "default", ...props },
  ref
) {
  return (
    <button
      ref={ref}
      className={cn(
        "inline-flex items-center justify-center whitespace-nowrap text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",
        variantStyles[variant],
        sizeStyles[size],
        className
      )}
      {...props}
    />
  );
});

export default Button;
