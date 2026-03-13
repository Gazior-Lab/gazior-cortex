"use client";

import type { LearningTool } from "../types";
import { Button, Card } from "./ui";

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
        cursor-pointer group flex flex-col gap-4 transition-all duration-300 !bg-primary/10 border-primary/20
        ${isActive ? "border-primary ring-1 ring-primary/20 shadow-md -translate-y-0.5" : ""}
      `}
    >
      <div className="flex items-start gap-3">
        <div
          className={`
          p-2.5 rounded-md transition-colors duration-300
          ${
            isActive
              ? "bg-primary text-white"
              : "bg-primary/10 text-primary group-hover:bg-primary group-hover:text-white"
          }
        `}
        >
          {tool.icon}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between gap-2">
            <h4 className="text-sm font-semibold text-slate-900 group-hover:text-primary transition-colors">
              {tool.title}
            </h4>
            {tool.badge && (
              <span className="px-1.5 py-0.5 text-[10px] uppercase font-bold tracking-wider bg-slate-100 text-slate-500 rounded">
                {tool.badge}
              </span>
            )}
          </div>
          <p className="text-xs text-slate-500 line-clamp-2 mt-1 leading-relaxed">
            {tool.description}
          </p>
        </div>
      </div>

      <Button
        variant={isActive ? "primary" : "outline"}
        size="xs"
        className={`w-full ${!isActive ? "opacity-0 group-hover:opacity-100" : ""} transition-all duration-300`}
      >
        {isActive ? "Active" : "Open Tool"}
      </Button>
    </Card>
  );
}
