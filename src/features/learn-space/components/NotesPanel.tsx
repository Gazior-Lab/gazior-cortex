"use client";

import { BookOpen, FileText, Pencil, Save, Sparkles } from "lucide-react";
import { useState } from "react";
import type { Note } from "../types";
import { Badge, Button, Divider } from "./ui";

interface NotesPanelProps {
  notes: Note[];
}

export function NotesPanel({ notes }: NotesPanelProps) {
  const [activeNoteId, setActiveNoteId] = useState<string | null>(
    notes[0]?.id || null,
  );
  const [isEditing, setIsEditing] = useState(false);
  const [editContent, setEditContent] = useState("");

  const activeNote = notes.find((n) => n.id === activeNoteId);

  const handleEdit = () => {
    if (activeNote) {
      setEditContent(activeNote.content);
      setIsEditing(true);
    }
  };

  const handleSave = () => {
    // Logic to save updated note...
    setIsEditing(false);
  };

  return (
    <div className="h-full flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <BookOpen className="w-5 h-5 text-primary" />
          <h3 className="font-semibold text-slate-900">Study Notes</h3>
        </div>
        <Button variant="outline" size="xs">
          <Sparkles className="w-3.5 h-3.5 mr-1" /> Generate New
        </Button>
      </div>

      <div className="flex flex-1 gap-4 min-h-0">
        {/* Note List */}
        <div className="w-1/3 border-r border-slate-100 pr-4 overflow-y-auto space-y-2">
          {notes.map((note) => (
            <button
              key={note.id}
              onClick={() => {
                setActiveNoteId(note.id);
                setIsEditing(false);
              }}
              className={`
                w-full text-left p-3 rounded-md border transition-all duration-200
                ${
                  activeNoteId === note.id
                    ? "bg-primary/5 border-primary/20 ring-1 ring-primary/5"
                    : "border-transparent hover:bg-slate-50"
                }
              `}
            >
              <div className="flex items-center gap-1.5 mb-1">
                {note.isAIGenerated ? (
                  <Sparkles className="w-3 h-3 text-primary" />
                ) : (
                  <Pencil className="w-3 h-3 text-slate-400" />
                )}
                <span
                  className={`text-[10px] uppercase font-bold tracking-wider ${activeNoteId === note.id ? "text-primary" : "text-slate-400"}`}
                >
                  {note.isAIGenerated ? "AI Summary" : "My Note"}
                </span>
              </div>
              <p
                className={`text-xs font-semibold truncate ${activeNoteId === note.id ? "text-slate-900" : "text-slate-700"}`}
              >
                {note.title}
              </p>
              <p className="text-[10px] text-slate-400 mt-1">
                {note.updatedAt.toLocaleDateString()}
              </p>
            </button>
          ))}
        </div>

        {/* Note Editor/Viewer */}
        <div className="flex-1 flex flex-col min-w-0">
          {activeNote ? (
            <div className="flex flex-col h-full animate-in fade-in duration-300">
              <div className="flex items-center justify-between mb-4">
                <h4 className="text-base font-bold text-slate-900 truncate">
                  {activeNote.title}
                </h4>
                <div className="flex gap-2">
                  {isEditing ? (
                    <Button variant="primary" size="xs" onClick={handleSave}>
                      <Save className="w-3.5 h-3.5 mr-1" /> Save
                    </Button>
                  ) : (
                    <Button variant="ghost" size="xs" onClick={handleEdit}>
                      <Pencil className="w-3.5 h-3.5 mr-1" /> Edit
                    </Button>
                  )}
                </div>
              </div>

              {isEditing ? (
                <textarea
                  value={editContent}
                  onChange={(e) => setEditContent(e.target.value)}
                  className="flex-1 w-full bg-slate-50 border border-slate-200 rounded-md p-4 text-sm resize-none focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none"
                />
              ) : (
                <div className="flex-1 overflow-y-auto bg-slate-50/50 rounded-md p-4 border border-slate-100">
                  <div className="prose prose-sm max-w-none text-slate-700 leading-relaxed whitespace-pre-wrap">
                    {activeNote.content}
                  </div>

                  <div className="mt-8">
                    <Divider label="Keywords" className="mb-3" />
                    <div className="flex flex-wrap gap-2">
                      {activeNote.tags.map((tag) => (
                        <Badge key={tag} variant="outline">
                          #{tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center opacity-40">
              <FileText className="w-12 h-12 mb-4" />
              <p>Select a note to view details</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
