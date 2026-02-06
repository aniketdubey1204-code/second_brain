import React from 'react';
import Link from 'next/link';
import { getDocSlugs } from '@/lib/docs';
import { FileText, ChevronRight, Clock } from 'lucide-react';

export default async function Home() {
  const slugs = getDocSlugs();

  return (
    <div className="max-w-4xl mx-auto py-8 lg:py-12 px-4 lg:px-6">
      <div className="mb-8 lg:mb-12">
        <h1 className="text-3xl lg:text-4xl font-bold tracking-tight mb-2 lg:mb-3 text-white">Knowledge Hub</h1>
        <p className="text-[#8A8A8A] text-base lg:text-lg">A unified view of Aniket's 2nd Brain.</p>
      </div>

      <div className="grid gap-2 lg:gap-3">
        {slugs.length > 0 ? (
          slugs.map((slug) => (
            <Link
              key={slug}
              href={`/docs/${slug}`}
              className="group flex items-center justify-between p-4 lg:p-5 bg-[#0D0D0D] border border-[#1F1F1F] rounded-xl hover:border-blue-500/50 hover:bg-[#111] transition-all"
            >
              <div className="flex items-center gap-4 lg:gap-5">
                <div className="bg-[#1F1F1F] p-2.5 lg:p-3 rounded-lg text-[#8A8A8A] group-hover:text-blue-400 group-hover:bg-blue-400/10 transition-all">
                  <FileText size={20} className="lg:w-[22px] lg:h-[22px]" />
                </div>
                <div>
                  <h3 className="font-semibold text-[#EDEDED] text-base lg:text-lg group-hover:text-white transition-colors">
                    {slug.split('/').pop()}
                  </h3>
                  <div className="flex items-center gap-2 lg:gap-3 mt-0.5 lg:mt-1">
                    <span className="text-[10px] lg:text-xs font-medium px-1.5 lg:px-2 py-0.5 rounded bg-[#1F1F1F] text-[#8A8A8A] uppercase tracking-wider">
                      {slug.includes('/') ? slug.split('/')[0] : 'General'}
                    </span>
                    <span className="flex items-center gap-1 text-[10px] lg:text-xs text-[#5E5E5E]">
                      <Clock size={10} className="lg:w-[12px] lg:h-[12px]" />
                      Updated just now
                    </span>
                  </div>
                </div>
              </div>
              <ChevronRight size={18} className="text-[#333] group-hover:text-white group-hover:translate-x-1 transition-all lg:w-[20px] lg:h-[20px]" />
            </Link>
          ))
        ) : (
          <div className="py-16 lg:py-20 text-center border-2 border-dashed border-[#1F1F1F] rounded-2xl">
            <p className="text-[#5E5E5E]">No documents found in brain-docs folder.</p>
          </div>
        )}
      </div>
    </div>
  );
}
