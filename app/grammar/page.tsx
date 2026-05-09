'use client';

import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { grammarLessons } from '@/app/utils/grammarData';

export default function GrammarPage() {
  const searchParams = useSearchParams();
  const profile = searchParams.get('profile') || 'User';
  const [masteredLessons, setMasteredLessons] = useState<Set<string>>(new Set());

  useEffect(() => {
    const saved = localStorage.getItem('mastery-grammar');
    if (saved) {
      setMasteredLessons(new Set(JSON.parse(saved)));
    }
  }, []);

  const toggleMastery = (lessonId: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    const newMastered = new Set(masteredLessons);
    if (newMastered.has(lessonId)) {
      newMastered.delete(lessonId);
    } else {
      newMastered.add(lessonId);
    }

    setMasteredLessons(newMastered);
    localStorage.setItem('mastery-grammar', JSON.stringify(Array.from(newMastered)));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-blue-200 p-4">
      <div className="max-w-4xl mx-auto pt-8">
        <Link
          href={`/?profile=${profile}`}
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
                href={`/grammar/${lesson.id}?profile=${profile}`}
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
