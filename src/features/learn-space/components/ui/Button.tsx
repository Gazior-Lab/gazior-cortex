import React from "react";

export type ButtonVariant = "primary" | "secondary" | "ghost" | "outline" | "danger";
export type ButtonSize = "xs" | "sm" | "md" | "lg";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className = "", variant = "primary", size = "md", ...props }, ref) => {
    const base =
      "inline-flex items-center justify-center font-medium rounded-[var(--radius-md)] transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)] focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 select-none";

    const variants: Record<ButtonVariant, string> = {
      primary:
        "bg-primary text-[var(--color-primary-foreground)] hover:opacity-90 shadow-sm hover:shadow-md",
      secondary:
        "bg-[var(--color-secondary)] text-[var(--color-secondary-foreground)] hover:opacity-80",
      ghost: "hover:bg-slate-100 text-slate-700",
      outline:
        "border border-[var(--color-border)] bg-transparent hover:bg-slate-50 text-slate-700",
      danger: "bg-[var(--color-destructive)] text-white hover:opacity-90",
    };

    const sizes: Record<ButtonSize, string> = {
      xs: "h-7 px-2.5 text-xs gap-1",
      sm: "h-8 px-3 text-xs gap-1.5",
      md: "h-9 px-4 py-2 text-sm gap-2",
      lg: "h-11 px-6 text-base gap-2",
    };

    return (
      <button
        ref={ref}
        className={`${base} ${variants[variant]} ${sizes[size]} ${className}`}
        {...props}
      />
    );
  },
);
Button.displayName = "Button";
