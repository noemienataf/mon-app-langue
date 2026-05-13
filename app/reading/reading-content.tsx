'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { readingTexts, getReadingTextsByLanguage } from '../utils/readingTextsData';
import { getToken } from '../utils/auth';
import { useEffect, useState } from 'react';

export default function ReadingContent() {
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

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {texts.map((text) => (
            <Link
              key={text.id}
              href={`/reading/${text.id}?languageProfileId=${languageProfileId}&language=${language}`}
              className="bg-white rounded-xl shadow-md hover:shadow-lg hover:scale-105 transition block p-6 border-2 border-orange-200 hover:border-orange-400"
            >
              <div className="h-full flex flex-col">
                <h3 className="text-lg font-bold text-orange-800 mb-3">{text.title}</h3>
                <p className="text-orange-600 text-sm mb-4 flex-1">{text.theme}</p>
                <p className="text-gray-500 text-xs font-semibold">Cliquez pour lire</p>
              </div>
            </Link>
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
