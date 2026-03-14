"use client";

import {
  BookOpen,
  Brain,
  FileQuestion,
  GraduationCap,
  List,
  Sparkles,
} from "lucide-react";
import type { ActivePanel, LearningTool } from "../types";
import { ToolCard } from "./ToolCard";

interface LearningToolsProps {
  activePanel: ActivePanel;
  onPanelChange: (panel: ActivePanel) => void;
}

export function LearningTools({
  activePanel,
  onPanelChange,
}: LearningToolsProps) {
  const tools: LearningTool[] = [
    {
      id: "quiz",
      icon: <FileQuestion className="w-5 h-5" />,
      title: "Personalized Quiz",
      description:
        "Test your knowledge with AI-curated questions based on your documents.",
      badge: "Interactive",
    },
    {
      id: "flashcards",
      icon: <Brain className="w-5 h-5" />,
      title: "Study Flashcards",
      description:
        "Master key concepts with AI-generated 3D flip cards for spaced repetition.",
      badge: "BETA",
    },
    {
      id: "notes",
      icon: <BookOpen className="w-5 h-5" />,
      title: "AI Smart Notes",
      description:
        "Generate comprehensive summaries and highlight crucial information.",
      badge: "Popular",
    },
    {
      id: "exam",
      icon: <GraduationCap className="w-5 h-5" />,
      title: "Timed Exam",
      description:
        "Simulate a real-world testing environment with score reports.",
    },
    {
      id: "summary",
      icon: <List className="w-5 h-5" />,
      title: "Concise Summary",
      description:
        "Get a quick high-level overview of complex document topics.",
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2.5">
          <div className="relative flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-primary/20 to-primary/5 text-primary shadow-sm ring-1 ring-primary/20">
            <Sparkles className="w-4 h-4" />
          </div>
          <div>
            <h3 className="font-bold text-slate-900 text-base tracking-tight">Learning Studio</h3>
            <p className="text-[11px] text-slate-500 font-medium mt-0.5">Select an AI tool to begin</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {tools.map((tool) => (
          <ToolCard
            key={tool.id}
            tool={tool}
            isActive={activePanel === tool.id}
            onClick={() => onPanelChange(tool.id)}
          />
        ))}

        {/* Placeholder for future tools */}
        <div className="border-2 border-dashed border-slate-200 rounded-xl p-5 text-center bg-slate-50/50 hover:bg-slate-50 transition-colors cursor-default">
          <p className="text-[10px] text-slate-400 uppercase font-bold tracking-widest flex items-center justify-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-slate-300"></span>
            More Tools Coming Soon
            <span className="w-1.5 h-1.5 rounded-full bg-slate-300"></span>
          </p>
        </div>
      </div>
    </div>
  );
}
