import React from "react";

export type BadgeVariant =
  | "default"
  | "primary"
  | "accent"
  | "success"
  | "warning"
  | "danger"
  | "outline";

export interface BadgeProps {
  children: React.ReactNode;
  variant?: BadgeVariant;
  className?: string;
}

export const Badge = ({
  children,
  variant = "default",
  className = "",
}: BadgeProps) => {
  const variants: Record<BadgeVariant, string> = {
    default: "bg-slate-100 text-slate-700",
    primary: "bg-primary/10 text-primary",
    accent: "bg-[var(--color-accent)]/10 text-[var(--color-accent)]",
    success: "bg-[var(--color-success)]/10 text-[var(--color-success)]",
    warning: "bg-[var(--color-warning)]/10 text-[var(--color-warning)]",
    danger: "bg-[var(--color-destructive)]/10 text-[var(--color-destructive)]",
    outline: "border border-[var(--color-border)] text-slate-600",
  };

  return (
    <span
      className={`inline-flex items-center gap-1 px-2.5 py-0.5 text-xs font-medium rounded-full ${variants[variant]} ${className}`}
    >
      {children}
    </span>
  );
};
