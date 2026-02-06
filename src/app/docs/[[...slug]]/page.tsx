import React from 'react';
import { getDocBySlug } from '@/lib/docs';
import ReactMarkdown from 'react-markdown';
import Link from 'next/link';
import { ChevronLeft } from 'lucide-react';

type Params = Promise<{ slug: string[] }>;

export default async function DocPage(props: { params: Params }) {
  const { slug: slugArray = [] } = await props.params;
  const slug = slugArray.join('/');
  
  if (!slug) {
    return (
      <div className="max-w-3xl mx-auto py-12 px-6">
        <h1 className="text-2xl font-bold">No document selected</h1>
        <Link href="/" className="text-blue-400 hover:underline">Back to docs</Link>
      </div>
    );
  }

  try {
    const doc = getDocBySlug(slug);

    return (
      <div className="max-w-4xl mx-auto py-12 px-6">
        <Link href="/" className="flex items-center gap-2 text-sm text-[#8A8A8A] hover:text-white mb-8 transition-colors group">
          <ChevronLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
          Back to Documents
        </Link>

        <article className="prose prose-invert prose-blue max-w-none bg-[#0D0D0D] p-8 rounded-xl border border-[#1F1F1F]">
          <ReactMarkdown>{doc.content}</ReactMarkdown>
        </article>

        <div className="mt-20 pt-8 border-t border-[#1F1F1F] text-[#5E5E5E] text-xs flex justify-between">
          <span>Path: {slug}.md</span>
          <span>Last updated: {new Date().toLocaleDateString()}</span>
        </div>
      </div>
    );
  } catch (error: any) {
    return (
      <div className="max-w-3xl mx-auto py-24 px-6 text-center">
        <div className="inline-flex p-4 rounded-full bg-red-500/10 text-red-400 mb-6">
          <span className="text-4xl">⚠️</span>
        </div>
        <h1 className="text-2xl font-bold mb-4">Error Loading Document</h1>
        <p className="text-[#8A8A8A] mb-8">{error.message}</p>
        <Link href="/" className="px-6 py-3 bg-white text-black rounded-md font-medium hover:bg-zinc-200 transition-colors">
          Go Back Home
        </Link>
      </div>
    );
  }
}
