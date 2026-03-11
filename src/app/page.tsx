import React from 'react';
import { getDocSlugs } from '@/lib/docs';
import dynamic from 'next/dynamic';

const DashboardClient = dynamic(() => import('@/components/DashboardClient'), { ssr: false, loading: () => <p className="text-center py-20 text-white">Loading…</p> });

export default async function Home() {
  const slugs = getDocSlugs();

  return (
    <main className="min-h-screen bg-transparent text-white selection:bg-blue-500/30 selection:text-blue-200">
       <DashboardClient slugs={slugs} />
    </main>
  );
}
