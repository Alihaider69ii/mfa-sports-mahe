import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { getBlogs } from '@/lib/data';
import { ArrowRight, BookOpen, Calendar, Clock } from 'lucide-react';

export function BlogHighlights() {
  const blogs = getBlogs().slice(0, 2);

  if (blogs.length === 0) return null;

  return (
    <section className="py-12 sm:py-16 bg-pitch-dark border-t border-pitch-border">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-2 text-volt text-xs font-mono font-bold uppercase mb-2">
              <BookOpen className="w-3.5 h-3.5" />
              <span>Official Journal</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-display font-black uppercase text-white tracking-tight">
              Matchday Stories & News
            </h2>
            <p className="text-slate-400 text-xs sm:text-sm mt-1">
              Kerala football culture, tournament kit launches, and fan stories from Mahe.
            </p>
          </div>

          <Link
            href="/blogs"
            className="inline-flex items-center gap-2 text-xs font-display font-bold uppercase tracking-wider text-volt hover:underline"
          >
            <span>View All Stories</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {blogs.map((post) => (
            <article
              key={post.slug}
              className="group bg-pitch-card border border-pitch-border hover:border-volt rounded-lg overflow-hidden flex flex-col sm:flex-row transition-all duration-300"
            >
              <Link
                href={`/blog/${post.slug}`}
                className="relative h-48 sm:h-auto sm:w-48 lg:w-56 shrink-0 overflow-hidden bg-pitch-surface"
              >
                <Image
                  src={post.coverImage}
                  alt={post.title}
                  fill
                  className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
                />
              </Link>

              <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between space-y-3">
                <div className="space-y-2">
                  <div className="flex items-center gap-3 text-[11px] font-mono text-slate-400">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3 text-volt" />
                      {post.date}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3 text-gold" />
                      {post.readTime}
                    </span>
                  </div>

                  <h3 className="text-base sm:text-lg font-display font-black uppercase text-white group-hover:text-volt transition-colors line-clamp-2 leading-tight">
                    <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                  </h3>

                  <p className="text-xs text-slate-300 line-clamp-2 leading-relaxed">
                    {post.excerpt}
                  </p>
                </div>

                <Link
                  href={`/blog/${post.slug}`}
                  className="inline-flex items-center gap-1 text-xs font-display font-bold uppercase text-volt hover:underline"
                >
                  <span>Read Story</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
