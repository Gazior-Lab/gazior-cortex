import React from "react";

// ============================================================
// Button
// ============================================================
type ButtonVariant = "primary" | "secondary" | "ghost" | "outline" | "danger";
type ButtonSize = "xs" | "sm" | "md" | "lg";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
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

// ============================================================
// Card
// ============================================================
interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  padding?: "none" | "sm" | "md" | "lg";
  hover?: boolean;
}

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className = "", padding = "md", hover = false, ...props }, ref) => {
    const paddings = {
      none: "",
      sm: "p-3",
      md: "p-4",
      lg: "p-6",
    };

    return (
      <div
        ref={ref}
        className={`bg-(--color-card) border border-border rounded-(--radius-lg) shadow-sm ${paddings[padding]} ${hover ? "hover:shadow-md hover:border-primary/30 transition-all duration-200" : ""} ${className}`}
        {...props}
      />
    );
  },
);
Card.displayName = "Card";

// ============================================================
// Badge
// ============================================================
type BadgeVariant =
  | "default"
  | "primary"
  | "accent"
  | "success"
  | "warning"
  | "danger"
  | "outline";

interface BadgeProps {
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

// ============================================================
// Tooltip
// ============================================================
interface TooltipProps {
  content: string;
  children: React.ReactNode;
  side?: "top" | "bottom";
}

export const Tooltip = ({ content, children, side = "top" }: TooltipProps) => {
  const [visible, setVisible] = React.useState(false);

  return (
    <div
      className="relative inline-flex"
      onMouseEnter={() => setVisible(true)}
      onMouseLeave={() => setVisible(false)}
    >
      {children}
      {visible && (
        <div
          className={`absolute z-50 pointer-events-none ${side === "top" ? "bottom-full mb-2" : "top-full mt-2"} left-1/2 -translate-x-1/2 px-2.5 py-1.5 text-xs font-medium text-white bg-slate-900 rounded-md whitespace-nowrap shadow-lg`}
        >
          {content}
          <div
            className={`absolute left-1/2 -translate-x-1/2 w-0 h-0 ${side === "top" ? "top-full border-t-slate-900 border-t-4 border-x-4 border-x-transparent border-b-0" : "bottom-full border-b-slate-900 border-b-4 border-x-4 border-x-transparent border-t-0"}`}
          />
        </div>
      )}
    </div>
  );
};

// ============================================================
// Spinner
// ============================================================
export const Spinner = ({
  size = "md",
  className = "",
}: {
  size?: "sm" | "md" | "lg";
  className?: string;
}) => {
  const sizes = { sm: "w-3 h-3", md: "w-4 h-4", lg: "w-5 h-5" };
  return (
    <svg
      className={`animate-spin ${sizes[size]} ${className}`}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      />
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
      />
    </svg>
  );
};

// ============================================================
// ProgressBar
// ============================================================
export const ProgressBar = ({
  value,
  max = 100,
  className = "",
  color = "primary",
}: {
  value: number;
  max?: number;
  className?: string;
  color?: "primary" | "accent" | "success";
}) => {
  const pct = Math.round((value / max) * 100);
  const colors = {
    primary: "bg-primary",
    accent: "bg-[var(--color-accent)]",
    success: "bg-[var(--color-success)]",
  };

  return (
    <div
      className={`w-full h-1.5 bg-slate-100 rounded-full overflow-hidden ${className}`}
    >
      <div
        className={`h-full rounded-full transition-all duration-500 ${colors[color]}`}
        style={{ width: `${pct}%` }}
      />
    </div>
  );
};

// ============================================================
// Divider
// ============================================================
export const Divider = ({
  label,
  className = "",
}: {
  label?: string;
  className?: string;
}) => (
  <div className={`flex items-center gap-3 ${className}`}>
    <div className="flex-1 h-px bg-border" />
    {label && (
      <span className="text-xs text-muted whitespace-nowrap">{label}</span>
    )}
    <div className="flex-1 h-px bg-border" />
  </div>
);
