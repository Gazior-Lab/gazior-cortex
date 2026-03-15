"use client";

import { BookOpen, CheckCircle2, Layout, Sparkles, TrendingUp } from "lucide-react";
import type { Summary } from "../types";
import { Badge, Card } from "./ui";

interface SummaryPanelProps {
  summary: Summary;
}

export function SummaryPanel({ summary }: SummaryPanelProps) {
  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-6 duration-700">
      {/* Minimal Header */}
      <div className="flex items-center justify-between border-b border-slate-100 pb-4">
        <div className="flex items-center gap-3">
          <BookOpen className="w-5 h-5 text-primary" />
          <h3 className="font-semibold text-slate-800 text-lg">Concise Summary</h3>
        </div>
        <Badge variant="outline" className="text-slate-500 font-normal shadow-none border-slate-200">
          AI Generated
        </Badge>
      </div>

      {/* Refined Overview Section */}
      <Card className="border border-slate-200 bg-white shadow-none">
        <div className="p-6">
          <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">
            Overview
          </div>
          <p className="text-slate-700 leading-relaxed text-base">
            {summary.overview}
          </p>
        </div>
      </Card>

      {/* Key Takeaways */}
      <div className="space-y-4">
        <h4 className="text-sm font-semibold text-slate-700">Key Takeaways</h4>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {summary.keyTakeaways.map((takeaway, index) => (
            <div 
              key={index}
              className="flex items-start gap-3 p-4 bg-slate-50 border border-slate-100 rounded-lg"
            >
              <CheckCircle2 className="w-4 h-4 text-emerald-500 mt-0.5 shrink-0" />
              <span className="text-sm text-slate-700 leading-relaxed">{takeaway}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Main Topics */}
      <section className="space-y-4">
        <h4 className="text-sm font-semibold text-slate-700">Main Topics</h4>

        <div className="grid grid-cols-1 gap-3">
          {summary.mainTopics.map((topic) => (
            <div key={topic.id}>
              <Card 
                padding="none"
                className="overflow-hidden border-slate-200 shadow-none bg-white"
              >
                <div className="p-5 flex items-start gap-4">
                  <div className="mt-1">
                    <BookOpen className="w-4 h-4 text-slate-400" />
                  </div>
                  <div>
                    <h5 className="font-semibold text-slate-800 text-base mb-1">
                      {topic.title}
                    </h5>
                    <p className="text-sm text-slate-600 leading-relaxed">
                      {topic.description}
                    </p>
                  </div>
                </div>
              </Card>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
