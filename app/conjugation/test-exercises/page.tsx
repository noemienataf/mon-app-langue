'use client';

import { useState } from 'react';
import { presentQalExercises, futureQalExercises, pastQalExercises } from '@/app/utils/conjugationExercisesData';
import HebrewKeyboard from '@/components/HebrewKeyboard';
import { useIsMobile } from '@/app/hooks/useIsMobile';

type ExerciseType = 'present' | 'future' | 'past';

export default function TestExercisesPage() {
  const [selectedTense, setSelectedTense] = useState<ExerciseType>('present');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userAnswer, setUserAnswer] = useState('');
  const [showAnswer, setShowAnswer] = useState(false);
  const isMobile = useIsMobile();

  const allExercises = {
    present: presentQalExercises,
    future: futureQalExercises,
    past: pastQalExercises,
  };

  const exercises = allExercises[selectedTense];
  const currentExercise = exercises[currentIndex];
  const isTyping = currentExercise.type === 'typing';

  const handleCheckAnswer = () => {
    if (isTyping) {
      setShowAnswer(true);
    } else {
      setShowAnswer(true);
    }
  };

  const handleNext = () => {
    if (currentIndex < exercises.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setUserAnswer('');
      setShowAnswer(false);
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      setUserAnswer('');
      setShowAnswer(false);
    }
  };

  const handleChangeTense = (tense: ExerciseType) => {
    setSelectedTense(tense);
    setCurrentIndex(0);
    setUserAnswer('');
    setShowAnswer(false);
  };

  const isCorrect = isTyping
    ? userAnswer.trim() === currentExercise.correctAnswer.trim()
    : userAnswer === String(currentExercise.options?.indexOf(currentExercise.correctAnswer));

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-300 to-violet-400 p-4">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-white text-3xl font-bold mb-6 text-center">Test des Exercices de Conjugaison</h1>

        {/* Tense Selection */}
        <div className="flex gap-3 mb-6 justify-center">
          <button
            onClick={() => handleChangeTense('present')}
            className={`px-4 py-2 rounded-lg font-semibold transition ${
              selectedTense === 'present'
                ? 'bg-white text-purple-600'
                : 'bg-purple-400 text-white hover:bg-purple-300'
            }`}
          >
            Présent ({presentQalExercises.length})
          </button>
          <button
            onClick={() => handleChangeTense('future')}
            className={`px-4 py-2 rounded-lg font-semibold transition ${
              selectedTense === 'future'
                ? 'bg-white text-purple-600'
                : 'bg-purple-400 text-white hover:bg-purple-300'
            }`}
          >
            Futur ({futureQalExercises.length})
          </button>
          <button
            onClick={() => handleChangeTense('past')}
            className={`px-4 py-2 rounded-lg font-semibold transition ${
              selectedTense === 'past'
                ? 'bg-white text-purple-600'
                : 'bg-purple-400 text-white hover:bg-purple-300'
            }`}
          >
            Passé ({pastQalExercises.length})
          </button>
        </div>

        {/* Exercise Card */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-6">
          <div className="mb-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-purple-600">
                Exercice {currentIndex + 1}/{exercises.length}
              </h2>
              <span className="text-sm bg-purple-100 text-purple-700 px-3 py-1 rounded">
                {currentExercise.type === 'typing' ? 'Taper' : 'Choix multiple'}
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-purple-500 h-2 rounded-full transition-all"
                style={{ width: `${((currentIndex + 1) / exercises.length) * 100}%` }}
              />
            </div>
          </div>

          {/* Question */}
          <div className="bg-purple-50 rounded-lg p-6 mb-6">
            <p className="text-gray-600 text-sm mb-2">Infinitif: {currentExercise.infinitive}</p>
            <p className="text-gray-600 text-sm mb-2">Personne: {currentExercise.personHebrew}</p>
            <p className="text-lg font-semibold text-gray-800">{currentExercise.question}</p>
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
                  {currentExercise.options?.map((option, index) => (
                    <button
                      key={index}
                      onClick={() => setUserAnswer(String(index))}
                      className={`w-full p-3 rounded-lg border-2 text-left font-semibold transition ${
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
                  Réponse: <span className="font-semibold text-lg">{currentExercise.correctAnswer}</span>
                </p>
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
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
              disabled={currentIndex === exercises.length - 1 || !showAnswer}
              className="flex-1 bg-emerald-600 hover:bg-emerald-700 disabled:bg-gray-300 text-white font-bold py-2 rounded-lg transition"
            >
              Suivant
            </button>
          </div>
        </div>

        {/* Exercise Info */}
        <div className="bg-purple-900 rounded-lg shadow-lg p-6 text-white">
          <h3 className="font-bold mb-2">Détails de l'exercice:</h3>
          <div className="text-sm space-y-1">
            <p><strong>ID:</strong> {currentExercise.id}</p>
            <p><strong>Infinitif:</strong> {currentExercise.infinitive} ({currentExercise.infinitiveFrench})</p>
            <p><strong>Personne:</strong> {currentExercise.personHebrew}</p>
            <p><strong>Temps:</strong> {currentExercise.tense}</p>
            <p><strong>Type:</strong> {currentExercise.type}</p>
            {currentExercise.options && (
              <div>
                <strong>Options:</strong>
                <div className="ml-4">
                  {currentExercise.options.map((opt, idx) => (
                    <p key={idx}>
                      {idx + 1}. {opt} {opt === currentExercise.correctAnswer && '← Correct'}
                    </p>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
