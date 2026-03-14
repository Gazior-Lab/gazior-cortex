// ============================================================
// Learn Space — Shared Types
// ============================================================

export type SourceType = 'pdf' | 'doc' | 'docx' | 'txt' | 'md';
export type SourceStatus = 'uploading' | 'processing' | 'ready' | 'error';

export interface Source {
  pages: any;
  id: string;
  name: string;
  type: SourceType;
  status: SourceStatus;
  uploadTime: Date;
  size: string;
  pageCount?: number;
}

// -------------------------------------------------------
// Chat
// -------------------------------------------------------

export type MessageRole = 'user' | 'assistant' | 'system';

export interface ChatMessage {
  id: string;
  role: MessageRole;
  content: string;
  timestamp: Date;
  citations?: string[];
  isLoading?: boolean;
}

export interface ChatSession {
  id: string;
  title: string;
  preview: string;
  timestamp: Date;
  messageCount: number;
  messages: ChatMessage[];
}

// -------------------------------------------------------
// Notebook (multi-notebook like NotebookLM)
// -------------------------------------------------------

export interface Notebook {
  id: string;
  title: string;
  emoji: string;
  createdAt: Date;
  sources: Source[];
  sessions: ChatSession[];
  activeSessionId: string;
}

// -------------------------------------------------------
// Flashcards
// -------------------------------------------------------

export type CardConfidence = 'easy' | 'medium' | 'hard' | 'unrated';

export interface Flashcard {
  id: string;
  front: string;
  back: string;
  confidence: CardConfidence;
}

// -------------------------------------------------------
// Quiz
// -------------------------------------------------------

export type QuestionType = 'mcq' | 'true_false' | 'short_answer';

export interface QuizOption {
  id: string;
  text: string;
  isCorrect: boolean;
}

export interface QuizQuestion {
  id: string;
  type: QuestionType;
  question: string;
  options?: QuizOption[];
  answer: string;
  explanation: string;
}

export interface QuizResult {
  score: number;
  total: number;
  answers: Record<string, string>;
  completedAt: Date;
}

// -------------------------------------------------------
// Exam
// -------------------------------------------------------

export interface ExamQuestion extends QuizQuestion {
  points: number;
}

export interface ExamResult {
  score: number;
  total: number;
  percentage: number;
  timeTaken: number; // seconds
  answers: Record<string, string>;
  completedAt: Date;
}

// -------------------------------------------------------
// Notes
// -------------------------------------------------------

export interface Note {
  id: string;
  title: string;
  content: string;
  isAIGenerated: boolean;
  createdAt: Date;
  updatedAt: Date;
  tags: string[];
}

// -------------------------------------------------------
// Tools / Panels
// -------------------------------------------------------

export type ActivePanel =
  | 'chat'
  | 'quiz'
  | 'exam'
  | 'notes'
  | 'flashcards'
  | 'summary';

export interface LearningTool {
  id: ActivePanel;
  icon: React.ReactNode;
  title: string;
  description: string;
  badge?: string;
}
