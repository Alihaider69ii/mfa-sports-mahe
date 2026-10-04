import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ExternalLink } from 'lucide-react';
import { Product } from '@/lib/types';

interface ProductCardProps {
  product: Product;
  priority?: boolean;
}

export function ProductCard({ product, priority = false }: ProductCardProps) {
  // Use local responsive WebP image if available
  const imgObj = product.images?.[0];
  const imgSrc = imgObj?.w640 || imgObj?.w360 || '/img/logo.png';

  return (
    <div className="group relative bg-pitch-card rounded-sm border border-pitch-border hover:border-pitch-borderLight transition-all duration-200 flex flex-col justify-between overflow-hidden shadow-pitch-card">
      {/* Discount / Deal Badge */}
      <div className="absolute top-2.5 left-2.5 z-10 flex flex-col gap-1 items-start">
        {product.discountPercent > 0 && (
          <span className="jersey-badge-slant bg-badgeRed text-white text-[11px] font-display font-extrabold uppercase px-2 py-0.5 tracking-wider shadow">
            <span className="jersey-badge-unskew inline-block">{product.discountPercent}% OFF</span>
          </span>
        )}
        {product.isDealOfTheDay && (
          <span className="jersey-badge-slant bg-gold text-pitch-black text-[10px] font-display font-black uppercase px-2 py-0.5 tracking-wider shadow">
            <span className="jersey-badge-unskew inline-block">DEAL ₹{product.price}</span>
          </span>
        )}
      </div>

      {/* Club Tag if present */}
      {product.club && (
        <span className="absolute top-2.5 right-2.5 z-10 text-[10px] font-semibold uppercase tracking-wider bg-pitch-dark/90 text-slate-300 border border-pitch-border px-2 py-0.5 rounded-sm">
          {product.club}
        </span>
      )}

      {/* Product Image Clickable to /p/[slug] */}
      <Link href={`/p/${product.slug}`} className="block relative aspect-square bg-pitch-dark overflow-hidden">
        <Image
          src={imgSrc}
          alt={product.name}
          fill
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          className="object-cover object-center group-hover:scale-105 transition-transform duration-300"
          loading={priority ? 'eager' : 'lazy'}
          priority={priority}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-pitch-card/80 via-transparent to-transparent opacity-60" />
      </Link>

      {/* Product Information */}
      <div className="p-3 sm:p-4 flex flex-col flex-1 justify-between gap-3">
        <div>
          <div className="text-[11px] uppercase font-bold tracking-wider text-pitch-borderLight mb-1 truncate">
            {product.category || 'MFA Jersey'}
          </div>
          <Link href={`/p/${product.slug}`}>
            <h3 className="text-xs sm:text-sm font-semibold text-slate-100 group-hover:text-volt line-clamp-2 transition-colors uppercase leading-snug">
              {product.name}
            </h3>
          </Link>

          {/* Sizes if available */}
          {product.sizes && product.sizes.length > 0 && (
            <div className="flex flex-wrap gap-1 mt-2">
              {product.sizes.slice(0, 5).map((size) => (
                <span
                  key={size}
                  className="text-[10px] font-mono font-medium px-1.5 py-0.5 bg-pitch-surface text-slate-400 border border-pitch-border rounded-xs"
                >
                  {size}
                </span>
              ))}
              {product.sizes.length > 5 && (
                <span className="text-[10px] font-mono text-slate-500 py-0.5">+{product.sizes.length - 5}</span>
              )}
            </div>
          )}
        </div>

        {/* Pricing & Direct Buy Button */}
        <div className="pt-2 border-t border-pitch-border/60">
          <div className="flex items-baseline gap-2 mb-2.5">
            <span className="kit-num text-xl sm:text-2xl font-bold text-volt">
              ₹{product.price}
            </span>
            {product.mrp > product.price && (
              <span className="text-xs sm:text-sm text-slate-500 line-through">
                ₹{product.mrp}
              </span>
            )}
          </div>

          {/* Direct Buy Deep-Link to Live Store */}
          <a
            href={product.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full inline-flex items-center justify-center gap-1.5 py-2 px-3 rounded-xs bg-volt hover:bg-volt-hover text-pitch-black font-display font-extrabold text-xs uppercase tracking-wider transition-all transform active:scale-95"
            title={`Buy ${product.name} directly on MFA Sports Mahe`}
          >
            <span>Buy on MFA Sports</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </div>
  );
}
