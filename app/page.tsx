import React from 'react';
import { Hero } from '@/components/Hero';
import { CategoryPills } from '@/components/CategoryPills';
import { DealOfTheDay } from '@/components/DealOfTheDay';
import { NewArrivals } from '@/components/NewArrivals';
import { ClubCollections } from '@/components/ClubCollections';
import { CustomJerseySection } from '@/components/CustomJerseySection';
import { TrustStrip } from '@/components/TrustStrip';
import { getCategories, getDeals, getNewArrivals, getClubs } from '@/lib/data';

// Static page generation for instant mobile TTFB
export const revalidate = 3600;

export default function HomePage() {
  const categories = getCategories();
  const deals = getDeals();
  const newArrivals = getNewArrivals();
  const clubs = getClubs();
  const topDeal = deals.length > 0 ? deals[0] : null;

  return (
    <div>
      {/* 1. Hero with the strongest current offer from the ingested data */}
      <Hero topDeal={topDeal} />

      {/* 2. Category Strip (Horizontal pill scroll for all 16 collections) */}
      <CategoryPills categories={categories} />

      {/* 3. Deal of the Day (Flat 199 - 299 jerseys) */}
      <DealOfTheDay deals={deals} />

      {/* 4. New Arrivals */}
      <NewArrivals products={newArrivals} />

      {/* 5. Club Collections (Arsenal, AC Milan, Argentina, etc.) */}
      <ClubCollections clubs={clubs} />

      {/* 6. Custom Jersey CTA & Bulk Enquiry Form */}
      <CustomJerseySection />

      {/* 7. Trust Strip */}
      <TrustStrip />
    </div>
  );
}
