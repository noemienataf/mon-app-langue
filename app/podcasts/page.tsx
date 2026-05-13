'use client';

import { Suspense } from 'react';
import PodcastContent from './podcast-content';

export default function PodcastPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-gradient-to-br from-red-100 to-red-200 flex items-center justify-center"><p className="text-red-700">Chargement...</p></div>}>
      <PodcastContent />
    </Suspense>
  );
}
