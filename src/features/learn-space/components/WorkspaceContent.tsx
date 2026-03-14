import { RefObject } from "react";
import { ChatInput } from "./ChatInput";
import { ChatMessage } from "./ChatMessage";
import { QuizPanel } from "./QuizPanel";
import { ExamPanel } from "./ExamPanel";
import { Flashcard } from "./Flashcard";
import { NotesPanel } from "./NotesPanel";
import { ActivePanel, ChatMessage as Message, Source, QuizQuestion, ExamQuestion, Flashcard as FlashcardType, Note } from "../types";

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
}: WorkspaceContentProps) {
  return (
    <div className="flex-1 flex flex-col overflow-hidden relative">
      <div
        ref={scrollRef}
        className="flex-1 overflow-y-auto px-4 lg:px-12 py-6 custom-scrollbar"
      >
        <div className="max-w-3xl mx-auto w-full">
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

          {activePanel === "exam" && <ExamPanel questions={mockExam} />}

          {activePanel === "flashcards" && (
            <Flashcard cards={mockFlashcards} />
          )}

          {activePanel === "notes" && <NotesPanel notes={mockNotes} />}
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
