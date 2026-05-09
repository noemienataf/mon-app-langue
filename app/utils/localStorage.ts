export interface UserProgress {
  profile: string;
  masteredWords: string[]; // word IDs
  lastTestDate: Record<string, string>; // listId -> ISO date string
}

const STORAGE_KEY = 'hebrew_app_progress';
const DEFAULT_PROFILES = ['Noémie'];

export const getProfiles = (): string[] => {
  if (typeof window === 'undefined') return DEFAULT_PROFILES;
  const data = localStorage.getItem(`${STORAGE_KEY}_profiles`);
  return data ? JSON.parse(data) : DEFAULT_PROFILES;
};

export const addProfile = (name: string) => {
  if (typeof window === 'undefined') return;
  const profiles = getProfiles();
  if (!profiles.includes(name)) {
    profiles.push(name);
    localStorage.setItem(`${STORAGE_KEY}_profiles`, JSON.stringify(profiles));
  }
};

export const getUserProgress = (profile: string): UserProgress => {
  if (typeof window === 'undefined') {
    return {
      profile,
      masteredWords: [],
      lastTestDate: {},
    };
  }
  const data = localStorage.getItem(`${STORAGE_KEY}_${profile}`);
  return data
    ? JSON.parse(data)
    : {
        profile,
        masteredWords: [],
        lastTestDate: {},
      };
};

export const saveMasteredWord = (profile: string, wordId: string) => {
  if (typeof window === 'undefined') return;
  const progress = getUserProgress(profile);
  if (!progress.masteredWords.includes(wordId)) {
    progress.masteredWords.push(wordId);
  }
  localStorage.setItem(`${STORAGE_KEY}_${profile}`, JSON.stringify(progress));
};

export const removeMasteredWord = (profile: string, wordId: string) => {
  if (typeof window === 'undefined') return;
  const progress = getUserProgress(profile);
  progress.masteredWords = progress.masteredWords.filter(id => id !== wordId);
  localStorage.setItem(`${STORAGE_KEY}_${profile}`, JSON.stringify(progress));
};

export const setLastTestDate = (profile: string, listId: string, date: string) => {
  if (typeof window === 'undefined') return;
  const progress = getUserProgress(profile);
  progress.lastTestDate[listId] = date;
  localStorage.setItem(`${STORAGE_KEY}_${profile}`, JSON.stringify(progress));
};

export const shouldResetTestWords = (profile: string, listId: string): boolean => {
  if (typeof window === 'undefined') return true;
  const progress = getUserProgress(profile);
  const lastDate = progress.lastTestDate[listId];
  if (!lastDate) return true; // Never tested, show all words

  // Always reset for a new test session (just check if there's been any test)
  return true;
};
