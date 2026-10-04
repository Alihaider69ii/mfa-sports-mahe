'use client';

import React from 'react';
import Link from 'next/link';
import { Home, Shirt, Sparkles, BookOpen, User } from 'lucide-react';
import { openLoginModal } from './LoginModal';

export function MobileBottomNav() {
  return (
    <nav className="sm:hidden fixed bottom-0 left-0 right-0 z-40 bg-pitch-black/95 backdrop-blur-lg border-t border-pitch-border/80 px-2 py-2 safe-area-bottom shadow-2xl">
      <div className="grid grid-cols-5 items-center justify-around text-center">
        {/* Home */}
        <Link
          href="/"
          className="flex flex-col items-center justify-center py-1 text-slate-400 hover:text-volt focus:text-volt transition-colors"
        >
          <Home className="w-5 h-5 mb-0.5" />
          <span className="text-[10px] font-display font-bold uppercase tracking-wider">Home</span>
        </Link>

        {/* Categories */}
        <Link
          href="/c/player-version"
          className="flex flex-col items-center justify-center py-1 text-slate-400 hover:text-volt focus:text-volt transition-colors"
        >
          <Shirt className="w-5 h-5 mb-0.5" />
          <span className="text-[10px] font-display font-bold uppercase tracking-wider">Kits</span>
        </Link>

        {/* Custom Kits */}
        <Link
          href="/#custom-jerseys"
          className="flex flex-col items-center justify-center py-1 text-volt group"
        >
          <div className="w-8 h-8 -mt-4 rounded-full bg-volt text-pitch-black flex items-center justify-center shadow-volt-glow group-hover:scale-110 transition-transform">
            <Sparkles className="w-4 h-4" />
          </div>
          <span className="text-[10px] font-display font-black uppercase tracking-wider mt-0.5 text-volt">Custom</span>
        </Link>

        {/* Blogs */}
        <Link
          href="/blogs"
          className="flex flex-col items-center justify-center py-1 text-slate-400 hover:text-volt focus:text-volt transition-colors"
        >
          <BookOpen className="w-5 h-5 mb-0.5" />
          <span className="text-[10px] font-display font-bold uppercase tracking-wider">Stories</span>
        </Link>

        {/* Account / Login */}
        <button
          onClick={openLoginModal}
          className="flex flex-col items-center justify-center py-1 text-slate-400 hover:text-volt focus:text-volt transition-colors"
          aria-label="Open Account Portal"
        >
          <User className="w-5 h-5 mb-0.5" />
          <span className="text-[10px] font-display font-bold uppercase tracking-wider">Login</span>
        </button>
      </div>
    </nav>
  );
}
