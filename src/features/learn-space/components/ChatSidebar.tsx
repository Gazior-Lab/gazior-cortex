"use client";

import { FolderOpen, History, MoreHorizontal, Plus } from "lucide-react";
import React from "react";
import type { ChatSession, Source } from "../types";
import { FileUploader } from "./FileUploader";
import { SourceItem } from "./SourceItem";
import { Badge, Button, Divider } from "./ui";

interface ChatSidebarProps {
  sources: Source[];
  onUpload: (files: FileList) => void;
  onRemoveSource: (id: string) => void;
  sessions: ChatSession[];
  activeSessionId: string;
  onSessionSelect: (id: string) => void;
  onNewSession: () => void;
}

export function ChatSidebar({
  sources,
  onUpload,
  onRemoveSource,
  sessions,
  activeSessionId,
  onSessionSelect,
  onNewSession,
}: ChatSidebarProps) {
  return (
    <div className="w-full h-full flex flex-col bg-white border-r border-border select-none">
      {/* Upload Section */}
      <div className="p-4 border-b border-slate-50">
        <FileUploader onUpload={onUpload} />
      </div>

      <div className="flex-1 overflow-y-auto custom-scrollbar p-3 space-y-6">
        {/* Sources Section */}
        <div>
          <div className="flex items-center justify-between px-2 mb-2">
            <h3 className="text-[10px] font-bold uppercase tracking-widest text-muted flex items-center gap-1.5">
              <FolderOpen className="w-3 h-3" /> Documents
            </h3>
            <Badge variant="primary">{sources.length}</Badge>
          </div>

          <div className="space-y-0.5">
            {sources.length > 0 ? (
              sources.map((source) => (
                <SourceItem
                  key={source.id}
                  source={source}
                  onRemove={onRemoveSource}
                />
              ))
            ) : (
              <div className="p-4 text-center border border-dashed border-slate-200 rounded-md">
                <p className="text-[10px] text-slate-400">
                  No documents uploaded
                </p>
              </div>
            )}
          </div>
        </div>

        <Divider />

        {/* Sessions Section */}
        <div>
          <div className="flex items-center justify-between px-2 mb-2">
            <h3 className="text-[10px] font-bold uppercase tracking-widest text-muted flex items-center gap-1.5">
              <History className="w-3 h-3" /> Recent Chats
            </h3>
            <Tooltip content="New Chat">
              <button
                onClick={onNewSession}
                className="p-1 hover:bg-slate-100 rounded text-slate-400 hover:text-primary transition-colors"
                aria-label="New session"
              >
                <Plus className="w-3.5 h-3.5" />
              </button>
            </Tooltip>
          </div>

          <div className="space-y-1">
            {sessions.map((session) => {
              const isActive = session.id === activeSessionId;
              return (
                <button
                  key={session.id}
                  onClick={() => onSessionSelect(session.id)}
                  className={`
                    w-full group flex flex-col gap-1 p-2.5 rounded-md transition-all duration-200 border
                    ${
                      isActive
                        ? "bg-primary/5 border-primary/10 ring-1 ring-primary/5"
                        : "border-transparent hover:bg-slate-50"
                    }
                  `}
                >
                  <div className="flex items-center justify-between gap-2">
                    <span
                      className={`text-xs font-semibold truncate ${isActive ? "text-slate-900 font-bold" : "text-slate-700"}`}
                    >
                      {session.title}
                    </span>
                    <MoreHorizontal className="w-3 h-3 text-slate-300 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                  <div className="flex items-center justify-between gap-2">
                    <p className="text-[11px] text-slate-400 truncate text-left flex-1">
                      {session.preview || "No messages yet"}
                    </p>
                    <span className="text-[10px] text-slate-300 whitespace-nowrap">
                      {session.timestamp.toLocaleDateString([], {
                        month: "short",
                        day: "numeric",
                      })}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Footer / User Profile placeholder */}
      <div className="p-3 border-t border-border bg-slate-50/50">
        <Button
          variant="ghost"
          size="sm"
          className="w-full justify-start text-muted"
        >
          <FolderOpen className="w-4 h-4 mr-2" /> All Notebooks
        </Button>
      </div>
    </div>
  );
}

function Tooltip({
  content,
  children,
}: {
  content: string;
  children: React.ReactNode;
}) {
  return (
    <div className="relative group/tip">
      {children}
      <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 invisible group-hover/tip:visible bg-slate-900 text-white text-[10px] px-2 py-1 rounded shadow-lg whitespace-nowrap z-50">
        {content}
      </div>
    </div>
  );
}
