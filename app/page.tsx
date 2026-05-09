'use client';

import { useState, useEffect } from 'react';
import { getProfiles, addProfile } from './utils/localStorage';
import { vocabularyLists } from './utils/vocabularyData';
import { getCustomLists, addCustomList, deleteCustomList, getAllVocabularyLists } from './utils/customLists';
import Link from 'next/link';

interface ListWordCount {
  [key: string]: number;
}

export default function Home() {
  const [screen, setScreen] = useState<'profile' | 'category' | 'vocabulary'>('profile');
  const [selectedProfile, setSelectedProfile] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<'vocabulary' | 'grammar' | 'conjugation' | null>(null);
  const [profiles, setProfiles] = useState<string[]>([]);
  const [newProfileName, setNewProfileName] = useState('');
  const [wordCounts, setWordCounts] = useState<ListWordCount>({});
  const [lists, setLists] = useState(vocabularyLists);
  const [showAddListForm, setShowAddListForm] = useState(false);
  const [newListName, setNewListName] = useState('');
  const [newListDescription, setNewListDescription] = useState('');
  const [masteredVocabLists, setMasteredVocabLists] = useState<Set<string>>(new Set());

  useEffect(() => {
    setProfiles(getProfiles());
    loadLists();
    const saved = localStorage.getItem('mastery-vocabulary');
    if (saved) {
      setMasteredVocabLists(new Set(JSON.parse(saved)));
    }
  }, []);

  const loadLists = () => {
    const allLists = getAllVocabularyLists(vocabularyLists);
    setLists(allLists);

    // Charger le nombre de mots (par défaut + personnalisés)
    const counts: ListWordCount = {};
    allLists.forEach(list => {
      const defaultCount = list.words.length;
      const customData = localStorage.getItem(`custom-words-${list.id}`);
      const customCount = customData ? JSON.parse(customData).length : 0;
      counts[list.id] = defaultCount + customCount;
    });
    setWordCounts(counts);
  };

  const handleSelectProfile = (profile: string) => {
    setSelectedProfile(profile);
    setScreen('category');
  };

  const handleSelectCategory = (category: 'vocabulary' | 'grammar' | 'conjugation') => {
    setSelectedCategory(category);
    setScreen('vocabulary');
  };

  const handleAddProfile = () => {
    if (newProfileName.trim()) {
      addProfile(newProfileName);
      setProfiles(getProfiles());
      setNewProfileName('');
    }
  };

  const handleAddList = () => {
    if (newListName.trim() && newListDescription.trim()) {
      addCustomList(newListName, newListDescription);
      setNewListName('');
      setNewListDescription('');
      setShowAddListForm(false);
      loadLists();
    }
  };

  const handleDeleteList = (listId: string) => {
    if (confirm('Supprimer cette liste et tous ses mots ?')) {
      deleteCustomList(listId);
      loadLists();
    }
  };

  const toggleVocabMastery = (listId: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    const newMastered = new Set(masteredVocabLists);
    if (newMastered.has(listId)) {
      newMastered.delete(listId);
    } else {
      newMastered.add(listId);
    }

    setMasteredVocabLists(newMastered);
    localStorage.setItem('mastery-vocabulary', JSON.stringify(Array.from(newMastered)));
  };

  if (screen === 'profile') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-blue-50 to-purple-50 p-4">
        <div className="max-w-md mx-auto pt-12">
          <h1 className="text-slate-800 text-4xl font-bold text-center mb-2">Apprendre l'hébreu</h1>
          <p className="text-slate-600 text-center mb-12">Améliore ton vocabulaire, ta grammaire et tes conjugaisons</p>

          <div className="bg-white rounded-xl shadow-lg p-8 mb-6 border border-purple-100">
            <h2 className="text-2xl font-bold bg-gradient-to-r from-emerald-600 via-blue-600 to-purple-600 bg-clip-text text-transparent mb-6">Sélectionne un profil</h2>

            <div className="space-y-3 mb-6">
              {profiles.map(profile => (
                <button
                  key={profile}
                  onClick={() => handleSelectProfile(profile)}
                  className="w-full bg-gradient-to-r from-emerald-500 to-blue-500 hover:from-emerald-600 hover:to-blue-600 text-white font-semibold py-3 rounded-lg transition shadow-md hover:shadow-lg transform hover:scale-105"
                >
                  {profile}
                </button>
              ))}
            </div>

            <div className="border-t border-purple-100 pt-6">
              <p className="text-slate-600 text-sm mb-3 font-medium">Ou crée un nouveau profil :</p>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={newProfileName}
                  onChange={e => setNewProfileName(e.target.value)}
                  placeholder="Nom du profil"
                  className="flex-1 border border-purple-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-400"
                  onKeyPress={e => e.key === 'Enter' && handleAddProfile()}
                />
                <button
                  onClick={handleAddProfile}
                  className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white font-bold px-4 py-2 rounded-lg transition shadow-md hover:shadow-lg"
                >
                  +
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (screen === 'category') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-blue-50 to-purple-50 p-4">
        <div className="max-w-4xl mx-auto pt-8">
          <button
            onClick={() => setScreen('profile')}
            className="text-purple-600 hover:text-purple-900 mb-6 font-semibold inline-block"
          >
            ← Changer de profil
          </button>

          <h1 className="text-slate-800 text-4xl font-bold mb-1">Bienvenue, {selectedProfile} !</h1>
          <p className="text-slate-600 mb-12 text-lg">Que veux-tu apprendre ?</p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Vocabulaire */}
            <button
              onClick={() => handleSelectCategory('vocabulary')}
              className="bg-gradient-to-br from-emerald-50 to-emerald-100 rounded-xl shadow-md hover:shadow-xl hover:scale-105 transition text-center p-8 border-2 border-emerald-200 hover:border-emerald-400"
            >
              <div className="text-5xl mb-4">📚</div>
              <h2 className="text-2xl font-bold text-emerald-700 mb-2">Vocabulaire</h2>
              <p className="text-emerald-600">Apprends des mots et des expressions</p>
            </button>

            {/* Grammaire */}
            <Link
              href={`/grammar?profile=${selectedProfile}`}
              className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl shadow-md hover:shadow-xl hover:scale-105 transition text-center p-8 border-2 border-blue-200 hover:border-blue-400"
            >
              <div className="text-5xl mb-4">✏️</div>
              <h2 className="text-2xl font-bold text-blue-700 mb-2">Grammaire</h2>
              <p className="text-blue-600">Apprends les bases de la langue</p>
            </Link>

            {/* Conjugaison */}
            <Link
              href={`/conjugation?profile=${selectedProfile}`}
              className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl shadow-md hover:shadow-xl hover:scale-105 transition text-center p-8 border-2 border-purple-200 hover:border-purple-400"
            >
              <div className="text-5xl mb-4">🔄</div>
              <h2 className="text-2xl font-bold text-purple-700 mb-2">Conjugaison</h2>
              <p className="text-purple-600">Apprends à conjuguer les verbes</p>
            </Link>
          </div>
        </div>
      </div>
    );
  }

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
                href={`/vocabulary/${list.id}/study?profile=${selectedProfile}`}
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

              {list.custom && (
                <button
                  onClick={() => handleDeleteList(list.id)}
                  className="absolute bottom-3 right-3 bg-red-500 hover:bg-red-600 text-white text-xs rounded px-2 py-1 opacity-0 group-hover:opacity-100 transition"
                >
                  ✕
                </button>
              )}
            </div>
          ))}

          {/* Carte pour ajouter une nouvelle liste */}
          <button
            onClick={() => setShowAddListForm(true)}
            className="bg-gradient-to-br from-emerald-50 to-emerald-100 rounded-lg shadow-md hover:shadow-lg hover:scale-105 transition flex flex-col items-center justify-center h-36 border-2 border-dashed border-emerald-400"
          >
            <div className="text-3xl text-emerald-600 mb-1">+</div>
            <p className="text-emerald-700 text-xs font-semibold text-center">Nouvelle liste</p>
          </button>
        </div>

        {/* Formulaire pour ajouter une nouvelle liste */}
        {showAddListForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 overflow-y-auto">
            <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md my-8">
              <h2 className="text-2xl font-bold text-blue-600 mb-6">Créer une nouvelle liste</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-gray-700 font-semibold mb-2">Nom de la liste</label>
                  <input
                    type="text"
                    value={newListName}
                    onChange={e => setNewListName(e.target.value)}
                    placeholder="Ex: Animaux"
                    className="w-full border-2 border-gray-300 rounded px-3 py-2"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 font-semibold mb-2">Description</label>
                  <input
                    type="text"
                    value={newListDescription}
                    onChange={e => setNewListDescription(e.target.value)}
                    placeholder="Ex: Noms d'animaux en hébreu"
                    className="w-full border-2 border-gray-300 rounded px-3 py-2"
                  />
                </div>
                <div className="flex gap-3 mt-6">
                  <button
                    onClick={handleAddList}
                    className="flex-1 bg-green-500 hover:bg-green-600 text-white font-bold py-2 rounded-lg transition"
                  >
                    Créer
                  </button>
                  <button
                    onClick={() => setShowAddListForm(false)}
                    className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 rounded-lg transition"
                  >
                    Annuler
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
