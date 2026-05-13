'use client';

import { Suspense } from 'react';
import { use } from 'react';
import ReadingDetail from './reading-detail';

export default function ReadingDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);

  return (
    <Suspense fallback={<div className="min-h-screen bg-gradient-to-br from-orange-100 to-orange-200 flex items-center justify-center"><p className="text-orange-700">Chargement...</p></div>}>
      <ReadingDetail id={id} />
    </Suspense>
  );
}
