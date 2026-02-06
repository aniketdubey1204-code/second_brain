import React from 'react';
import Link from 'next/link';
import { getDocSlugs } from '@/lib/docs';
import { Lightbulb, ChevronRight } from 'lucide-react';

export default function ConceptsPage() {
  const slugs = getDocSlugs().filter(s => s.startsWith('concepts/'));

  return (
    <div className="max-w-4xl mx-auto py-8 lg:py-12 px-4 lg:px-6">
      <div className="mb-8 lg:mb-10">
        <h1 className="text-3xl lg:text-4xl font-bold tracking-tight mb-2 text-white">Concepts</h1>
        <p className="text-[#8A8A8A] text-base lg:text-lg">Exploring the deeper architecture of our ideas.</p>
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
                  <Lightbulb size={20} className="lg:w-[22px] lg:h-[22px]" />
                </div>
                <div>
                  <h3 className="font-semibold text-[#EDEDED] text-base lg:text-lg group-hover:text-white transition-colors">
                    {slug.replace('concepts/', '')}
                  </h3>
                </div>
              </div>
              <ChevronRight size={18} className="text-[#333] group-hover:text-white group-hover:translate-x-1 transition-all lg:w-[20px] lg:h-[20px]" />
            </Link>
          ))
        ) : (
          <div className="py-16 text-center border-2 border-dashed border-[#1F1F1F] rounded-2xl">
            <p className="text-[#5E5E5E]">No concepts explored yet.</p>
          </div>
        )}
      </div>
    </div>
  );
}
