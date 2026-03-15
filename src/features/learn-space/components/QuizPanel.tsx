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
      <Card className="flex flex-col items-center justify-center p-12 text-center bg-white border border-slate-200 shadow-none">
        <FileQuestion className="w-10 h-10 text-slate-300 mb-4" />
        <p className="text-slate-600 font-medium">Generating your personalized quiz...</p>
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
      <Card className="p-8 text-center animate-in zoom-in-95 duration-500 shadow-none border-slate-200 bg-white">
        <div className="w-20 h-20 bg-emerald-50 text-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle2 className="w-10 h-10" />
        </div>
        <h3 className="text-xl font-semibold text-slate-800 mb-2">Quiz Completed</h3>
        <p className="text-slate-500 mb-8">
          You&apos;ve successfully tested your knowledge on this subject.
        </p>

        <div className="bg-slate-50 rounded-lg p-6 mb-8 border border-slate-100">
          <div className="flex justify-between items-end mb-3">
            <span className="text-sm text-slate-600 font-medium">Your Score</span>
            <span className="text-2xl font-bold text-slate-800">
              {score}
              <span className="text-base text-slate-400 font-normal">
                /{questions.length}
              </span>
            </span>
          </div>
          <ProgressBar
            value={percentage}
            color={percentage > 70 ? "success" : "primary"}
          />
          <p className="mt-4 text-sm text-slate-600">
            {percentage >= 90
              ? "Mastery! You know this inside out."
              : percentage >= 70
                ? "Great job! You have a solid understanding."
                : "Good effort! A bit more review will help."}
          </p>
        </div>

        <div className="flex gap-3">
          <Button variant="outline" className="flex-1 shadow-none" onClick={resetQuiz}>
            <RotateCcw className="w-4 h-4 mr-2" /> Try Again
          </Button>
          <Button className="flex-1 shadow-none">Review Answers</Button>
        </div>
      </Card>
    );
  }

  return (
    <div className="space-y-6 animate-in slide-in-from-right-4 duration-300">
      {/* Minimal Header */}
      <div className="flex items-center justify-between border-b border-slate-100 pb-4">
        <div className="flex items-center gap-3">
          <FileQuestion className="w-5 h-5 text-primary" />
          <h3 className="font-semibold text-slate-800 text-lg">Concept Quiz</h3>
        </div>
        <div className="text-sm text-slate-500">
          Question {currentIndex + 1} of {questions.length}
        </div>
      </div>

      <ProgressBar value={progress} />

      <Card padding="lg" className="border border-slate-200 shadow-none bg-white">
        <h4 className="text-lg font-medium text-slate-900 mb-6 leading-relaxed">
          {currentQuestion.question}
        </h4>

        <div className="space-y-3">
          {currentQuestion.options?.map((option) => {
            const isSelected = selectedAnswer === option.id;
            const isCorrect = option.isCorrect;
            const statusClass = showExplanation
              ? isCorrect
                ? "border-emerald-500 bg-emerald-50"
                : isSelected
                  ? "border-red-500 bg-red-50"
                  : "opacity-60 border-slate-200 bg-slate-50/50 grayscale-[20%]"
              : isSelected
                ? "border-primary bg-primary/5"
                : "border-slate-200 hover:border-slate-300 hover:bg-slate-50/50";

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
          <div className="mt-8 p-5 rounded-lg bg-slate-50 border border-slate-100 animate-in slide-in-from-bottom-4 fade-in duration-500">
            <div className="flex items-center gap-2 mb-2 text-slate-700 font-semibold text-sm">
              <Brain className="w-4 h-4 text-primary" />
              Explanation
            </div>
            <p className="text-sm text-slate-600 leading-relaxed">
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
