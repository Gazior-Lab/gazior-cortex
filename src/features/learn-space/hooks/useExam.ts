"use client";

import { useState, useEffect, useCallback } from "react";
import type { ExamQuestion } from "../types";

export function useExam(questions: ExamQuestion[], timeLimitMinutes: number = 15) {
  const [isStarted, setIsStarted] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [timeLeft, setTimeLeft] = useState(timeLimitMinutes * 60);

  // Sync timeLeft when timeLimitMinutes changes if not started
  useEffect(() => {
    if (!isStarted) {
      setTimeLeft(timeLimitMinutes * 60);
    }
  }, [timeLimitMinutes, isStarted]);

  const finishExam = useCallback(() => {
    setIsFinished(true);
  }, []);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isStarted && !isFinished && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0 && isStarted && !isFinished) {
      finishExam();
    }
    return () => clearInterval(interval);
  }, [isStarted, isFinished, timeLeft, finishExam]);

  const startExam = () => {
    setIsStarted(true);
    setIsFinished(false);
    setCurrentIndex(0);
    setAnswers({});
    setTimeLeft(timeLimitMinutes * 60);
  };

  const resetExam = () => {
    setIsStarted(false);
    setIsFinished(false);
    setCurrentIndex(0);
    setAnswers({});
    setTimeLeft(timeLimitMinutes * 60);
  };

  const selectAnswer = (questionId: string, optionId: string) => {
    setAnswers((prev) => ({ ...prev, [questionId]: optionId }));
  };

  return {
    isStarted,
    isFinished,
    currentIndex,
    setCurrentIndex,
    answers,
    timeLeft,
    startExam,
    resetExam,
    finishExam,
    selectAnswer,
  };
}
