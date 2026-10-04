import fs from 'fs';
import path from 'path';
import { Product, Category, Club, Policies } from './types';

const DATA_DIR = path.join(process.cwd(), 'data');

export function getProducts(): Product[] {
  const filePath = path.join(DATA_DIR, 'products.json');
  if (!fs.existsSync(filePath)) return [];
  try {
    const raw = fs.readFileSync(filePath, 'utf-8');
    return JSON.parse(raw);
  } catch (err) {
    console.error('Error reading products.json:', err);
    return [];
  }
}

export function getProductBySlug(slug: string): Product | null {
  const products = getProducts();
  if (!slug) return null;

  // 1. Exact match
  const exact = products.find((p) => p.slug === slug);
  if (exact) return exact;

  // 2. Case-insensitive / trimmed match
  const normalized = slug.toLowerCase().trim().replace(/^\/+|\/+$/g, '');
  const normMatch = products.find((p) => p.slug.toLowerCase() === normalized);
  if (normMatch) return normMatch;

  // 3. Fallback token-based match (e.g. barcelona-away-player-version)
  const tokens = normalized.split('-').filter((t) => t.length > 2);
  if (tokens.length >= 2) {
    let bestProduct: Product | null = null;
    let highestMatches = 0;

    for (const p of products) {
      const pTokens = p.slug.toLowerCase().split('-');
      const matches = tokens.filter((t) => pTokens.includes(t)).length;
      if (matches > highestMatches && matches >= 2) {
        highestMatches = matches;
        bestProduct = p;
      }
    }

    if (bestProduct) return bestProduct;
  }

  return null;
}

export function getCategories(): Category[] {
  const filePath = path.join(DATA_DIR, 'categories.json');
  if (!fs.existsSync(filePath)) {
    return [
      { name: '5-Sleeves', slug: '5-sleeves', path: '/Products/5-sleeves/' },
      { name: 'Cushions', slug: 'cushions', path: '/Products/cushions/' },
      { name: 'Embroidery Jersey', slug: 'embroidery-jersey', path: '/Products/embroidery-jersey/' },
      { name: 'Imported Kits', slug: 'imported-kits', path: '/Products/imported-kits/' },
      { name: 'Jackets', slug: 'jackets', path: '/Products/jackets/' },
      { name: 'Kids', slug: 'kids', path: '/Products/kids/' },
      { name: 'Offer Jersey', slug: 'offer-jersey', path: '/Products/offer-jersey/' },
      { name: 'Photo Frames', slug: 'photo-frames', path: '/Products/photo-frames/' },
      { name: 'Player Version', slug: 'player-version', path: '/Products/player-version/' },
      { name: 'Premium Quality', slug: 'premium-quality', path: '/Products/premium-quality/' },
      { name: 'Retro Jersey', slug: 'retro-jersey', path: '/Products/retro-jersey/' },
      { name: 'Shorts', slug: 'shorts', path: '/Products/shorts/' },
      { name: 'Stockings', slug: 'stockings', path: '/Products/stockings/' },
      { name: 'Sublimation Jersey', slug: 'sublimation-jersey', path: '/Products/sublimation-jersey/' },
      { name: 'T-Shirts', slug: 't-shirts', path: '/Products/t-shirts/' },
      { name: 'World Cup', slug: 'world-cup', path: '/Products/world-cup/' },
    ];
  }
  try {
    const raw = fs.readFileSync(filePath, 'utf-8');
    return JSON.parse(raw);
  } catch (err) {
    console.error('Error reading categories.json:', err);
    return [];
  }
}

export function getClubs(): Club[] {
  const filePath = path.join(DATA_DIR, 'clubs.json');
  if (!fs.existsSync(filePath)) return [];
  try {
    const raw = fs.readFileSync(filePath, 'utf-8');
    return JSON.parse(raw);
  } catch (err) {
    console.error('Error reading clubs.json:', err);
    return [];
  }
}

export function getPolicies(): Policies {
  const filePath = path.join(DATA_DIR, 'policies.json');
  if (!fs.existsSync(filePath)) {
    return {
      returnPolicy: {
        title: 'Return Policy',
        content: 'Customers have the right to return a product if it is delivered in a damaged condition. Contact support within 7 days.',
        points: [
          '7-Day Return policy for defective/damaged items.',
          'Proof of unboxing video or photo required.',
          'Customer care support: +91 90746 94968.',
        ],
      },
      shippingPolicy: {
        title: 'Shipping Policy',
        content: 'Standard Shipping Dispatch Time: All non-customized products will be dispatched within 2 business days of placing order.',
        points: [
          'Dispatch within 2 business days for non-customized apparel.',
          'Free Delivery All Over India above Rs 399.',
          'Tracked shipping with reliable courier partners.',
        ],
      },
    };
  }
  try {
    const raw = fs.readFileSync(filePath, 'utf-8');
    return JSON.parse(raw);
  } catch (err) {
    console.error('Error reading policies.json:', err);
    return {
      returnPolicy: { title: 'Return Policy', content: '', points: [] },
      shippingPolicy: { title: 'Shipping Policy', content: '', points: [] },
    };
  }
}

export function getDeals(): Product[] {
  const products = getProducts();
  const deals = products.filter((p) => p.isDealOfTheDay);
  if (deals.length > 0) return deals;
  // Fallback: highest discount items
  return [...products].sort((a, b) => b.discountPercent - a.discountPercent).slice(0, 10);
}

export function getNewArrivals(): Product[] {
  const products = getProducts();
  const arrivals = products.filter((p) => p.isNewArrival);
  if (arrivals.length > 0) return arrivals;
  return products.slice(0, 10);
}

export function getProductsByCategory(categorySlug: string): Product[] {
  const products = getProducts();
  return products.filter(
    (p) =>
      p.categorySlug === categorySlug ||
      p.categories.some((c) => c.toLowerCase().replace(/[^a-z0-9]/g, '-') === categorySlug)
  );
}

export function getProductsByClub(clubName: string): Product[] {
  const products = getProducts();
  const query = clubName.toLowerCase();
  return products.filter((p) => p.club?.toLowerCase().includes(query) || p.name.toLowerCase().includes(query));
}

export function getRelatedProducts(product: Product, limit = 4): Product[] {
  const products = getProducts();
  return products
    .filter((p) => p.slug !== product.slug && (p.categorySlug === product.categorySlug || (product.club && p.club === product.club)))
    .slice(0, limit);
}
