const STORAGE_KEY = "digle_gamification";

const defaultState = {
  xp: 680,
  level: 4,
  hearts: 5,
  streak: 5,
  completedLessons: [],
  completedQuizzes: [],
  savedVerses: [],
  achievements: [],
  lastStudyDate: null,
  dailyChallengeCompleted: false,
};

export function getGamificationState() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);

    if (!saved) {
      return defaultState;
    }

    return {
      ...defaultState,
      ...JSON.parse(saved),
    };
  } catch {
    return defaultState;
  }
}

export function saveGamificationState(state) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  return state;
}

export function addXP(amount) {
  const state = getGamificationState();
  const xp = state.xp + amount;
  const level = Math.max(1, Math.floor(xp / 250) + 1);

  return saveGamificationState({
    ...state,
    xp,
    level,
  });
}

export function completeLesson(lessonId) {
  const state = getGamificationState();

  if (state.completedLessons.includes(lessonId)) {
    return state;
  }

  return saveGamificationState({
    ...state,
    completedLessons: [...state.completedLessons, lessonId],
    xp: state.xp + 50,
    level: Math.max(1, Math.floor((state.xp + 50) / 250) + 1),
  });
}

export function completeQuiz(quizId) {
  const state = getGamificationState();

  if (state.completedQuizzes.includes(quizId)) {
    return state;
  }

  return saveGamificationState({
    ...state,
    completedQuizzes: [...state.completedQuizzes, quizId],
    xp: state.xp + 75,
    level: Math.max(1, Math.floor((state.xp + 75) / 250) + 1),
  });
}

export function toggleSavedVerse(verseId) {
  const state = getGamificationState();
  const exists = state.savedVerses.includes(verseId);

  return saveGamificationState({
    ...state,
    savedVerses: exists
      ? state.savedVerses.filter((id) => id !== verseId)
      : [...state.savedVerses, verseId],
  });
}

export function updateDailyStreak() {
  const state = getGamificationState();
  const today = new Date().toISOString().split("T")[0];

  if (state.lastStudyDate === today) {
    return state;
  }

  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);

  const yesterdayKey = yesterday.toISOString().split("T")[0];

  const streak =
    state.lastStudyDate === yesterdayKey ? state.streak + 1 : 1;

  return saveGamificationState({
    ...state,
    streak,
    lastStudyDate: today,
  });
}

export function completeDailyChallenge() {
  const state = getGamificationState();

  if (state.dailyChallengeCompleted) {
    return state;
  }

  return saveGamificationState({
    ...state,
    dailyChallengeCompleted: true,
    xp: state.xp + 100,
    level: Math.max(1, Math.floor((state.xp + 100) / 250) + 1),
  });
}

export function resetGamificationState() {
  localStorage.removeItem(STORAGE_KEY);
  return defaultState;
}
