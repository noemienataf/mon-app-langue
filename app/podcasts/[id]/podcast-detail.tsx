'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { podcastEpisodes } from '../../utils/podcastData';
import { getToken } from '../../utils/auth';
import { useEffect } from 'react';
import Script from 'next/script';

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

            {/* Spotify Player Embed */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold text-gray-700 mb-4">Écoutez l'épisode</h3>
              <iframe
                style={{ borderRadius: '12px' }}
                src={`https://open.spotify.com/embed/episode/${episode.spotifyEpisodeId}?utm_source=generator`}
                width="100%"
                height="352"
                frameBorder="0"
                allowFullScreen={true}
                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
              ></iframe>
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
      <Script src="https://open.spotify.com/embed-podcast/iframe-api/v1" async />
    </>
  );
}
