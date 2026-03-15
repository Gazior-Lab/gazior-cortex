"use client";

import {
  BookOpen,
  ChevronDown,
  ChevronRight,
  Clock,
  FileText,
  FolderOpen,
  History,
  MoreHorizontal,
  Plus,
  Search,
  Sparkles,
  Upload,
  X,
} from "lucide-react";
import React, { useRef, useState } from "react";
import type { ChatSession, Source } from "../types";

function FileIcon({ type }: { type: string }) {
  const isPdf = type?.toLowerCase() === "pdf";
  return (
    <div
      className={`
        w-7 h-7 rounded-md flex items-center justify-center shrink-0 text-[9px] font-bold tracking-wider
        ${isPdf ? "bg-red-50 text-red-500 border border-red-100" : "bg-blue-50 text-blue-500 border border-blue-100"}
      `}
    >
      {type?.toUpperCase() || "—"}
    </div>
  );
}

function FileUploader({ onUpload }: { onUpload: (files: FileList) => void }) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files.length) onUpload(e.dataTransfer.files);
  };

  return (
    <div
      onDragOver={(e) => {
        e.preventDefault();
        setIsDragging(true);
      }}
      onDragLeave={() => setIsDragging(false)}
      onDrop={handleDrop}
      onClick={() => inputRef.current?.click()}
      className={`
        relative group cursor-pointer rounded-xl border-2 border-dashed px-4 py-4 text-center
        transition-all duration-200 select-none
        ${
          isDragging
            ? "border-primary bg-primary/5 scale-[1.01]"
            : "border-slate-200 hover:border-primary/50 hover:bg-slate-50/80"
        }
      `}
    >
      <input
        ref={inputRef}
        type="file"
        className="hidden"
        multiple
        accept=".pdf,.docx,.txt,.md"
        onChange={(e) => e.target.files && onUpload(e.target.files)}
      />
      <div
        className={`
        mx-auto w-9 h-9 rounded-lg flex items-center justify-center mb-2 transition-all duration-200
        ${isDragging ? "bg-primary text-white" : "bg-slate-100 text-slate-400 group-hover:bg-primary/10 group-hover:text-primary"}
      `}
      >
        <Upload className="w-4 h-4" />
      </div>
      <p className="text-[11px] font-semibold text-slate-600 mb-0.5">
        {isDragging ? "Drop to upload" : "Upload documents"}
      </p>
      <p className="text-[10px] text-slate-400">PDF, DOCX, TXT, Markdown</p>
    </div>
  );
}

function SourceItem({
  source,
  onRemove,
}: {
  source: Source;
  onRemove: (id: string) => void;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="group flex items-center gap-2.5 px-2 py-2 rounded-lg hover:bg-slate-50 transition-colors duration-150"
    >
      <FileIcon type={source.type || "PDF"} />

      <div className="flex-1 min-w-0">
        <p className="text-[12px] font-medium text-slate-700 truncate leading-tight">
          {source.name}
        </p>
        <div className="flex items-center gap-1.5 mt-0.5">
          {source.size && (
            <span className="text-[10px] text-slate-400">{source.size}</span>
          )}
          {source.pages && (
            <>
              <span className="text-slate-200">·</span>
              <span className="text-[10px] text-slate-400">
                {source.pages}p
              </span>
            </>
          )}
          <span className="ml-auto">
            {source.status === "processing" ? (
              <span className="flex items-center gap-1 text-[10px] text-amber-500">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse inline-block" />
              </span>
            ) : (
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 inline-block" />
            )}
          </span>
        </div>
      </div>

      <button
        onClick={(e) => {
          e.stopPropagation();
          onRemove(source.id);
        }}
        className={`
          shrink-0 w-5 h-5 rounded flex items-center justify-center text-slate-300 hover:text-red-400 hover:bg-red-50
          transition-all duration-150
          ${hovered ? "opacity-100" : "opacity-0"}
        `}
        aria-label="Remove source"
      >
        <X className="w-3 h-3" />
      </button>
    </div>
  );
}

