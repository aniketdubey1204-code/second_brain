import React from 'react';
import Link from 'next/link';
import { getDocSlugs } from '@/lib/docs';
import { Calendar, ChevronRight } from 'lucide-react';

export default function JournalPage() {
  const slugs = getDocSlugs().filter(s => s.startsWith('daily/'));

  return (
    <div className="max-w-4xl mx-auto py-12 px-6">
      <div className="mb-10">
        <h1 className="text-3xl font-bold tracking-tight mb-2">Journal</h1>
        <p className="text-[#8A8A8A]">A daily record of our discussions and progress.</p>
      </div>

      <div className="grid gap-2">
        {slugs.map((slug) => (
          <Link
            key={slug}
            href={`/docs/${slug}`}
            className="group flex items-center justify-between p-4 bg-[#0D0D0D] border border-[#1F1F1F] rounded-lg hover:border-[#333] transition-all"
          >
            <div className="flex items-center gap-4">
              <div className="bg-[#1F1F1F] p-2 rounded text-[#8A8A8A] group-hover:text-blue-400 transition-colors">
                <Calendar size={20} />
              </div>
              <div>
                <h3 className="font-medium text-[#EDEDED]">{slug.replace('daily/', '')}</h3>
              </div>
            </div>
            <ChevronRight size={18} className="text-[#333] group-hover:text-[#8A8A8A] transition-colors" />
          </Link>
        ))}
      </div>
    </div>
  );
}
