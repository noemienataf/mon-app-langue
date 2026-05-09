'use client';

import { useState, useEffect } from 'react';
import { getProfiles, addProfile } from './utils/localStorage';
import { vocabularyLists } from './utils/vocabularyData';
import Link from 'next/link';

export default function Home() {
  const [screen, setScreen] = useState<'profile' | 'menu'>('profile');
  const [selectedProfile, setSelectedProfile] = useState<string>('');
  const [profiles, setProfiles] = useState<string[]>([]);
  const [newProfileName, setNewProfileName] = useState('');

  useEffect(() => {
    setProfiles(getProfiles());
  }, []);

  const handleSelectProfile = (profile: string) => {
    setSelectedProfile(profile);
    setScreen('menu');
  };

  const handleAddProfile = () => {
    if (newProfileName.trim()) {
      addProfile(newProfileName);
      setProfiles(getProfiles());
      setNewProfileName('');
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
        <p className="text-blue-100 mb-8">Sélectionne une liste de vocabulaire pour commencer</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {vocabularyLists.map(list => (
            <Link
              key={list.id}
              href={`/vocabulary/${list.id}/study?profile=${selectedProfile}`}
              className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl hover:scale-105 transition"
            >
              <h3 className="text-xl font-bold text-blue-600 mb-2">{list.name}</h3>
              <p className="text-gray-600 text-sm mb-4">{list.description}</p>
              <p className="text-blue-500 text-sm font-semibold">{list.words.length} mots</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
