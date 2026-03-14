"use client";

import {
  Copy,
  RotateCcw,
  Sparkles,
  ThumbsDown,
  ThumbsUp,
  User,
} from "lucide-react";
import React from "react";
import type { ChatMessage as ChatMessageType, Source } from "../types";
import { Tooltip } from "./ui";

// -------------------------------------------------------
// Code Block
// -------------------------------------------------------
function CodeBlock({ code, language }: { code: string; language?: string }) {
  const [copied, setCopied] = React.useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className="my-3 rounded-md overflow-hidden bg-slate-900 border border-slate-700 text-sm">
      <div className="flex items-center justify-between px-4 py-2 bg-slate-800">
        <span className="text-xs font-mono text-slate-400">
          {language || "code"}
        </span>
        <button
          onClick={handleCopy}
          className="text-xs text-slate-400 hover:text-white transition-colors flex items-center gap-1"
        >
          <Copy className="w-3 h-3" />
          {copied ? "Copied!" : "Copy"}
        </button>
      </div>
      <pre className="p-4 overflow-x-auto">
        <code className="font-mono text-slate-100 leading-relaxed">{code}</code>
      </pre>
    </div>
  );
}

// -------------------------------------------------------
// Content Renderer (lightweight markdown)
// -------------------------------------------------------
function renderContent(content: string): React.ReactNode {
  const parts = content.split(/(```[\s\S]*?```|\*\*.*?\*\*|\*.*?\*|\n- .*)/g);

  return parts.map((part, i) => {
    if (part.startsWith("```") && part.endsWith("```")) {
      const inner = part.slice(3, -3);
      const newlineIdx = inner.indexOf("\n");
      const lang = newlineIdx !== -1 ? inner.slice(0, newlineIdx) : "";
      const code = newlineIdx !== -1 ? inner.slice(newlineIdx + 1) : inner;
      return <CodeBlock key={i} code={code} language={lang} />;
    }
    if (part.startsWith("**") && part.endsWith("**")) {
      return (
        <strong key={i} className="font-semibold text-slate-900">
          {part.slice(2, -2)}
        </strong>
      );
    }
    if (part.startsWith("*") && part.endsWith("*")) {
      return (
        <em key={i} className="italic">
          {part.slice(1, -1)}
        </em>
      );
    }
    if (part.startsWith("\n- ")) {
      return (
        <li key={i} className="ml-4 text-slate-700 leading-relaxed list-disc">
          {part.slice(3)}
        </li>
      );
    }
    return (
      <span
        key={i}
        className="text-slate-700 leading-relaxed whitespace-pre-wrap"
      >
        {part}
      </span>
    );
  });
}

// -------------------------------------------------------
// Typing Indicator
// -------------------------------------------------------
function TypingIndicator() {
  return (
    <div className="flex gap-4 mb-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
      <div className="w-8 h-8 rounded-full flex items-center justify-center shrink-0 bg-gradient-to-tr from-primary to-primary/80 ring-2 ring-primary/20 shadow-sm text-white">
        <Sparkles className="w-4 h-4 text-white" />
      </div>
      <div className="flex items-center gap-1.5 px-4 py-3.5 bg-white border border-slate-200 rounded-2xl rounded-tl-sm shadow-sm">
        {[0, 150, 300].map((delay) => (
          <div
            key={delay}
            className="w-1.5 h-1.5 rounded-full bg-primary/40 animate-bounce"
            style={{ animationDelay: `${delay}ms` }}
          />
        ))}
      </div>
    </div>
  );
}