function SidebarSection({
  icon: Icon,
  label,
  count,
  defaultOpen = true,
  action,
  children,
}: {
  icon: React.ElementType;
  label: string;
  count?: number;
  defaultOpen?: boolean;
  action?: React.ReactNode;
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div className="space-y-1">
      <div className="flex items-center gap-1 px-2 mb-1">
        <button
          onClick={() => setOpen((v) => !v)}
          className="flex items-center gap-1.5 flex-1 group"
        >
          <Icon className="w-3 h-3 text-slate-400" />
          <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400 group-hover:text-slate-500 transition-colors">
            {label}
          </span>
          {count !== undefined && (
            <span className="ml-0.5 text-[9px] font-semibold text-slate-400">
              ({count})
            </span>
          )}
          <span className="ml-auto text-slate-300">
            {open ? (
              <ChevronDown className="w-3 h-3" />
            ) : (
              <ChevronRight className="w-3 h-3" />
            )}
          </span>
        </button>
        {action}
      </div>

      <div
        className={`transition-all duration-200 overflow-hidden ${open ? "opacity-100" : "max-h-0 opacity-0"}`}
      >
        {children}
      </div>
    </div>
  );
}

function Tip({
  content,
  children,
}: {
  content: string;
  children: React.ReactNode;
}) {
  return (
    <div className="relative group/tip">
      {children}
      <div className="pointer-events-none absolute bottom-full mb-2 left-1/2 -translate-x-1/2 invisible group-hover/tip:visible bg-slate-900 text-white text-[10px] px-2 py-1 rounded-md shadow-lg whitespace-nowrap z-50 transition-opacity">
        {content}
      </div>
    </div>
  );
}

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
  const [searchQuery, setSearchQuery] = useState("");
  const [sessionSearchActive, setSessionSearchActive] = useState(false);

  const filteredSessions = searchQuery
    ? sessions.filter(
        (s) =>
          s.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          s.preview?.toLowerCase().includes(searchQuery.toLowerCase()),
      )
    : sessions;

  // Group sessions by recency
  const today = new Date();
  const todaySessions = filteredSessions.filter(
    (s) => s.timestamp.toDateString() === today.toDateString(),
  );
  const olderSessions = filteredSessions.filter(
    (s) => s.timestamp.toDateString() !== today.toDateString(),
  );

  return (
    <div className="w-full h-full flex flex-col bg-white border-r border-slate-100 select-none p-5">
      <div className="border-b border-slate-50">
        <FileUploader onUpload={onUpload} />
      </div>

      <div className="flex-1 overflow-y-auto custom-scrollbar py-3 space-y-5">
        {/* Documents Section */}
        <SidebarSection
          icon={FolderOpen}
          label="Documents"
          count={sources.length}
        >
          {sources.length > 0 ? (
            <div className="space-y-0.5">
              {sources.map((source) => (
                <SourceItem
                  key={source.id}
                  source={source}
                  onRemove={onRemoveSource}
                />
              ))}
            </div>
          ) : (
            <div className="mx-2 py-4 px-3 flex flex-col items-center gap-1.5 rounded-lg border border-dashed border-slate-200 bg-slate-50/50">
              <FileText className="w-5 h-5 text-slate-300" />
              <p className="text-[10px] text-slate-400 text-center leading-relaxed">
                Upload documents to start chatting with your content
              </p>
            </div>
          )}
        </SidebarSection>

        {/* Divider */}
        <div className="h-px bg-slate-100 mx-2" />

        <SidebarSection
          icon={History}
          label="Recent Chats"
          count={sessions.length}
          action={
            <div className="flex items-center gap-1 ml-auto">
              <Tip content="Search chats">
                <button
                  onClick={() => setSessionSearchActive((v) => !v)}
                  className={`
                    p-1 rounded text-slate-300 hover:text-primary hover:bg-primary/5 transition-colors
                    ${sessionSearchActive ? "text-primary bg-primary/5" : ""}
                  `}
                >
                  <Search className="w-3 h-3" />
                </button>
              </Tip>
              <Tip content="New chat">
                <button
                  onClick={onNewSession}
                  className="p-1 rounded text-slate-300 hover:text-primary hover:bg-primary/5 transition-colors"
                  aria-label="New session"
                >
                  <Plus className="w-3 h-3" />
                </button>
              </Tip>
            </div>
          }
        >
          {sessionSearchActive && (
            <div className="relative mx-1 mb-2">
              <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3 h-3 text-slate-400" />
              <input
                autoFocus
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search sessions..."
                className="
                  w-full pl-7 pr-3 py-1.5 text-[11px] rounded-lg bg-slate-50
                  border border-slate-200 focus:border-primary/40 focus:ring-1 focus:ring-primary/20
                  outline-none transition-all placeholder:text-slate-400 text-slate-700
                "
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-300 hover:text-slate-500"
                >
                  <X className="w-3 h-3" />
                </button>
              )}
            </div>
          )}

          {filteredSessions.length === 0 ? (
            <div className="mx-2 py-4 flex flex-col items-center gap-1.5">
              <Clock className="w-5 h-5 text-slate-300" />
              <p className="text-[10px] text-slate-400">No chats yet</p>
            </div>
          ) : (
            <div className="space-y-3">
              {/* Today group */}
              {todaySessions.length > 0 && (
                <div>
                  <p className="text-[9px] font-bold uppercase tracking-widest text-slate-300 px-2 mb-1">
                    Today
                  </p>
                  <SessionList
                    sessions={todaySessions}
                    activeSessionId={activeSessionId}
                    onSessionSelect={onSessionSelect}
                  />
                </div>
              )}

              {/* Older group */}
              {olderSessions.length > 0 && (
                <div>
                  <p className="text-[9px] font-bold uppercase tracking-widest text-slate-300 px-2 mb-1">
                    Earlier
                  </p>
                  <SessionList
                    sessions={olderSessions}
                    activeSessionId={activeSessionId}
                    onSessionSelect={onSessionSelect}
                  />
                </div>
              )}
            </div>
          )}
        </SidebarSection>
      </div>

      <div className="p-3 border-t border-slate-100 bg-slate-50/40 space-y-1">
        <div className="flex items-center gap-2 px-2 py-1.5 rounded-lg">
          <Sparkles className="w-3.5 h-3.5 text-primary" />
          <span className="text-[10px] text-slate-500 flex-1">
            <span className="font-semibold text-slate-700">
              {sources.length}
            </span>{" "}
            docs ·{" "}
            <span className="font-semibold text-slate-700">
              {sessions.length}
            </span>{" "}
            chats
          </span>
        </div>
        <button
          className="
          w-full flex items-center gap-2 px-2 py-1.5 rounded-lg text-[11px] text-slate-500
          hover:bg-slate-100 hover:text-slate-700 transition-colors duration-150
        "
        >
          <BookOpen className="w-3.5 h-3.5" />
          All Notebooks
        </button>
      </div>
    </div>
  );
}

