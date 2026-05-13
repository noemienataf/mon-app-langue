'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { podcastEpisodes } from '../../utils/podcastData';
import { getToken } from '../../utils/auth';
import { useEffect } from 'react';

interface PodcastDetailProps {
  id: string;
}

export default function PodcastDetail({ id }: PodcastDetailProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const languageProfileId = searchParams.get('languageProfileId');
  const language = searchParams.get('language');

  useEffect(() => {
    // Vérifier l'authentification
    const token = getToken();
    if (!token) {
      router.push('/auth/login');
      return;
    }
  }, [router]);

  const episode = podcastEpisodes.find((e) => e.id === id);

  if (!episode) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-100 to-red-200 p-4">
        <div className="max-w-4xl mx-auto">
          <Link href={`/podcasts?languageProfileId=${languageProfileId}&language=${language}`} className="text-red-700 hover:text-red-900 font-semibold mb-8 inline-block">
            ← Retour
          </Link>
          <div className="text-center py-12">
            <p className="text-red-700 text-lg">Épisode non trouvé</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-red-100 to-red-200 p-4">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="mb-8 mt-4">
            <Link
              href={`/podcasts?languageProfileId=${languageProfileId}&language=${language}`}
              className="text-red-700 hover:text-red-900 font-semibold flex items-center gap-2"
            >
              ← Retour
            </Link>
          </div>

          {/* Contenu du podcast */}
          <div className="bg-white rounded-xl shadow-lg p-8 border-2 border-red-200">
            {/* Titre et infos */}
            <div className="mb-8 pb-4 border-b-2 border-red-100">
              <h2 className="text-3xl font-bold text-red-800 mb-2">Épisode {episode.episodeNumber}: {episode.title}</h2>
              <p className="text-red-600 text-sm">{episode.duration}</p>
            </div>

            {/* Spotify Player Link */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold text-gray-700 mb-4">Écoutez l'épisode</h3>
              <a
                href={`https://open.spotify.com/episode/${episode.spotifyEpisodeId}`}
                target="_blank"
                rel="noopener noreferrer"
                className="block bg-gradient-to-r from-green-400 to-green-500 rounded-xl p-6 hover:shadow-lg transition group"
              >
                <div className="flex items-center gap-6">
                  <div className="flex-shrink-0 bg-white rounded-lg p-3 group-hover:scale-105 transition">
                    <div className="text-3xl">🎧</div>
                  </div>
                  <div className="flex-1">
                    <p className="text-white text-sm font-semibold mb-1">Hebrew Time Podcast</p>
                    <p className="text-green-50 text-sm mb-2">{episode.title}</p>
                    <p className="text-green-50 text-xs flex items-center gap-2">
                      <span>⏱️ {episode.duration}</span>
                      <span className="ml-auto font-semibold">Écouter sur Spotify →</span>
                    </p>
                  </div>
                </div>
              </a>
            </div>

            {/* Texte hébreu */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold text-gray-700 mb-4">עברית</h3>
              <p
                className="text-right text-gray-800 leading-relaxed whitespace-pre-wrap"
                style={{ direction: 'rtl' }}
              >
                {episode.hebrew}
              </p>
            </div>

            {/* Texte français */}
            <div>
              <h3 className="text-lg font-semibold text-gray-700 mb-4">Français</h3>
              <p className="text-left text-gray-800 leading-relaxed whitespace-pre-wrap">
                {episode.french}
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
