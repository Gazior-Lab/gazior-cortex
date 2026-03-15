"use client";

import { BookOpen, Calendar, ChevronRight, FileText, Pencil, Plus, Save, Search, Sparkles, Tag } from "lucide-react";
import { useState } from "react";
import type { Note } from "../types";
import { Badge, Button } from "./ui";

interface NotesPanelProps {
  notes: Note[];
}

export function NotesPanel({ notes }: NotesPanelProps) {
  const [activeNoteId, setActiveNoteId] = useState<string | null>(
    notes[0]?.id || null,
  );
  const [isEditing, setIsEditing] = useState(false);
  const [editContent, setEditContent] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const activeNote = notes.find((n) => n.id === activeNoteId);

  const handleEdit = () => {
    if (activeNote) {
      setEditContent(activeNote.content);
      setIsEditing(true);
    }
  };

  const handleSave = () => {
    setIsEditing(false);
  };

  const filteredNotes = notes.filter(n => 
    n.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    n.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="h-full flex flex-col gap-0 -mx-4 lg:-mx-12 -my-6">
      {/* Top Action Bar */}
      <div className="px-6 lg:px-12 py-4 border-b border-slate-100 bg-white/50 backdrop-blur-md flex items-center justify-between sticky top-0 z-10">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-slate-900 text-white rounded-xl shadow-lg shadow-slate-900/10">
            <BookOpen className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-bold text-slate-900 text-lg tracking-tight">AI Smart Notes</h3>
            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-0.5">Knowledge Repository</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative hidden md:block">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input 
              type="text"
              placeholder="Filter notes..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all w-48"
            />
          </div>
          <Button variant="primary" size="sm" className="shadow-lg shadow-primary/20">
            <Plus className="w-4 h-4 mr-2" /> New Note
          </Button>
        </div>
      </div>

      <div className="flex flex-1 min-h-0 overflow-hidden">
        {/* Sidebar Split Navigation */}
        <div className="w-80 border-r border-slate-100 bg-slate-50/30 overflow-y-auto custom-scrollbar p-6 space-y-3">
          {filteredNotes.length > 0 ? (
            filteredNotes.map((note) => (
              <button
                key={note.id}
                onClick={() => {
                  setActiveNoteId(note.id);
                  setIsEditing(false);
                }}
                className={`
                  w-full text-left p-4 rounded-lg border transition-all duration-300 relative group
                  ${
                    activeNoteId === note.id
                      ? "bg-white border-slate-200 shadow-sm text-slate-900"
                      : "border-transparent text-slate-600 hover:bg-white hover:border-slate-200"
                  }
                `}
              >
                
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    {note.isAIGenerated ? (
                      <div className="p-1 bg-primary/10 rounded-md">
                        <Sparkles className="w-3 h-3 text-primary" />
                      </div>
                    ) : (
                      <div className="p-1 bg-slate-100 rounded-md">
                        <Pencil className="w-3 h-3 text-slate-400" />
                      </div>
                    )}
                    <span
                      className={`text-[9px] uppercase font-black tracking-[0.15em] ${activeNoteId === note.id ? "text-primary" : "text-slate-400"}`}
                    >
                      {note.isAIGenerated ? "AI Generated" : "Personal"}
                    </span>
                  </div>
                  <ChevronRight className={`w-3.5 h-3.5 transition-transform duration-300 ${activeNoteId === note.id ? "text-primary translate-x-0" : "text-slate-200 -translate-x-2 group-hover:translate-x-0 opacity-0 group-hover:opacity-100"}`} />
                </div>
                
                <h4 className={`text-sm font-extrabold mb-2 line-clamp-1 ${activeNoteId === note.id ? "text-slate-900" : "text-slate-700"}`}>
                  {note.title}
                </h4>
                
                <div className="flex items-center gap-3 text-slate-400">
                   <div className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      <span className="text-[10px] font-bold">{note.updatedAt.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
                   </div>
                   <div className="flex items-center gap-1">
                      <Tag className="w-3 h-3" />
                      <span className="text-[10px] font-bold">{note.tags.length} Tags</span>
                   </div>
                </div>
              </button>
            ))
          ) : (
            <div className="py-20 text-center px-4">
               <Search className="w-8 h-8 text-slate-200 mx-auto mb-3" />
               <p className="text-sm font-bold text-slate-400">No notes found matching your search.</p>
            </div>
          )}
        </div>

        {/* Note Content Viewer / Editor */}
        <div className="flex-1 overflow-y-auto bg-white relative">
          {activeNote ? (
            <div className="max-w-3xl mx-auto px-8 lg:px-16 py-12 animate-in fade-in slide-in-from-right-4 duration-500">
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 pb-8 border-b border-slate-100">
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    {activeNote.isAIGenerated && (
                      <Badge variant="outline" className="text-slate-500 font-normal shadow-none border-slate-200">
                         AI Generated
                      </Badge>
                    )}
                    <div className="flex items-center gap-1.5 text-slate-500 text-sm">
                       <Calendar className="w-4 h-4" />
                       <span>{activeNote.updatedAt.toLocaleDateString()}</span>
                    </div>
                  </div>
                  <h1 className="text-2xl font-bold text-slate-800">
                    {activeNote.title}
                  </h1>
                </div>
                
                <div className="flex items-center gap-2">
                  {isEditing ? (
                    <Button variant="outline" size="md" onClick={handleSave} className="shadow-none">
                      <Save className="w-4 h-4 mr-2" /> Save
                    </Button>
                  ) : (
                    <Button variant="outline" size="md" onClick={handleEdit} className="shadow-none border-slate-200">
                      <Pencil className="w-4 h-4 mr-2" /> Edit
                    </Button>
                  )}
                </div>
              </div>

              {isEditing ? (
                <div className="relative space-y-4">
                   <div className="flex items-center gap-2 text-primary">
                      <ActivityIcon className="w-4 h-4" />
                      <span className="text-[10px] font-black uppercase tracking-widest">Editing Mode • Auto-saving enabled</span>
                   </div>
                   <textarea
                    value={editContent}
                    onChange={(e) => setEditContent(e.target.value)}
                    className="w-full h-125 bg-slate-50 border border-slate-200 rounded-3xl p-8 text-lg font-medium leading-relaxed resize-none focus:ring-4 focus:ring-primary/5 focus:border-primary/30 outline-none transition-all shadow-inner"
                    placeholder="Enter note content here..."
                  />
                </div>
              ) : (
                <div className="space-y-12">
                  <div className="prose prose-slate prose-lg max-w-none">
                    <div className="text-slate-700 leading-loose text-lg font-medium whitespace-pre-wrap font-serif italic border-l-4 border-slate-100 pl-8 py-2">
                      {activeNote.content}
                    </div>
                  </div>

                  <div className="bg-slate-50 rounded-3xl p-8 border border-slate-100">
                    <div className="flex items-center gap-2 mb-6">
                       <Tag className="w-4 h-4 text-slate-400" />
                       <h4 className="text-[11px] font-black uppercase tracking-[0.2em] text-slate-400">Concept Tags</h4>
                    </div>
                    <div className="flex flex-wrap gap-3">
                      {activeNote.tags.map((tag) => (
                        <div 
                          key={tag}
                          className="px-4 py-2 bg-white border border-slate-200 rounded-xl text-xs font-bold text-slate-600 shadow-sm hover:border-primary/30 hover:text-primary transition-all cursor-default"
                        >
                          #{tag}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="h-full flex flex-col items-center justify-center p-12 text-center">
               <FileText className="w-10 h-10 text-slate-300 mb-4" />
               <h3 className="text-lg font-semibold text-slate-800 mb-2">Select a note</h3>
               <p className="text-slate-500 text-sm">
                 Choose a note from the sidebar to view its contents.
               </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function ActivityIcon({ className }: { className?: string }) {
   return (
      <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor">
         <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
      </svg>
   )
}
