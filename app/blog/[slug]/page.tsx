import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { getBlogBySlug, getBlogs, getProducts } from '@/lib/data';
import { ProductCard } from '@/components/ProductCard';
import { Calendar, Clock, ArrowLeft, Share2, Award, ShieldCheck } from 'lucide-react';

interface BlogPageProps {
  params: { slug: string };
}

export async function generateStaticParams() {
  const blogs = getBlogs();
  return blogs.map((b) => ({ slug: b.slug }));
}

export async function generateMetadata({ params }: BlogPageProps): Promise<Metadata> {
  const blog = getBlogBySlug(params.slug);
  if (!blog) return { title: 'Post Not Found | MFA Sports Mahe' };

  return {
    title: `${blog.title} | MFA Sports Mahe`,
    description: blog.excerpt,
    openGraph: {
      title: blog.title,
      description: blog.excerpt,
      images: [{ url: blog.coverImage, alt: blog.title }],
    },
  };
}

export default function BlogDetailPage({ params }: BlogPageProps) {
  const blog = getBlogBySlug(params.slug);
  if (!blog) notFound();

  const products = getProducts().slice(0, 4);

  return (
    <div className="min-h-screen bg-pitch-black pb-24">
      {/* Breadcrumb Navigation */}
      <div className="bg-pitch-surface/60 border-b border-pitch-border py-2 px-4 text-xs font-mono text-slate-400">
        <div className="max-w-4xl mx-auto flex items-center gap-2">
          <Link href="/" className="hover:text-volt">Home</Link>
          <span>/</span>
          <Link href="/blogs" className="hover:text-volt">Blogs</Link>
          <span>/</span>
          <span className="text-slate-200 truncate">{blog.title}</span>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 pt-8 sm:pt-12">
        <Link
          href="/blogs"
          className="inline-flex items-center gap-2 text-xs font-mono text-volt hover:underline uppercase mb-6"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to All Blogs</span>
        </Link>

        {/* Title & Metadata */}
        <div className="space-y-4 mb-8">
          <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-slate-400">
            <span className="flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-volt" />
              {blog.date}
            </span>
            <span className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-gold" />
              {blog.readTime}
            </span>
            <span>By {blog.author}</span>
          </div>

          <h1 className="text-2xl sm:text-4xl lg:text-5xl font-display font-black uppercase text-white tracking-tight leading-tight">
            {blog.title}
          </h1>

          <div className="flex flex-wrap gap-2 pt-1">
            {blog.tags.map((tag) => (
              <span
                key={tag}
                className="text-xs uppercase font-mono px-2.5 py-1 rounded-xs bg-pitch-surface text-slate-300 border border-pitch-border"
              >
                #{tag}
              </span>
            ))}
          </div>
        </div>

        {/* Hero Featured Image */}
        <div className="relative h-72 sm:h-96 md:h-[460px] w-full rounded-lg overflow-hidden border border-pitch-border mb-10 shadow-pitch-card">
          <Image
            src={blog.coverImage}
            alt={blog.title}
            fill
            priority
            className="object-cover object-center"
          />
        </div>

        {/* Article Body */}
        <div className="prose prose-invert max-w-none space-y-6 text-sm sm:text-base text-slate-200 leading-relaxed font-body bg-pitch-card/40 p-6 sm:p-10 rounded-lg border border-pitch-border/80">
          {blog.content.map((p, i) => (
            <p key={i} className="text-slate-300 leading-loose">
              {p}
            </p>
          ))}
        </div>

        {/* Community & Tournament Proof Strip */}
        <div className="mt-12 p-6 rounded-lg bg-pitch-card border border-pitch-border grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="flex items-center gap-3">
            <Award className="w-6 h-6 text-volt shrink-0" />
            <div>
              <h4 className="text-xs font-display font-bold uppercase text-white tracking-wider">
                Official Kit Launches
              </h4>
              <p className="text-xs text-slate-400">
                Endorsed by professional Indian footballers and tournament squads.
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <ShieldCheck className="w-6 h-6 text-gold shrink-0" />
            <div>
              <h4 className="text-xs font-display font-bold uppercase text-white tracking-wider">
                30,000+ Happy Fans
              </h4>
              <p className="text-xs text-slate-400">
                Direct apparel sourcing from Mahe Sports Ground, Kerala.
              </p>
            </div>
          </div>
        </div>

        {/* Featured Kits */}
        <div className="mt-16 pt-10 border-t border-pitch-border">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl sm:text-2xl font-display font-black uppercase text-white">
              Trending Jerseys
            </h3>
            <Link
              href="/c/player-version"
              className="text-xs font-mono font-bold text-volt hover:underline uppercase"
            >
              View Collection &rarr;
            </Link>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {products.map((p) => (
              <ProductCard key={p.slug} product={p} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
