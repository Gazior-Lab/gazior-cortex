"use client";

import { FileText, Upload } from "lucide-react";
import React, { useRef, useState } from "react";

interface FileUploaderProps {
  onUpload: (files: FileList) => void;
}

const ACCEPTED_TYPES = ".pdf,.doc,.docx,.txt,.md";

export function FileUploader({ onUpload }: FileUploaderProps) {
  const [isDragging, setIsDragging] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files?.length) onUpload(e.dataTransfer.files);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.length) {
      onUpload(e.target.files);
      e.target.value = "";
    }
  };

  return (
    <div
      role="button"
      tabIndex={0}
      aria-label="Upload documents"
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      onClick={() => inputRef.current?.click()}
      onKeyDown={(e) => e.key === "Enter" && inputRef.current?.click()}
      className={`
        relative group border-2 border-dashed rounded-(--radius-lg) p-5 text-center cursor-pointer
        transition-all duration-200 select-none outline-none
        focus-visible:ring-2 focus-visible:ring-primary
        ${
          isDragging
            ? "border-primary bg-primary/5 scale-[1.01]"
            : "border-border hover:border-primary/50 hover:bg-slate-50"
        }
      `}
    >
      <input
        ref={inputRef}
        type="file"
        multiple
        accept={ACCEPTED_TYPES}
        className="hidden"
        onChange={handleChange}
      />

      <div className="flex flex-col items-center gap-3">
        {/* Animated icon container */}
        <div
          className={`
          p-3 rounded-full transition-all duration-200
          ${
            isDragging
              ? "bg-primary text-white scale-110"
              : "bg-primary/10 text-primary group-hover:scale-105"
          }
        `}
        >
          <Upload className="w-5 h-5" />
        </div>

        <div className="space-y-1">
          <p className="text-sm font-medium text-slate-800">
            {isDragging ? "Drop to upload" : "Upload documents"}
          </p>
          <p className="text-xs text-muted">PDF, DOCX, TXT, Markdown</p>
        </div>

        <div className="flex items-center gap-1.5 text-xs text-muted">
          <FileText className="w-3.5 h-3.5" />
          <span>Drag & drop or click</span>
        </div>
      </div>
    </div>
  );
}
