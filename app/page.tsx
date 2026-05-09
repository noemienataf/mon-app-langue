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

  useEffect(() => {
    setProfiles(getProfiles());
    loadLists();
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

  if (screen === 'profile') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-500 to-blue-600 p-4">
        <div className="max-w-md mx-auto pt-12">
          <h1 className="text-white text-4xl font-bold text-center mb-2">Apprendre l'hébreu</h1>
          <p className="text-blue-100 text-center mb-12">Améliore ton vocabulaire</p>

          <div className="bg-white rounded-lg shadow-lg p-8 mb-6">
            <h2 className="text-2xl font-bold text-blue-600 mb-6">Sélectionne un profil</h2>

            <div className="space-y-3 mb-6">
              {profiles.map(profile => (
                <button
                  key={profile}
                  onClick={() => handleSelectProfile(profile)}
                  className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 rounded-lg transition"
                >
                  {profile}
                </button>
              ))}
            </div>

            <div className="border-t pt-6">
              <p className="text-gray-600 text-sm mb-3">Ou crée un nouveau profil :</p>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={newProfileName}
                  onChange={e => setNewProfileName(e.target.value)}
                  placeholder="Nom du profil"
                  className="flex-1 border border-gray-300 rounded px-3 py-2 text-sm"
                  onKeyPress={e => e.key === 'Enter' && handleAddProfile()}
                />
                <button
                  onClick={handleAddProfile}
                  className="bg-blue-500 hover:bg-blue-600 text-white font-bold px-4 py-2 rounded transition text-sm"
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
      <div className="min-h-screen bg-gradient-to-br from-blue-500 to-blue-600 p-4">
        <div className="max-w-2xl mx-auto pt-8">
          <button
            onClick={() => setScreen('profile')}
            className="text-white mb-6 hover:text-blue-100 font-semibold"
          >
            ← Changer de profil
          </button>

          <h1 className="text-white text-3xl font-bold mb-1">Bienvenue, {selectedProfile} !</h1>
          <p className="text-blue-100 mb-8">Que veux-tu apprendre ?</p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Vocabulaire */}
            <button
              onClick={() => handleSelectCategory('vocabulary')}
              className="bg-white rounded-lg shadow-lg p-8 hover:shadow-xl hover:scale-105 transition text-center"
            >
              <div className="text-5xl mb-4">📚</div>
              <h2 className="text-2xl font-bold text-blue-600 mb-2">Vocabulaire</h2>
              <p className="text-gray-600">Apprends des mots et des expressions</p>
            </button>

            {/* Grammaire */}
            <button
              onClick={() => handleSelectCategory('grammar')}
              className="bg-white rounded-lg shadow-lg p-8 hover:shadow-xl hover:scale-105 transition text-center opacity-50 cursor-not-allowed"
            >
              <div className="text-5xl mb-4">✏️</div>
              <h2 className="text-2xl font-bold text-gray-400 mb-2">Grammaire</h2>
              <p className="text-gray-500 text-sm">Bientôt disponible</p>
            </button>

            {/* Conjugaison */}
            <button
              onClick={() => handleSelectCategory('conjugation')}
              className="bg-white rounded-lg shadow-lg p-8 hover:shadow-xl hover:scale-105 transition text-center opacity-50 cursor-not-allowed"
            >
              <div className="text-5xl mb-4">🔄</div>
              <h2 className="text-2xl font-bold text-gray-400 mb-2">Conjugaison</h2>
              <p className="text-gray-500 text-sm">Bientôt disponible</p>
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 to-blue-600 p-4">
      <div className="max-w-2xl mx-auto pt-8">
        <button
          onClick={() => setScreen('category')}
          className="text-white mb-6 hover:text-blue-100 font-semibold"
        >
          ← Retour
        </button>

        <h1 className="text-white text-3xl font-bold mb-1">Vocabulaire</h1>
        <p className="text-blue-100 mb-6">Sélectionne une liste pour commencer</p>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 md:gap-3">
          {lists.map(list => (
            <div key={list.id} className="relative group">
              <Link
                href={`/vocabulary/${list.id}/study?profile=${selectedProfile}`}
                className="bg-white rounded-lg shadow-md p-3 hover:shadow-lg hover:scale-105 transition block h-full"
              >
                <h3 className="text-base font-bold text-blue-600 mb-1">{list.name}</h3>
                <p className="text-gray-600 text-xs mb-2 line-clamp-2">{list.description}</p>
                <p className="text-blue-500 text-xs font-semibold">{wordCounts[list.id]} mots</p>
              </Link>
              {list.custom && (
                <button
                  onClick={() => handleDeleteList(list.id)}
                  className="absolute top-1 right-1 bg-red-500 hover:bg-red-600 text-white text-xs rounded px-2 py-1 opacity-0 group-hover:opacity-100 transition"
                >
                  ✕
                </button>
              )}
            </div>
          ))}

          {/* Carte pour ajouter une nouvelle liste */}
          <button
            onClick={() => setShowAddListForm(true)}
            className="bg-green-100 rounded-lg shadow-md p-3 hover:bg-green-200 hover:shadow-lg transition flex flex-col items-center justify-center h-full min-h-28 border-2 border-dashed border-green-500"
          >
            <div className="text-3xl text-green-600 mb-1">+</div>
            <p className="text-green-700 text-xs font-semibold text-center">Nouvelle liste</p>
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
