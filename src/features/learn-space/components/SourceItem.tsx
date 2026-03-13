"use client";

import { AlertCircle, CheckCircle2, FileText, Trash2 } from "lucide-react";
import type { Source } from "../types";
import { Spinner, Tooltip } from "./ui";

interface SourceItemProps {
  source: Source;
  onRemove?: (id: string) => void;
}

const TYPE_CONFIG: Record<
  string,
  { color: string; bg: string; label: string }
> = {
  pdf: { color: "text-red-500", bg: "bg-red-50", label: "PDF" },
  doc: { color: "text-blue-500", bg: "bg-blue-50", label: "DOC" },
  docx: { color: "text-blue-500", bg: "bg-blue-50", label: "DOCX" },
  txt: { color: "text-slate-500", bg: "bg-slate-50", label: "TXT" },
  md: { color: "text-purple-500", bg: "bg-purple-50", label: "MD" },
};

function StatusIcon({ status }: { status: Source["status"] }) {
  switch (status) {
    case "uploading":
      return <Spinner size="sm" className="text-primary" />;
    case "processing":
      return <Spinner size="sm" className="text-warning" />;
    case "ready":
      return <CheckCircle2 className="w-4 h-4 text-success" />;
    case "error":
      return (
        <AlertCircle className="w-4 h-4 text-destructive" />
      );
  }
}

function statusLabel(status: Source["status"]): string {
  const labels: Record<Source["status"], string> = {
    uploading: "Uploading…",
    processing: "Processing…",
    ready: "Ready",
    error: "Error",
  };
  return labels[status];
}

export function SourceItem({ source, onRemove }: SourceItemProps) {
  const config = TYPE_CONFIG[source.type] ?? TYPE_CONFIG.txt;

  return (
    <div className="group flex items-center gap-3 p-2.5 rounded-md hover:bg-slate-50 transition-colors cursor-pointer border border-transparent hover:border-border">
      {/* File type icon */}
      <div
        className={`shrink-0 p-2 rounded-sm ${config.bg}`}
      >
        <FileText className={`w-4 h-4 ${config.color}`} />
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <p className="text-xs font-medium text-slate-900 truncate leading-tight">
          {source.name}
        </p>
        <p className="text-[11px] text-muted flex items-center gap-1.5 mt-0.5">
          <span className="uppercase font-mono">{config.label}</span>
          <span className="text-slate-300">•</span>
          <span>{source.size}</span>
          {source.pageCount && (
            <>
              <span className="text-slate-300">•</span>
              <span>{source.pageCount}p</span>
            </>
          )}
        </p>
      </div>

      {/* Status */}
      <div className="flex items-center gap-1.5 shrink-0">
        <Tooltip content={statusLabel(source.status)}>
          <StatusIcon status={source.status} />
        </Tooltip>

        {onRemove && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onRemove(source.id);
            }}
            className="opacity-0 group-hover:opacity-100 p-1 hover:bg-red-50 hover:text-red-500 text-slate-400 rounded transition-all"
            aria-label="Remove source"
          >
            <Trash2 className="w-3.5 h-3.5" />
          </button>
        )}
      </div>
    </div>
  );
}
