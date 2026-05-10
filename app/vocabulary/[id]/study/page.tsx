'use client';

import { useParams, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { useState, useEffect, Suspense } from 'react';
import { vocabularyLists } from '@/app/utils/vocabularyData';
import { getAllVocabularyLists } from '@/app/utils/customLists';
import HebrewKeyboard from '@/components/HebrewKeyboard';

interface CustomWord {
  id: string;
  hebrew: string;
  french: string;
  isCustom?: boolean;
}

function StudyContent() {
  const params = useParams();
  const searchParams = useSearchParams();
  const listId = params.id as string;
  const profile = searchParams.get('profile') || 'User';

  const allLists = getAllVocabularyLists(vocabularyLists);
  const list = allLists.find(l => l.id === listId);
  const [showAddForm, setShowAddForm] = useState(false);
  const [hebrewInput, setHebrewInput] = useState('');
  const [frenchInput, setFrenchInput] = useState('');
  const [customWords, setCustomWords] = useState<CustomWord[]>([]);
  const [loading, setLoading] = useState(true);

  // Charger les mots personnalisés depuis l'API
  useEffect(() => {
    if (!listId) return;
    fetchCustomWords();
  }, [listId]);

  const fetchCustomWords = async () => {
    try {
      const response = await fetch(`/api/vocabulary/words?listId=${listId}`);
      const data = await response.json();
      setCustomWords(data.map((word: any) => ({
        id: word.id,
        hebrew: word.hebrew,
        french: word.french,
        isCustom: true,
      })));
    } catch (error) {
      console.error('Erreur lors du chargement des mots personnalisés:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddWord = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!hebrewInput.trim() || !frenchInput.trim()) return;

    try {
      const response = await fetch('/api/vocabulary/words', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          listId,
          hebrew: hebrewInput,
          french: frenchInput,
          profileId: profile,
        }),
      });

      if (!response.ok) throw new Error('Erreur lors de l\'ajout du mot');

      const newWord = await response.json();
      setCustomWords([...customWords, {
        id: newWord.id,
        hebrew: newWord.hebrew,
        french: newWord.french,
        isCustom: true,
      }]);

      setHebrewInput('');
      setFrenchInput('');
      setShowAddForm(false);
    } catch (error) {
      console.error('Erreur lors de l\'ajout du mot:', error);
      alert('Erreur lors de l\'ajout du mot');
    }
  };

  const handleDeleteWord = async (id: string) => {
    try {
      const response = await fetch('/api/vocabulary/words', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id }),
      });

      if (!response.ok) throw new Error('Erreur lors de la suppression');

      setCustomWords(customWords.filter(w => w.id !== id));
    } catch (error) {
      console.error('Erreur lors de la suppression du mot:', error);
      alert('Erreur lors de la suppression du mot');
    }
  };

  // Combiner les mots par défaut et les mots personnalisés
  const allWords = list ? [...list.words, ...customWords] : [];

  if (!list || loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-500 to-blue-600 p-4 flex items-center justify-center">
        <p className="text-white text-xl">{!list ? 'Liste non trouvée' : 'Chargement...'}</p>
        {!list && (
          <Link href={`/?profile=${profile}`} className="text-blue-100 hover:text-white mt-4 block absolute bottom-8">
            ← Retour
          </Link>
        )}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 to-blue-600 p-4">
      <div className="max-w-4xl mx-auto">
        <Link
          href={`/?profile=${profile}`}
          className="text-white mb-6 hover:text-blue-100 font-semibold inline-block"
        >
          ← Retour
        </Link>

        <div className="bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-3xl font-bold text-blue-600 mb-2">{list.name}</h1>
          <p className="text-gray-600 mb-2">{list.description}</p>
          <p className="text-blue-600 font-semibold mb-8">{allWords.length} mots</p>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b-2 border-blue-500">
                  <th className="text-left py-4 px-4 text-blue-600 font-bold">#</th>
                  <th className="text-left py-4 px-4 text-blue-600 font-bold">Français</th>
                  <th className="text-right py-4 px-4 text-blue-600 font-bold">Hébreu</th>
                  <th className="text-left py-4 px-4 text-blue-600 font-bold">Type</th>
                  <th className="text-left py-4 px-4 text-blue-600 font-bold">Actions</th>
                </tr>
              </thead>
              <tbody>
                {allWords.map((word, index) => (
                  <tr key={word.id} className="border-b border-gray-200 hover:bg-blue-50">
                    <td className="py-4 px-4 text-gray-600 font-semibold">{index + 1}</td>
                    <td className="py-4 px-4 text-gray-700">{word.french}</td>
                    <td className="py-4 px-4 text-lg text-gray-800 font-semibold text-right" dir="rtl">
                      <div>{(word as any).hebrewWithVowels || word.hebrew}</div>
                      <div className="text-sm text-gray-500">{(word as any).hebrewWithVowels ? word.hebrew : ''}</div>
                    </td>
                    <td className="py-4 px-4">
                      {word.isCustom ? (
                        <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded">
                          Personnalisé
                        </span>
                      ) : (
                        <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">
                          Défaut
                        </span>
                      )}
                    </td>
                    <td className="py-4 px-4">
                      {word.isCustom && (
                        <button
                          onClick={() => handleDeleteWord(word.id)}
                          className="text-red-500 hover:text-red-700 font-semibold text-sm"
                        >
                          Supprimer
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-8 flex gap-4">
            <Link
              href={`/vocabulary/${listId}/test?profile=${profile}`}
              className="flex-1 bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 rounded-lg transition text-center"
            >
              Tester mes connaissances
            </Link>
            <button
              onClick={() => setShowAddForm(true)}
              className="flex-1 bg-green-500 hover:bg-green-600 text-white font-bold py-3 rounded-lg transition"
            >
              + Ajouter des mots
            </button>
          </div>

          {/* Formulaire d'ajout de mots */}
          {showAddForm && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 overflow-y-auto">
              <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-2xl my-8">
                <h2 className="text-2xl font-bold text-blue-600 mb-6">Ajouter un mot</h2>
                <form onSubmit={handleAddWord} className="space-y-4">
                  <div>
                    <label className="block text-gray-700 font-semibold mb-2">Hébreu</label>
                    <input
                      type="text"
                      value={hebrewInput}
                      onChange={(e) => setHebrewInput(e.target.value)}
                      placeholder="Ex: שלום"
                      className="w-full border-2 border-gray-300 rounded px-3 py-2 text-lg"
                      dir="rtl"
                    />
                    <HebrewKeyboard value={hebrewInput} onChange={setHebrewInput} />
                  </div>
                  <div>
                    <label className="block text-gray-700 font-semibold mb-2">Français</label>
                    <input
                      type="text"
                      value={frenchInput}
                      onChange={(e) => setFrenchInput(e.target.value)}
                      placeholder="Ex: Bonjour"
                      className="w-full border-2 border-gray-300 rounded px-3 py-2 text-lg"
                    />
                  </div>
                  <div className="flex gap-3 mt-6">
                    <button
                      type="submit"
                      className="flex-1 bg-green-500 hover:bg-green-600 text-white font-bold py-2 rounded-lg transition"
                    >
                      Ajouter
                    </button>
                    <button
                      type="button"
                      onClick={() => setShowAddForm(false)}
                      className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 rounded-lg transition"
                    >
                      Annuler
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function StudyPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-gradient-to-br from-blue-500 to-blue-600 p-4 flex items-center justify-center">
          <p className="text-white text-xl">Chargement...</p>
        </div>
      }
    >
      <StudyContent />
    </Suspense>
  );
}
