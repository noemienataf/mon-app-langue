'use client';

import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { useState, useEffect, Suspense } from 'react';
import { conjugationLessons } from '@/app/utils/conjugationData';

function ConjugationContent() {
  const searchParams = useSearchParams();
  const profileId = searchParams.get('profile');
  const [masteredLessons, setMasteredLessons] = useState<Set<string>>(new Set());
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (profileId) {
      fetchMasteredLessons();
    } else {
      setLoading(false);
    }
  }, [profileId]);

  const fetchMasteredLessons = async () => {
    try {
      const response = await fetch(`/api/mastery/conjugation?profileId=${profileId}`);
      const lessons = await response.json();
      setMasteredLessons(new Set(lessons));
    } catch (error) {
      console.error('Erreur lors du chargement de la maîtrise:', error);
    } finally {
      setLoading(false);
    }
  };

  const toggleMastery = async (lessonId: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (!profileId) return;

    const newMastered = new Set(masteredLessons);

    try {
      if (newMastered.has(lessonId)) {
        // Retirer de la maîtrise
        await fetch('/api/mastery/conjugation', {
          method: 'DELETE',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ profileId, lessonId }),
        });
        newMastered.delete(lessonId);
      } else {
        // Ajouter à la maîtrise
        await fetch('/api/mastery/conjugation', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ profileId, lessonId }),
        });
        newMastered.add(lessonId);
      }

      setMasteredLessons(newMastered);
    } catch (error) {
      console.error('Erreur lors de la mise à jour de la maîtrise:', error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-100 to-purple-200 flex items-center justify-center">
        <p className="text-purple-600">Chargement...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 to-purple-200 p-4">
      <div className="max-w-4xl mx-auto pt-8">
        <Link
          href={`/?profile=${profileId}`}
          className="text-purple-700 mb-6 hover:text-purple-900 font-semibold inline-block"
        >
          ← Retour
        </Link>

        <h1 className="text-purple-900 text-3xl font-bold mb-1">Conjugaison</h1>
        <p className="text-purple-700 mb-8">Sélectionne une leçon pour commencer</p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {conjugationLessons.map(lesson => (
            <div
              key={lesson.id}
              className="relative group"
            >
              <Link
                href={`/conjugation/${lesson.id}?profile=${profileId}`}
                className="bg-white rounded-lg shadow-md hover:shadow-lg hover:scale-105 transition block p-6 pr-14 h-32 flex flex-col border border-purple-100"
              >
                <h3 className="text-lg font-bold text-purple-700 mb-2">{lesson.title}</h3>
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

export default function ConjugationPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-gradient-to-br from-purple-100 to-purple-200 flex items-center justify-center">
          <p className="text-purple-600">Chargement...</p>
        </div>
      }
    >
      <ConjugationContent />
    </Suspense>
  );
}
