'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Search, X, Loader2, ExternalLink } from 'lucide-react';

interface SearchItem {
  slug: string;
  name: string;
  price: number;
  mrp: number;
  discount: string;
  discountPercent: number;
  category: string;
  categorySlug: string;
  club: string | null;
  image: string;
  liveUrl: string;
}

interface SearchModalProps {
  onClose: () => void;
}

export function SearchModal({ onClose }: SearchModalProps) {
  const [query, setQuery] = useState('');
  const [items, setItems] = useState<SearchItem[]>([]);
  const [loading, setLoading] = useState(true);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();

    // Fetch search index lazily
    fetch('/api/search')
      .then((res) => res.json())
      .then((data) => {
        setItems(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Failed to load search data:', err);
        setLoading(false);
      });

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  const filtered = query.trim()
    ? items.filter((item) => {
        const q = query.toLowerCase();
        return (
          item.name.toLowerCase().includes(q) ||
          item.category.toLowerCase().includes(q) ||
          (item.club && item.club.toLowerCase().includes(q))
        );
      })
    : [];

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-start justify-center p-3 sm:p-6 animate-in fade-in duration-150">
      <div className="w-full max-w-2xl bg-pitch-card rounded border border-pitch-border shadow-2xl overflow-hidden mt-6 sm:mt-12 flex flex-col max-h-[85vh]">
        {/* Search Input Bar */}
        <div className="flex items-center gap-3 p-3 sm:p-4 border-b border-pitch-border bg-pitch-surface">
          <Search className="w-5 h-5 text-volt shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search Arsenal, Messi, Retro, 5-Sleeves, World Cup..."
            className="w-full bg-transparent text-sm sm:text-base text-white placeholder-slate-400 focus:outline-none"
          />
          {query && (
            <button onClick={() => setQuery('')} className="text-slate-400 hover:text-white p-1">
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={onClose}
            className="text-xs font-mono uppercase bg-pitch-dark px-2 py-1 rounded text-slate-400 border border-pitch-border hover:text-volt"
          >
            ESC
          </button>
        </div>

        {/* Results Area */}
        <div className="overflow-y-auto p-3 sm:p-4 space-y-2 flex-1">
          {loading && (
            <div className="flex items-center justify-center py-12 text-slate-400 gap-2">
              <Loader2 className="w-5 h-5 animate-spin text-volt" />
              <span className="text-xs">Loading jersey catalog...</span>
            </div>
          )}

          {!loading && !query && (
            <div className="py-8 text-center text-slate-400">
              <p className="text-xs uppercase tracking-wider font-semibold">
                Type a jersey, club name or category to search
              </p>
              <div className="flex flex-wrap justify-center gap-1.5 mt-3">
                {['Real Madrid', 'Argentina', 'Barcelona', 'Offer', 'Full Sleeve', 'Kids'].map((hint) => (
                  <button
                    key={hint}
                    onClick={() => setQuery(hint)}
                    className="text-xs px-2.5 py-1 rounded-full bg-pitch-surface border border-pitch-border hover:border-volt hover:text-volt text-slate-300"
                  >
                    {hint}
                  </button>
                ))}
              </div>
            </div>
          )}

          {!loading && query && filtered.length === 0 && (
            <div className="py-10 text-center text-slate-400">
              <p className="text-sm font-semibold">No jerseys found for &quot;{query}&quot;</p>
              <p className="text-xs text-slate-500 mt-1">Try searching by club or category name</p>
            </div>
          )}

          {!loading &&
            filtered.map((item) => (
              <div
                key={item.slug}
                className="flex items-center justify-between p-2 rounded bg-pitch-surface/60 hover:bg-pitch-surface border border-pitch-border/50 hover:border-pitch-borderLight transition-all gap-3"
              >
                <Link
                  href={`/p/${item.slug}`}
                  onClick={onClose}
                  className="flex items-center gap-3 min-w-0 flex-1"
                >
                  <div className="relative w-12 h-12 bg-pitch-dark rounded overflow-hidden shrink-0">
                    <Image src={item.image} alt={item.name} fill className="object-cover" />
                  </div>
                  <div className="min-w-0">
                    <h4 className="text-xs sm:text-sm font-semibold text-white uppercase truncate">
                      {item.name}
                    </h4>
                    <div className="flex items-center gap-2 mt-0.5 text-[11px] text-slate-400">
                      <span>{item.category}</span>
                      {item.club && <span className="text-volt font-medium">· {item.club}</span>}
                    </div>
                  </div>
                </Link>

                <div className="flex items-center gap-3 shrink-0">
                  <div className="text-right">
                    <span className="kit-num text-sm sm:text-base font-bold text-volt">
                      ₹{item.price}
                    </span>
                    {item.mrp > item.price && (
                      <span className="text-[10px] text-slate-500 line-through block">
                        ₹{item.mrp}
                      </span>
                    )}
                  </div>
                  <a
                    href={item.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-1.5 rounded bg-volt text-pitch-black hover:bg-volt-hover transition-colors"
                    title="Buy directly on live site"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