function SessionList({
  sessions,
  activeSessionId,
  onSessionSelect,
}: {
  sessions: ChatSession[];
  activeSessionId: string;
  onSessionSelect: (id: string) => void;
}) {
  return (
    <div className="space-y-0.5">
      {sessions.map((session) => {
        const isActive = session.id === activeSessionId;
        return (
          <div
            key={session.id}
            onClick={() => onSessionSelect(session.id)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                onSessionSelect(session.id);
              }
            }}
            className={`
              w-full relative cursor-pointer group flex flex-col gap-0.5 px-2.5 py-2 rounded-lg transition-all duration-150 border text-left
              ${
                isActive
                  ? "bg-primary/5 border-primary/10 shadow-[inset_0_0_0_1px_rgba(99,102,241,0.08)]"
                  : "border-transparent hover:bg-slate-50 hover:border-slate-100"
              }
            `}
          >
            <div className="flex items-center gap-2 justify-between">
              <span
                className={`text-[12px] truncate leading-tight ${isActive ? "font-semibold text-slate-900" : "font-medium text-slate-700"}`}
              >
                {session.title}
              </span>
              <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                <button
                  onClick={(e) => e.stopPropagation()}
                  className="p-0.5 rounded hover:bg-slate-200 text-slate-400 hover:text-slate-600 transition-colors"
                  aria-label="More options"
                >
                  <MoreHorizontal className="w-3 h-3" />
                </button>
              </div>
            </div>
            <div className="flex items-center justify-between gap-2">
              <p className="text-[10px] text-slate-400 truncate flex-1 leading-snug">
                {session.preview || "No messages yet"}
              </p>
              <span
                className={`text-[9px] whitespace-nowrap shrink-0 ${isActive ? "text-primary/60" : "text-slate-300"}`}
              >
                {session.timestamp.toLocaleDateString([], {
                  month: "short",
                  day: "numeric",
                })}
              </span>
            </div>
            {isActive && (
              <div className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-5 bg-primary rounded-r-full" />
            )}
          </div>
        );
      })}
    </div>
  );
}
