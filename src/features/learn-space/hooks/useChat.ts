'use client';

import { useState, useCallback } from 'react';
import type { ChatMessage, ChatSession, Source } from '../types';

const INITIAL_SESSION: ChatSession = {
  id: 'session-1',
  title: 'New Session',
  preview: '',
  timestamp: new Date(),
  messageCount: 0,
  messages: [
    {
      id: 'welcome',
      role: 'assistant',
      content:
        "Hello! I've analyzed your documents and I'm ready to help. You can ask me questions, request summaries, or generate quiz questions based on your uploaded materials. What would you like to explore?",
      timestamp: new Date(),
    },
  ],
};

interface UseChatReturn {
  messages: ChatMessage[];
  isLoading: boolean;
  sessions: ChatSession[];
  activeSessionId: string;
  sendMessage: (content: string, sources?: Source[]) => void;
  clearChat: () => void;
  createSession: () => void;
  switchSession: (id: string) => void;
  renameSession: (id: string, title: string) => void;
}

export function useChat(): UseChatReturn {
  const [sessions, setSessions] = useState<ChatSession[]>([INITIAL_SESSION]);
  const [activeSessionId, setActiveSessionId] = useState<string>(INITIAL_SESSION.id);
  const [isLoading, setIsLoading] = useState(false);

  const activeSession = sessions.find((s) => s.id === activeSessionId) ?? sessions[0];
  const messages = activeSession?.messages ?? [];

  const updateSession = useCallback((id: string, updater: (s: ChatSession) => ChatSession) => {
    setSessions((prev) => prev.map((s) => (s.id === id ? updater(s) : s)));
  }, []);

  const sendMessage = useCallback(
    async (content: string, sources: Source[] = []) => {
      const userMsg: ChatMessage = {
        id: `user-${Date.now()}`,
        role: 'user',
        content,
        timestamp: new Date(),
      };

      updateSession(activeSessionId, (s) => ({
        ...s,
        messages: [...s.messages, userMsg],
        preview: content.slice(0, 60),
        messageCount: s.messageCount + 1,
        // Set session title from first user message if still default
        title:
          s.title === 'New Session' && s.messageCount === 0
            ? content.slice(0, 40)
            : s.title,
      }));

      setIsLoading(true);

      // Simulated AI response with realistic delay
      await new Promise<void>((resolve) => {
        setTimeout(() => {
          const sourceCitations = sources
            .filter((s) => s.status === 'ready')
            .map((s) => s.name);

          const aiMsg: ChatMessage = {
            id: `ai-${Date.now()}`,
            role: 'assistant',
            content: generateAIResponse(content, sourceCitations),
            timestamp: new Date(),
            citations: sourceCitations.slice(0, 2),
          };

          updateSession(activeSessionId, (s) => ({
            ...s,
            messages: [...s.messages, aiMsg],
            messageCount: s.messageCount + 1,
          }));

          setIsLoading(false);
          resolve();
        }, 1400 + Math.random() * 600);
      });
    },
    [activeSessionId, updateSession]
  );

  const clearChat = useCallback(() => {
    updateSession(activeSessionId, (s) => ({
      ...s,
      messages: [INITIAL_SESSION.messages[0]],
      messageCount: 0,
      preview: '',
    }));
  }, [activeSessionId, updateSession]);

  const createSession = useCallback(() => {
    const newSession: ChatSession = {
      id: `session-${Date.now()}`,
      title: 'New Session',
      preview: '',
      timestamp: new Date(),
      messageCount: 0,
      messages: [INITIAL_SESSION.messages[0]],
    };
    setSessions((prev) => [newSession, ...prev]);
    setActiveSessionId(newSession.id);
  }, []);

  const switchSession = useCallback((id: string) => {
    setActiveSessionId(id);
  }, []);

  const renameSession = useCallback(
    (id: string, title: string) => {
      updateSession(id, (s) => ({ ...s, title }));
    },
    [updateSession]
  );

  return {
    messages,
    isLoading,
    sessions,
    activeSessionId,
    sendMessage,
    clearChat,
    createSession,
    switchSession,
    renameSession,
  };
}

// -------------------------------------------------------
// Simulated AI response generator
// -------------------------------------------------------
function generateAIResponse(userInput: string, citations: string[]): string {
  const lowerInput = userInput.toLowerCase();

  if (lowerInput.includes('summarize') || lowerInput.includes('summary')) {
    return `Here's a concise summary based on your documents:\n\n**Key Points:**\n- The documents cover fundamental and advanced concepts in the subject area\n- Multiple research methodologies and findings are discussed\n- Practical applications are highlighted throughout\n\nWould you like me to dive deeper into any specific section?`;
  }

  if (lowerInput.includes('what is') || lowerInput.includes('explain') || lowerInput.includes('define')) {
    return `Based on your uploaded materials, here is a detailed explanation:\n\n**${userInput.replace(/what is|explain|define/gi, '').trim()}** is a fundamental concept that encompasses several key ideas:\n\n- It represents a core principle discussed extensively in the literature\n- The concept has been refined over decades of research\n- Practical applications span multiple domains\n\nThe documents provide ${citations.length > 0 ? `evidence from **${citations[0]}**` : 'supporting evidence'} that further elaborates this concept.`;
  }

  if (lowerInput.includes('quiz') || lowerInput.includes('test')) {
    return `I can generate a quiz for you! Use the **Generate Quiz** tool in the right panel, or I can ask you questions directly:\n\n**Sample Question:** Based on the core concepts in your documents, which of the following best describes the primary methodology discussed?\n\n> *Tip: Click the Quiz tool on the right for a full interactive quiz experience.*`;
  }

  return `Based on your documents, here's what I found about **"${userInput}"**:\n\nThe materials contain relevant information that addresses your query. Key insights include:\n\n- The primary concepts are well-defined and interconnected\n- Supporting evidence is provided through multiple references\n- Practical implications are discussed in context\n\nWould you like me to elaborate on any specific aspect, or would you prefer I generate study materials like flashcards or a quiz on this topic?`;
}
