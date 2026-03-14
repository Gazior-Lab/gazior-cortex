import React from "react";

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
