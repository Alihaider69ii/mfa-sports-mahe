import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { ExternalLink, ShieldCheck, Truck, Award } from 'lucide-react';
import { getProductBySlug, getRelatedProducts, getProducts } from '@/lib/data';
import { ProductCard } from '@/components/ProductCard';
import { SITE_CONFIG } from '@/config';
import { ProductGallery } from './ProductGallery';

interface ProductPageProps {
  params: { slug: string };
}

export async function generateStaticParams() {
  const products = getProducts();
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const product = getProductBySlug(params.slug);
  if (!product) return { title: 'Product Not Found' };

  const firstImg = product.images?.[0]?.w640 || '/img/logo.png';

  return {
    title: `${product.name} | MFA Sports Mahe`,
    description: product.description
      ? product.description.slice(0, 160)
      : `Buy ${product.name} at ₹${product.price} from MFA Sports Mahe. Free delivery over ₹399.`,
    openGraph: {
      title: `${product.name} - ₹${product.price}`,
      description: `MFA Sports Mahe Kerala. Price: ₹${product.price} (MRP: ₹${product.mrp}). Genuine sublimation & football kit.`,
      images: [{ url: firstImg, width: 640, height: 640, alt: product.name }],
    },
  };
}

export default function ProductDetailPage({ params }: ProductPageProps) {
  const product = getProductBySlug(params.slug);

  if (!product) {
    notFound();
  }

  const related = getRelatedProducts(product, 4);

  // Build JSON-LD Schema
  const jsonLd = {
    '@context': 'https://schema.org/',
    '@type': 'Product',
    name: product.name,
    image: product.images.map((img) => `https://mfasportsmahe.com${img.w640}`),
    description: product.description || `${product.name} from MFA Sports Mahe`,
    sku: product.slug,
    brand: {
      '@type': 'Brand',
      name: 'MFA Sports Mahe',
    },
    offers: {
      '@type': 'Offer',
      url: product.liveUrl,
      priceCurrency: 'INR',
      price: product.price,
      availability: 'https://schema.org/InStock',
      seller: {
        '@type': 'Organization',
        name: 'MFA Sports Mahe',
      },
    },
  };

  return (
    <div className="min-h-screen bg-pitch-black pb-20">
      {/* JSON-LD Product Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Breadcrumb Strip */}
      <div className="bg-pitch-surface/60 border-b border-pitch-border py-2 px-4 text-xs font-mono text-slate-400">
        <div className="max-w-7xl mx-auto flex items-center gap-2 overflow-x-auto no-scrollbar">
          <Link href="/" className="hover:text-volt">Home</Link>
          <span>/</span>
          <Link href={`/c/${product.categorySlug}`} className="hover:text-volt">
            {product.category}
          </Link>
          <span>/</span>
          <span className="text-slate-200 font-semibold truncate max-w-xs">{product.name}</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 pt-6 sm:pt-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          {/* Left Column: Image Gallery */}
          <div className="lg:col-span-6">
            <ProductGallery images={product.images} productName={product.name} />
          </div>

          {/* Right Column: Product Meta, Price, Sizes, & Live Purchase Action */}
          <div className="lg:col-span-6 flex flex-col justify-start space-y-6">
            <div>
              {/* Category & Club Badges */}
              <div className="flex flex-wrap items-center gap-2 mb-2">
                <Link
                  href={`/c/${product.categorySlug}`}
                  className="text-xs uppercase font-display font-bold tracking-wider px-2.5 py-0.5 rounded bg-pitch-surface border border-pitch-border text-volt hover:border-volt transition-colors"
                >
                  {product.category}
                </Link>

                {product.club && (
                  <span className="text-xs uppercase font-display font-semibold tracking-wider px-2.5 py-0.5 rounded bg-pitch-card border border-pitch-border text-slate-300">
                    Club: {product.club}
                  </span>
                )}

                {product.isDealOfTheDay && (
                  <span className="text-xs uppercase font-display font-bold px-2 py-0.5 rounded bg-gold text-pitch-black">
                    Deal of the Day
                  </span>
                )}
              </div>

              {/* Product Title */}
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-display font-black uppercase tracking-tight text-white leading-tight">
                {product.name}
              </h1>
            </div>

            {/* Price Box */}
            <div className="p-4 rounded bg-pitch-card border border-pitch-border">
              <div className="flex items-baseline gap-3">
                <span className="kit-num text-3xl sm:text-4xl font-black text-volt">
                  ₹{product.price}
                </span>

                {product.mrp > product.price && (
                  <span className="text-lg sm:text-xl text-slate-500 line-through">
                    ₹{product.mrp}
                  </span>
                )}

                {product.discountPercent > 0 && (
                  <span className="jersey-badge-slant bg-badgeRed text-white text-xs font-display font-black uppercase px-2.5 py-1 tracking-wider">
                    <span className="jersey-badge-unskew inline-block">
                      SAVE {product.discountPercent}%
                    </span>
                  </span>
                )}
              </div>

              <p className="text-xs text-slate-400 mt-2 flex items-center gap-1.5">
                <Truck className="w-3.5 h-3.5 text-volt" />
                <span>
                  Free All India Delivery on orders above ₹{SITE_CONFIG.freeDeliveryThreshold}
                </span>
              </p>
            </div>

            {/* Sizes Only If Present in Ingested Data (Never empty selector) */}
            {product.sizes && product.sizes.length > 0 && (
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-display uppercase tracking-widest font-bold text-slate-300">
                    Available Sizes (Select on Store)
                  </span>
                </div>

                <div className="flex flex-wrap gap-2">
                  {product.sizes.map((size) => (
                    <span
                      key={size}
                      className="px-3.5 py-2 rounded-xs bg-pitch-surface border border-pitch-border text-sm font-mono font-bold text-slate-200"
                    >
                      {size}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Primary Action: Direct Deep-Link to Live Store */}
            <div className="space-y-3 pt-2">
              <a
                href={product.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-4 px-6 rounded-xs bg-volt hover:bg-volt-hover text-pitch-black font-display font-black text-base uppercase tracking-wider flex items-center justify-center gap-2 transition-all transform hover:scale-[1.01] shadow-volt-glow"
              >
                <span>Buy on MFA Sports</span>
                <ExternalLink className="w-4 h-4" />
              </a>

              <p className="text-center text-[11px] text-slate-400">
                You will be redirected directly to checkout this jersey on the official{' '}
                <span className="text-slate-300">mfasportsmahe.com</span> store.
              </p>
            </div>

            {/* Product Description if present */}
            {product.description && (
              <div className="pt-4 border-t border-pitch-border">
                <h3 className="text-xs font-display uppercase tracking-widest font-bold text-slate-400 mb-2">
                  Product Specifications & Size Chart
                </h3>
                <div className="text-xs sm:text-sm text-slate-300 leading-relaxed bg-pitch-surface/40 p-4 rounded border border-pitch-border/60">
                  {product.description}
                </div>
              </div>
            )}

            {/* Trust Assurances */}
            <div className="pt-4 border-t border-pitch-border space-y-2 text-xs text-slate-400">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-gold shrink-0" />
                <span>{SITE_CONFIG.returnWindowDays}-day return policy if product has manufacturing damage.</span>
              </div>
              <div className="flex items-center gap-2">
                <Award className="w-4 h-4 text-volt shrink-0" />
                <span>100% genuine MFA Sports apparel sourced directly from Mahe, Kerala.</span>
              </div>
            </div>
          </div>
        </div>

        {/* Related Products */}
        {related.length > 0 && (
          <div className="mt-16 pt-10 border-t border-pitch-border">
            <h2 className="text-2xl sm:text-3xl font-display font-black uppercase text-white mb-6">
              You Might Also Like
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {related.map((p) => (
                <ProductCard key={p.slug} product={p} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
