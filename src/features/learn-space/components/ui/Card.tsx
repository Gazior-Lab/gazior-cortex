import React from "react";

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
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
