"use client";

import {
  AlertTriangle,
  ArrowRight,
  CheckCircle2,
  FileText,
  GraduationCap,
  ShieldCheck,
  Timer,
  X,
} from "lucide-react";
import { useEffect, useState } from "react";
import type { ExamQuestion } from "../types";
import { Badge, Button, Card, ProgressBar } from "./ui";

interface ExamPanelProps {
  questions: ExamQuestion[];
  timeLimit?: number; // minutes
}

export function ExamPanel({ questions, timeLimit = 15 }: ExamPanelProps) {
  const [isStarted, setIsStarted] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [timeLeft, setTimeLeft] = useState(timeLimit * 60);
  const [isFinished, setIsFinished] = useState(false);

  // Timer effect
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isStarted && !isFinished && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0 && isStarted && !isFinished) {
      // eslint-disable-next-line react-hooks/immutability
      finishExam();
    }
    return () => clearInterval(interval);
  }, [isStarted, isFinished, timeLeft]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const startExam = () => setIsStarted(true);

  const selectAnswer = (optionId: string) => {
    setAnswers((prev) => ({ ...prev, [questions[currentIndex].id]: optionId }));
  };

  const finishExam = () => {
    setIsFinished(true);
  };

  if (!isStarted) {
    return (
      <Card className="p-8 text-center animate-in zoom-in-95 duration-300">
        <div className="w-16 h-16 bg-primary/10 text-primary rounded-full flex items-center justify-center mx-auto mb-6">
          <GraduationCap className="w-8 h-8" />
        </div>
        <h3 className="text-xl font-bold mb-2">Ready for the Exam?</h3>
        <p className="text-sm text-slate-500 mb-6">
          {" "}
          This AI-generated exam will test your mastery across all uploaded
          documents.
        </p>

        <div className="max-w-xs mx-auto space-y-3 mb-8">
          <div className="flex justify-between items-center text-sm py-2 border-b border-slate-100">
            <span className="text-slate-500 flex items-center gap-2">
              <Timer className="w-4 h-4" /> Time Limit
            </span>
            <span className="font-semibold text-slate-900">
              {timeLimit} Minutes
            </span>
          </div>
          <div className="flex justify-between items-center text-sm py-2 border-b border-slate-100">
            <span className="text-slate-500 flex items-center gap-2">
              <FileText className="w-4 h-4" /> Questions
            </span>
            <span className="font-semibold text-slate-900">
              {questions.length} Items
            </span>
          </div>
          <div className="flex justify-between items-center text-sm py-2 border-b border-slate-100">
            <span className="text-slate-500 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4" /> Integrity
            </span>
            <span className="font-semibold text-success">Verified</span>
          </div>
        </div>

        <div className="p-4 bg-amber-50 border border-amber-100 rounded-md mb-8 flex gap-3 text-left">
          <AlertTriangle className="w-5 h-5 text-amber-500 shrink-0" />
          <p className="text-xs text-amber-800 leading-relaxed">
            Once you start, the timer cannot be paused. Make sure you are in a
            quiet environment.
          </p>
        </div>

        <Button size="lg" className="w-full" onClick={startExam}>
          Start Exam
        </Button>
      </Card>
    );
  }

  if (isFinished) {
    const score = questions.reduce((acc, q) => {
      const correct = q.options?.find((o) => o.isCorrect)?.id;
      return answers[q.id] === correct ? acc + q.points : acc;
    }, 0);
    const totalPoints = questions.reduce((acc, q) => acc + q.points, 0);
    const percentage = Math.round((score / totalPoints) * 100);

    return (
      <Card className="p-8 text-center animate-in zoom-in-95 duration-300">
        <h3 className="text-2xl font-bold mb-6">Exam Results</h3>

        <div className="relative w-32 h-32 mx-auto mb-8">
          <svg className="w-full h-full transform -rotate-90">
            <circle
              cx="64"
              cy="64"
              r="58"
              stroke="currentColor"
              strokeWidth="8"
              fill="transparent"
              className="text-slate-100"
            />
            <circle
              cx="64"
              cy="64"
              r="58"
              stroke="currentColor"
              strokeWidth="8"
              fill="transparent"
              className={`transition-all duration-1000 ${percentage >= 70 ? "text-success" : "text-primary"}`}
              strokeDasharray={364.4}
              strokeDashoffset={364.4 - (percentage / 100) * 364.4}
              strokeLinecap="round"
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-3xl font-bold text-slate-900">
              {percentage}%
            </span>
            <span className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">
              Scored
            </span>
          </div>
        </div>

        <div className="text-sm font-medium text-slate-700 mb-8">
          Total Points: {score} / {totalPoints}
        </div>

        <div className="space-y-3 mb-8">
          {questions.map((q, idx) => {
            const correct = q.options?.find((o) => o.isCorrect)?.id;
            const isCorrect = answers[q.id] === correct;
            return (
              <div
                key={q.id}
                className="flex items-center justify-between p-3 bg-slate-50 rounded-md text-xs"
              >
                <span className="font-medium text-slate-700">
                  Question {idx + 1}
                </span>
                {isCorrect ? (
                  <Badge variant="success" className="gap-1">
                    <CheckCircle2 className="w-3 h-3" /> Correct
                  </Badge>
                ) : (
                  <Badge variant="danger" className="gap-1">
                    <X className="w-3 h-3" /> Incorrect
                  </Badge>
                )}
              </div>
            );
          })}
        </div>

        <Button
          variant="outline"
          className="w-full"
          onClick={() => setIsStarted(false)}
        >
          Back to Start
        </Button>
      </Card>
    );
  }

  const currentQuestion = questions[currentIndex];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between sticky top-0 bg-white/80 backdrop-blur-sm py-2 z-10">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-slate-900 text-white rounded-md">
            <Timer className="w-4 h-4" />
          </div>
          <span
            className={`text-lg font-mono font-bold ${timeLeft < 60 ? "text-destructive animate-pulse" : "text-slate-900"}`}
          >
            {formatTime(timeLeft)}
          </span>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-widest">
            Question {currentIndex + 1}/{questions.length}
          </span>
          <Button variant="danger" size="xs" onClick={finishExam}>
            Submit Now
          </Button>
        </div>
      </div>

      <ProgressBar
        value={((currentIndex + 1) / questions.length) * 100}
        color={timeLeft < 60 ? "accent" : "primary"}
      />

      <Card
        padding="lg"
        className="border-none shadow-lg bg-white min-h-75 flex flex-col"
      >
        <div className="flex justify-between items-start mb-6">
          <h4 className="text-lg font-bold text-slate-900 leading-relaxed">
            {currentQuestion.question}
          </h4>
          <Badge variant="outline" className="shrink-0">
            {currentQuestion.points} pts
          </Badge>
        </div>

        <div className="space-y-3 flex-1">
          {currentQuestion.options?.map((option) => {
            const isSelected = answers[currentQuestion.id] === option.id;
            return (
              <button
                key={option.id}
                onClick={() => selectAnswer(option.id)}
                className={`
                  w-full text-left p-4 rounded-md border-2 transition-all duration-200
                  flex items-start gap-4
                  ${isSelected ? "border-primary bg-primary/5 ring-1 ring-primary/10 shadow-sm" : "border-slate-100 hover:border-slate-200 hover:bg-slate-50"}
                `}
              >
                <div
                  className={`
                  w-6 h-6 rounded-md border-2 shrink-0 flex items-center justify-center text-[10px] font-bold
                  ${isSelected ? "bg-primary border-primary text-white" : "border-slate-200 text-slate-400"}
                `}
                >
                  {String.fromCharCode(
                    65 + currentQuestion.options!.indexOf(option),
                  )}
                </div>
                <span
                  className={`text-sm ${isSelected ? "font-medium text-primary" : "text-slate-700"}`}
                >
                  {option.text}
                </span>
              </button>
            );
          })}
        </div>

        <div className="mt-8 flex justify-between">
          <Button
            variant="ghost"
            disabled={currentIndex === 0}
            onClick={() => setCurrentIndex((prev) => prev - 1)}
          >
            Previous
          </Button>
          <Button
            className="min-w-35"
            onClick={() =>
              currentIndex === questions.length - 1
                ? finishExam()
                : setCurrentIndex((prev) => prev + 1)
            }
          >
            {currentIndex === questions.length - 1
              ? "Complete Exam"
              : "Next Question"}
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </Card>
    </div>
  );
}
