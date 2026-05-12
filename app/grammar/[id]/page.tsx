'use client';

import { useParams, useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { Suspense, useEffect } from 'react';
import { grammarLessons } from '@/app/utils/grammarData';
import { getToken } from '@/app/utils/auth';

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

function GrammarLessonContent() {
  const router = useRouter();
  const params = useParams();
  const searchParams = useSearchParams();
  const lessonId = params.id as string;
  const languageProfileId = searchParams.get('languageProfileId');

  useEffect(() => {
    const token = getToken();
    if (!token || !languageProfileId) {
      router.push('/');
    }
  }, [languageProfileId, router]);

  const lesson = grammarLessons.find(l => l.id === lessonId);

  if (!lesson) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-300 to-blue-400 p-4">
        <div className="max-w-2xl mx-auto text-center pt-12">
          <p className="text-white text-xl">Leçon non trouvée</p>
          <Link href="/grammar" className="text-blue-100 hover:text-white mt-4 block">
            ← Retour
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-300 to-blue-400 p-4">
      <div className="max-w-4xl mx-auto">
        <Link
          href="/grammar"
          className="text-white mb-6 hover:text-blue-100 font-semibold inline-block"
        >
          ← Retour
        </Link>

        <div className="bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-3xl font-bold text-blue-600 mb-2">{lesson.title}</h1>
          <p className="text-gray-600 mb-6">{lesson.description}</p>

          <div className="bg-blue-50 rounded-lg p-6 mb-8">
            <h2 className="text-xl font-bold text-blue-600 mb-4">Explication</h2>
            <div className="text-gray-700 leading-relaxed space-y-3">
              {renderMarkdownContent(lesson.explanation)}
            </div>
          </div>

          <div>
            <h2 className="text-xl font-bold text-blue-600 mb-4">Exemples</h2>
            <div className="space-y-4">
              {lesson.examples.map((example, index) => (
                <div key={index} className="border-r-4 border-blue-500 pr-4 py-2">
                  <div className="flex justify-between items-start mb-2">
                    <p className="text-lg font-semibold text-green-600 flex-1">
                      {example.french}
                    </p>
                    <div className="flex-1 text-right">
                      <p
                        className="text-xl font-semibold text-blue-600 mb-1"
                        dir="rtl"
                      >
                        {example.hebrew}
                      </p>
                      {example.transliteration && (
                        <p className="text-sm text-gray-500 italic">
                          {example.transliteration}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function GrammarLessonPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-gradient-to-br from-blue-300 to-blue-400 p-4 flex items-center justify-center">
          <p className="text-white text-xl">Chargement...</p>
        </div>
      }
    >
      <GrammarLessonContent />
    </Suspense>
  );
}
