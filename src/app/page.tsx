import React from 'react';
import Link from 'next/link';
import { getDocSlugs } from '@/lib/docs';
import { FileText, ChevronRight, Clock } from 'lucide-react';

export default async function Home() {
  const slugs = getDocSlugs();

  return (
    <div className="max-w-4xl mx-auto py-12 px-6">
      <div className="mb-12">
        <h1 className="text-4xl font-bold tracking-tight mb-3 text-white">Knowledge Hub</h1>
        <p className="text-[#8A8A8A] text-lg">A unified view of Aniket's 2nd Brain.</p>
      </div>

      <div className="grid gap-3">
        {slugs.length > 0 ? (
          slugs.map((slug) => (
            <Link
              key={slug}
              href={`/docs/${slug}`}
              className="group flex items-center justify-between p-5 bg-[#0D0D0D] border border-[#1F1F1F] rounded-xl hover:border-blue-500/50 hover:bg-[#111] transition-all"
            >
              <div className="flex items-center gap-5">
                <div className="bg-[#1F1F1F] p-3 rounded-lg text-[#8A8A8A] group-hover:text-blue-400 group-hover:bg-blue-400/10 transition-all">
                  <FileText size={22} />
                </div>
                <div>
                  <h3 className="font-semibold text-[#EDEDED] text-lg group-hover:text-white transition-colors">
                    {slug.split('/').pop()}
                  </h3>
                  <div className="flex items-center gap-3 mt-1">
                    <span className="text-xs font-medium px-2 py-0.5 rounded bg-[#1F1F1F] text-[#8A8A8A] uppercase tracking-wider">
                      {slug.includes('/') ? slug.split('/')[0] : 'General'}
                    </span>
                    <span className="flex items-center gap-1 text-xs text-[#5E5E5E]">
                      <Clock size={12} />
                      Updated just now
                    </span>
                  </div>
                </div>
              </div>
              <ChevronRight size={20} className="text-[#333] group-hover:text-white group-hover:translate-x-1 transition-all" />
            </Link>
          ))
        ) : (
          <div className="py-20 text-center border-2 border-dashed border-[#1F1F1F] rounded-2xl">
            <p className="text-[#5E5E5E]">No documents found in brain-docs folder.</p>
          </div>
        )}
      </div>
    </div>
  );
}