// -------------------------------------------------------
// Message Toolbar
// -------------------------------------------------------
function MessageToolbar({
  content,
  onRegenerate,
}: {
  content: string;
  onRegenerate?: () => void;
}) {
  const [liked, setLiked] = React.useState<boolean | null>(null);
  const [copied, setCopied] = React.useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(content);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className="flex items-center gap-0.5 mt-2 opacity-0 group-hover:opacity-100 transition-opacity">
      <Tooltip content={copied ? "Copied!" : "Copy"}>
        <button
          onClick={handleCopy}
          className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-md transition-colors"
        >
          <Copy className="w-3.5 h-3.5" />
        </button>
      </Tooltip>

      <Tooltip content="Regenerate">
        <button
          onClick={onRegenerate}
          className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-md transition-colors"
        >
          <RotateCcw className="w-3.5 h-3.5" />
        </button>
      </Tooltip>

      <div className="w-px h-3.5 bg-slate-200 mx-1" />

      <Tooltip content="Helpful">
        <button
          onClick={() => setLiked(true)}
          className={`p-1.5 rounded-md transition-colors ${liked === true ? "text-success bg-green-50" : "text-slate-400 hover:text-green-600 hover:bg-green-50"}`}
        >
          <ThumbsUp className="w-3.5 h-3.5" />
        </button>
      </Tooltip>

      <Tooltip content="Not helpful">
        <button
          onClick={() => setLiked(false)}
          className={`p-1.5 rounded-md transition-colors ${liked === false ? "text-destructive bg-red-50" : "text-slate-400 hover:text-red-600 hover:bg-red-50"}`}
        >
          <ThumbsDown className="w-3.5 h-3.5" />
        </button>
      </Tooltip>
    </div>
  );
}

// -------------------------------------------------------
// Citation Badge
// -------------------------------------------------------
function CitationBadge({ index, source }: { index: number; source: string }) {
  return (
    <Tooltip content={source} side="top">
      <sup>
        <button className="inline-flex items-center justify-center w-5 h-5 text-[10px] font-bold bg-primary/10 text-primary rounded-full hover:bg-primary hover:text-white transition-colors mx-0.5">
          {index}
        </button>
      </sup>
    </Tooltip>
  );
}

// -------------------------------------------------------
// Main Component
// -------------------------------------------------------
interface ChatMessageProps {
  message: ChatMessageType;
  sources?: Source[];
  onRegenerate?: () => void;
}

export function ChatMessage({
  message,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  sources = [],
  onRegenerate,
}: ChatMessageProps) {
  const [formattedTime, setFormattedTime] = React.useState<string>("");

  React.useEffect(() => {
    setFormattedTime(
      message.timestamp.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      })
    );
  }, [message.timestamp]);

  if (message.isLoading) return <TypingIndicator />;

  const isUser = message.role === "user";

  return (
    <div
      className={`group flex gap-3 mb-5 animate-in fade-in slide-in-from-bottom-2 duration-300 ${isUser ? "flex-row-reverse" : ""}`}
    >
      {/* Avatar */}
      <div
        className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 shadow-sm ${
          isUser
            ? "bg-gradient-to-tr from-slate-200 to-slate-100 ring-1 ring-slate-200"
            : "bg-gradient-to-tr from-primary to-primary/80 ring-2 ring-primary/20 text-white"
        }`}
      >
        {isUser ? (
          <User className="w-4 h-4 text-slate-600" />
        ) : (
          <Sparkles className="w-4 h-4 text-white" />
        )}
      </div>

      {/* Bubble + toolbar */}
      <div
        className={`flex-1 max-w-[82%] flex flex-col ${isUser ? "items-end" : "items-start"}`}
      >
        <div
          className={`px-4 py-3 rounded-2xl text-sm leading-relaxed ${
            isUser
              ? "bg-gradient-to-br from-primary to-primary/90 text-white rounded-tr-sm shadow-sm"
              : "bg-white border border-slate-200 shadow-sm shadow-slate-200/50 rounded-tl-sm ring-1 ring-black/5"
          }`}
        >
          {isUser ? (
            <span className="leading-relaxed">{message.content}</span>
          ) : (
            <div className="prose-sm max-w-none">
              {renderContent(message.content)}
              {message.citations && message.citations.length > 0 && (
                <div className="mt-2 pt-2 border-t border-slate-100 flex gap-1 flex-wrap">
                  {message.citations.map((cite, idx) => (
                    <CitationBadge key={idx} index={idx + 1} source={cite} />
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

        {!isUser && (
          <MessageToolbar
            content={message.content}
            onRegenerate={onRegenerate}
          />
        )}

        <span className="text-[11px] text-muted mt-1 px-1">
          {formattedTime}

        </span>
      </div>
    </div>
  );
}
