'use client';

import { useParams, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { useState, useEffect, Suspense } from 'react';
import { conjugationLessons } from '@/app/utils/conjugationData';

// Fonction pour parser et rendre le Markdown basique
const renderMarkdownContent = (text: string) => {
  return text.split('\n').map((line, index) => {
    if (line.trim() === '') {
      return <div key={index} className="h-2" />;
    }

    // Splitter le texte pour isoler les **texte**
    const parts = line.split(/(\*\*[^*]+\*\*)/);

    return (
      <p key={index} className="mb-0">
        {parts.map((part, i) => {
          if (part.startsWith('**') && part.endsWith('**')) {
            return <strong key={i}>{part.slice(2, -2)}</strong>;
          }
          return part ? <span key={i}>{part}</span> : null;
        })}
      </p>
    );
  });
};

function ConjugationLessonContent() {
  const params = useParams();
  const searchParams = useSearchParams();
  const lessonId = params.id as string;
  const profile = searchParams.get('profile') || 'User';

  const lesson = conjugationLessons.find(l => l.id === lessonId);

  if (!lesson) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-500 to-purple-600 p-4">
        <div className="max-w-2xl mx-auto text-center pt-12">
          <p className="text-white text-xl">Leçon non trouvée</p>
          <Link href={`/conjugation?profile=${profile}`} className="text-purple-100 hover:text-white mt-4 block">
            ← Retour
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-500 to-purple-600 p-4">
      <div className="max-w-4xl mx-auto">
        <Link
          href={`/conjugation?profile=${profile}`}
          className="text-white mb-6 hover:text-purple-100 font-semibold inline-block"
        >
          ← Retour
        </Link>

        <div className="bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-3xl font-bold text-purple-600 mb-2">{lesson.title}</h1>
          <p className="text-gray-600 mb-6">{lesson.description}</p>

          <div className="bg-purple-50 rounded-lg p-6 mb-8">
            <h2 className="text-xl font-bold text-purple-600 mb-4">Explication</h2>
            <div className="text-gray-700 leading-relaxed space-y-3">
              {renderMarkdownContent(lesson.explanation)}
            </div>
          </div>

          <div className="mb-8">
            <h2 className="text-xl font-bold text-purple-600 mb-4">Exemples</h2>
            <div className="space-y-4">
              {lesson.examples.map((example, index) => (
                <div key={index} className="border-r-4 border-purple-500 pr-4 py-2">
                  <div className="flex justify-between items-start mb-2">
                    <div className="flex-1">
                      <p className="text-sm font-semibold text-gray-500 mb-1">{example.person}</p>
                      <p className="text-lg font-semibold text-green-600">
                        {example.french}
                      </p>
                    </div>
                    <div className="flex-1 text-right">
                      <p
                        className="text-xl font-semibold text-purple-600 mb-1"
                        dir="rtl"
                      >
                        {example.hebrew}
                      </p>
                      <p className="text-sm text-gray-500 italic">
                        {example.transliteration}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Sélection des modes d'apprentissage */}
          <div className="mt-8 pt-8 border-t-2 border-gray-200">
            <h2 className="text-xl font-bold text-purple-600 mb-6 text-center">Choisir un mode</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Link
                href={`/conjugation/${lessonId}/test?profile=${profile}`}
                className="bg-purple-500 hover:bg-purple-600 text-white font-bold py-6 rounded-lg transition text-center block shadow-lg"
              >
                <p className="text-lg">🎯 Quiz</p>
                <p className="text-sm mt-2 opacity-90">Tester vos connaissances</p>
              </Link>
              <Link
                href={`/conjugation/${lessonId}/exercises-list?profile=${profile}`}
                className="bg-purple-400 hover:bg-purple-500 text-white font-bold py-6 rounded-lg transition text-center block shadow-lg"
              >
                <p className="text-lg">✍️ Exercices</p>
                <p className="text-sm mt-2 opacity-90">Pratiquer la conjugaison</p>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ConjugationLessonPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-gradient-to-br from-purple-500 to-purple-600 p-4 flex items-center justify-center">
          <p className="text-white text-xl">Chargement...</p>
        </div>
      }
    >
      <ConjugationLessonContent />
    </Suspense>
  );
}
