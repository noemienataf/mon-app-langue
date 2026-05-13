'use client';

import { Suspense } from 'react';
import { use } from 'react';
import PodcastDetail from './podcast-detail';

export default function PodcastDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);

  return (
    <Suspense fallback={<div className="min-h-screen bg-gradient-to-br from-red-100 to-red-200 flex items-center justify-center"><p className="text-red-700">Chargement...</p></div>}>
      <PodcastDetail id={id} />
    </Suspense>
  );
}
