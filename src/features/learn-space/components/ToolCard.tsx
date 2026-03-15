"use client";

import type { LearningTool } from "../types";
import { Button } from "./ui/Button";
import { Card } from "./ui/Card";

interface ToolCardProps {
  tool: LearningTool;
  onClick: () => void;
  isActive?: boolean;
}

export function ToolCard({ tool, onClick, isActive }: ToolCardProps) {
  return (
    <Card
      hover
      onClick={onClick}
      className={`
        cursor-pointer group flex flex-col gap-4 transition-all duration-300 relative overflow-hidden border-2
        ${isActive ? "border-primary bg-primary/5 shadow-md shadow-primary/5 -translate-y-0.5" : "border-slate-100 bg-white hover:border-primary/30 hover:shadow-md hover:-translate-y-0.5"}
      `}
    >
      {isActive && (
        <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-3xl -mr-10 -mt-10 pointer-events-none" />
      )}
      <div className="flex items-start gap-4 relative z-10">
        <div
          className={`
          p-2.5 rounded-xl transition-all duration-500 shadow-sm
          ${
            isActive
              ? "bg-linear-to-br from-primary to-primary/80 text-white ring-4 ring-primary/20 scale-110"
              : "bg-white border border-slate-100 text-primary group-hover:bg-primary/10 group-hover:border-primary/20 group-hover:scale-105"
          }
        `}
        >
          {tool.icon}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <h4 className="text-sm font-bold text-slate-800 group-hover:text-primary transition-colors tracking-tight leading-tight">
              {tool.title}
            </h4>
            {tool.badge && (
              <span
                className={`
                px-2 py-0.5 text-[10px] uppercase font-bold tracking-wider rounded-md
                ${isActive ? "bg-primary/20 text-primary" : "bg-slate-100 text-slate-500"}
              `}
              >
                {tool.badge}
              </span>
            )}
          </div>
          <p className="text-[11px] text-slate-500 line-clamp-2 mt-1 leading-relaxed">
            {tool.description}
          </p>
        </div>
      </div>

      <div className="relative z-10 w-full mt-auto">
        <Button
          variant={isActive ? "primary" : "outline"}
          size="sm"
          className={`w-full font-semibold border-2 ${!isActive ? " bg-white" : "shadow-md shadow-primary/20"} transition-all duration-300`}
        >
          {isActive ? "Currently Active" : "Open Tool"}
        </Button>
      </div>
    </Card>
  );
}
