'use client';

import React, { Suspense } from 'react';
import dynamic from 'next/dynamic';
import { useLanguage } from '../../../lib/LanguageContext';
import LoadingState from '../../../components/ui/LoadingState';

const AboutContent = dynamic(() => import('../../../components/pages/About'), {
  loading: () => <LoadingState />,
  ssr: true,
});

export default function AboutPage() {
  const { content } = useLanguage();

  if (!content) return null;

  return (
    <Suspense fallback={<LoadingState />}>
      <AboutContent content={content} />
    </Suspense>
  );
}
