'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { readingTexts } from '../../utils/readingTextsData';
import { getToken } from '../../utils/auth';
import { useEffect } from 'react';

interface ReadingDetailProps {
  id: string;
}

export default function ReadingDetail({ id }: ReadingDetailProps) {
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

  const text = readingTexts.find((t) => t.id === id);

  if (!text) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-100 to-orange-200 p-4">
        <div className="max-w-4xl mx-auto">
          <Link href={`/reading?languageProfileId=${languageProfileId}&language=${language}`} className="text-orange-700 hover:text-orange-900 font-semibold mb-8 inline-block">
            ← Retour
          </Link>
          <div className="text-center py-12">
            <p className="text-orange-700 text-lg">Texte non trouvé</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-100 to-orange-200 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8 mt-4">
          <Link
            href={`/reading?languageProfileId=${languageProfileId}&language=${language}`}
            className="text-orange-700 hover:text-orange-900 font-semibold flex items-center gap-2"
          >
            ← Retour
          </Link>
        </div>

        {/* Contenu du texte */}
        <div className="bg-white rounded-xl shadow-lg p-8 border-2 border-orange-200">
          {/* Titre et thème */}
          <div className="mb-8 pb-4 border-b-2 border-orange-100">
            <h2 className="text-3xl font-bold text-orange-800 mb-2">{text.title}</h2>
            <p className="text-orange-600 text-sm">Thème: {text.theme}</p>
          </div>

          {/* Texte hébreu */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-gray-700 mb-4">עברית</h3>
            <p
              className="text-right text-gray-800 leading-relaxed whitespace-pre-wrap"
              style={{ direction: 'rtl' }}
            >
              {text.hebrew}
            </p>
          </div>

          {/* Texte français */}
          <div>
            <h3 className="text-lg font-semibold text-gray-700 mb-4">Français</h3>
            <p className="text-left text-gray-800 leading-relaxed whitespace-pre-wrap">
              {text.french}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}