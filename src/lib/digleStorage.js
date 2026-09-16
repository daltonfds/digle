const PREFIX = "digle:";

export function getStored(key, fallback = null) {
  try {
    const value = localStorage.getItem(PREFIX + key);
    return value === null ? fallback : JSON.parse(value);
  } catch {
    return fallback;
  }
}

export function setStored(key, value) {
  try {
    localStorage.setItem(PREFIX + key, JSON.stringify(value));
    window.dispatchEvent(new CustomEvent("digle-storage", { detail: { key, value } }));
  } catch {
    return false;
  }
  return true;
}

export function removeStored(key) {
  try {
    localStorage.removeItem(PREFIX + key);
  } catch {
    return false;
  }
  return true;
}

export function addXP(amount) {
  const current = getStored("xp", 0);
  const next = current + amount;
  setStored("xp", next);
  return next;
}

export function getLevel(xp) {
  if (xp >= 5000) return 10;
  if (xp >= 3000) return 9;
  if (xp >= 2000) return 8;
  if (xp >= 1500) return 7;
  if (xp >= 1100) return 6;
  if (xp >= 800) return 5;
  if (xp >= 600) return 4;
  if (xp >= 400) return 3;
  if (xp >= 200) return 2;
  return 1;
}

export function getNextLevelXP(level) {
  const levels = {
    1: 200,
    2: 400,
    3: 600,
    4: 800,
    5: 1100,
    6: 1500,
    7: 2000,
    8: 3000,
    9: 5000,
  };
  return levels[level] || 5000;
}

export function saveVerse(verse) {
  const verses = getStored("saved-verses", []);
  if (!verses.some((item) => item.id === verse.id)) {
    setStored("saved-verses", [...verses, verse]);
  }
}

export function removeVerse(id) {
  const verses = getStored("saved-verses", []);
  setStored("saved-verses", verses.filter((item) => item.id !== id));
}

export function toggleLesson(id) {
  const lessons = getStored("completed-lessons", []);
  const exists = lessons.includes(id);
  const next = exists
    ? lessons.filter((item) => item !== id)
    : [...lessons, id];

  setStored("completed-lessons", next);
  return next;
}

export function markStudyToday() {
  const dates = getStored("study-dates", []);
  const today = new Date().toISOString().slice(0, 10);

  if (!dates.includes(today)) {
    setStored("study-dates", [...dates, today]);
  }
}
