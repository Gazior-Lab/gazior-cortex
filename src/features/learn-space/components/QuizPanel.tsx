"use client";

import {
  ArrowRight,
  Brain,
  CheckCircle2,
  FileQuestion,
  RotateCcw,
  X,
} from "lucide-react";
import { useState } from "react";
import type { QuizQuestion, QuizResult } from "../types";
import { Button, Card, ProgressBar } from "./ui";

interface QuizPanelProps {
  questions: QuizQuestion[];
  onComplete?: (result: QuizResult) => void;
}

export function QuizPanel({ questions, onComplete }: QuizPanelProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [isFinished, setIsFinished] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);

  if (questions.length === 0) {
    return (
      <Card className="flex flex-col items-center justify-center p-12 text-center bg-slate-50/50 border-dashed border-2 border-slate-200">
        <div className="relative mb-4">
          <div className="absolute inset-0 bg-primary/20 blur-xl rounded-full animate-pulse" />
          <FileQuestion className="w-12 h-12 text-primary/60 relative z-10 animate-bounce" style={{ animationDuration: '2s' }} />
        </div>
        <p className="text-slate-500 font-medium">Generating your personalized quiz...</p>
        <p className="text-xs text-slate-400 mt-2">This might take a few seconds</p>
      </Card>
    );
  }

  const currentQuestion = questions[currentIndex];
  const progress = Math.round((currentIndex / questions.length) * 100);

  const handleSelect = (optionId: string) => {
    if (showExplanation) return;
    setSelectedAnswer(optionId);
  };

  const handleNext = () => {
    if (!selectedAnswer) return;

    const newAnswers = { ...answers, [currentQuestion.id]: selectedAnswer };
    setAnswers(newAnswers);

    if (!showExplanation) {
      setShowExplanation(true);
      return;
    }

    if (currentIndex < questions.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setSelectedAnswer(null);
      setShowExplanation(false);
    } else {
      setIsFinished(true);
      const score = questions.reduce((acc, q) => {
        const ans = q.options?.find(
          (o) => o.id === newAnswers[q.id],
        )?.isCorrect;
        return ans ? acc + 1 : acc;
      }, 0);
      onComplete?.({
        score,
        total: questions.length,
        answers: newAnswers,
        completedAt: new Date(),
      });
    }
  };

  const resetQuiz = () => {
    setCurrentIndex(0);
    setSelectedAnswer(null);
    setAnswers({});
    setIsFinished(false);
    setShowExplanation(false);
  };

  if (isFinished) {
    const score = questions.reduce((acc, q) => {
      const ans = q.options?.find((o) => o.id === answers[q.id])?.isCorrect;
      return ans ? acc + 1 : acc;
    }, 0);
    const percentage = Math.round((score / questions.length) * 100);

    return (
      <Card className="p-8 text-center animate-in zoom-in-95 duration-500 shadow-xl border-primary/20 bg-gradient-to-b from-white to-slate-50/50">
        <div className="w-24 h-24 bg-gradient-to-tr from-success/20 to-success/5 text-success rounded-full flex items-center justify-center mx-auto mb-6 ring-8 ring-success/10">
          <CheckCircle2 className="w-12 h-12" />
        </div>
        <h3 className="text-2xl font-bold mb-2">Quiz Completed!</h3>
        <p className="text-slate-500 mb-8">
          You&apos;ve successfully tested your knowledge on this subject.
        </p>

        <div className="bg-slate-50 rounded-(--radius-lg) p-6 mb-8 border border-slate-100">
          <div className="flex justify-between items-end mb-2">
            <span className="text-sm text-slate-500">Your Score</span>
            <span className="text-3xl font-bold text-primary">
              {score}
              <span className="text-lg text-slate-400">
                /{questions.length}
              </span>
            </span>
          </div>
          <ProgressBar
            value={percentage}
            color={percentage > 70 ? "success" : "primary"}
          />
          <p className="mt-4 text-sm font-medium text-slate-700">
            {percentage >= 90
              ? "Mastery! You know this inside out."
              : percentage >= 70
                ? "Great job! You have a solid understanding."
                : "Good effort! A bit more review will help."}
          </p>
        </div>

        <div className="flex gap-3">
          <Button variant="outline" className="flex-1" onClick={resetQuiz}>
            <RotateCcw className="w-4 h-4 mr-2" /> Try Again
          </Button>
          <Button className="flex-1">Review Answers</Button>
        </div>
      </Card>
    );
  }

  return (
    <div className="space-y-6 animate-in slide-in-from-right-4 duration-300">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-primary/10 rounded-lg">
            <FileQuestion className="w-5 h-5 text-primary" />
          </div>
          <h3 className="font-semibold text-slate-900 text-lg">Concept Quiz</h3>
        </div>
        <div className="flex flex-col items-end">
          <span className="text-sm font-semibold text-slate-700">
            Question {currentIndex + 1}
            <span className="text-slate-400 font-normal"> of {questions.length}</span>
          </span>
        </div>
      </div>

      <ProgressBar value={progress} />

      <Card padding="lg" className="border-none shadow-md bg-white">
        <h4 className="text-lg font-medium text-slate-900 mb-6 leading-relaxed">
          {currentQuestion.question}
        </h4>

        <div className="space-y-3">
          {currentQuestion.options?.map((option) => {
            const isSelected = selectedAnswer === option.id;
            const isCorrect = option.isCorrect;
            const statusClass = showExplanation
              ? isCorrect
                ? "border-emerald-500 bg-emerald-50/80 ring-2 ring-emerald-500/20 shadow-sm"
                : isSelected
                  ? "border-red-500 bg-red-50/80 ring-2 ring-red-500/20 shadow-sm"
                  : "opacity-50 border-slate-200 bg-slate-50/50 grayscale-[50%]"
              : isSelected
                ? "border-primary bg-primary/5 ring-2 ring-primary/20 shadow-md transform -translate-y-0.5"
                : "border-slate-200 hover:border-primary/40 hover:bg-primary/5 hover:shadow-sm";

            return (
              <button
                key={option.id}
                onClick={() => handleSelect(option.id)}
                disabled={showExplanation}
                className={`
                  w-full text-left p-4 rounded-md border-2 transition-all duration-200
                  flex items-start gap-3
                  ${statusClass}
                `}
              >
                <div
                  className={`
                  w-5 h-5 rounded-full border-2 shrink-0 flex items-center justify-center mt-0.5
                  ${
                    showExplanation
                      ? isCorrect
                        ? "border-emerald-500 bg-emerald-500"
                        : isSelected
                          ? "border-red-500 bg-red-500"
                          : "border-slate-300"
                      : isSelected
                        ? "border-primary"
                        : "border-slate-300"
                  }
                `}
                >
                  {showExplanation &&
                    (isCorrect || isSelected) &&
                    (isCorrect ? (
                      <CheckCircle2 className="w-4 h-4 text-white" />
                    ) : (
                      <X className="w-4 h-4 text-white" />
                    ))}
                  {!showExplanation && isSelected && (
                    <div className="w-2.5 h-2.5 bg-primary rounded-full" />
                  )}
                </div>
                <span
                  className={`text-sm ${isSelected ? "font-medium" : ""} ${showExplanation && isCorrect ? "text-emerald-900" : "text-slate-700"}`}
                >
                  {option.text}
                </span>
              </button>
            );
          })}
        </div>

        {showExplanation && (
          <div className="mt-8 p-5 rounded-xl bg-gradient-to-br from-slate-50 to-slate-100 border border-slate-200 animate-in slide-in-from-bottom-4 fade-in duration-500 shadow-sm">
            <div className="flex items-center gap-2 mb-3 text-slate-900 font-bold text-xs uppercase tracking-widest">
              <div className="p-1 bg-primary/10 rounded">
                <Brain className="w-4 h-4 text-primary" />
              </div>
              Explanation
            </div>
            <p className="text-sm text-slate-700 leading-relaxed">
              {currentQuestion.explanation}
            </p>
          </div>
        )}
      </Card>

      <div className="flex justify-end">
        <Button
          disabled={!selectedAnswer}
          className="min-w-30"
          onClick={handleNext}
        >
          {showExplanation
            ? currentIndex === questions.length - 1
              ? "Finish Quiz"
              : "Next Question"
            : "Check Answer"}
          <ArrowRight className="w-4 h-4 ml-2" />
        </Button>
      </div>
    </div>
  );
}
