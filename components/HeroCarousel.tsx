'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ChevronLeft, ChevronRight, Zap, ArrowRight, ShieldCheck, Flame } from 'lucide-react';
import { Product } from '@/lib/types';
import { openLoginModal } from './LoginModal';

interface HeroCarouselProps {
  topDeal?: Product | null;
}

const SLIDES = [
  {
    id: 1,
    title: 'OFFICIAL MATCHDAY APPAREL',
    subtitle: 'KERALA’S PREMIER JERSEY STORE',
    description: 'Sublimation kits, player edition jerseys & vintage retros. Direct from Mahe with Free All-India Shipping above ₹399.',
    image: '/img/banners/hero-banner-1.webp',
    ctaText: 'Shop New Drops',
    ctaLink: '/c/player-version',
    badge: '131K+ ON INSTAGRAM',
    accent: 'volt',
  },
  {
    id: 2,
    title: 'DEAL OF THE DAY — ₹199 ONLY',
    subtitle: 'LIMITED STOCK DROPS',
    description: 'Authentic club and fan jerseys starting at just ₹199 (MRP ₹499). Up to 60% off while stocks last.',
    image: '/img/banners/hero-banner-2.webp',
    ctaText: 'Claim ₹199 Deals',
    ctaLink: '/c/offer-jersey',
    badge: 'STEAL DEALS',
    accent: 'gold',
  },
  {
    id: 3,
    title: 'CUSTOM TEAM KITS & TOURNAMENTS',
    subtitle: 'WORN BY PROS & LOCAL HEROES',
    description: 'Official kit launcher by Kerala Blasters hero C.K. Vineeth at Mahe Ground. Custom college & club bulk orders.',
    image: '/img/blogs/blog-football.webp',
    ctaText: 'Enquire Custom Kits',
    ctaLink: '/#custom-jerseys',
    badge: 'VERIFIED BRAND',
    accent: 'volt',
  },
];

export function HeroCarousel({ topDeal }: HeroCarouselProps) {
  const [current, setCurrent] = useState(0);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [isPaused, setIsPaused] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Auto-play every 5 seconds
  useEffect(() => {
    if (isPaused) return;
    timerRef.current = setInterval(() => {
      setCurrent((prev) => (prev + 1) % SLIDES.length);
    }, 5000);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPaused]);

  const handlePrev = () => {
    setCurrent((prev) => (prev - 1 + SLIDES.length) % SLIDES.length);
  };

  const handleNext = () => {
    setCurrent((prev) => (prev + 1) % SLIDES.length);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStart === null) return;
    const touchEnd = e.changedTouches[0].clientX;
    const diff = touchStart - touchEnd;
    if (diff > 50) handleNext();
    if (diff < -50) handlePrev();
    setTouchStart(null);
  };

  return (
    <div
      className="relative w-full overflow-hidden bg-pitch-black border-b border-pitch-border select-none"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* Slides Container */}
      <div
        className="flex transition-transform duration-700 ease-out"
        style={{ transform: `translateX(-${current * 100}%)` }}
      >
        {SLIDES.map((slide, index) => (
          <div key={slide.id} className="w-full shrink-0 relative min-h-[460px] sm:min-h-[520px] lg:min-h-[580px] flex items-center">
            {/* Background Banner Image */}
            <div className="absolute inset-0">
              <Image
                src={slide.image}
                alt={slide.title}
                fill
                priority={index === 0}
                className="object-cover object-center opacity-40 brightness-90 filter"
              />
              {/* Dynamic Gradient Mask for Stadium Aesthetics */}
              <div className="absolute inset-0 bg-gradient-to-r from-pitch-black via-pitch-black/85 to-transparent sm:w-3/4" />
              <div className="absolute inset-0 bg-gradient-to-t from-pitch-black via-transparent to-pitch-black/60" />
            </div>

            {/* Slide Content */}
            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 w-full">
              <div className="max-w-2xl space-y-4 sm:space-y-5">
                {/* Badge */}
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-pitch-surface/90 border border-pitch-border backdrop-blur-sm">
                  {slide.accent === 'gold' ? (
                    <Flame className="w-3.5 h-3.5 text-gold animate-bounce" />
                  ) : (
                    <Zap className="w-3.5 h-3.5 text-volt animate-pulse" />
                  )}
                  <span className="text-[11px] font-mono font-bold tracking-wider text-slate-200 uppercase">
                    {slide.badge}
                  </span>
                </div>

                {/* Subtitle */}
                <p className="text-xs sm:text-sm font-display font-bold tracking-widest text-volt uppercase">
                  {slide.subtitle}
                </p>

                {/* Main Heading */}
                <h2 className="text-3xl sm:text-5xl lg:text-6xl font-display font-black uppercase text-white tracking-tight leading-[0.95]">
                  {slide.title}
                </h2>

                {/* Description */}
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-lg">
                  {slide.description}
                </p>

                {/* CTAs */}
                <div className="flex flex-wrap items-center gap-3 pt-2">
                  <Link
                    href={slide.ctaLink}
                    className="py-3 px-6 rounded-xs bg-volt hover:bg-volt-hover text-pitch-black font-display font-black text-sm uppercase tracking-wider flex items-center gap-2 transition-all transform hover:scale-105 shadow-volt-glow"
                  >
                    <span>{slide.ctaText}</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>

                  <button
                    onClick={openLoginModal}
                    className="py-3 px-5 rounded-xs bg-pitch-surface hover:bg-pitch-card border border-pitch-border hover:border-volt text-white font-display font-bold text-sm uppercase tracking-wider transition-colors"
                  >
                    Account Portal
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Slide Navigation Arrows */}
      <button
        onClick={handlePrev}
        className="hidden sm:flex absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-pitch-card/80 hover:bg-pitch-surface border border-pitch-border text-white items-center justify-center transition-colors shadow-lg hover:border-volt"
        aria-label="Previous Slide"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>

      <button
        onClick={handleNext}
        className="hidden sm:flex absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-pitch-card/80 hover:bg-pitch-surface border border-pitch-border text-white items-center justify-center transition-colors shadow-lg hover:border-volt"
        aria-label="Next Slide"
      >
        <ChevronRight className="w-5 h-5" />
      </button>

      {/* Carousel Indicator Dots */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 z-10">
        {SLIDES.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`transition-all duration-300 rounded-full ${
              current === i
                ? 'w-8 h-2 bg-volt shadow-volt-glow'
                : 'w-2 h-2 bg-slate-600 hover:bg-slate-400'
            }`}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
