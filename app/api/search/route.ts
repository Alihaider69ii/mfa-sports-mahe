import { NextResponse } from 'next/server';
import { getProducts } from '@/lib/data';

export async function GET() {
  const products = getProducts();
  const searchIndex = products.map((p) => ({
    slug: p.slug,
    name: p.name,
    price: p.price,
    mrp: p.mrp,
    discount: p.discount,
    discountPercent: p.discountPercent,
    category: p.category,
    categorySlug: p.categorySlug,
    club: p.club,
    image: p.images?.[0]?.w360 || '/img/logo.png',
    liveUrl: p.liveUrl,
  }));

  return NextResponse.json(searchIndex, {
    headers: {
      'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
    },
  });
}
