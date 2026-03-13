"use client";

import { Mic, Paperclip, Send } from "lucide-react";
import React, { useRef, useState } from "react";
import { Tooltip } from "./ui";

interface ChatInputProps {
  onSend: (message: string) => void;
  disabled?: boolean;
  placeholder?: string;
}

export function ChatInput({
  onSend,
  disabled = false,
  placeholder = "Ask anything about your documents…",
}: ChatInputProps) {
  const [message, setMessage] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const canSend = message.trim().length > 0 && !disabled;

  const handleSubmit = () => {
    if (!canSend) return;
    onSend(message.trim());
    setMessage("");
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  const adjustHeight = () => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 180)}px`;
    }
  };

  return (
    <div className="flex flex-col gap-2">
      <div
        className={`
          flex items-end gap-2 bg-white border rounded-xl p-2.5
          transition-all duration-200 shadow-sm
          ${disabled ? "opacity-70 cursor-not-allowed" : ""}
          border-border focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/20
        `}
      >
        {/* Attach */}
        <Tooltip content="Attach file">
          <button
            className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-colors shrink-0"
            disabled={disabled}
            aria-label="Attach file"
          >
            <Paperclip className="w-4 h-4" />
          </button>
        </Tooltip>

        {/* Textarea */}
        <textarea
          ref={textareaRef}
          value={message}
          onChange={(e) => {
            setMessage(e.target.value);
            adjustHeight();
          }}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          disabled={disabled}
          rows={1}
          className="flex-1 resize-none bg-transparent border-0 focus:outline-none focus:ring-0 text-sm text-slate-900 placeholder:text-slate-400 min-h-6 max-h-45 py-1.5 leading-relaxed"
        />

        <div className="flex items-center gap-1 shrink-0">
          {/* Voice */}
          <Tooltip content="Voice input">
            <button
              className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
              disabled={disabled}
              aria-label="Voice input"
            >
              <Mic className="w-4 h-4" />
            </button>
          </Tooltip>

          {/* Send */}
          <button
            onClick={handleSubmit}
            disabled={!canSend}
            aria-label="Send message"
            className={`
              p-2 rounded-lg transition-all duration-200 flex items-center justify-center
              ${
                canSend
                  ? "bg-primary text-white hover:opacity-90 shadow-sm"
                  : "bg-slate-100 text-slate-300 cursor-not-allowed"
              }
            `}
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
      </div>

      <p className="text-center text-[11px] text-muted">
        Press{" "}
        <kbd className="px-1 py-0.5 text-[10px] bg-slate-100 border border-slate-200 rounded font-mono">
          Enter
        </kbd>{" "}
        to send ·{" "}
        <kbd className="px-1 py-0.5 text-[10px] bg-slate-100 border border-slate-200 rounded font-mono">
          Shift+Enter
        </kbd>{" "}
        for new line
      </p>
    </div>
  );
}
