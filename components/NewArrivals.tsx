import React from 'react';
import Link from 'next/link';
import { Sparkles, ArrowRight } from 'lucide-react';
import { Product } from '@/lib/types';
import { ProductCard } from './ProductCard';

interface NewArrivalsProps {
  products: Product[];
}

export function NewArrivals({ products }: NewArrivalsProps) {
  if (!products || products.length === 0) return null;

  return (
    <section className="py-12 bg-pitch-black border-b border-pitch-border">
      <div className="max-w-7xl mx-auto px-4">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 mb-8">
          <div>
            <div className="inline-flex items-center gap-1.5 text-volt text-xs font-display uppercase tracking-widest font-black mb-1">
              <Sparkles className="w-4 h-4 text-volt" />
              <span>Fresh Season Drops</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-display font-black uppercase tracking-tight text-white">
              New <span className="text-volt">Arrivals</span>
            </h2>
          </div>

          <Link
            href="/c/player-version"
            className="inline-flex items-center gap-1 text-xs sm:text-sm font-display font-bold uppercase tracking-wider text-slate-300 hover:text-volt transition-colors"
          >
            <span>Explore Player Version</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-5">
          {products.slice(0, 8).map((product) => (
            <ProductCard key={product.slug} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}
