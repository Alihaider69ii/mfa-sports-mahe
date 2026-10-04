'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

const FEATURED_STORIES = [
  {
    name: 'Player Version',
    slug: 'player-version',
    image: '/img/banners/cat-player.webp',
    tag: 'Elite Fit',
  },
  {
    name: 'Retro Classics',
    slug: 'retro-jersey',
    image: '/img/banners/cat-retro.webp',
    tag: 'Vintage',
  },
  {
    name: 'Embroidery',
    slug: 'embroidery-jersey',
    image: '/img/banners/cat-embroidery.webp',
    tag: 'Heavy Crest',
  },
  {
    name: '5-Sleeves',
    slug: '5-sleeves',
    image: '/img/banners/cat-5sleeves.webp',
    tag: 'Oversized',
  },
  {
    name: 'Imported Kits',
    slug: 'imported-kits',
    image: '/img/banners/cat-imported.webp',
    tag: 'Full Set',
  },
  {
    name: 'World Cup',
    slug: 'world-cup',
    image: '/img/banners/cat-worldcup.webp',
    tag: 'National',
  },
];

export function VisualCategoryStories() {
  return (
    <div className="bg-pitch-dark/80 border-b border-pitch-border py-4 sm:py-6 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-volt animate-ping" />
            <h3 className="text-xs font-display font-bold uppercase tracking-widest text-slate-300">
              Featured Collections & Drops
            </h3>
          </div>
          <Link
            href="/c/player-version"
            className="text-[11px] font-mono font-bold text-volt hover:underline uppercase tracking-wider"
          >
            Explore All 16 &rarr;
          </Link>
        </div>

        {/* Horizontal Scroll Story Circles */}
        <div className="flex items-center gap-4 sm:gap-6 overflow-x-auto no-scrollbar py-2">
          {FEATURED_STORIES.map((story) => (
            <Link
              key={story.slug}
              href={`/c/${story.slug}`}
              className="group flex flex-col items-center shrink-0 text-center focus:outline-none"
            >
              <div className="relative p-0.5 rounded-full bg-gradient-to-tr from-volt via-gold to-emerald-500 group-hover:scale-105 transition-transform duration-300 shadow-lg">
                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full overflow-hidden bg-pitch-black p-0.5 relative">
                  <Image
                    src={story.image}
                    alt={story.name}
                    width={80}
                    height={80}
                    className="w-full h-full object-cover rounded-full group-hover:brightness-110 transition-all"
                  />
                </div>
                <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 px-1.5 py-0.5 bg-pitch-black border border-volt text-[9px] font-display font-black uppercase text-volt rounded-xs whitespace-nowrap">
                  {story.tag}
                </span>
              </div>
              <span className="text-[11px] sm:text-xs font-display font-bold uppercase text-slate-300 group-hover:text-volt transition-colors mt-2.5 max-w-[76px] sm:max-w-[90px] truncate">
                {story.name}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
