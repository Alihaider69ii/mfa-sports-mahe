import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { X } from 'lucide-react';
import { getCategories, getProductsByCategory } from '@/lib/data';
import { ProductCard } from '@/components/ProductCard';
import { CategoryPills } from '@/components/CategoryPills';

interface CategoryPageProps {
  params: { slug: string };
  searchParams: {
    sort?: string;
    club?: string;
    priceMax?: string;
  };
}

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const categories = getCategories();
  const category = categories.find((c) => c.slug === params.slug);

  if (!category) {
    return { title: 'Category Not Found' };
  }

  return {
    title: `${category.name} Jerseys | MFA Sports Mahe`,
    description: `Shop authentic ${category.name} football & cricket jerseys from MFA Sports Mahe. Free pan-India shipping on orders above ₹399.`,
  };
}

export default function CategoryPage({ params, searchParams }: CategoryPageProps) {
  const categories = getCategories();
  const category = categories.find((c) => c.slug === params.slug);

  if (!category) {
    notFound();
  }

  let products = getProductsByCategory(params.slug);

  // Extract available clubs in this category
  const availableClubs = Array.from(
    new Set(products.map((p) => p.club).filter((c): c is string => Boolean(c)))
  );

  // Apply Club filter
  if (searchParams.club) {
    products = products.filter(
      (p) => p.club?.toLowerCase() === searchParams.club?.toLowerCase()
    );
  }

  // Apply Price Max filter
  if (searchParams.priceMax) {
    const max = parseInt(searchParams.priceMax, 10);
    if (!isNaN(max)) {
      products = products.filter((p) => p.price <= max);
    }
  }

  // Apply Sorting
  if (searchParams.sort === 'price-asc') {
    products = [...products].sort((a, b) => a.price - b.price);
  } else if (searchParams.sort === 'price-desc') {
    products = [...products].sort((a, b) => b.price - a.price);
  } else if (searchParams.sort === 'discount') {
    products = [...products].sort((a, b) => b.discountPercent - a.discountPercent);
  }

  const hasActiveFilters = Boolean(searchParams.club || searchParams.priceMax || searchParams.sort);

  return (
    <div className="min-h-screen bg-pitch-black pb-16">
      {/* Category Pills Strip */}
      <CategoryPills categories={categories} activeSlug={params.slug} />

      <div className="max-w-7xl mx-auto px-4 pt-6 sm:pt-8">
        {/* Category Header */}
        <div className="mb-6">
          <div className="flex items-center gap-2 text-xs font-mono text-pitch-borderLight uppercase mb-1">
            <Link href="/" className="hover:text-volt">Home</Link>
            <span>/</span>
            <span>Collections</span>
            <span>/</span>
            <span className="text-slate-300 font-semibold">{category.name}</span>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 border-b border-pitch-border pb-4">
            <div>
              <h1 className="text-3xl sm:text-4xl font-display font-black uppercase text-white tracking-tight">
                {category.name}
              </h1>
              <p className="text-xs sm:text-sm text-slate-400 mt-1">
                Showing {products.length} official jerseys from the Mahe inventory.
              </p>
            </div>

            {hasActiveFilters && (
              <Link
                href={`/c/${params.slug}`}
                className="inline-flex items-center gap-1 text-xs text-badgeRed hover:underline font-mono"
              >
                <X className="w-3.5 h-3.5" />
                <span>Reset all filters</span>
              </Link>
            )}
          </div>
        </div>

        {/* Filter & Sort Controls Toolbar */}
        <div className="bg-pitch-surface p-3 sm:p-4 rounded border border-pitch-border mb-6 flex flex-wrap items-center justify-between gap-3 text-xs sm:text-sm">
          {/* Club Pills if category has clubs */}
          {availableClubs.length > 0 && (
            <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-0.5">
              <span className="text-slate-400 font-semibold uppercase text-[11px] shrink-0">
                Club:
              </span>
              <Link
                href={`/c/${params.slug}${searchParams.sort ? `?sort=${searchParams.sort}` : ''}`}
                className={`px-2.5 py-1 rounded text-xs uppercase font-display font-bold border shrink-0 ${
                  !searchParams.club
                    ? 'bg-volt text-pitch-black border-volt'
                    : 'bg-pitch-card text-slate-300 border-pitch-border hover:border-volt hover:text-volt'
                }`}
              >
                All
              </Link>
              {availableClubs.map((club) => {
                const isSelected = searchParams.club?.toLowerCase() === club.toLowerCase();
                return (
                  <Link
                    key={club}
                    href={`/c/${params.slug}?club=${encodeURIComponent(club)}${searchParams.sort ? `&sort=${searchParams.sort}` : ''}`}
                    className={`px-2.5 py-1 rounded text-xs uppercase font-display font-bold border shrink-0 ${
                      isSelected
                        ? 'bg-volt text-pitch-black border-volt'
                        : 'bg-pitch-card text-slate-300 border-pitch-border hover:border-volt hover:text-volt'
                    }`}
                  >
                    {club}
                  </Link>
                );
              })}
            </div>
          )}

          {/* Sort Controls */}
          <div className="flex items-center gap-2 ml-auto">
            <span className="text-slate-400 font-semibold text-[11px] uppercase hidden sm:inline">
              Sort:
            </span>
            <div className="flex items-center gap-1">
              <Link
                href={`/c/${params.slug}?sort=price-asc${searchParams.club ? `&club=${encodeURIComponent(searchParams.club)}` : ''}`}
                className={`px-2.5 py-1 rounded text-xs font-semibold border ${
                  searchParams.sort === 'price-asc'
                    ? 'bg-volt text-pitch-black border-volt font-bold'
                    : 'bg-pitch-card text-slate-300 border-pitch-border hover:text-white'
                }`}
              >
                Price: Low to High
              </Link>
              <Link
                href={`/c/${params.slug}?sort=price-desc${searchParams.club ? `&club=${encodeURIComponent(searchParams.club)}` : ''}`}
                className={`px-2.5 py-1 rounded text-xs font-semibold border ${
                  searchParams.sort === 'price-desc'
                    ? 'bg-volt text-pitch-black border-volt font-bold'
                    : 'bg-pitch-card text-slate-300 border-pitch-border hover:text-white'
                }`}
              >
                High to Low
              </Link>
              <Link
                href={`/c/${params.slug}?sort=discount${searchParams.club ? `&club=${encodeURIComponent(searchParams.club)}` : ''}`}
                className={`px-2.5 py-1 rounded text-xs font-semibold border ${
                  searchParams.sort === 'discount'
                    ? 'bg-volt text-pitch-black border-volt font-bold'
                    : 'bg-pitch-card text-slate-300 border-pitch-border hover:text-white'
                }`}
              >
                Discount
              </Link>
            </div>
          </div>
        </div>

        {/* Product Grid */}
        {products.length === 0 ? (
          <div className="py-16 text-center bg-pitch-card rounded border border-pitch-border p-8">
            <p className="text-base font-semibold text-slate-300">
              No jerseys found matching your active filters.
            </p>
            <p className="text-xs text-slate-500 mt-1">
              Try resetting your club filter or price range.
            </p>
            <Link
              href={`/c/${params.slug}`}
              className="mt-4 inline-block px-4 py-2 rounded bg-volt text-pitch-black font-display font-bold text-xs uppercase"
            >
              Clear Filters
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-5">
            {products.map((product, idx) => (
              <ProductCard key={product.slug} product={product} priority={idx < 4} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
