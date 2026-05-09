'use client';

import { useParams, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { vocabularyLists } from '@/app/utils/vocabularyData';
import { getAllVocabularyLists } from '@/app/utils/customLists';
import HebrewKeyboard from '@/components/HebrewKeyboard';

interface TestQuestion {
  wordId: string;
  word: string;
  answer: string;
  type: 'hebrew-to-french' | 'french-to-hebrew';
  correct: boolean | null;
}

interface CustomWord {
  id: string;
  hebrew: string;
  french: string;
}

export default function TestPage() {
  const params = useParams();
  const searchParams = useSearchParams();
  const listId = params.id as string;
  const profile = searchParams.get('profile') || 'User';

  const allLists = getAllVocabularyLists(vocabularyLists);
  const list = allLists.find(l => l.id === listId);
  const [customWords, setCustomWords] = useState<CustomWord[]>([]);
  const [questions, setQuestions] = useState<TestQuestion[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userAnswer, setUserAnswer] = useState('');
  const [showResult, setShowResult] = useState(false);
  const [testComplete, setTestComplete] = useState(false);
  const [failedWords, setFailedWords] = useState<TestQuestion[]>([]);
  const [replaying, setReplaying] = useState(false);

  // Charger les mots personnalisés
  useEffect(() => {
    if (!listId) return;
    const saved = localStorage.getItem(`custom-words-${listId}`);
    if (saved) {
      setCustomWords(JSON.parse(saved));
    }
  }, [listId]);

  useEffect(() => {
    if (!list) return;

    // Combiner les mots par défaut et personnalisés
    const allWords = [...list.words, ...customWords];
    const selectedWords = allWords
      .sort(() => Math.random() - 0.5)
      .slice(0, Math.min(10, allWords.length));

    const newQuestions: TestQuestion[] = selectedWords.map((word, index) => ({
      wordId: word.id,
      word: index % 2 === 0 ? word.hebrew : word.french,
      answer: index % 2 === 0 ? word.french : word.hebrew,
      type: index % 2 === 0 ? 'hebrew-to-french' : 'french-to-hebrew',
      correct: null,
    }));

    setQuestions(newQuestions);
  }, [list, customWords]);

  if (!list) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-500 to-blue-600 p-4">
        <div className="max-w-2xl mx-auto text-center pt-12">
          <p className="text-white text-xl">Liste non trouvée</p>
          <Link href={`/?profile=${profile}`} className="text-blue-100 hover:text-white mt-4 block">
            ← Retour
          </Link>
        </div>
      </div>
    );
  }

  if (questions.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-500 to-blue-600 p-4 flex items-center justify-center">
        <div className="text-white text-xl">Chargement des questions...</div>
      </div>
    );
  }

  const currentQuestion = questions[currentIndex];
  const normalizeAnswer = (text: string) => text.trim().toLowerCase().replace(/\s+/g, ' ');
  const isAnswerCorrect = normalizeAnswer(userAnswer) === normalizeAnswer(currentQuestion.answer);

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
      <div className="min-h-screen bg-gradient-to-br from-blue-500 to-blue-600 p-4">
        <div className="max-w-2xl mx-auto">
          <Link
            href={`/vocabulary/${listId}/study?profile=${profile}`}
            className="text-white mb-6 hover:text-blue-100 font-semibold inline-block"
          >
            ← Retour
          </Link>

          <div className="bg-white rounded-lg shadow-lg p-8 text-center">
            <h1 className="text-4xl font-bold text-blue-600 mb-4">Test Terminé !</h1>
            <div className="text-6xl font-bold text-green-500 mb-4">{correctCount}/10</div>
            <p className="text-gray-600 text-lg mb-8">
              Vous avez correctement répondu à {correctCount} question(s)
            </p>

            <div className="space-y-3">
              <button
                onClick={() => {
                  setCurrentIndex(0);
                  setQuestions([]);
                  setTestComplete(false);
                  setUserAnswer('');
                  setShowResult(false);
                }}
                className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 rounded-lg transition"
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
    <div className="min-h-screen bg-gradient-to-br from-blue-500 to-blue-600 p-4">
      <div className="max-w-2xl mx-auto">
        <Link
          href={`/vocabulary/${listId}/study?profile=${profile}`}
          className="text-white mb-6 hover:text-blue-100 font-semibold inline-block"
        >
          ← Retour
        </Link>

        <div className="bg-white rounded-lg shadow-lg p-8">
          <div className="mb-6">
            <div className="flex justify-between items-center mb-4">
              <h1 className="text-2xl font-bold text-blue-600">{list.name}</h1>
              <div className="text-gray-600 font-semibold">
                Question {currentIndex + 1}/{questions.length}
                {replaying && ' (Révision)'}
              </div>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-blue-500 h-2 rounded-full transition-all"
                style={{ width: `${((currentIndex + 1) / questions.length) * 100}%` }}
              />
            </div>
          </div>

          <div className="bg-blue-50 rounded-lg p-6 mb-6 text-center">
            <p className="text-gray-600 text-sm mb-2">
              {currentQuestion.type === 'hebrew-to-french'
                ? 'Traduis de l\'hébreu au français'
                : 'Traduis du français à l\'hébreu'}
            </p>
            <p
              className="text-4xl font-bold text-blue-600"
              dir={currentQuestion.type === 'hebrew-to-french' ? 'rtl' : 'ltr'}
            >
              {currentQuestion.word}
            </p>
          </div>

          {currentQuestion.type === 'hebrew-to-french' ? (
            <div className="mb-6">
              <input
                type="text"
                value={userAnswer}
                onChange={e => setUserAnswer(e.target.value)}
                onKeyPress={e => e.key === 'Enter' && !showResult && handleSubmitAnswer()}
                placeholder="Votre réponse..."
                className="w-full border-2 border-blue-500 rounded px-3 py-2 text-lg mb-4"
                dir="ltr"
              />
            </div>
          ) : (
            <HebrewKeyboard value={userAnswer} onChange={setUserAnswer} />
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
                  Bonne réponse: <span className="font-semibold">{currentQuestion.answer}</span>
                </p>
              )}
            </div>
          )}

          <div className="flex gap-4">
            {!showResult ? (
              <button
                onClick={handleSubmitAnswer}
                disabled={!userAnswer.trim()}
                className="flex-1 bg-blue-500 hover:bg-blue-600 disabled:bg-gray-300 text-white font-bold py-3 rounded-lg transition"
              >
                Valider
              </button>
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
