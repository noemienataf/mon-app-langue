'use client';

import { useParams, useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { useState, useEffect, Suspense } from 'react';
import { conjugationLessons } from '@/app/utils/conjugationData';
import { getToken } from '@/app/utils/auth';

interface Question {
  id: string;
  question: string;
  options: string[];
  correct: number;
  type: 'conjugation' | 'concept';
  userAnswer: number | null;
}

function ConjugationTestContent() {
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

  const lesson = conjugationLessons.find(l => l.id === lessonId);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [testComplete, setTestComplete] = useState(false);
  const [showResults, setShowResults] = useState(false);

  useEffect(() => {
    if (lesson) {
      const questionsWithAnswers = lesson.exercises.map(ex => ({
        id: ex.id,
        question: ex.question,
        options: ex.options,
        correct: ex.correct,
        type: ex.type,
        userAnswer: null
      }));
      setQuestions(questionsWithAnswers);
    }
  }, [lesson]);

  if (!lesson) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-violet-300 to-violet-400 p-4">
        <div className="max-w-2xl mx-auto text-center pt-12">
          <p className="text-white text-xl">Leçon non trouvée</p>
          <Link href={`/conjugation?languageProfileId=${languageProfileId}`} className="text-purple-100 hover:text-white mt-4 block">
            ← Retour
          </Link>
        </div>
      </div>
    );
  }

  if (questions.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-violet-300 to-violet-400 p-4 flex items-center justify-center">
        <div className="text-white text-xl">Chargement des exercices...</div>
      </div>
    );
  }

  const currentQuestion = questions[currentIndex];
  const isAnswered = currentQuestion.userAnswer !== null;
  const isCorrect = isAnswered && currentQuestion.userAnswer === currentQuestion.correct;

  const handleSelectAnswer = (optionIndex: number) => {
    if (!isAnswered) {
      const newQuestions = [...questions];
      newQuestions[currentIndex].userAnswer = optionIndex;
      setQuestions(newQuestions);
      setShowResults(true);
    }
  };

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setShowResults(false);
    } else {
      setTestComplete(true);
    }
  };

  const correctCount = questions.filter(q => q.userAnswer === q.correct).length;

  if (testComplete) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-violet-300 to-violet-400 p-4">
        <div className="max-w-2xl mx-auto">
          <Link
            href={`/conjugation/${lessonId}?languageProfileId=${languageProfileId}`}
            className="text-white mb-6 hover:text-purple-100 font-semibold inline-block"
          >
            ← Retour
          </Link>

          <div className="bg-white rounded-lg shadow-lg p-8 text-center">
            <h1 className="text-4xl font-bold text-purple-600 mb-4">Test Terminé !</h1>
            <div className="text-6xl font-bold text-green-500 mb-4">{correctCount}/{questions.length}</div>
            <p className="text-gray-600 text-lg mb-8">
              Vous avez correctement répondu à {correctCount} question(s)
            </p>

            <div className="space-y-3">
              <button
                onClick={() => {
                  setCurrentIndex(0);
                  setTestComplete(false);
                  setShowResults(false);
                  const resetQuestions = questions.map(q => ({...q, userAnswer: null}));
                  setQuestions(resetQuestions);
                }}
                className="w-full bg-purple-500 hover:bg-purple-600 text-white font-bold py-3 rounded-lg transition"
              >
                Refaire le test
              </button>
              <Link
                href={`/conjugation/${lessonId}?languageProfileId=${languageProfileId}`}
                className="block bg-gray-500 hover:bg-gray-600 text-white font-bold py-3 rounded-lg transition text-center"
              >
                Retour à la leçon
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-300 to-violet-400 p-4">
      <div className="max-w-2xl mx-auto">
        <Link
          href={`/conjugation/${lessonId}?languageProfileId=${languageProfileId}`}
          className="text-white mb-6 hover:text-purple-100 font-semibold inline-block"
        >
          ← Retour
        </Link>

        <div className="bg-white rounded-lg shadow-lg p-8">
          <div className="mb-6">
            <div className="flex justify-between items-center mb-4">
              <h1 className="text-2xl font-bold text-purple-600">{lesson.title}</h1>
              <div className="text-gray-600 font-semibold">
                Question {currentIndex + 1}/{questions.length}
              </div>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-purple-500 h-2 rounded-full transition-all"
                style={{ width: `${((currentIndex + 1) / questions.length) * 100}%` }}
              />
            </div>
          </div>

          <div className="bg-purple-50 rounded-lg p-6 mb-6">
            <p className="text-gray-600 text-sm mb-2">
              {currentQuestion.type === 'conjugation' ? 'Question de conjugaison' : 'Question de concept'}
            </p>
            <p className="text-lg font-semibold text-gray-800">
              {currentQuestion.question}
            </p>
          </div>

          <div className="space-y-3 mb-6">
            {currentQuestion.options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleSelectAnswer(index)}
                disabled={isAnswered}
                className={`w-full p-4 rounded-lg border-2 text-left font-semibold transition ${
                  !isAnswered
                    ? 'border-gray-300 hover:border-purple-500 text-gray-700 hover:bg-purple-50'
                    : index === currentQuestion.correct
                    ? 'border-green-500 bg-green-100 text-green-700'
                    : index === currentQuestion.userAnswer
                    ? 'border-red-500 bg-red-100 text-red-700'
                    : 'border-gray-300 text-gray-700 bg-gray-50'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                      !isAnswered
                        ? 'border-gray-400'
                        : index === currentQuestion.correct
                        ? 'border-green-500 bg-green-500'
                        : index === currentQuestion.userAnswer
                        ? 'border-red-500 bg-red-500'
                        : 'border-gray-400'
                    }`}
                  >
                    {isAnswered && index === currentQuestion.correct && (
                      <span className="text-white text-sm">✓</span>
                    )}
                    {isAnswered && index === currentQuestion.userAnswer && index !== currentQuestion.correct && (
                      <span className="text-white text-sm">✗</span>
                    )}
                  </div>
                  <span>{option}</span>
                </div>
              </button>
            ))}
          </div>

          {showResults && (
            <div
              className={`rounded-lg p-4 mb-6 ${
                isCorrect
                  ? 'bg-green-100 border-2 border-green-500'
                  : 'bg-red-100 border-2 border-red-500'
              }`}
            >
              <p className={`font-bold mb-2 ${isCorrect ? 'text-green-700' : 'text-red-700'}`}>
                {isCorrect ? '✓ Correct !' : '✗ Incorrect'}
              </p>
              {!isCorrect && (
                <p className="text-gray-700">
                  Bonne réponse: <span className="font-semibold">{currentQuestion.options[currentQuestion.correct]}</span>
                </p>
              )}
            </div>
          )}

          {isAnswered && (
            <button
              onClick={handleNext}
              className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 rounded-lg transition"
            >
              {currentIndex === questions.length - 1 ? 'Voir le résultat' : 'Suivant'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default function ConjugationTestPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-gradient-to-br from-violet-300 to-violet-400 p-4 flex items-center justify-center">
          <p className="text-white text-xl">Chargement...</p>
        </div>
      }
    >
      <ConjugationTestContent />
    </Suspense>
  );
}
