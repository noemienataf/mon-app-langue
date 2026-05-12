import { createContext, useContext } from 'react';

export interface LanguageContextType {
  currentLanguageProfileId: string | null;
  setCurrentLanguageProfileId: (id: string | null) => void;
  currentLanguage: string | null;
  setCurrentLanguage: (language: string | null) => void;
}

export const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined
);

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within LanguageProvider');
  }
  return context;
}
