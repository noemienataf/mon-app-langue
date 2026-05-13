'use client';

import { Suspense } from 'react';
import ReadingContent from './reading-content';

export default function ReadingPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-gradient-to-br from-orange-100 to-orange-200 flex items-center justify-center"><p className="text-orange-700">Chargement...</p></div>}>
      <ReadingContent />
    </Suspense>
  );
}
