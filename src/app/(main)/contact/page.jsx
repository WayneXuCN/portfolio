'use client';

import React, { Suspense } from 'react';
import dynamic from 'next/dynamic';
import { useLanguage } from '../../../lib/LanguageContext';
import LoadingState from '../../../components/ui/LoadingState';

const ContactContent = dynamic(() => import('../../../components/pages/Contact'), {
  loading: () => <LoadingState />,
  ssr: true,
});

export default function ContactPage() {
  const { content } = useLanguage();

  if (!content) return null;

  return (
    <Suspense fallback={<LoadingState />}>
      <ContactContent content={content} />
    </Suspense>
  );
}
