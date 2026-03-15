import React from "react";

export interface TooltipProps {
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
