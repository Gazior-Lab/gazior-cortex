"use client";

import { Brain, Check, ChevronLeft, ChevronRight, X } from "lucide-react";
import { useState } from "react";
import type { Flashcard as FlashcardType } from "../types";
import { Badge, Button, Card, ProgressBar } from "./ui";

interface FlashcardProps {
  cards: FlashcardType[];
}

export function Flashcard({ cards }: FlashcardProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [sessionProgress, setSessionProgress] = useState<
    Record<string, "easy" | "medium" | "hard" | null>
  >({});

  if (cards.length === 0) {
    return (
      <Card className="flex flex-col items-center justify-center p-12 text-center opacity-60">
        <Brain className="w-12 h-12 mb-4 text-slate-300" />
        <p className="text-slate-500">No flashcards generated yet.</p>
      </Card>
    );
  }

  const currentCard = cards[currentIndex];
  const progress = Math.round(
    (Object.keys(sessionProgress).length / cards.length) * 100,
  );

  const handleNext = () => {
    setIsFlipped(false);
    setTimeout(() => setCurrentIndex((prev) => (prev + 1) % cards.length), 150);
  };

  const handlePrev = () => {
    setIsFlipped(false);
    setTimeout(
      () => setCurrentIndex((prev) => (prev - 1 + cards.length) % cards.length),
      150,
    );
  };

  const markConfidence = (confidence: "easy" | "medium" | "hard") => {
    setSessionProgress((prev) => ({ ...prev, [currentCard.id]: confidence }));
    handleNext();
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Brain className="w-5 h-5 text-primary" />
          <h3 className="font-semibold text-slate-900">Flashcards</h3>
        </div>
        <div className="flex flex-col items-end">
          <span className="text-xs font-medium text-slate-500">
            {currentIndex + 1} of {cards.length}
          </span>
          <ProgressBar value={progress} className="w-24 mt-1" />
        </div>
      </div>

      {/* Card Container with Perspective */}
      <div className="relative h-72 perspective-[1000px]">
        <div
          onClick={() => setIsFlipped(!isFlipped)}
          className={`
            relative w-full h-full cursor-pointer transition-transform duration-500 transform-style-3d
            ${isFlipped ? "rotate-y-180" : ""}
          `}
        >
          {/* Front */}
          <div className="absolute inset-0 backface-hidden bg-white border border-border rounded-(--radius-lg) shadow-sm p-8 flex flex-col items-center justify-center text-center">
            <Badge variant="outline" className="absolute top-4 left-4">
              Question
            </Badge>
            <p className="text-lg font-medium text-slate-900 leading-relaxed">
              {currentCard.front}
            </p>
            <p className="absolute bottom-4 text-xs text-slate-400 animate-pulse">
              Click to flip
            </p>
          </div>

          {/* Back */}
          <div className="absolute inset-0 backface-hidden rotate-y-180 bg-primary/5 border-2 border-primary rounded-(--radius-lg) shadow-md p-8 flex flex-col items-center justify-center text-center">
            <Badge variant="primary" className="absolute top-4 left-4">
              Answer
            </Badge>
            <p className="text-lg text-slate-800 leading-relaxed">
              {currentCard.back}
            </p>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="flex flex-col gap-4">
        {isFlipped ? (
          <div className="grid grid-cols-3 gap-2 animate-in fade-in slide-in-from-bottom-2 duration-300">
            <Button
              variant="outline"
              size="sm"
              className="hover:border-red-500 hover:text-red-500"
              onClick={() => markConfidence("hard")}
            >
              <X className="w-4 h-4 mr-1" /> Hard
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="hover:border-amber-500 hover:text-amber-500"
              onClick={() => markConfidence("medium")}
            >
              <Check className="w-4 h-4 mr-1" /> Medium
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="hover:border-emerald-500 hover:text-emerald-500"
              onClick={() => markConfidence("easy")}
            >
              <Check className="w-4 h-4 mr-1" /> Easy
            </Button>
          </div>
        ) : (
          <div className="flex items-center justify-between">
            <Button variant="ghost" size="md" onClick={handlePrev}>
              <ChevronLeft className="w-5 h-5 mr-1" /> Previous
            </Button>
            <Button variant="ghost" size="md" onClick={handleNext}>
              Next <ChevronRight className="w-5 h-5 ml-1" />
            </Button>
          </div>
        )}
      </div>

      <style jsx global>{`
        .perspective-1000 {
          perspective: 1000px;
        }
        .transform-style-3d {
          transform-style: preserve-3d;
        }
        .backface-hidden {
          backface-visibility: hidden;
        }
        .rotate-y-180 {
          transform: rotateY(180deg);
        }
      `}</style>
    </div>
  );
}
