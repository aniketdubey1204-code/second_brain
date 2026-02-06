import React from 'react';
import { getDocSlugs } from '@/lib/docs';
import DashboardClient from '@/components/DashboardClient';

export default async function Home() {
  const slugs = getDocSlugs();

  return (
    <main className="min-h-screen bg-[#050505] text-white selection:bg-blue-500/30 selection:text-blue-200">
       <DashboardClient slugs={slugs} />
    </main>
  );
}
