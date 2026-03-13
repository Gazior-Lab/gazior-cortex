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
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-primary" />
          <h3 className="font-semibold text-slate-900">Learning Studio</h3>
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
        <div className="border border-dashed border-slate-200 rounded-(--radius-lg) p-4 text-center">
          <p className="text-[10px] text-slate-400 uppercase font-bold tracking-widest">
            More Tools Coming Soon
          </p>
        </div>
      </div>
    </div>
  );
}
