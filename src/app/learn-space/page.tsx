"use client";

import { ArrowLeft, Brain, PanelLeft, PanelRight, Menu, Search, Sparkles, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";

// Hooks
import { useChat } from "@/features/learn-space/hooks/useChat";
import { useSources } from "@/features/learn-space/hooks/useSources";

// Components
import {
  Badge,
  Button,
  Card,
  ChatInput,
  ChatMessage,
  ChatSidebar,
  ExamPanel,
  Flashcard,
  LearningTools,
  NotesPanel,
  ProgressBar,
  QuizPanel,
  Tooltip,
} from "@/features/learn-space/components";

// Types
import type {
  ActivePanel,
  ExamQuestion,
  Flashcard as FlashcardType,
  Note,
  QuizQuestion,
} from "@/features/learn-space/types";

// ============================================================
// MOCK DATA for Specialized Tools
// ============================================================
const MOCK_QUIZ: QuizQuestion[] = [
  {
    id: "q1",
    type: "mcq",
    question:
      "According to the ML Fundamentals doc, what is the primary role of backpropagation?",
    options: [
      {
        id: "1",
        text: "To initialize the weights randomly before training start.",
        isCorrect: false,
      },
      {
        id: "2",
        text: "To calculate gradients of the loss function with respect to weights.",
        isCorrect: true,
      },
      {
        id: "3",
        text: "To compress the model size for edge deployment.",
        isCorrect: false,
      },
      {
        id: "4",
        text: "To visualize the hidden layers in a 3D plot.",
        isCorrect: false,
      },
    ],
    answer: "2",
    explanation:
      "Backpropagation computes the gradient of the loss function for a single weight by the chain rule, iteratively from the last layer back to the first.",
  },
  {
    id: "q2",
    type: "mcq",
    question:
      "Which architecture is noted as being best for spatial data like images?",
    options: [
      { id: "1", text: "Recurrent Neural Networks (RNN)", isCorrect: false },
      { id: "2", text: "Multi-layer Perceptron (MLP)", isCorrect: false },
      { id: "3", text: "Convolutional Neural Networks (CNN)", isCorrect: true },
      {
        id: "4",
        text: "Generative Adversarial Networks (GAN)",
        isCorrect: false,
      },
    ],
    answer: "3",
    explanation:
      "CNNs use convolutional layers that preserve spatial hierarchies, making them ideal for image-related tasks.",
  },
];

const MOCK_EXAM: ExamQuestion[] = [
  ...MOCK_QUIZ.map((q) => ({ ...q, points: 10 })),
  {
    id: "e1",
    type: "mcq",
    question: 'In Deep Learning, what does "overfitting" generally indicate?',
    options: [
      {
        id: "a",
        text: "The model has too few parameters to learn the pattern.",
        isCorrect: false,
      },
      {
        id: "b",
        text: "The model performs better on training data than on unseen data.",
        isCorrect: true,
      },
      {
        id: "c",
        text: "The training process has completed too quickly.",
        isCorrect: false,
      },
      {
        id: "d",
        text: "The learning rate is too small for the optimizer.",
        isCorrect: false,
      },
    ],
    answer: "b",
    points: 20,
    explanation:
      "Overfitting happens when a model fits the training data (including noise) so closely that it fails to generalize to new data.",
  },
];

const MOCK_FLASHCARDS: FlashcardType[] = [
  {
    id: "f1",
    front: "Hyperparameter",
    back: "A parameter whose value is set before the learning process begins, like learning rate or batch size.",
    confidence: "unrated",
  },
  {
    id: "f2",
    front: "Activation Function",
    back: "A mathematical function applied to a neuron's output to introduce non-linearity, like ReLU or Sigmoid.",
    confidence: "unrated",
  },
  {
    id: "f3",
    front: "Epoch",
    back: "One complete pass through the entire training dataset during the learning process.",
    confidence: "unrated",
  },
];

const MOCK_NOTES: Note[] = [
  {
    id: "n1",
    title: "Executive Summary: AI Fundamentals",
    content:
      'Deep Learning is a subset of Machine Learning based on artificial neural networks. The core idea is "learning representations" through multiple layers of abstraction. Key breakthroughs include CNNs for vision, RNNs/Transformers for sequences, and advanced optimizers like Adam.',
    isAIGenerated: true,
    createdAt: new Date(),
    updatedAt: new Date(),
    tags: ["ai", "fundamentals", "deep-learning"],
  },
  {
    id: "n2",
    title: "Exam Preparation Points",
    content:
      "- Focus on Gradient Descent variations\n- Review Regularization techniques (Dropout, L2)\n- Understand the bias-variance tradeoff",
    isAIGenerated: false,
    createdAt: new Date(),
    updatedAt: new Date(),
    tags: ["exam", "prep"],
  },
];

// ============================================================
// MAIN PAGE COMPONENT
// ============================================================

export default function LearnSpacePage() {
  // Global Feature State
  const { sources, uploadFiles, removeSource } = useSources();
  const {
    messages,
    isLoading: isChatLoading,
    sessions,
    activeSessionId,
    sendMessage,
    createSession,
    switchSession,
  } = useChat();

  // Local UI State
  const [activePanel, setActivePanel] = useState<ActivePanel>("chat");
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [isRightPanelOpen, setIsRightPanelOpen] = useState(true);
  const [isLeftPanelOpen, setIsLeftPanelOpen] = useState(true); // Desktop toggle for left panel

  const scrollRef = useRef<HTMLDivElement>(null);

  // Auto-scroll chat
  useEffect(() => {
    if (scrollRef.current && activePanel === "chat") {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, activePanel]);

  // Derived Title (like NotebookLM)
  const activeSessionTitle =
    sessions.find((s) => s.id === activeSessionId)?.title || "My Notebook";

  const handlePanelChange = (panel: ActivePanel) => {
    setActivePanel(panel);
    if (window.innerWidth < 1024) setIsRightPanelOpen(false); // Close on mobile if toggled
  };

  return (
    <div className="flex h-screen bg-[#fafafa] overflow-hidden font-sans text-slate-900">
      {/* -------------------------------------------------------
          LEFT SIDEBAR (Sources & History)
      ------------------------------------------------------- */}
      <aside
        className={`
        fixed lg:static inset-y-0 left-0 z-50 bg-white transform transition-all duration-300 ease-in-out shrink-0
        ${isMobileSidebarOpen ? "translate-x-0 w-70 shadow-2xl" : "-translate-x-full lg:translate-x-0 border-r border-slate-200"}
        ${!isMobileSidebarOpen && !isLeftPanelOpen ? "lg:w-0 lg:border-none lg:opacity-0 lg:overflow-hidden" : "lg:w-70"}
      `}
      >
        <div className="h-full flex flex-col">
          {/* Sidebar Header */}
          <div className="h-14 flex items-center justify-between gap-2 px-3 border-b border-slate-50">
            <div className="flex items-center gap-2.5 pl-1.5">
              <div className="w-7 h-7 bg-primary rounded-md flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-white" />
              </div>
              <span className="font-bold text-slate-800 tracking-tight">
                Gazior Cortex
              </span>
            </div>
            <Tooltip content="Close sidebar">
              <button
                onClick={() => setIsLeftPanelOpen(false)}
                className="hidden lg:flex p-1.5 hover:bg-slate-100 rounded-lg text-slate-500 transition-colors"
              >
                <PanelLeft className="w-5 h-5" />
              </button>
            </Tooltip>
          </div>

          {/* Sidebar Content (Scrollable) */}
          <ChatSidebar
            sources={sources}
            onUpload={uploadFiles}
            onRemoveSource={removeSource}
            sessions={sessions}
            activeSessionId={activeSessionId}
            onSessionSelect={switchSession}
            onNewSession={createSession}
          />

        </div>
      </aside>

      {/* -------------------------------------------------------
          CENTER CONTENT (Main Workspace)
      ------------------------------------------------------- */}
      <main className="flex-1 flex flex-col min-w-0 bg-white lg:bg-[#fafafa]">
        {/* Workspace Top Header */}
        <header className="h-14 bg-white border-b border-slate-100 flex items-center justify-between px-4 lg:px-6">
          <div className="flex items-center gap-3">
            {/* Mobile Sidebar Toggle */}
            <button
              onClick={() => setIsMobileSidebarOpen(true)}
              className="lg:hidden p-1.5 hover:bg-slate-100 rounded-lg text-slate-500 transition-colors"
            >
              <Menu className="w-5 h-5" />
            </button>
            
            {/* Desktop Left Sidebar Toggle */}
            {!isLeftPanelOpen && (
               <Tooltip content="Open sidebar">
                <button
                  onClick={() => setIsLeftPanelOpen(true)}
                  className="hidden lg:flex p-1.5 hover:bg-slate-100 rounded-lg text-slate-500 transition-colors"
                >
                  <PanelLeft className="w-5 h-5" />
                </button>
              </Tooltip>
            )}

            <div className="flex items-center gap-3 ml-1 lg:ml-0">
              <Badge
                variant="outline"
                className="hidden sm:inline-flex bg-slate-50/50"
              >
                Notebook
              </Badge>
              <h1 className="text-sm font-semibold text-slate-900 truncate max-w-50 md:max-w-md">
                {activeSessionTitle}
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Tooltip content="Search in session">
              <Button variant="ghost" size="sm" className="text-slate-400">
                <Search className="w-4 h-4" />
              </Button>
            </Tooltip>
            
            {activePanel !== "chat" && (
              <Button
                variant="outline"
                size="xs"
                onClick={() => setActivePanel("chat")}
                className="gap-1.5 hidden sm:flex"
              >
                <ArrowLeft className="w-3.5 h-3.5" /> Back to Chat
              </Button>
            )}
            
            {/* Right Panel Toggle */}
            <Tooltip content={isRightPanelOpen ? "Close toolbox" : "Open toolbox"}>
              <button
                onClick={() => setIsRightPanelOpen(!isRightPanelOpen)}
                className={`p-1.5 rounded-lg transition-colors ml-1 ${
                  !isRightPanelOpen 
                    ? "text-slate-800 hover:bg-slate-100 bg-slate-100/50" 
                    : "text-slate-500 hover:bg-slate-100"
                }`}
              >
                <PanelRight className="w-5 h-5" />
              </button>
            </Tooltip>

            <div className="w-8 h-8 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center ml-2 sm:ml-4 shrink-0">
              <span className="text-xs font-bold text-slate-500">JD</span>
            </div>
          </div>
        </header>

        {/* Viewport Area */}
        <div className="flex-1 flex flex-col overflow-hidden relative">
          {/* Scrollable Content Container */}
          <div
            ref={scrollRef}
            className="flex-1 overflow-y-auto px-4 lg:px-12 py-6 custom-scrollbar"
          >
            <div className="max-w-3xl mx-auto w-full">
              {/* Conditional Panel Rendering */}
              {activePanel === "chat" && (
                <div className="space-y-4">
                  {messages.map((msg) => (
                    <ChatMessage key={msg.id} message={msg} sources={sources} />
                  ))}
                  {isChatLoading && (
                    <ChatMessage
                      message={{
                        id: "loading",
                        role: "assistant",
                        content: "",
                        timestamp: new Date(),
                        isLoading: true,
                      }}
                    />
                  )}
                </div>
              )}

              {activePanel === "quiz" && (
                <QuizPanel questions={MOCK_QUIZ} onComplete={() => {}} />
              )}

              {activePanel === "exam" && <ExamPanel questions={MOCK_EXAM} />}

              {activePanel === "flashcards" && (
                <Flashcard cards={MOCK_FLASHCARDS} />
              )}

              {activePanel === "notes" && <NotesPanel notes={MOCK_NOTES} />}
            </div>
          </div>

          {/* Chat Input Area (Fixed at bottom only in chat mode) */}
          {activePanel === "chat" && (
            <div className="px-4 lg:px-12 pb-8 pt-4 bg-linear-to-t from-white via-white to-transparent">
              <div className="max-w-3xl mx-auto">
                <ChatInput
                  onSend={sendMessage}
                  disabled={isChatLoading}
                  placeholder="Ask anything about your documents..."
                />
              </div>
            </div>
          )}
        </div>
      </main>

      {/* -------------------------------------------------------
          RIGHT PANEL (Toolbox)
      ------------------------------------------------------- */}
      <aside
        className={`
        fixed lg:static inset-y-0 right-0 z-50 bg-white transform transition-all duration-300 ease-in-out shrink-0
        ${isRightPanelOpen ? "translate-x-0 w-80 shadow-2xl lg:shadow-none border-l border-slate-200" : "translate-x-full lg:translate-x-0 lg:w-0 lg:border-none lg:opacity-0 lg:overflow-hidden"}
      `}
      >
        <div className="h-full flex flex-col p-5 overflow-y-auto custom-scrollbar">
          <LearningTools
            activePanel={activePanel}
            onPanelChange={handlePanelChange}
          />

          <div className="mt-auto pt-8">
            <Card className="bg-primary/5 border-none p-4">
              <div className="flex items-center gap-2 mb-2">
                <Brain className="w-4 h-4 text-primary" />
                <span className="text-xs font-bold uppercase tracking-widest text-slate-400">
                  Memory Efficiency
                </span>
              </div>
              <div className="flex items-end justify-between mb-1.5">
                <span className="text-sm font-semibold text-slate-700">
                  Study Score
                </span>
                <span className="text-xs text-slate-500">82%</span>
              </div>
              <ProgressBar value={82} color="primary" />
              <p className="text-[10px] text-slate-400 mt-2">
                Based on your quiz performance and note-taking activity.
              </p>
            </Card>
          </div>
        </div>

        {/* Mobile Close Button for Right Panel */}
        <button
           onClick={() => setIsRightPanelOpen(false)}
           className="lg:hidden absolute top-4 right-4 p-1.5 bg-slate-100 rounded-full text-slate-500"
        >
           <X className="w-4 h-4" />
        </button>
      </aside>

      {/* Overlay for mobile sidebars */}
      {(isMobileSidebarOpen || (isRightPanelOpen && typeof window !== 'undefined' && window.innerWidth < 1024)) && (
        <div
          onClick={() => {
            setIsMobileSidebarOpen(false);
            if (window.innerWidth < 1024) setIsRightPanelOpen(false);
          }}
          className="lg:hidden fixed inset-0 bg-slate-900/20 backdrop-blur-[2px] z-40 transition-opacity"
        />
      )}

      {/* Global CSS for scrollbars (aligned with design system) */}
      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 5px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #e2e8f0;
          border-radius: 99px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #cbd5e1;
        }
      `}</style>
    </div>
  );
}
