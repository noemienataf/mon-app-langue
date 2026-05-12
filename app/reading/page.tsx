'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { readingTexts, getReadingTextsByLanguage } from '../utils/readingTextsData';
import { getToken } from '../utils/auth';
import { useEffect, useState } from 'react';

export default function ReadingPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const languageProfileId = searchParams.get('languageProfileId');
  const language = searchParams.get('language');
  const [texts, setTexts] = useState(readingTexts);

  useEffect(() => {
    // Vérifier l'authentification
    const token = getToken();
    if (!token) {
      router.push('/auth/login');
      return;
    }

    // Charger les textes pour la langue sélectionnée
    if (language) {
      const filtered = getReadingTextsByLanguage(language);
      setTexts(filtered);
    }
  }, [language, router]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-100 to-orange-200 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8 mt-4">
          <Link href="/" className="text-orange-700 hover:text-orange-900 font-semibold flex items-center gap-2">
            ← Retour
          </Link>
          <h1 className="text-orange-900 text-3xl font-bold">Contenu à lire</h1>
          <div className="w-20"></div>
        </div>

        {/* Textes */}
        <div className="space-y-8">
          {texts.map((text) => (
            <div
              key={text.id}
              className="bg-white rounded-xl shadow-lg p-8 border-2 border-orange-200"
            >
              {/* Titre et thème */}
              <div className="mb-8 pb-4 border-b-2 border-orange-100">
                <h2 className="text-2xl font-bold text-orange-800 mb-2">{text.title}</h2>
                <p className="text-orange-600 text-sm">Thème: {text.theme}</p>
              </div>

              {/* Texte hébreu */}
              <div className="mb-8">
                <h3 className="text-lg font-semibold text-gray-700 mb-4">עברית</h3>
                <p className="text-right text-gray-800 leading-relaxed whitespace-pre-wrap" style={{ direction: 'rtl' }}>
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
          ))}
        </div>

        {texts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-orange-700 text-lg">Aucun texte disponible pour cette langue pour le moment.</p>
          </div>
        )}
      </div>
    </div>
  );
}
