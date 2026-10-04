import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Flame, ArrowRight, Sparkles, ExternalLink } from 'lucide-react';
import { Product } from '@/lib/types';
import { SITE_CONFIG } from '@/config';

interface HeroProps {
  topDeal?: Product | null;
}

export function Hero({ topDeal }: HeroProps) {
  // Optimized responsive image for fastest mobile LCP
  const heroImg = topDeal?.images?.[0]?.w640 || topDeal?.images?.[0]?.w360 || '/img/logo.png';
  const dealPrice = topDeal?.price || 199;
  const discount = topDeal?.discountPercent || 60;

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-pitch-black via-pitch-dark to-pitch-surface border-b border-pitch-border sublimation-grid">
      {/* Stadium Floodlight Radial Accents */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[300px] bg-volt/10 blur-[130px] rounded-full pointer-events-none" />
      <div className="absolute top-1/2 right-10 w-[400px] h-[300px] bg-gold/10 blur-[140px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 pt-8 pb-12 sm:pt-12 sm:pb-16 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Text & Call To Action */}
          <div className="lg:col-span-7 space-y-5 text-center lg:text-left">
            {/* Kerala Matchday Tag */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-pitch-surface border border-pitch-borderLight shadow-sm">
              <span className="w-2 h-2 rounded-full bg-volt animate-ping" />
              <span className="text-xs font-display uppercase tracking-widest font-bold text-volt">
                Kerala&apos;s Matchday Hub · Mahe
              </span>
              <span className="text-[10px] text-slate-400 font-medium">| {SITE_CONFIG.customerCountClaim}</span>
            </div>

            {/* Giant Athletic Typography */}
            <h1 className="text-4xl xs:text-5xl sm:text-6xl lg:text-7xl font-display font-black uppercase tracking-tight text-white leading-[0.95]">
              Real Jersey <br />
              <span className="text-volt">Matchday Energy</span>
            </h1>

            <p className="text-sm sm:text-base text-slate-300 max-w-xl mx-auto lg:mx-0 leading-relaxed">
              From Player Edition retros and full sublimation club jerseys to custom team sets made in Mahe. Direct factory rates starting at just{' '}
              <strong className="text-white font-bold">₹{dealPrice}</strong> with free pan-India shipping above ₹{SITE_CONFIG.freeDeliveryThreshold}.
            </p>

            {/* Offer highlight pill */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 pt-1">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-sm bg-pitch-card border border-pitch-border text-xs">
                <Flame className="w-4 h-4 text-gold" />
                <span className="text-slate-300">
                  Deal of the Day starting <strong className="text-volt font-bold">₹{dealPrice}</strong>
                </span>
                <span className="text-[10px] bg-badgeRed text-white font-extrabold px-1.5 py-0.5 rounded-xs">
                  {discount}% OFF
                </span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col xs:flex-row items-center justify-center lg:justify-start gap-3 pt-2">
              <Link
                href="/#deals"
                className="w-full xs:w-auto px-7 py-3.5 rounded-xs bg-volt hover:bg-volt-hover text-pitch-black font-display font-black text-sm uppercase tracking-wider flex items-center justify-center gap-2 transition-all transform hover:scale-[1.02] shadow-volt-glow"
              >
                <span>Shop ₹{dealPrice} Deals</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <Link
                href="/#custom-jerseys"
                className="w-full xs:w-auto px-6 py-3.5 rounded-xs bg-pitch-surface hover:bg-pitch-card border border-pitch-borderLight text-white font-display font-bold text-sm uppercase tracking-wider flex items-center justify-center gap-2 transition-all"
              >
                <Sparkles className="w-4 h-4 text-volt" />
                <span>Customize Team Jersey</span>
              </Link>
            </div>
          </div>

          {/* Right Featured Jersey Showcase Card */}
          <div className="lg:col-span-5 flex justify-center">
            {topDeal ? (
              <div className="relative w-full max-w-sm bg-pitch-card border-2 border-pitch-border rounded p-4 shadow-2xl group">
                <div className="absolute -top-3 -right-3 z-20 jersey-badge-slant bg-badgeRed text-white text-xs font-display font-black uppercase px-3 py-1 tracking-wider shadow-lg">
                  <span className="jersey-badge-unskew inline-block">{topDeal.discountPercent}% OFF OFFER</span>
                </div>

                <div className="relative aspect-square rounded overflow-hidden bg-pitch-dark mb-4">
                  <Image
                    src={heroImg}
                    alt={topDeal.name}
                    fill
                    priority
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 640px) 90vw, 400px"
                  />
                  <div className="absolute bottom-2 left-2 px-2 py-0.5 rounded bg-pitch-black/85 text-[10px] font-display uppercase tracking-widest text-slate-300">
                    {topDeal.category}
                  </div>
                </div>

                <div className="space-y-2">
                  <h3 className="text-sm font-bold text-white uppercase line-clamp-1">
                    {topDeal.name}
                  </h3>
                  <div className="flex items-baseline justify-between">
                    <div className="flex items-baseline gap-2">
                      <span className="kit-num text-3xl font-extrabold text-volt">
                        ₹{topDeal.price}
                      </span>
                      {topDeal.mrp > topDeal.price && (
                        <span className="text-sm text-slate-500 line-through">
                          ₹{topDeal.mrp}
                        </span>
                      )}
                    </div>
                    <span className="text-xs text-gold font-display uppercase font-bold">
                      Limited Deal
                    </span>
                  </div>

                  <a
                    href={topDeal.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full mt-2 py-2.5 px-4 rounded-xs bg-volt hover:bg-volt-hover text-pitch-black font-display font-black text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 transition-all"
                  >
                    <span>Claim on Live Store</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            ) : (
              <div className="relative w-full max-w-sm aspect-square bg-pitch-card border border-pitch-border rounded flex items-center justify-center p-8">
                <Image
                  src="/img/logo.png"
                  alt="MFA Sports Mahe"
                  width={250}
                  height={100}
                  priority
                  className="object-contain"
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
