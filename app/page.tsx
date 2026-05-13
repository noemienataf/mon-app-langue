'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { vocabularyLists, getVocabularyListsByLanguage } from './utils/vocabularyData';
import { getCustomLists, getAllVocabularyLists, CustomList } from './utils/customLists';
import { getToken, getCurrentLanguageProfile, setCurrentLanguageProfile, logout } from './utils/auth';

interface ListWordCount {
  [key: string]: number;
}

interface LanguageProfile {
  id: string;
  language: string;
}

const LANGUAGES = [
  { code: 'hebrew', name: 'Hébreu', flag: '🇮🇱' },
  { code: 'portuguese', name: 'Portugais', flag: '🇵🇹' },
];

export default function Home() {
  const router = useRouter();
  const [screen, setScreen] = useState<'loading' | 'language' | 'category' | 'vocabulary'>('loading');
  const [currentLanguageProfile, setCurrentLanguageProfileLocal] = useState<LanguageProfile | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<'vocabulary' | 'grammar' | 'conjugation' | null>(null);
  const [userLanguages, setUserLanguages] = useState<LanguageProfile[]>([]);
  const [wordCounts, setWordCounts] = useState<ListWordCount>({});
  const [lists, setLists] = useState<CustomList[]>(vocabularyLists);
  const [masteredVocabLists, setMasteredVocabLists] = useState<Set<string>>(new Set());
  const [error, setError] = useState<string>('');

  // Vérifier l'authentification au chargement
  useEffect(() => {
    const token = getToken();
    if (!token) {
      router.push('/auth/login');
      return;
    }

    // Charger les profils de langue de l'utilisateur
    fetchUserLanguages();
  }, [router]);

  const fetchUserLanguages = async () => {
    try {
      const token = getToken();
      console.log('Token exists:', !!token);
      if (!token) return;

      console.log('Fetching language profiles...');
      const response = await fetch('/api/profiles/user', {
        headers: { Authorization: `Bearer ${token}` },
      });

      console.log('Response status:', response.status);
      if (!response.ok) {
        const errorData = await response.json();
        console.error('Error from server:', errorData);
        throw new Error(errorData.error || 'Failed to fetch user languages');
      }

      const languages = await response.json();
      console.log('Languages loaded:', languages);
      setUserLanguages(languages);

      // Vérifier si une langue était déjà sélectionnée
      const savedProfileId = getCurrentLanguageProfile();
      if (savedProfileId && languages.some((l: LanguageProfile) => l.id === savedProfileId)) {
        selectLanguage(languages.find((l: LanguageProfile) => l.id === savedProfileId));
      } else {
        setScreen('language');
      }
    } catch (error) {
      console.error('Erreur lors du chargement des langues:', error);
      setError(`Erreur: ${error instanceof Error ? error.message : 'Unknown error'}`);
      setScreen('language');
    }
  };

  const selectLanguage = async (language: LanguageProfile) => {
    setCurrentLanguageProfileLocal(language);
    setCurrentLanguageProfile(language.id);

    // Charger les listes et la maîtrise du vocabulaire
    const allLists = getAllVocabularyLists(getVocabularyListsByLanguage(language.language));
    setLists(allLists);

    const counts: ListWordCount = {};
    const token = getToken();

    for (const list of allLists) {
      try {
        const defaultCount = list.words.length;
        const response = await fetch(
          `/api/vocabulary/words?listId=${list.id}&languageProfileId=${language.id}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        const customWords = await response.json();
        const customCount = Array.isArray(customWords) ? customWords.length : 0;
        counts[list.id] = defaultCount + customCount;
      } catch (error) {
        counts[list.id] = list.words.length;
      }
    }
    setWordCounts(counts);

    // Charger la maîtrise du vocabulaire
    try {
      const response = await fetch(
        `/api/mastery/vocabulary?languageProfileId=${language.id}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (response.ok) {
        const masteredLists = await response.json();
        setMasteredVocabLists(new Set(masteredLists));
      }
    } catch (error) {
      console.error('Erreur lors du chargement de la maîtrise:', error);
    }

    setScreen('category');
  };

  const createOrSelectLanguage = async (language: string) => {
    try {
      const token = getToken();
      const response = await fetch('/api/profiles/user/language', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ language }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || `Erreur ${response.status}`);
      }

      const newLanguage: LanguageProfile = await response.json();
      setUserLanguages([...userLanguages, newLanguage]);
      selectLanguage(newLanguage);
    } catch (error) {
      const errorMsg = error instanceof Error ? error.message : 'Erreur inconnue';
      console.error('Erreur lors de la sélection de la langue:', error);
      setError(`Erreur: ${errorMsg}`);
    }
  };

  const handleSelectCategory = (category: 'vocabulary' | 'grammar' | 'conjugation') => {
    setSelectedCategory(category);
    setScreen('vocabulary');
  };

  const toggleVocabMastery = async (listId: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (!currentLanguageProfile) return;

    const token = getToken();
    const newMastered = new Set(masteredVocabLists);

    try {
      if (newMastered.has(listId)) {
        await fetch('/api/mastery/vocabulary', {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            languageProfileId: currentLanguageProfile.id,
            listId,
          }),
        });
        newMastered.delete(listId);
      } else {
        await fetch('/api/mastery/vocabulary', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            languageProfileId: currentLanguageProfile.id,
            listId,
          }),
        });
        newMastered.add(listId);
      }
      setMasteredVocabLists(newMastered);
    } catch (error) {
      console.error('Erreur lors de la mise à jour de la maîtrise:', error);
    }
  };

  const handleLogout = async () => {
    await logout();
    router.push('/auth/login');
  };

  if (screen === 'loading') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-blue-50 to-purple-50 flex items-center justify-center">
        <p className="text-slate-600">Chargement...</p>
      </div>
    );
  }

  if (screen === 'language') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-blue-50 to-purple-50 p-4">
        <div className="max-w-2xl mx-auto pt-8">
          <div className="flex justify-between items-start mb-8">
            <h1 className="text-slate-800 text-4xl font-bold">Quelle langue veux-tu apprendre ?</h1>
            <button
              onClick={handleLogout}
              className="text-slate-600 hover:text-slate-900 font-semibold text-sm px-4 py-2 rounded border border-slate-300 hover:border-slate-500"
            >
              Déconnexion
            </button>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6 text-red-700">
              {error}
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {LANGUAGES.map(lang => {
              const isEnrolled = userLanguages.some(ul => ul.language === lang.code);

              // Show "Coming soon" for Portuguese
              if (lang.code === 'portuguese') {
                return (
                  <div
                    key={lang.code}
                    className="bg-white rounded-xl shadow-md text-left p-8 border-2 border-purple-200 opacity-75"
                  >
                    <div className="text-5xl mb-4">{lang.flag}</div>
                    <h2 className="text-2xl font-bold text-purple-700 mb-4">{lang.name}</h2>
                    <p className="text-purple-600 font-semibold">Coming soon 🚀</p>
                  </div>
                );
              }

              return (
                <button
                  key={lang.code}
                  onClick={() => {
                    if (isEnrolled) {
                      const profile = userLanguages.find(ul => ul.language === lang.code);
                      if (profile) selectLanguage(profile);
                    } else {
                      createOrSelectLanguage(lang.code);
                    }
                  }}
                  className="bg-white rounded-xl shadow-md hover:shadow-lg hover:scale-105 transition text-left p-8 border-2 border-purple-200 hover:border-purple-400"
                >
                  <div className="text-5xl mb-4">{lang.flag}</div>
                  <h2 className="text-2xl font-bold text-purple-700 mb-2">{lang.name}</h2>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  if (screen === 'category') {
    // Show "Coming soon" for Portuguese
    if (currentLanguageProfile?.language === 'portuguese') {
      return (
        <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-blue-50 to-purple-50 p-4">
          <div className="max-w-4xl mx-auto pt-8">
            <button
              onClick={() => setScreen('language')}
              className="text-purple-600 hover:text-purple-900 mb-8 font-semibold inline-block"
            >
              ← Changer de langue
            </button>

            <div className="bg-white rounded-lg shadow-lg p-12 text-center">
              <h1 className="text-slate-800 text-4xl font-bold mb-2">Portugais</h1>
              <p className="text-slate-600 text-xl font-semibold mt-6">Coming soon 🚀</p>
              <p className="text-gray-600 mt-4">Cette langue sera bientôt disponible</p>
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-blue-50 to-purple-50 p-4">
        <div className="max-w-4xl mx-auto pt-8">
          <div className="flex justify-between items-start mb-8">
            <div>
              <button
                onClick={() => setScreen('language')}
                className="text-purple-600 hover:text-purple-900 mb-4 font-semibold inline-block"
              >
                ← Changer de langue
              </button>
              <h1 className="text-slate-800 text-4xl font-bold mb-1">
                Apprendre le {currentLanguageProfile?.language === 'hebrew' ? 'Hébreu' : currentLanguageProfile?.language === 'portuguese' ? 'Portugais' : 'Espagnol'}
              </h1>
              <p className="text-slate-600 text-lg">Que veux-tu apprendre ?</p>
            </div>
            <button
              onClick={handleLogout}
              className="text-slate-600 hover:text-slate-900 font-semibold text-sm px-4 py-2 rounded border border-slate-300 hover:border-slate-500"
            >
              Déconnexion
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
            <button
              onClick={() => handleSelectCategory('vocabulary')}
              className="bg-gradient-to-br from-emerald-50 to-emerald-100 rounded-xl shadow-md hover:shadow-xl hover:scale-105 transition text-center p-8 border-2 border-emerald-200 hover:border-emerald-400"
            >
              <div className="text-5xl mb-4">📚</div>
              <h2 className="text-2xl font-bold text-emerald-700 mb-2">Vocabulaire</h2>
              <p className="text-emerald-600">Apprends des mots et des expressions</p>
            </button>

            <Link
              href={`/grammar?languageProfileId=${currentLanguageProfile?.id}&language=${currentLanguageProfile?.language}`}
              className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl shadow-md hover:shadow-xl hover:scale-105 transition text-center p-8 border-2 border-blue-200 hover:border-blue-400"
            >
              <div className="text-5xl mb-4">✏️</div>
              <h2 className="text-2xl font-bold text-blue-700 mb-2">Grammaire</h2>
              <p className="text-blue-600">Apprends les bases de la langue</p>
            </Link>

            <Link
              href={`/conjugation?languageProfileId=${currentLanguageProfile?.id}&language=${currentLanguageProfile?.language}`}
              className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl shadow-md hover:shadow-xl hover:scale-105 transition text-center p-8 border-2 border-purple-200 hover:border-purple-400"
            >
              <div className="text-5xl mb-4">🔄</div>
              <h2 className="text-2xl font-bold text-purple-700 mb-2">Conjugaison</h2>
              <p className="text-purple-600">Apprends à conjuguer les verbes</p>
            </Link>

            <Link
              href={`/reading?languageProfileId=${currentLanguageProfile?.id}&language=${currentLanguageProfile?.language}`}
              className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl shadow-md hover:shadow-xl hover:scale-105 transition text-center p-8 border-2 border-orange-200 hover:border-orange-400"
            >
              <div className="text-5xl mb-4">📖</div>
              <h2 className="text-2xl font-bold text-orange-700 mb-2">Contenu à lire</h2>
              <p className="text-orange-600">Lis des articles et histoires</p>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Vocabulary/Study screen
  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-100 to-emerald-200 p-4">
      <div className="max-w-4xl mx-auto pt-8">
        <button
          onClick={() => setScreen('category')}
          className="text-emerald-700 hover:text-emerald-900 mb-6 font-semibold inline-block"
        >
          ← Retour
        </button>

        <h1 className="text-emerald-900 text-3xl font-bold mb-1">Vocabulaire</h1>
        <p className="text-emerald-700 mb-8">Sélectionne une liste pour commencer</p>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
          {lists.map(list => (
            <div key={list.id} className="relative group">
              <Link
                href={`/vocabulary/${list.id}/study?languageProfileId=${currentLanguageProfile?.id}&language=${currentLanguageProfile?.language}`}
                className="bg-white rounded-lg shadow-md hover:shadow-lg hover:scale-105 transition block p-4 pr-12 h-36 flex flex-col border border-emerald-100"
              >
                <h3 className="text-sm font-bold text-emerald-700 mb-1">{list.name}</h3>
                <p className="text-gray-600 text-xs mb-2 line-clamp-2 flex-1">{list.description}</p>
                <p className="text-emerald-600 text-xs font-semibold">{wordCounts[list.id]} mots</p>
              </Link>

              <button
                onClick={(e) => toggleVocabMastery(list.id, e)}
                className={`absolute top-3 right-3 text-xl transition ${
                  masteredVocabLists.has(list.id)
                    ? 'text-green-500'
                    : 'text-gray-300 hover:text-gray-400'
                }`}
                title="Marquer comme maîtrisé"
              >
                ✓
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
