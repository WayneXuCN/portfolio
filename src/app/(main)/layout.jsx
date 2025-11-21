'use client';

import React from 'react';
import Layout from '../../components/layout/Layout';
import ErrorBoundary from '../../components/ErrorBoundary';

export default function MainLayout({ children }) {
  return (
    <ErrorBoundary>
      <Layout>{children}</Layout>
    </ErrorBoundary>
  );
}
