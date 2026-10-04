import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Shield, ArrowRight, Sparkles } from 'lucide-react';
import { Club } from '@/lib/types';

interface ClubCollectionsProps {
  clubs: Club[];
}

export function ClubCollections({ clubs }: ClubCollectionsProps) {
  // Use all clubs from data/clubs.json or fallback list
  const displayClubs = clubs && clubs.length > 0
    ? clubs
    : [
        { name: 'Real Madrid', slug: 'real-madrid', logo: '/img/clubs/real-madrid.webp', badge: 'La Liga', productCount: 12 },
        { name: 'Barcelona', slug: 'barcelona', logo: '/img/clubs/barcelona.webp', badge: 'Blaugrana', productCount: 15 },
        { name: 'Arsenal', slug: 'arsenal', logo: '/img/clubs/arsenal.webp', badge: 'Gunners', productCount: 10 },
        { name: 'Manchester United', slug: 'manchester-united', logo: '/img/clubs/manchester-united.webp', badge: 'Red Devils', productCount: 14 },
        { name: 'Manchester City', slug: 'manchester-city', logo: '/img/clubs/manchester-city.webp', badge: 'Citizens', productCount: 11 },
        { name: 'Chelsea', slug: 'chelsea', logo: '/img/clubs/chelsea.webp', badge: 'The Blues', productCount: 9 },
        { name: 'Liverpool', slug: 'liverpool', logo: '/img/clubs/liverpool.webp', badge: 'The Reds', productCount: 12 },
        { name: 'AC Milan', slug: 'ac-milan', logo: '/img/clubs/ac-milan.webp', badge: 'Rossoneri', productCount: 8 },
        { name: 'Al Nassr', slug: 'al-nassr', logo: '/img/clubs/al-nassr.webp', badge: 'Saudi Pro', productCount: 7 },
        { name: 'Al Hilal', slug: 'al-hilal', logo: '/img/clubs/al-hilal.webp', badge: 'Blue Waves', productCount: 6 },
        { name: 'Argentina', slug: 'argentina', logo: '/img/clubs/argentina.webp', badge: 'Champions', productCount: 16 },
        { name: 'Inter Miami', slug: 'inter-miami', logo: '/img/clubs/inter-miami.webp', badge: 'Herons', productCount: 8 },
      ];

  return (
    <section className="py-12 sm:py-16 bg-pitch-dark/70 border-b border-pitch-border">
      <div className="max-w-7xl mx-auto px-4">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8 sm:mb-10">
          <div>
            <div className="inline-flex items-center gap-1.5 text-volt text-xs font-display uppercase tracking-widest font-black mb-1.5">
              <Shield className="w-4 h-4 text-volt" />
              <span>Official Crests & Allegiances</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-display font-black uppercase tracking-tight text-white">
              Club <span className="text-volt">Collections</span>
            </h2>
            <p className="text-slate-400 text-xs sm:text-sm mt-1">
              Select your football club or national side to explore official matchday kits and retro editions.
            </p>
          </div>

          <Link
            href="/c/player-version"
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-display font-bold uppercase tracking-wider text-slate-300 hover:text-volt transition-colors"
          >
            <span>Browse All Collections</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Club Grid with Real Logos */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 sm:gap-4">
          {displayClubs.map((club) => {
            const logoPath = club.logo || `/img/clubs/${club.slug}.webp`;

            return (
              <Link
                key={club.name}
                href={`/c/player-version?club=${encodeURIComponent(club.name)}`}
                className="group p-4 rounded-lg bg-pitch-card border border-pitch-border hover:border-volt transition-all duration-300 flex flex-col items-center text-center justify-between hover:shadow-volt-glow relative overflow-hidden"
              >
                {/* Subtle Pitch Glow on Card Hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-volt/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />

                {/* Club Crest Logo Container */}
                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-pitch-surface/90 border border-pitch-border group-hover:border-volt/80 p-2.5 flex items-center justify-center mb-3 shadow-md group-hover:scale-110 transition-transform duration-300 relative">
                  <Image
                    src={logoPath}
                    alt={`${club.name} Crest Logo`}
                    width={64}
                    height={64}
                    className="max-h-full max-w-full object-contain filter group-hover:brightness-110 drop-shadow"
                  />
                </div>

                {/* Club Details */}
                <div className="w-full">
                  <h3 className="text-xs sm:text-sm font-display font-black uppercase text-white group-hover:text-volt transition-colors leading-tight truncate">
                    {club.name}
                  </h3>
                  <div className="flex items-center justify-center gap-1 mt-1">
                    <span className="text-[10px] font-mono font-bold uppercase text-slate-400 group-hover:text-slate-200">
                      {club.badge || 'Official Kits'}
                    </span>
                  </div>
                </div>

                {/* Micro Action */}
                <div className="mt-3 pt-2 border-t border-pitch-border/60 w-full flex items-center justify-center text-[10px] font-mono uppercase text-volt opacity-80 group-hover:opacity-100">
                  <span className="group-hover:underline">Shop Kits &rarr;</span>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
