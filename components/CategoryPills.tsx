import Link from 'next/link';
import { Category } from '@/lib/types';

interface CategoryPillsProps {
  categories: Category[];
  activeSlug?: string;
}

export function CategoryPills({ categories, activeSlug }: CategoryPillsProps) {
  return (
    <section className="py-6 border-b border-pitch-border bg-pitch-dark/50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-xs font-display uppercase tracking-widest font-bold text-slate-400">
            Shop 16 Collections
          </h2>
          <span className="text-[11px] text-pitch-borderLight">Scroll &rarr;</span>
        </div>

        {/* Horizontal scrollable pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 no-scrollbar">
          <Link
            href="/"
            className={`shrink-0 px-3.5 py-1.5 rounded-full text-xs font-display uppercase tracking-wider font-bold transition-all border ${
              !activeSlug
                ? 'bg-volt text-pitch-black border-volt'
                : 'bg-pitch-surface text-slate-300 border-pitch-border hover:border-volt hover:text-volt'
            }`}
          >
            All Kits
          </Link>

          {categories.map((cat) => {
            const isActive = activeSlug === cat.slug;
            return (
              <Link
                key={cat.slug}
                href={`/c/${cat.slug}`}
                className={`shrink-0 px-3.5 py-1.5 rounded-full text-xs font-display uppercase tracking-wider font-bold transition-all border whitespace-nowrap ${
                  isActive
                    ? 'bg-volt text-pitch-black border-volt shadow-volt-glow'
                    : 'bg-pitch-surface text-slate-300 border-pitch-border hover:border-volt hover:text-volt'
                }`}
              >
                {cat.name}
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
