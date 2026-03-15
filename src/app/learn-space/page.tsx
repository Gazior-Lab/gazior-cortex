"use client";

import { Brain, PanelLeft, Sparkles, X } from "lucide-react";
import { useEffect, useRef } from "react";

// Hooks
import { useChat } from "@/features/learn-space/hooks/useChat";
import { useSources } from "@/features/learn-space/hooks/useSources";
import { useLearnSpaceUI } from "@/features/learn-space/hooks/useLearnSpaceUI";
import { useExam } from "@/features/learn-space/hooks/useExam";

// Components
import { Card } from "@/features/learn-space/components/ui/Card";
import { ChatSidebar } from "@/features/learn-space/components/ChatSidebar";
import { LearningTools } from "@/features/learn-space/components/LearningTools";
import { ProgressBar } from "@/features/learn-space/components/ui/ProgressBar";
import { Tooltip } from "@/features/learn-space/components/ui/Tooltip";
import { WorkspaceHeader } from "@/features/learn-space/components/WorkspaceHeader";
import { WorkspaceContent } from "@/features/learn-space/components/WorkspaceContent";

// Mock Data
import {
  MOCK_QUIZ,
  MOCK_EXAM,
  MOCK_FLASHCARDS,
  MOCK_NOTES,
  MOCK_SUMMARY,
} from "@/features/learn-space/constants/mockData";



export default function LearnSpacePage() {
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

  const {
    activePanel,
    isMobileSidebarOpen,
    setIsMobileSidebarOpen,
    isRightPanelOpen,
    setIsRightPanelOpen,
    isLeftPanelOpen,
    setIsLeftPanelOpen,
    handlePanelChange,
    toggleRightPanel,
  } = useLearnSpaceUI();

  const {
    isStarted: isExamStarted,
    isFinished: isExamFinished,
    currentIndex: examIndex,
    setCurrentIndex: setExamIndex,
    answers: examAnswers,
    timeLeft: examTimeLeft,
    startExam,
    resetExam,
    finishExam,
    selectAnswer: selectExamAnswer,
  } = useExam(MOCK_EXAM, 15);

  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current && activePanel === "chat") {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, activePanel]);

  const activeSessionTitle =
    sessions.find((s) => s.id === activeSessionId)?.title || "My Notebook";

  return (
    <div className="flex h-screen bg-[#fafafa] overflow-hidden font-sans text-slate-900">
      <aside
        className={`
        fixed lg:static inset-y-0 left-0 z-50 bg-white transform transition-all duration-300 ease-in-out shrink-0
        ${isMobileSidebarOpen ? "translate-x-0 w-70 shadow-2xl" : "-translate-x-full lg:translate-x-0 border-r border-slate-200"}
        ${!isMobileSidebarOpen && !isLeftPanelOpen ? "lg:w-0 lg:border-none lg:opacity-0 lg:overflow-hidden" : "lg:w-70"}
      `}
      >
        <div className="h-full flex flex-col">
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

      <main className="flex-1 flex flex-col min-w-0 bg-white lg:bg-[#fafafa]">
        <WorkspaceHeader
          activeSessionTitle={activeSessionTitle}
          activePanel={activePanel}
          isLeftPanelOpen={isLeftPanelOpen}
          isRightPanelOpen={isRightPanelOpen}
          onMobileSidebarToggle={() => setIsMobileSidebarOpen(true)}
          onLeftPanelToggle={setIsLeftPanelOpen}
          onRightPanelToggle={toggleRightPanel}
          onBackToChat={() => handlePanelChange("chat")}
        />

        <WorkspaceContent
          activePanel={activePanel}
          messages={messages}
          isChatLoading={isChatLoading}
          sources={sources}
          onSendMessage={sendMessage}
          scrollRef={scrollRef}
          mockQuiz={MOCK_QUIZ}
          mockExam={MOCK_EXAM}
          mockFlashcards={MOCK_FLASHCARDS}
          mockNotes={MOCK_NOTES}
          mockSummary={MOCK_SUMMARY}
          examState={{
            isStarted: isExamStarted,
            isFinished: isExamFinished,
            currentIndex: examIndex,
            answers: examAnswers,
            timeLeft: examTimeLeft,
          }}
          examHandlers={{
            onStart: startExam,
            onReset: resetExam,
            onFinish: finishExam,
            onSelectAnswer: selectExamAnswer,
            onIndexChange: setExamIndex,
          }}
        />
      </main>

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

        <button
           onClick={() => setIsRightPanelOpen(false)}
           className="lg:hidden absolute top-4 right-4 p-1.5 bg-slate-100 rounded-full text-slate-500"
        >
           <X className="w-4 h-4" />
        </button>
      </aside>

      {(isMobileSidebarOpen || (isRightPanelOpen && typeof window !== 'undefined' && window.innerWidth < 1024)) && (
        <div
          onClick={() => {
            setIsMobileSidebarOpen(false);
            if (window.innerWidth < 1024) setIsRightPanelOpen(false);
          }}
          className="lg:hidden fixed inset-0 bg-slate-900/20 backdrop-blur-[2px] z-40 transition-opacity"
        />
      )}


    </div>
  );
}
