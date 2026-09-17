import { useCallback, useEffect, useState } from "react";
import {
  getGamificationState,
  addXP,
  completeLesson,
  completeQuiz,
  toggleSavedVerse,
  updateDailyStreak,
  completeDailyChallenge,
} from "../lib/gamification";

export function useGamification() {
  const [state, setState] = useState(getGamificationState);

  useEffect(() => {
    setState(updateDailyStreak());
  }, []);

  const refresh = useCallback(() => {
    setState(getGamificationState());
  }, []);

  const earnXP = useCallback((amount) => {
    const updated = addXP(amount);
    setState(updated);
    return updated;
  }, []);

  const finishLesson = useCallback((lessonId) => {
    const updated = completeLesson(lessonId);
    setState(updated);
    return updated;
  }, []);

  const finishQuiz = useCallback((quizId) => {
    const updated = completeQuiz(quizId);
    setState(updated);
    return updated;
  }, []);

  const saveVerse = useCallback((verseId) => {
    const updated = toggleSavedVerse(verseId);
    setState(updated);
    return updated;
  }, []);

  const finishDailyChallenge = useCallback(() => {
    const updated = completeDailyChallenge();
    setState(updated);
    return updated;
  }, []);

  return {
    ...state,
    refresh,
    earnXP,
    finishLesson,
    finishQuiz,
    saveVerse,
    finishDailyChallenge,
  };
}
