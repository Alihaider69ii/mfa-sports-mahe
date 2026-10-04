'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Phone, Search, Menu, X, ArrowUpRight, Flame } from 'lucide-react';
import { SITE_CONFIG } from '@/config';
import { SearchModal } from './SearchModal';

interface HeaderProps {
  categories?: { name: string; slug: string }[];
}

export function Header({ categories = [] }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  return (
    <>
      {/* Top Announcement Strip */}
      <div className="bg-pitch-dark border-b border-pitch-border text-xs py-1.5 px-3">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-2 overflow-x-auto no-scrollbar text-pitch-borderLight">
          <div className="flex items-center gap-2 shrink-0 font-medium text-slate-300">
            <span className="w-2 h-2 rounded-full bg-volt animate-pulse" />
            <span>Free Delivery All Over India Above ₹{SITE_CONFIG.freeDeliveryThreshold}</span>
          </div>

          <div className="flex items-center gap-4 shrink-0 text-slate-400">
            <a
              href={`tel:${SITE_CONFIG.phone}`}
              className="hidden sm:flex items-center gap-1.5 hover:text-volt transition-colors"
            >
              <Phone className="w-3 h-3 text-volt" />
              <span>{SITE_CONFIG.phoneFormatted}</span>
              <span className="text-[10px] text-slate-500">({SITE_CONFIG.phoneHours})</span>
            </a>
            <a
              href={SITE_CONFIG.instagram.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 hover:text-volt transition-colors text-slate-300"
            >
              <span>{SITE_CONFIG.instagram.followers} on Insta</span>
              <ArrowUpRight className="w-3 h-3" />
            </a>
          </div>
        </div>
      </div>

      {/* Main Sticky Navigation */}
      <header className="sticky top-0 z-40 bg-pitch-black/95 backdrop-blur-md border-b border-pitch-border">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 py-2.5 flex items-center justify-between gap-3">
          {/* Left: Mobile Menu Toggle & Brand Logo */}
          <div className="flex items-center gap-2.5">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-1.5 rounded bg-pitch-surface border border-pitch-border text-slate-200 hover:text-volt hover:border-volt transition-all lg:hidden"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>

            <Link href="/" className="flex items-center gap-2 group">
              <div className="relative w-28 sm:w-36 h-9 sm:h-10 flex items-center">
                <Image
                  src="/img/logo.png"
                  alt="MFA Sports Mahe"
                  width={140}
                  height={40}
                  className="object-contain filter brightness-110 drop-shadow"
                  priority
                />
              </div>
            </Link>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-5 text-sm font-semibold tracking-wide uppercase font-display">
            <Link href="/#deals" className="flex items-center gap-1 text-gold hover:text-volt transition-colors">
              <Flame className="w-4 h-4" />
              <span>Deals ₹199</span>
            </Link>
            <Link href="/c/offer-jersey" className="text-slate-300 hover:text-volt transition-colors">
              Offers
            </Link>
            <Link href="/c/player-version" className="text-slate-300 hover:text-volt transition-colors">
              Player Version
            </Link>
            <Link href="/c/embroidery-jersey" className="text-slate-300 hover:text-volt transition-colors">
              Embroidery
            </Link>
            <Link href="/c/retro-jersey" className="text-slate-300 hover:text-volt transition-colors">
              Retro Kits
            </Link>
            <Link href="/#custom-jerseys" className="text-volt hover:text-volt-hover transition-colors">
              Custom Kits
            </Link>
            <Link href="/#bulk-enquiry" className="text-slate-400 hover:text-white transition-colors">
              Bulk Order
            </Link>
          </nav>

          {/* Right: Search & Actions */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setSearchOpen(true)}
              className="flex items-center gap-2 px-3 py-1.5 rounded bg-pitch-surface border border-pitch-border text-slate-300 hover:text-volt hover:border-volt transition-all text-xs sm:text-sm"
              aria-label="Search jerseys"
            >
              <Search className="w-4 h-4 text-volt" />
              <span className="hidden xs:inline font-medium">Search jerseys...</span>
              <kbd className="hidden sm:inline-block px-1.5 py-0.5 text-[10px] bg-pitch-dark text-slate-400 rounded border border-pitch-border font-mono">
                /
              </kbd>
            </button>

            <a
              href={`tel:${SITE_CONFIG.phone}`}
              className="xs:hidden p-2 rounded bg-volt text-pitch-black font-bold"
              aria-label="Call support"
            >
              <Phone className="w-4 h-4" />
            </a>

            <a
              href="#custom-jerseys"
              className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded bg-volt hover:bg-volt-hover text-pitch-black font-display font-bold text-xs uppercase tracking-wider transition-all transform hover:scale-[1.02]"
            >
              <span>Custom Jersey</span>
            </a>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-pitch-dark border-b border-pitch-border px-4 py-4 space-y-4 animate-in slide-in-from-top duration-200">
            <div className="grid grid-cols-2 gap-2 text-xs font-display uppercase tracking-wider font-bold">
              <Link
                href="/#deals"
                onClick={() => setMobileMenuOpen(false)}
                className="p-2.5 rounded bg-pitch-surface border border-pitch-border text-gold flex items-center gap-1.5"
              >
                <Flame className="w-4 h-4" /> Deal of the Day
              </Link>
              <Link
                href="/#custom-jerseys"
                onClick={() => setMobileMenuOpen(false)}
                className="p-2.5 rounded bg-pitch-surface border border-pitch-border text-volt flex items-center gap-1.5"
              >
                Custom Jersey
              </Link>
              {(categories.length > 0 ? categories.slice(0, 8) : [
                { name: 'Offer Jersey', slug: 'offer-jersey' },
                { name: 'Player Version', slug: 'player-version' },
                { name: 'Embroidery', slug: 'embroidery-jersey' },
                { name: 'Retro Jersey', slug: 'retro-jersey' },
                { name: 'World Cup', slug: 'world-cup' },
                { name: 'Kids Kits', slug: 'kids' },
              ]).map((c) => (
                <Link
                  key={c.slug}
                  href={`/c/${c.slug}`}
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-2.5 rounded bg-pitch-surface border border-pitch-border text-slate-200 truncate"
                >
                  {c.name}
                </Link>
              ))}
            </div>

            <div className="pt-2 border-t border-pitch-border flex items-center justify-between text-xs text-slate-400">
              <a href={`tel:${SITE_CONFIG.phone}`} className="flex items-center gap-1 text-slate-200">
                <Phone className="w-3.5 h-3.5 text-volt" />
                <span>Call: {SITE_CONFIG.phoneFormatted}</span>
              </a>
              <span>{SITE_CONFIG.phoneHours}</span>
            </div>
          </div>
        )}
      </header>

      {/* Global Search Modal */}
      {searchOpen && <SearchModal onClose={() => setSearchOpen(false)} />}
    </>
  );
}
