import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import type { Metadata } from 'next';
import { getBlogs } from '@/lib/data';
import { Clock, Calendar, ArrowRight, BookOpen } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Latest Blogs & Matchday News | MFA Sports Mahe',
  description:
    'Read stories from Mahe Ground, local tournament kit launches, customer reviews, and football culture from MFA Sports Mahe.',
};

export default function BlogsPage() {
  const blogs = getBlogs();

  return (
    <div className="min-h-screen bg-pitch-black pb-24">
      {/* Hero Banner */}
      <div className="bg-gradient-to-b from-pitch-surface to-pitch-black border-b border-pitch-border py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-pitch-card border border-pitch-border text-volt text-xs font-mono font-bold uppercase mb-4">
            <BookOpen className="w-3.5 h-3.5" />
            <span>Official Journal & Matchday Stories</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-display font-black uppercase text-white tracking-tight">
            Latest Blogs & News
          </h1>
          <p className="text-slate-400 text-sm sm:text-base mt-2 max-w-2xl">
            Promoting grassroots football in Kerala, powering tournament champions, and delivering kits to 30,000+ passionate supporters.
          </p>
        </div>
      </div>

      {/* Blog Cards Grid */}
      <div className="max-w-7xl mx-auto px-4 pt-10 sm:pt-14">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
          {blogs.map((post) => (
            <article
              key={post.slug}
              className="group bg-pitch-card border border-pitch-border hover:border-volt rounded-lg overflow-hidden flex flex-col transition-all duration-300 hover:shadow-volt-glow"
            >
              {/* Cover Image */}
              <Link href={`/blog/${post.slug}`} className="relative h-64 sm:h-72 w-full overflow-hidden bg-pitch-surface">
                <Image
                  src={post.coverImage}
                  alt={post.title}
                  fill
                  className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-pitch-card via-transparent to-transparent opacity-80" />
              </Link>

              {/* Content */}
              <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center gap-4 text-xs font-mono text-slate-400">
                    <span className="flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-volt" />
                      {post.date}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-gold" />
                      {post.readTime}
                    </span>
                  </div>

                  <h2 className="text-xl sm:text-2xl font-display font-black uppercase text-white group-hover:text-volt transition-colors leading-tight">
                    <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                  </h2>

                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed line-clamp-3">
                    {post.excerpt}
                  </p>
                </div>

                <div className="pt-4 border-t border-pitch-border flex items-center justify-between">
                  <div className="flex flex-wrap gap-1.5">
                    {post.tags.slice(0, 2).map((tag) => (
                      <span
                        key={tag}
                        className="text-[10px] uppercase font-mono px-2 py-0.5 rounded-xs bg-pitch-surface text-slate-300 border border-pitch-border"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <Link
                    href={`/blog/${post.slug}`}
                    className="inline-flex items-center gap-1.5 text-xs font-display font-bold uppercase text-volt hover:underline"
                  >
                    <span>Read Article</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
