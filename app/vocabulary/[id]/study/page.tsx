'use client';

import { useParams, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { vocabularyLists } from '@/app/utils/vocabularyData';

export default function StudyPage() {
  const params = useParams();
  const searchParams = useSearchParams();
  const listId = params.id as string;
  const profile = searchParams.get('profile') || 'User';

  const list = vocabularyLists.find(l => l.id === listId);

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

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 to-blue-600 p-4">
      <div className="max-w-4xl mx-auto">
        <Link
          href={`/?profile=${profile}`}
          className="text-white mb-6 hover:text-blue-100 font-semibold inline-block"
        >
          ← Retour
        </Link>

        <div className="bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-3xl font-bold text-blue-600 mb-2">{list.name}</h1>
          <p className="text-gray-600 mb-8">{list.description}</p>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b-2 border-blue-500">
                  <th className="text-left py-4 px-4 text-blue-600 font-bold">#</th>
                  <th className="text-left py-4 px-4 text-blue-600 font-bold">Hébreu</th>
                  <th className="text-left py-4 px-4 text-blue-600 font-bold">Français</th>
                </tr>
              </thead>
              <tbody>
                {list.words.map((word, index) => (
                  <tr key={word.id} className="border-b border-gray-200 hover:bg-blue-50">
                    <td className="py-4 px-4 text-gray-600 font-semibold">{index + 1}</td>
                    <td className="py-4 px-4 text-lg text-gray-800 font-semibold">{word.hebrew}</td>
                    <td className="py-4 px-4 text-gray-700">{word.french}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-8 flex gap-4">
            <Link
              href={`/vocabulary/${listId}/test?profile=${profile}`}
              className="flex-1 bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 rounded-lg transition text-center"
            >
              Tester mes connaissances
            </Link>
            <button className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-3 rounded-lg transition">
              Ajouter des mots
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
