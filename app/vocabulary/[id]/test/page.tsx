'use client';

import { useParams, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { vocabularyLists } from '@/app/utils/vocabularyData';
import { getAllVocabularyLists } from '@/app/utils/customLists';
import HebrewKeyboard from '@/components/HebrewKeyboard';

export const dynamic = 'force-dynamic';

interface TestQuestion {
  wordId: string;
  word: string;
  answer: string;
  type: 'hebrew-to-french' | 'french-to-hebrew';
  correct: boolean | null;
  options?: string[]; // Pour les questions à choix multiples (Quick mode)
}

interface CustomWord {
  id: string;
  hebrew: string;
  french: string;
}

type TestMode = 'quick' | 'master' | null;
type TestType = 'sample' | 'all' | null;

export default function TestPage() {
  const params = useParams();
  const searchParams = useSearchParams();
  const listId = params.id as string;
  const profile = searchParams.get('profile') || 'User';

  const allLists = getAllVocabularyLists(vocabularyLists);
  const list = allLists.find(l => l.id === listId);
  const [customWords, setCustomWords] = useState<CustomWord[]>([]);
  const [mode, setMode] = useState<TestMode>(null);
  const [testType, setTestType] = useState<TestType>(null);
  const [questions, setQuestions] = useState<TestQuestion[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userAnswer, setUserAnswer] = useState('');
  const [showResult, setShowResult] = useState(false);
  const [testComplete, setTestComplete] = useState(false);
  const [failedWords, setFailedWords] = useState<TestQuestion[]>([]);
  const [replaying, setReplaying] = useState(false);


  const generateQuestions = (selectedMode: TestMode, selectedType: TestType) => {
    if (!list || !selectedMode) return;

    const allWords = [...list.words, ...customWords];
    let wordsToUse = allWords;

    // Pour Master mode avec "all", utiliser tous les mots; sinon utiliser 10
    if (selectedMode === 'master' && selectedType === 'all') {
      wordsToUse = allWords.sort(() => Math.random() - 0.5);
    } else {
      wordsToUse = allWords
        .sort(() => Math.random() - 0.5)
        .slice(0, Math.min(10, allWords.length));
    }

    if (selectedMode === 'quick') {
      // Mode Quick: choix multiples
      const newQuestions: TestQuestion[] = wordsToUse.slice(0, 10).map((word) => {
        const isHebrew = Math.random() > 0.5;
        const question = isHebrew ? word.hebrew : word.french;
        const answer = isHebrew ? word.french : word.hebrew;

        // Générer 3 mauvaises réponses
        const otherWords = allWords.filter(w => w.id !== word.id);
        const wrongAnswers = otherWords
          .sort(() => Math.random() - 0.5)
          .slice(0, 3)
          .map(w => (isHebrew ? w.french : w.hebrew));

        const options = [answer, ...wrongAnswers].sort(() => Math.random() - 0.5);

        return {
          wordId: word.id,
          word: question,
          answer: answer,
          type: isHebrew ? 'hebrew-to-french' : 'french-to-hebrew',
          correct: null,
          options: options,
        };
      });

      setQuestions(newQuestions);
    } else {
      // Mode Master: typing
      const newQuestions: TestQuestion[] = wordsToUse.map((word, index) => ({
        wordId: word.id,
        word: index % 2 === 0 ? word.hebrew : word.french,
        answer: index % 2 === 0 ? word.french : word.hebrew,
        type: index % 2 === 0 ? 'hebrew-to-french' : 'french-to-hebrew',
        correct: null,
      }));

      setQuestions(newQuestions);
    }
  };

  useEffect(() => {
    if (!listId) return;
    const saved = localStorage.getItem(`custom-words-${listId}`);
    if (saved) {
      setCustomWords(JSON.parse(saved));
    }
  }, [listId]);

  const handleStartTest = (selectedMode: TestMode, selectedType?: TestType) => {
    setMode(selectedMode);
    if (selectedMode === 'quick') {
      generateQuestions(selectedMode, null);
    } else {
      setTestType(selectedType || null);
      generateQuestions(selectedMode, selectedType || null);
    }
  };

  if (!list) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-100 to-emerald-200 p-4">
        <div className="max-w-2xl mx-auto text-center pt-12">
          <p className="text-emerald-700 text-xl">Liste non trouvée</p>
          <Link href={`/?profile=${profile}`} className="text-emerald-600 hover:text-emerald-900 mt-4 block">
            ← Retour
          </Link>
        </div>
      </div>
    );
  }

  // Écran de sélection du mode de test
  if (!mode) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-100 to-emerald-200 p-4">
        <div className="max-w-2xl mx-auto">
          <Link
            href={`/vocabulary/${listId}/study?profile=${profile}`}
            className="text-emerald-700 mb-6 hover:text-emerald-900 font-semibold inline-block"
          >
            ← Retour
          </Link>

          <div className="bg-white rounded-lg shadow-lg p-8">
            <h1 className="text-3xl font-bold text-emerald-700 mb-2">{list.name}</h1>
            <p className="text-gray-600 mb-8">Quel type de test voulez-vous faire ?</p>

            {/* Quick Mode */}
            <button
              onClick={() => handleStartTest('quick')}
              className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-bold p-6 rounded-lg transition mb-4"
            >
              <div className="text-2xl mb-2">⚡</div>
              <h2 className="text-xl font-bold mb-1">Mode Rapide (Quick)</h2>
              <p className="text-blue-100">10 questions à choix multiples</p>
              <p className="text-blue-100 text-sm">Pas besoin d'écrire</p>
            </button>

            {/* Master Mode */}
            <button
              onClick={() => setTestType('sample')}
              className="w-full bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white font-bold p-6 rounded-lg transition"
            >
              <div className="text-2xl mb-2">📚</div>
              <h2 className="text-xl font-bold mb-1">Mode Maître (Master)</h2>
              <p className="text-purple-100">Taper les réponses</p>
              <p className="text-purple-100 text-sm">Choisir la quantité de mots</p>
            </button>

            {/* Master Mode - Type Selection */}
            {testType !== null && (
              <div className="mt-6 border-t border-gray-300 pt-6">
                <p className="text-gray-700 font-semibold mb-4">Mode Maître : combien de mots ?</p>
                <div className="flex gap-3">
                  <button
                    onClick={() => handleStartTest('master', 'sample')}
                    className="flex-1 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-bold py-3 rounded-lg transition"
                  >
                    Sample (10)
                  </button>
                  <button
                    onClick={() => handleStartTest('master', 'all')}
                    className="flex-1 bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700 text-white font-bold py-3 rounded-lg transition"
                  >
                    Tous ({list.words.length + customWords.length})
                  </button>
                </div>
                <button
                  onClick={() => setTestType(null)}
                  className="w-full mt-3 text-gray-600 hover:text-gray-900 font-semibold"
                >
                  Annuler
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  if (questions.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-100 to-emerald-200 p-4 flex items-center justify-center">
        <div className="text-emerald-700 text-xl">Chargement des questions...</div>
      </div>
    );
  }

  const currentQuestion = questions[currentIndex];
  const normalizeAnswer = (text: string) => text.trim().toLowerCase().replace(/\s+/g, ' ');

  const isAnswerCorrect = mode === 'quick'
    ? userAnswer === currentQuestion.answer
    : normalizeAnswer(userAnswer) === normalizeAnswer(currentQuestion.answer);

  const handleSubmitAnswer = () => {
    const newQuestions = [...questions];
    newQuestions[currentIndex].correct = isAnswerCorrect;

    if (!isAnswerCorrect && !failedWords.some(w => w.wordId === currentQuestion.wordId)) {
      setFailedWords([...failedWords, newQuestions[currentIndex]]);
    }

    setQuestions(newQuestions);
    setShowResult(true);
  };

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setUserAnswer('');
      setShowResult(false);
    } else if (failedWords.length > 0) {
      setReplaying(true);
      setCurrentIndex(0);
      setUserAnswer('');
      setShowResult(false);
      setQuestions(failedWords);
      setFailedWords([]);
    } else {
      setTestComplete(true);
    }
  };

  if (testComplete) {
    const correctCount = questions.filter(q => q.correct === true).length;

    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-100 to-emerald-200 p-4">
        <div className="max-w-2xl mx-auto">
          <Link
            href={`/vocabulary/${listId}/study?profile=${profile}`}
            className="text-emerald-700 mb-6 hover:text-emerald-900 font-semibold inline-block"
          >
            ← Retour
          </Link>

          <div className="bg-white rounded-lg shadow-lg p-8 text-center">
            <h1 className="text-4xl font-bold text-emerald-600 mb-4">Test Terminé !</h1>
            <div className="text-6xl font-bold text-green-500 mb-4">{correctCount}/{questions.length}</div>
            <p className="text-gray-600 text-lg mb-8">
              Vous avez correctement répondu à {correctCount} question(s)
            </p>
            <p className="text-gray-500 text-sm mb-8">
              {mode === 'quick' ? 'Mode Rapide' : 'Mode Maître'}
            </p>

            <div className="space-y-3">
              <button
                onClick={() => {
                  setCurrentIndex(0);
                  setQuestions([]);
                  setTestComplete(false);
                  setUserAnswer('');
                  setShowResult(false);
                  setMode(null);
                  setTestType(null);
                }}
                className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-3 rounded-lg transition"
              >
                Refaire le test
              </button>
              <Link
                href={`/vocabulary/${listId}/study?profile=${profile}`}
                className="block bg-gray-500 hover:bg-gray-600 text-white font-bold py-3 rounded-lg transition text-center"
              >
                Retour à l'étude
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-100 to-emerald-200 p-4">
      <div className="max-w-2xl mx-auto">
        <Link
          href={`/vocabulary/${listId}/study?profile=${profile}`}
          className="text-emerald-700 mb-6 hover:text-emerald-900 font-semibold inline-block"
        >
          ← Retour
        </Link>

        <div className="bg-white rounded-lg shadow-lg p-8">
          <div className="mb-6">
            <div className="flex justify-between items-center mb-4">
              <h1 className="text-2xl font-bold text-emerald-600">{list.name}</h1>
              <div className="text-gray-600 font-semibold">
                Question {currentIndex + 1}/{questions.length}
                {replaying && ' (Révision)'}
              </div>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-emerald-500 h-2 rounded-full transition-all"
                style={{ width: `${((currentIndex + 1) / questions.length) * 100}%` }}
              />
            </div>
          </div>

          <div className="bg-emerald-50 rounded-lg p-6 mb-6 text-center">
            <p className="text-gray-600 text-sm mb-2">
              {mode === 'quick' ? 'Choisir la bonne réponse' : (
                currentQuestion.type === 'hebrew-to-french'
                  ? 'Traduis de l\'hébreu au français'
                  : 'Traduis du français à l\'hébreu'
              )}
            </p>
            <p
              className="text-4xl font-bold text-emerald-600"
              dir={currentQuestion.type === 'hebrew-to-french' ? 'rtl' : 'ltr'}
            >
              {currentQuestion.word}
            </p>
          </div>

          {mode === 'quick' ? (
            // Mode Quick: Choix multiples
            <div className="mb-6 space-y-3">
              {currentQuestion.options?.map((option) => (
                <button
                  key={option}
                  onClick={() => {
                    setUserAnswer(option);
                    if (!showResult) {
                      setUserAnswer(option);
                      const newQuestions = [...questions];
                      const isCorrect = option === currentQuestion.answer;
                      newQuestions[currentIndex].correct = isCorrect;

                      if (!isCorrect && !failedWords.some(w => w.wordId === currentQuestion.wordId)) {
                        setFailedWords([...failedWords, newQuestions[currentIndex]]);
                      }

                      setQuestions(newQuestions);
                      setShowResult(true);
                    }
                  }}
                  disabled={showResult}
                  className={`w-full p-4 rounded-lg border-2 transition font-semibold text-left ${
                    showResult
                      ? option === currentQuestion.answer
                        ? 'bg-green-100 border-green-500 text-green-700'
                        : option === userAnswer
                        ? 'bg-red-100 border-red-500 text-red-700'
                        : 'bg-gray-100 border-gray-300 text-gray-700'
                      : 'bg-white border-gray-300 text-gray-800 hover:border-emerald-500 hover:bg-emerald-50'
                  }`}
                >
                  {option}
                </button>
              ))}
            </div>
          ) : (
            // Mode Master: Typing
            <>
              {currentQuestion.type === 'hebrew-to-french' ? (
                <div className="mb-6">
                  <input
                    type="text"
                    value={userAnswer}
                    onChange={e => setUserAnswer(e.target.value)}
                    onKeyPress={e => e.key === 'Enter' && !showResult && handleSubmitAnswer()}
                    placeholder="Votre réponse..."
                    className="w-full border-2 border-emerald-500 rounded px-3 py-2 text-lg mb-4"
                    dir="ltr"
                    disabled={showResult}
                  />
                </div>
              ) : (
                <div className="mb-6">
                  {!showResult && <HebrewKeyboard value={userAnswer} onChange={setUserAnswer} />}
                  {showResult && (
                    <input
                      type="text"
                      value={userAnswer}
                      readOnly
                      className="w-full border-2 border-gray-300 rounded px-3 py-2 text-lg"
                      dir="rtl"
                    />
                  )}
                </div>
              )}
            </>
          )}

          {showResult && (
            <div
              className={`rounded-lg p-4 mb-6 ${
                isAnswerCorrect
                  ? 'bg-green-100 border-2 border-green-500'
                  : 'bg-red-100 border-2 border-red-500'
              }`}
            >
              <p className={`font-bold mb-2 ${isAnswerCorrect ? 'text-green-700' : 'text-red-700'}`}>
                {isAnswerCorrect ? '✓ Correct !' : '✗ Incorrect'}
              </p>
              {!isAnswerCorrect && (
                <p className="text-gray-700">
                  Bonne réponse: <span className="font-semibold" dir={currentQuestion.type === 'french-to-hebrew' ? 'rtl' : 'ltr'}>{currentQuestion.answer}</span>
                </p>
              )}
            </div>
          )}

          <div className="flex gap-4">
            {!showResult ? (
              mode === 'quick' ? null : (
                <button
                  onClick={handleSubmitAnswer}
                  disabled={!userAnswer.trim()}
                  className="flex-1 bg-emerald-500 hover:bg-emerald-600 disabled:bg-gray-300 text-white font-bold py-3 rounded-lg transition"
                >
                  Valider
                </button>
              )
            ) : (
              <button
                onClick={handleNext}
                className="flex-1 bg-green-500 hover:bg-green-600 text-white font-bold py-3 rounded-lg transition"
              >
                {currentIndex === questions.length - 1
                  ? failedWords.length > 0
                    ? 'Voir mes erreurs'
                    : 'Voir le résultat'
                  : 'Suivant'}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
