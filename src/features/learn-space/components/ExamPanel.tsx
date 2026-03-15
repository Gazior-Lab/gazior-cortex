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
  History,
  Trophy,
  Activity
} from "lucide-react";
import { useEffect, useState } from "react";
import type { ExamQuestion } from "../types";
import { Badge, Button, Card, ProgressBar, Divider } from "./ui";

interface ExamPanelProps {
  questions: ExamQuestion[];
  timeLimit?: number; // minutes
  // Persistent state props
  isStarted: boolean;
  isFinished: boolean;
  currentIndex: number;
  answers: Record<string, string>;
  timeLeft: number;
  onStart: () => void;
  onReset: () => void;
  onFinish: () => void;
  onSelectAnswer: (questionId: string, optionId: string) => void;
  onIndexChange: (index: number) => void;
}

export function ExamPanel({
  questions,
  timeLimit = 15,
  isStarted,
  isFinished,
  currentIndex,
  answers,
  timeLeft,
  onStart,
  onReset,
  onFinish,
  onSelectAnswer,
  onIndexChange,
}: ExamPanelProps) {
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const startExam = onStart;

  const selectAnswer = (optionId: string) => {
    onSelectAnswer(questions[currentIndex].id, optionId);
  };

  const finishExam = onFinish;

  if (!isStarted) {
    return (
      <div className="max-w-xl mx-auto py-8">
        <Card className="border border-slate-200 shadow-none bg-white p-8">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-slate-50 text-slate-400 rounded-full flex items-center justify-center mx-auto mb-4 border border-slate-100">
              <GraduationCap className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-semibold text-slate-800 mb-2">Certification Exam</h3>
            <p className="text-slate-500 text-sm max-w-sm mx-auto">
              Validate your knowledge with a dynamically generated exam covering all your current documents.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <div className="flex flex-col items-center p-4 bg-slate-50 rounded-lg border border-slate-100">
              <Timer className="w-4 h-4 text-slate-400 mb-2" />
              <span className="text-xs uppercase font-semibold text-slate-500 mb-1">Time Limit</span>
              <span className="text-base font-bold text-slate-700">{timeLimit}m</span>
            </div>
            
            <div className="flex flex-col items-center p-4 bg-slate-50 rounded-lg border border-slate-100">
              <FileText className="w-4 h-4 text-slate-400 mb-2" />
              <span className="text-xs uppercase font-semibold text-slate-500 mb-1">Questions</span>
              <span className="text-base font-bold text-slate-700">{questions.length} Items</span>
            </div>

            <div className="flex flex-col items-center p-4 bg-slate-50 rounded-lg border border-slate-100">
              <ShieldCheck className="w-4 h-4 text-emerald-500 mb-2" />
              <span className="text-xs uppercase font-semibold text-slate-500 mb-1">Status</span>
              <span className="text-base font-bold text-emerald-600">Verified</span>
            </div>
          </div>

          <div className="p-4 bg-slate-50 rounded-lg mb-8 flex gap-3 items-start border border-slate-100">
            <AlertTriangle className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
            <div>
              <h5 className="text-slate-700 text-sm font-semibold mb-1">Critical Requirement</h5>
              <p className="text-xs text-slate-500 leading-relaxed">
                The timer is continuous. Ensure you have a stable connection and a distraction-free environment before proceeding.
              </p>
            </div>
          </div>

          <Button size="lg" className="w-full shadow-none font-semibold" onClick={startExam}>
            Initiate Exam
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </Card>
      </div>
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
      <div className="max-w-3xl mx-auto py-8">
        <Card className="border border-slate-200 shadow-none bg-white p-0 overflow-hidden">
          <div className="text-center p-8 border-b border-slate-100 bg-slate-50/50">
            <Badge variant={percentage >= 70 ? "success" : "primary"} className="mb-4 shadow-none">
              Assessment Report
            </Badge>
            
            <div className="flex flex-col items-center justify-center">
               <span className="text-5xl font-bold text-slate-800 mb-2">
                 {percentage}%
               </span>
               <span className="text-sm font-medium text-slate-500">
                 Final Score
               </span>
            </div>

            <div className="flex items-center justify-center gap-6 mt-6">
               <div className="flex flex-col items-center">
                  <span className="text-xs font-semibold text-slate-400 uppercase mb-1">Status</span>
                  <span className={`text-sm font-semibold ${percentage >= 70 ? "text-emerald-500" : "text-amber-500"}`}>
                     {percentage >= 70 ? "Passed" : "Needs Review"}
                  </span>
               </div>
               <div className="w-px h-8 bg-slate-200" />
               <div className="flex flex-col items-center">
                  <span className="text-xs font-semibold text-slate-400 uppercase mb-1">Proficiency</span>
                  <span className="text-sm font-semibold text-slate-700">
                     {percentage >= 90 ? "Mastery" : percentage >= 70 ? "Advanced" : "Fundamental"}
                  </span>
               </div>
            </div>
          </div>

          {/* Detailed Content Area */}
          <div className="p-8">
            <div className="flex justify-between items-end mb-6">
               <div>
                  <h3 className="text-lg font-semibold text-slate-800">Executive Summary</h3>
               </div>
               <div className="text-right">
                  <div className="text-base font-semibold text-slate-700">{score}<span className="text-slate-400 font-normal"> / {totalPoints} pts</span></div>
               </div>
            </div>

            <Divider className="my-6 opacity-50" />

            <div className="space-y-4 mb-8">
              <h4 className="text-sm font-semibold text-slate-700 mb-4">Question Assessment</h4>
              {questions.map((q, idx) => {
                const correct = q.options?.find((o) => o.isCorrect)?.id;
                const isCorrect = answers[q.id] === correct;
                return (
                  <div
                    key={q.id}
                    className="flex flex-col p-4 bg-slate-50 border border-slate-100 rounded-lg hover:border-slate-200 transition-colors"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-3">
                        <div className={`w-6 h-6 rounded-md flex items-center justify-center text-xs font-semibold ${isCorrect ? "bg-emerald-50 text-emerald-600" : "bg-red-50 text-red-600"}`}>
                           {idx + 1}
                        </div>
                        <span className="font-medium text-slate-700 text-sm">
                          {q.question.length > 50 ? q.question.substring(0, 50) + "..." : q.question}
                        </span>
                      </div>
                      <div className="flex items-center gap-1.5 shrink-0">
                         {isCorrect ? (
                             <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                          ) : (
                             <X className="w-4 h-4 text-red-500" />
                          )}
                      </div>
                    </div>
                    
                    {!isCorrect && q.explanation && (
                       <div className="ml-9 mt-2 pt-2 border-t border-slate-200/50">
                          <p className="text-xs text-slate-500">
                             <span className="font-semibold text-slate-700 mr-1">Rationale:</span> 
                             {q.explanation}
                          </p>
                       </div>
                    )}
                  </div>
                );
              })}
            </div>

            <div className="flex gap-4">
              <Button
                variant="outline"
                className="flex-1 shadow-none"
                onClick={onReset}
              >
                Re-evaluate
              </Button>
              <Button
                className="flex-1 shadow-none"
                onClick={onReset}
              >
                Return to Dashboard
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </div>
        </Card>
      </div>
    );
  }

  const currentQuestion = questions[currentIndex];

  return (
    <div className="max-w-3xl mx-auto space-y-8 py-2">
      <div className="flex items-center justify-between sticky top-0 bg-white py-4 z-20 border-b border-slate-100">
        <div className="flex items-center gap-3">
          <div className={`flex items-center gap-2 font-mono text-lg font-semibold ${timeLeft < 60 ? "text-red-600 animate-pulse" : "text-slate-800"}`}>
            <Timer className="w-5 h-5" />
            <span>{formatTime(timeLeft)}</span>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="hidden md:flex flex-col items-end">
             <span className="text-xs text-slate-500 font-medium mb-1">Question {currentIndex + 1} of {questions.length}</span>
             <ProgressBar 
                value={((currentIndex + 1) / questions.length) * 100} 
                className="w-32 h-1.5" 
                color={timeLeft < 60 ? "accent" : "primary"} 
             />
          </div>
          <Badge variant="outline" className="h-10 px-4 border-slate-200 text-slate-500 font-bold">
            Item {currentIndex + 1} of {questions.length}
          </Badge>
          <Button variant="danger" size="sm" className="hidden md:flex shadow-lg shadow-red-500/10" onClick={finishExam}>
            Finalize
          </Button>
        </div>
      </div>

      <div className="pt-2 animate-in fade-in slide-in-from-bottom-4 duration-500">
        <Card
          padding="none"
          className="border-none shadow-xl bg-white overflow-hidden"
        >
          <div className="p-8 md:p-12">
            <div className="flex justify-between items-start mb-10 gap-6">
              <h4 className="text-2xl font-extrabold text-slate-900 leading-tight tracking-tight">
                {currentQuestion.question}
              </h4>
              <div className="shrink-0 flex flex-col items-center p-3 bg-slate-50 rounded-2xl border border-slate-100">
                 <Trophy className="w-5 h-5 text-amber-500 mb-1" />
                 <span className="text-[10px] font-black text-slate-900 uppercase tracking-widest">{currentQuestion.points}pt</span>
              </div>
            </div>

            <div className="space-y-4 mb-12">
              {currentQuestion.options?.map((option, idx) => {
                const isSelected = answers[currentQuestion.id] === option.id;
                return (
                  <button
                    key={option.id}
                    onClick={() => selectAnswer(option.id)}
                    className={`
                      w-full text-left p-6 rounded-2xl border-2 transition-all duration-300
                      flex items-center gap-6 group relative overflow-hidden
                      ${isSelected ? "border-primary bg-primary/5 ring-4 ring-primary/5" : "border-slate-50 hover:border-slate-200 hover:bg-slate-50/50"}
                    `}
                  >
                    {isSelected && (
                      <div className="absolute top-0 right-0 w-24 h-24 bg-primary/5 rounded-full blur-2xl -mr-12 -mt-12" />
                    )}
                    <div
                      className={`
                      w-10 h-10 rounded-xl border-2 shrink-0 flex items-center justify-center font-black text-sm transition-all
                      ${isSelected ? "bg-primary border-primary text-white scale-110 rotate-3" : "border-slate-200 text-slate-400 group-hover:border-slate-300"}
                    `}
                    >
                      {String.fromCharCode(65 + idx)}
                    </div>
                    <span
                      className={`text-base font-bold transition-colors ${isSelected ? "text-primary shadow-primary/10" : "text-slate-600 group-hover:text-slate-900"}`}
                    >
                      {option.text}
                    </span>
                  </button>
                );
              })}
            </div>

            <div className="flex flex-col md:flex-row justify-between gap-4 pt-10 border-t border-slate-100">
              <Button
                variant="ghost"
                size="lg"
                disabled={currentIndex === 0}
                className="h-14 font-bold"
                onClick={() => onIndexChange(currentIndex - 1)}
              >
                Previous Step
              </Button>
              <div className="flex gap-4 flex-1 md:flex-none">
                 {currentIndex === questions.length - 1 ? (
                    <Button
                      size="lg"
                      className="flex-1 md:min-w-50 h-14 font-black shadow-xl shadow-primary/20 bg-primary hover:bg-primary/90"
                      onClick={finishExam}
                    >
                      Submit for Analysis
                      <GraduationCap className="w-5 h-5 ml-2" />
                    </Button>
                 ) : (
                    <Button
                      size="lg"
                      className="flex-1 md:min-w-50 h-14 font-bold shadow-xl shadow-primary/10"
                      onClick={() => onIndexChange(currentIndex + 1)}
                    >
                      Advance
                      <ArrowRight className="w-5 h-5 ml-2" />
                    </Button>
                 )}
              </div>
            </div>
          </div>
        </Card>
      </div>

      <div className="flex items-center justify-center gap-4 text-slate-300 select-none">
         <div className="h-px w-8 bg-slate-100" />
         <span className="text-[10px] font-black uppercase tracking-[0.4em]">Integrated Learning Environment</span>
         <div className="h-px w-8 bg-slate-100" />
      </div>
    </div>
  );
}
