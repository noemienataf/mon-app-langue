'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { podcastEpisodes, getPodcastsByLanguage } from '../utils/podcastData';
import { getToken } from '../utils/auth';
import { useEffect, useState } from 'react';

export default function PodcastContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const languageProfileId = searchParams.get('languageProfileId');
  const language = searchParams.get('language');
  const [episodes, setEpisodes] = useState(podcastEpisodes);

  useEffect(() => {
    // Vérifier l'authentification
    const token = getToken();
    if (!token) {
      router.push('/auth/login');
      return;
    }

    // Charger les épisodes pour la langue sélectionnée
    if (language) {
      const filtered = getPodcastsByLanguage(language);
      setEpisodes(filtered);
    }
  }, [language, router]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-100 to-red-200 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8 mt-4">
          <Link href="/" className="text-red-700 hover:text-red-900 font-semibold flex items-center gap-2">
            ← Retour
          </Link>
          <h1 className="text-red-900 text-3xl font-bold">Contenu audio</h1>
          <div className="w-20"></div>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {episodes.map((episode) => (
            <Link
              key={episode.id}
              href={`/podcasts/${episode.id}?languageProfileId=${languageProfileId}&language=${language}`}
              className="bg-white rounded-xl shadow-md hover:shadow-lg hover:scale-105 transition block p-6 border-2 border-red-200 hover:border-red-400"
            >
              <div className="h-full flex flex-col">
                <h3 className="text-lg font-bold text-red-800 mb-3">Épisode {episode.episodeNumber}</h3>
                <p className="text-red-600 text-sm mb-4 flex-1">{episode.title}</p>
                <p className="text-gray-500 text-xs font-semibold">{episode.duration} • Cliquez pour écouter</p>
              </div>
            </Link>
          ))}
        </div>

        {episodes.length === 0 && (
          <div className="text-center py-12">
            <p className="text-red-700 text-lg">Aucun épisode disponible pour cette langue pour le moment.</p>
          </div>
        )}
      </div>
    </div>
  );
}
