import React from 'react';
import Link from 'next/link';
import { Flame, ArrowRight } from 'lucide-react';
import { Product } from '@/lib/types';
import { ProductCard } from './ProductCard';

interface DealOfTheDayProps {
  deals: Product[];
}

export function DealOfTheDay({ deals }: DealOfTheDayProps) {
  if (!deals || deals.length === 0) return null;

  return (
    <section id="deals" className="py-12 bg-pitch-dark/80 border-b border-pitch-border relative">
      <div className="max-w-7xl mx-auto px-4">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 mb-8">
          <div>
            <div className="inline-flex items-center gap-1.5 text-gold text-xs font-display uppercase tracking-widest font-black mb-1">
              <Flame className="w-4 h-4 fill-gold text-gold" />
              <span>Deal of the Day · Flat ₹199 - ₹299</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-display font-black uppercase tracking-tight text-white">
              Today&apos;s <span className="text-gold">Steal Deals</span>
            </h2>
          </div>

          <Link
            href="/c/offer-jersey"
            className="inline-flex items-center gap-1 text-xs sm:text-sm font-display font-bold uppercase tracking-wider text-slate-300 hover:text-volt transition-colors"
          >
            <span>View All Offers ({deals.length})</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Deals Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-5">
          {deals.slice(0, 8).map((product, idx) => (
            <ProductCard key={product.slug} product={product} priority={idx < 2} />
          ))}
        </div>
      </div>
    </section>
  );
}
