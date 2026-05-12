'use client';

import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { useState, useEffect, Suspense } from 'react';
import { grammarLessons } from '@/app/utils/grammarData';
import { getToken } from '@/app/utils/auth';

function GrammarContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const languageProfileId = searchParams.get('languageProfileId');
  const language = searchParams.get('language') || 'hebrew';
  const [masteredLessons, setMasteredLessons] = useState<Set<string>>(new Set());
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const token = getToken();
    if (!token || !languageProfileId) {
      router.push('/');
      return;
    }
    fetchMasteredLessons();
  }, [languageProfileId, router]);

  const fetchMasteredLessons = async () => {
    try {
      const token = getToken();
      if (!token || !languageProfileId) return;

      const response = await fetch(
        `/api/mastery/grammar?languageProfileId=${languageProfileId}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (!response.ok) throw new Error('Erreur lors du chargement');

      const lessons = await response.json();
      setMasteredLessons(new Set(lessons));
    } catch (error) {
      console.error('Erreur lors du chargement de la maîtrise:', error);
      setError('Erreur lors du chargement');
    } finally {
      setLoading(false);
    }
  };

  const toggleMastery = async (lessonId: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (!languageProfileId) return;

    const token = getToken();
    const newMastered = new Set(masteredLessons);

    try {
      if (newMastered.has(lessonId)) {
        // Retirer de la maîtrise
        await fetch('/api/mastery/grammar', {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ languageProfileId, lessonId }),
        });
        newMastered.delete(lessonId);
      } else {
        // Ajouter à la maîtrise
        await fetch('/api/mastery/grammar', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ languageProfileId, lessonId }),
        });
        newMastered.add(lessonId);
      }

      setMasteredLessons(newMastered);
    } catch (error) {
      console.error('Erreur lors de la mise à jour de la maîtrise:', error);
    }
  };

  // Show "Coming soon" for non-Hebrew languages
  if (language !== 'hebrew') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-100 to-blue-200 p-4">
        <div className="max-w-4xl mx-auto pt-8">
          <Link
            href="/"
            className="text-blue-700 mb-6 hover:text-blue-900 font-semibold inline-block"
          >
            ← Retour
          </Link>

          <div className="bg-white rounded-lg shadow-lg p-12 text-center">
            <h1 className="text-blue-900 text-3xl font-bold mb-4">Grammaire</h1>
            <p className="text-blue-600 text-xl font-semibold">Coming soon 🚀</p>
            <p className="text-gray-600 mt-4">Cette section sera bientôt disponible pour cette langue</p>
          </div>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center">
        <p className="text-blue-600">Chargement...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-blue-200 p-4">
      <div className="max-w-4xl mx-auto pt-8">
        <Link
          href="/"
          className="text-blue-700 mb-6 hover:text-blue-900 font-semibold inline-block"
        >
          ← Retour
        </Link>

        <h1 className="text-blue-900 text-3xl font-bold mb-1">Grammaire</h1>
        <p className="text-blue-700 mb-8">Sélectionne une leçon pour commencer</p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {grammarLessons.map(lesson => (
            <div
              key={lesson.id}
              className="relative group"
            >
              <Link
                href={`/grammar/${lesson.id}?languageProfileId=${languageProfileId}`}
                className="bg-white rounded-lg shadow-md hover:shadow-lg hover:scale-105 transition block p-6 pr-14 h-32 flex flex-col border border-blue-100"
              >
                <h3 className="text-lg font-bold text-blue-700 mb-2">{lesson.title}</h3>
                <p className="text-gray-600 text-sm flex-1">{lesson.description}</p>
              </Link>

              <button
                onClick={(e) => toggleMastery(lesson.id, e)}
                className={`absolute top-4 right-4 text-2xl transition ${
                  masteredLessons.has(lesson.id)
                    ? 'text-green-500'
                    : 'text-gray-300 hover:text-gray-400'
                }`}
                title="Marquer comme maîtrisé"
              >
                ✓
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function GrammarPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center">
          <p className="text-blue-600">Chargement...</p>
        </div>
      }
    >
      <GrammarContent />
    </Suspense>
  );
}
