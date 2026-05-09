import { VocabularyList, Word } from './vocabularyData';

export interface CustomList extends VocabularyList {
  custom?: true;
}

export function getCustomLists(): CustomList[] {
  if (typeof window === 'undefined') return [];

  const saved = localStorage.getItem('custom-lists');
  if (!saved) return [];

  try {
    return JSON.parse(saved);
  } catch {
    return [];
  }
}

export function addCustomList(name: string, description: string): CustomList {
  const customLists = getCustomLists();

  const newList: CustomList = {
    id: `custom-${Date.now()}`,
    name,
    description,
    words: [],
    custom: true,
  };

  const updated = [...customLists, newList];
  localStorage.setItem('custom-lists', JSON.stringify(updated));

  return newList;
}

export function deleteCustomList(listId: string): void {
  const customLists = getCustomLists();
  const updated = customLists.filter(list => list.id !== listId);
  localStorage.setItem('custom-lists', JSON.stringify(updated));

  // Nettoyer aussi les mots personnalisés de cette liste
  localStorage.removeItem(`custom-words-${listId}`);
}

export function getAllVocabularyLists(defaultLists: VocabularyList[]): CustomList[] {
  const customLists = getCustomLists();
  const defaultWithCustomFlag = defaultLists.map(list => ({ ...list, custom: false }));
  return [...defaultWithCustomFlag, ...customLists] as CustomList[];
}
