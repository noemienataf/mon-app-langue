'use client';

import { useParams, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { useState, useEffect, Suspense } from 'react';
import { conjugationLessons } from '@/app/utils/conjugationData';
import {
  presentQalExercises,
  futureQalExercises,
  pastQalExercises,
  exerciseMetadata,
  binyanExerciseMetadata,
  gizraExerciseMetadata,
  qalExercises,
  nifalExercises,
  pielExercises,
  pualExercises,
  hifilExercises,
  hofalExercises,
  hitpaelExercises,
  regularVerbExercises,
  gutturalVerbExercises,
  weakAlefExercises,
  weakYodExercises,
  weakVavExercises,
  weakNunExercises,
  doubledVerbExercises,
} from '@/app/utils/conjugationExercisesData';
import HebrewKeyboard from '@/components/HebrewKeyboard';
import { useIsMobile } from '@/app/hooks/useIsMobile';

interface ConjugationExercise {
  id: string;
  infinitive: string;
  infinitiveFrench: string;
  person: string;
  personHebrew: string;
  tense: 'present' | 'past' | 'future';
  type: 'typing' | 'multiple-choice';
  question: string;
  correctAnswer: string;
  options?: string[];
}

function ConjugationExercisesContent() {
  const params = useParams();
  const searchParams = useSearchParams();
  const lessonId = params.id as string;
  const exerciseId = params.exerciseId as string;
  const profile = searchParams.get('profile') || 'User';

  const lesson = conjugationLessons.find(l => l.id === lessonId);
  const exerciseMeta = exerciseMetadata.find(ex => ex.id === exerciseId) ||
    binyanExerciseMetadata.find(ex => ex.id === exerciseId) ||
    gizraExerciseMetadata.find(ex => ex.id === exerciseId);
  const isMobile = useIsMobile();

  // Get all exercises for this tense, binyan, or gizra
  const getAllExercises = (): ConjugationExercise[] => {
    // Handle binyanim exercises
    if (lessonId === 'binyanim') {
      const binyanMeta = binyanExerciseMetadata.find(ex => ex.id === exerciseId);
      if (!binyanMeta) return [];

      const binyanMap: Record<string, ConjugationExercise[]> = {
        'qal': qalExercises,
        'nifal': nifalExercises,
        'piel': pielExercises,
        'pual': pualExercises,
        'hifil': hifilExercises,
        'hofal': hofalExercises,
        'hitpael': hitpaelExercises,
      };

      return binyanMap[binyanMeta.binyan] || [];
    }

    // Handle verb-groups (Gizra) exercises
    if (lessonId === 'verb-groups') {
      const gizraMeta = gizraExerciseMetadata.find(ex => ex.id === exerciseId);
      if (!gizraMeta) return [];

      const gizraMap: Record<string, ConjugationExercise[]> = {
        'regular': regularVerbExercises,
        'guttural': gutturalVerbExercises,
        'weak-alef': weakAlefExercises,
        'weak-yod': weakYodExercises,
        'weak-vav': weakVavExercises,
        'weak-nun': weakNunExercises,
        'doubled': doubledVerbExercises,
      };

      return gizraMap[gizraMeta.gizra] || [];
    }

    // Handle regular conjugation exercises by tense
    if (lessonId.includes('present')) return presentQalExercises;
    if (lessonId.includes('future')) return futureQalExercises;
    if (lessonId.includes('past')) return pastQalExercises;
    return presentQalExercises;
  };

  // Get only the 10 questions for this specific exercise set
  const getExerciseQuestions = (): ConjugationExercise[] => {
    if (!exerciseMeta) return [];
    const allExercises = getAllExercises();

    // For binyanim and verb-groups, all questions are already grouped (10 per category)
    if (lessonId === 'binyanim' || lessonId === 'verb-groups') {
      return allExercises;
    }

    // For regular exercises, slice by setNumber
    const setNumber = (exerciseMeta as any).setNumber || 1;
    const startIndex = (setNumber - 1) * 10;
    return allExercises.slice(startIndex, startIndex + 10);
  };

  const exercises = getExerciseQuestions();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userAnswer, setUserAnswer] = useState('');
  const [showAnswer, setShowAnswer] = useState(false);
  const [testComplete, setTestComplete] = useState(false);
  const [scores, setScores] = useState<boolean[]>([]);

  const currentExercise = exercises[currentIndex];
  const isTyping = currentExercise?.type === 'typing';
  const isCorrect = isTyping
    ? userAnswer.trim() === currentExercise?.correctAnswer.trim()
    : userAnswer === String(currentExercise?.options?.indexOf(currentExercise?.correctAnswer));

  const handleCheckAnswer = () => {
    setShowAnswer(true);
    if (!showAnswer) {
      const newScores = [...scores, isCorrect];
      setScores(newScores);
    }
  };

  const handleNext = () => {
    if (currentIndex < exercises.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setUserAnswer('');
      setShowAnswer(false);
    } else {
      setTestComplete(true);
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      setUserAnswer('');
      setShowAnswer(false);
    }
  };

  if (!lesson || !exerciseMeta || exercises.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-500 to-purple-600 p-4">
        <div className="max-w-2xl mx-auto text-center pt-12">
          <p className="text-white text-xl">Exercice non trouvé</p>
          <Link href={`/conjugation/${lessonId}/exercises-list?profile=${profile}`} className="text-purple-100 hover:text-white mt-4 block">
            ← Retour
          </Link>
        </div>
      </div>
    );
  }

  if (testComplete) {
    const correctCount = scores.filter(s => s).length;
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-500 to-purple-600 p-4">
        <div className="max-w-2xl mx-auto">
          <Link
            href={`/conjugation/${lessonId}/exercises-list?profile=${profile}`}
            className="text-white mb-6 hover:text-purple-100 font-semibold inline-block"
          >
            ← Retour
          </Link>

          <div className="bg-white rounded-lg shadow-lg p-8 text-center">
            <h1 className="text-4xl font-bold text-purple-600 mb-4">Exercice Terminé !</h1>
            <div className="text-6xl font-bold text-green-500 mb-4">{correctCount}/{exercises.length}</div>
            <p className="text-gray-600 text-lg mb-8">
              Vous avez correctement répondu à {correctCount} question(s)
            </p>

            <div className="space-y-3">
              <button
                onClick={() => {
                  setCurrentIndex(0);
                  setTestComplete(false);
                  setShowAnswer(false);
                  setUserAnswer('');
                  setScores([]);
                }}
                className="w-full bg-purple-500 hover:bg-purple-600 text-white font-bold py-3 rounded-lg transition"
              >
                Refaire cet exercice
              </button>
              <Link
                href={`/conjugation/${lessonId}/exercises-list?profile=${profile}`}
                className="block bg-gray-500 hover:bg-gray-600 text-white font-bold py-3 rounded-lg transition text-center"
              >
                Voir tous les exercices
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-500 to-purple-600 p-4">
      <div className="max-w-2xl mx-auto">
        <Link
          href={`/conjugation/${lessonId}/exercises-list?profile=${profile}`}
          className="text-white mb-6 hover:text-purple-100 font-semibold inline-block"
        >
          ← Retour
        </Link>

        <div className="bg-white rounded-lg shadow-lg p-8">
          <div className="mb-6">
            <div className="flex justify-between items-center mb-4">
              <h1 className="text-2xl font-bold text-purple-600">{exerciseMeta.title}</h1>
              <div className="text-gray-600 font-semibold">
                Question {currentIndex + 1}/{exercises.length}
              </div>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-purple-500 h-2 rounded-full transition-all"
                style={{ width: `${((currentIndex + 1) / exercises.length) * 100}%` }}
              />
            </div>
          </div>

          <div className="bg-purple-50 rounded-lg p-6 mb-6">
            <p className="text-gray-600 text-sm mb-2">
              {currentExercise?.type === 'typing' ? '✍️ Taper la réponse' : '🔘 Choisir la bonne réponse'}
            </p>
            <p className="text-lg font-semibold text-gray-800">
              {currentExercise?.question}
            </p>
          </div>

          {/* Answer Input */}
          {!showAnswer ? (
            <div className="space-y-4 mb-6">
              {isTyping ? (
                <div>
                  <input
                    type="text"
                    value={userAnswer}
                    onChange={(e) => setUserAnswer(e.target.value)}
                    placeholder="Tapez la réponse..."
                    className="w-full border-2 border-gray-300 rounded px-3 py-2 text-lg"
                    dir="rtl"
                  />
                  {!isMobile && <HebrewKeyboard value={userAnswer} onChange={setUserAnswer} />}
                </div>
              ) : (
                <div className="space-y-2">
                  {currentExercise?.options?.map((option, index) => (
                    <button
                      key={index}
                      onClick={() => setUserAnswer(String(index))}
                      className={`w-full p-4 rounded-lg border-2 text-left font-semibold transition ${
                        userAnswer === String(index)
                          ? 'border-purple-500 bg-purple-100 text-gray-800'
                          : 'border-gray-300 hover:border-purple-500 text-gray-800'
                      }`}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              )}
              <button
                onClick={handleCheckAnswer}
                disabled={isTyping ? !userAnswer.trim() : !userAnswer}
                className="w-full bg-purple-500 hover:bg-purple-600 disabled:bg-gray-400 text-white font-bold py-2 rounded-lg transition"
              >
                Vérifier
              </button>
            </div>
          ) : (
            <div className="space-y-4 mb-6">
              <div
                className={`rounded-lg p-4 ${
                  isCorrect
                    ? 'bg-green-100 border-2 border-green-500'
                    : 'bg-red-100 border-2 border-red-500'
                }`}
              >
                <p className={`font-bold mb-2 ${isCorrect ? 'text-green-700' : 'text-red-700'}`}>
                  {isCorrect ? '✓ Correct !' : '✗ Incorrect'}
                </p>
                <p className="text-gray-700">
                  Réponse: <span className="font-semibold text-lg">{currentExercise?.correctAnswer}</span>
                </p>
              </div>
            </div>
          )}

          {/* Navigation */}
          <div className="flex gap-3">
            <button
              onClick={handlePrevious}
              disabled={currentIndex === 0}
              className="flex-1 bg-gray-500 hover:bg-gray-600 disabled:bg-gray-300 text-white font-bold py-2 rounded-lg transition"
            >
              Précédent
            </button>
            <button
              onClick={handleNext}
              disabled={!showAnswer}
              className="flex-1 bg-green-500 hover:bg-green-600 disabled:bg-gray-300 text-white font-bold py-2 rounded-lg transition"
            >
              {currentIndex === exercises.length - 1 ? 'Voir les résultats' : 'Suivant'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ConjugationExercisesPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-gradient-to-br from-purple-500 to-purple-600 p-4 flex items-center justify-center">
          <p className="text-white text-xl">Chargement...</p>
        </div>
      }
    >
      <ConjugationExercisesContent />
    </Suspense>
  );
}
