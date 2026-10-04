import React from 'react';
import { HeroCarousel } from '@/components/HeroCarousel';
import { VisualCategoryStories } from '@/components/VisualCategoryStories';
import { CategoryPills } from '@/components/CategoryPills';
import { DealOfTheDay } from '@/components/DealOfTheDay';
import { NewArrivals } from '@/components/NewArrivals';
import { ClubCollections } from '@/components/ClubCollections';
import { CustomJerseySection } from '@/components/CustomJerseySection';
import { BlogHighlights } from '@/components/BlogHighlights';
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
      {/* 1. Interactive Hero Banner Carousel with Real MFA Posters & Touch Swipe */}
      <HeroCarousel topDeal={topDeal} />

      {/* 2. Visual Category Story Circles with Real Kit Photography */}
      <VisualCategoryStories />

      {/* 3. Category Strip (Horizontal pill scroll for all 16 collections) */}
      <CategoryPills categories={categories} />

      {/* 4. Deal of the Day (Flat 199 - 299 jerseys) */}
      <DealOfTheDay deals={deals} />

      {/* 5. New Arrivals */}
      <NewArrivals products={newArrivals} />

      {/* 6. Club Collections (Arsenal, AC Milan, Argentina, etc.) */}
      <ClubCollections clubs={clubs} />

      {/* 7. Custom Jersey CTA & Bulk Enquiry Form */}
      <CustomJerseySection />

      {/* 8. Matchday Stories & Blogs */}
      <BlogHighlights />

      {/* 9. Trust Strip */}
      <TrustStrip />
    </div>
  );
}
