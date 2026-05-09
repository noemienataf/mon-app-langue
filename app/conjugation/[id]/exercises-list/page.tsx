'use client';

import { useParams, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { useState, useEffect, Suspense } from 'react';
import { conjugationLessons } from '@/app/utils/conjugationData';
import { exerciseMetadata, binyanExerciseMetadata, gizraExerciseMetadata } from '@/app/utils/conjugationExercisesData';

function ExercisesListContent() {
  const params = useParams();
  const searchParams = useSearchParams();
  const lessonId = params.id as string;
  const profile = searchParams.get('profile') || 'User';

  const lesson = conjugationLessons.find(l => l.id === lessonId);
  const [masteredExercises, setMasteredExercises] = useState<Set<string>>(new Set());
  const [loading, setLoading] = useState(true);

  // Déterminer le tense à partir de l'ID de la leçon, ou utiliser binyan si c'est binyanim
  const getTense = (): 'present' | 'past' | 'future' | null => {
    if (lessonId.includes('present')) return 'present';
    if (lessonId.includes('future')) return 'future';
    if (lessonId.includes('past')) return 'past';
    return 'present';
  };

  const isBinyanim = lessonId === 'binyanim';
  const isVerbGroups = lessonId === 'verb-groups';
  const exercises = isBinyanim
    ? binyanExerciseMetadata
    : isVerbGroups
    ? gizraExerciseMetadata
    : exerciseMetadata.filter(ex => ex.tense === getTense());

  useEffect(() => {
    if (profile) {
      fetchMasteredExercises();
    } else {
      setLoading(false);
    }
  }, [profile]);

  const fetchMasteredExercises = async () => {
    try {
      const response = await fetch(`/api/mastery/exercises?profileId=${profile}`);
      const exos = await response.json();
      setMasteredExercises(new Set(exos));
    } catch (error) {
      console.error('Erreur lors du chargement des exercices maîtrisés:', error);
    } finally {
      setLoading(false);
    }
  };

  const toggleMastery = async (exerciseId: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (!profile) return;

    const newMastered = new Set(masteredExercises);

    try {
      if (newMastered.has(exerciseId)) {
        // Retirer de la maîtrise
        await fetch('/api/mastery/exercises', {
          method: 'DELETE',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ profileId: profile, exerciseId }),
        });
        newMastered.delete(exerciseId);
      } else {
        // Ajouter à la maîtrise
        await fetch('/api/mastery/exercises', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ profileId: profile, exerciseId }),
        });
        newMastered.add(exerciseId);
      }

      setMasteredExercises(newMastered);
    } catch (error) {
      console.error('Erreur lors de la mise à jour de la maîtrise:', error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-500 to-purple-600 p-4 flex items-center justify-center">
        <p className="text-white text-xl">Chargement...</p>
      </div>
    );
  }

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
      <div className="max-w-2xl mx-auto">
        <Link
          href={`/conjugation/${lessonId}?profile=${profile}`}
          className="text-white mb-6 hover:text-purple-100 font-semibold inline-block"
        >
          ← Retour
        </Link>

        <h1 className="text-white text-3xl font-bold mb-2">Exercices - {lesson.title}</h1>
        <p className="text-purple-100 mb-8">Sélectionne un exercice pour commencer (10 questions chacun)</p>

        <div className="grid grid-cols-1 gap-4">
          {exercises.map(exercise => (
            <div
              key={exercise.id}
              className="relative group"
            >
              <Link
                href={`/conjugation/${lessonId}/exercises/${exercise.id}?profile=${profile}`}
                className="bg-white rounded-lg shadow-md hover:shadow-lg hover:scale-102 transition block p-6 pr-14 flex flex-col border border-purple-100"
              >
                <h3 className="text-lg font-bold text-purple-700 mb-2">{exercise.title}</h3>
                <p className="text-gray-600 text-sm">{exercise.description}</p>
              </Link>

              <button
                onClick={(e) => toggleMastery(exercise.id, e)}
                className={`absolute top-4 right-4 text-2xl transition ${
                  masteredExercises.has(exercise.id)
                    ? 'text-green-500'
                    : 'text-gray-300 hover:text-gray-400'
                }`}
                title="Marquer comme fait"
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

export default function ExercisesListPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-gradient-to-br from-purple-500 to-purple-600 p-4 flex items-center justify-center">
          <p className="text-white text-xl">Chargement...</p>
        </div>
      }
    >
      <ExercisesListContent />
    </Suspense>
  );
}
