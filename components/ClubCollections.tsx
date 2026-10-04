import React from 'react';
import Link from 'next/link';
import { Shield, ArrowRight } from 'lucide-react';
import { Club } from '@/lib/types';

interface ClubCollectionsProps {
  clubs: Club[];
}

export function ClubCollections({ clubs }: ClubCollectionsProps) {
  // Prominent clubs mentioned in prompt & detected on site
  const popularClubs = clubs && clubs.length > 0
    ? clubs.slice(0, 8).map(c => ({ name: c.name, count: `${c.productCount || 'Official'} Kits` }))
    : [
        { name: 'Arsenal', count: 'Gunners' },
        { name: 'AC Milan', count: 'Rossoneri' },
        { name: 'Argentina', count: 'Champions' },
        { name: 'Al Nassr', count: 'Saudi Pro' },
        { name: 'Al Hilal', count: 'Blue Waves' },
        { name: 'Ajax', count: 'Eredivisie' },
        { name: 'AS Roma', count: 'Giallorossi' },
        { name: 'Atletico Madrid', count: 'Colchoneros' },
      ];

  return (
    <section className="py-12 bg-pitch-dark/50 border-b border-pitch-border">
      <div className="max-w-7xl mx-auto px-4">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 mb-8">
          <div>
            <div className="inline-flex items-center gap-1.5 text-volt text-xs font-display uppercase tracking-widest font-black mb-1">
              <Shield className="w-4 h-4 text-volt" />
              <span>Matchday Allegiance</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-display font-black uppercase tracking-tight text-white">
              Club <span className="text-volt">Collections</span>
            </h2>
          </div>

          <Link
            href="/c/player-version"
            className="inline-flex items-center gap-1 text-xs sm:text-sm font-display font-bold uppercase tracking-wider text-slate-300 hover:text-volt transition-colors"
          >
            <span>Browse All Clubs</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Club Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-4 gap-3 sm:gap-4">
          {popularClubs.map((club) => (
            <Link
              key={club.name}
              href={`/c/embroidery-jersey?club=${encodeURIComponent(club.name)}`}
              className="group p-4 rounded bg-pitch-card border border-pitch-border hover:border-volt transition-all duration-200 flex flex-col justify-between"
            >
              <div className="flex items-center justify-between mb-2">
                <Shield className="w-5 h-5 text-volt group-hover:scale-110 transition-transform" />
                <span className="text-[10px] uppercase font-mono font-medium text-slate-400 group-hover:text-volt">
                  {club.count}
                </span>
              </div>
              <div>
                <h3 className="text-base sm:text-lg font-display font-black uppercase text-white group-hover:text-volt transition-colors">
                  {club.name}
                </h3>
                <span className="text-[11px] text-slate-400 flex items-center gap-1 mt-1 group-hover:translate-x-1 transition-transform">
                  View Kits &rarr;
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
