import React from "react";

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
