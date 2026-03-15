import { RefObject } from "react";
import { ChatInput } from "./ChatInput";
import { ChatMessage } from "./ChatMessage";
import { QuizPanel } from "./QuizPanel";
import { ExamPanel } from "./ExamPanel";
import { Flashcard } from "./Flashcard";
import { NotesPanel } from "./NotesPanel";
import { SummaryPanel } from "./SummaryPanel";
import {
  ActivePanel,
  ChatMessage as Message,
  Source,
  QuizQuestion,
  ExamQuestion,
  Flashcard as FlashcardType,
  Note,
  Summary,
} from "../types";

interface WorkspaceContentProps {
  activePanel: ActivePanel;
  messages: Message[];
  isChatLoading: boolean;
  sources: Source[];
  onSendMessage: (content: string) => void;
  scrollRef: RefObject<HTMLDivElement | null>;
  mockQuiz: QuizQuestion[];
  mockExam: ExamQuestion[];
  mockFlashcards: FlashcardType[];
  mockNotes: Note[];
  mockSummary: Summary;
  // Exam persisted state
  examState: any; // Type this properly if possible
  examHandlers: any;
}

export function WorkspaceContent({
  activePanel,
  messages,
  isChatLoading,
  sources,
  onSendMessage,
  scrollRef,
  mockQuiz,
  mockExam,
  mockFlashcards,
  mockNotes,
  mockSummary,
  examState,
  examHandlers,
}: WorkspaceContentProps) {
  return (
    <div className="flex-1 flex flex-col overflow-hidden relative">
      <div
        ref={scrollRef}
        className="flex-1 overflow-y-auto px-4 lg:px-12 py-6 custom-scrollbar"
      >
        <div
          className={`mx-auto w-full transition-all duration-500 ${
            activePanel === "exam" || activePanel === "notes"
              ? "max-w-6xl"
              : "max-w-3xl"
          }`}
        >
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
            <QuizPanel questions={mockQuiz} onComplete={() => {}} />
          )}

          {activePanel === "exam" && (
            <ExamPanel questions={mockExam} {...examState} {...examHandlers} />
          )}

          {activePanel === "flashcards" && <Flashcard cards={mockFlashcards} />}

          {activePanel === "notes" && <NotesPanel notes={mockNotes} />}

          {activePanel === "summary" && <SummaryPanel summary={mockSummary} />}
        </div>
      </div>

      {activePanel === "chat" && (
        <div className="px-4 lg:px-12 pb-8 pt-4 bg-linear-to-t from-white via-white to-transparent">
          <div className="max-w-3xl mx-auto">
            <ChatInput
              onSend={onSendMessage}
              disabled={isChatLoading}
              placeholder="Ask anything about your documents..."
            />
          </div>
        </div>
      )}
    </div>
  );
}
